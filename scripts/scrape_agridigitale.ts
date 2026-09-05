import { chromium } from 'playwright';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charge les variables d'environnement (depuis .env.local ou .env)
dotenv.config({ path: '.env.local' });
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// On utilise la Service Role Key pour contourner le RLS en insertion
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENROUTER_API_KEY) throw new Error('La variable OPENROUTER_API_KEY est manquante.');
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Les identifiants Supabase (URL ou SERVICE_ROLE_KEY) sont manquants.');

const ai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface PriceRecord {
  name: string;
  category: string;
  price: number;
  unit: string;
  location: string;
}

async function scrapeAgridigitale(url: string) {
  console.log(`🌍 Lancement du scraping sur : ${url}`);
  
  // On lance en mode visible (headless: false) car certains sites (comme Agridigitale)
  // bloquent les navigateurs "fantômes" (Cloudflare/anti-bot).
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Attendre dynamiquement que du texte apparaisse sur la page (ex: chargement Vue.js/React)
    try {
      await page.waitForFunction(() => {
        return document.body && (document.body.innerText.length > 100 || (document.body.textContent && document.body.textContent.length > 100));
      }, { timeout: 15000 });
    } catch (e) {
      console.log("Le délai d'attente pour le texte est dépassé, tentative d'extraction immédiate...");
    }
    
    // Extraction du texte principal de la page
    const textContent = await page.evaluate(() => {
      const mainContent = document.querySelector('article') || document.querySelector('main') || document.body;
      return mainContent.innerText || mainContent.textContent || '';
    });

    if (!textContent || textContent.trim().length === 0) {
      const html = await page.content();
      console.error("HTML reçu :\n", html.substring(0, 1000)); // On affiche les 1000 premiers caractères du HTML
      throw new Error("Impossible d'extraire le texte de la page. Le site bloque peut-être Playwright (Cloudflare) ou la structure est vide.");
    }
    
    console.log(`📄 Texte extrait (${textContent.length} caractères). Analyse en cours par l'IA...`);

    // Appel à OpenRouter pour extraire le JSON structuré
    const completion = await ai.chat.completions.create({
      model: 'openrouter/free',
      messages: [
        {
          role: 'system',
          content: `Tu es un expert en analyse de marchés agricoles. Extrais les prix agricoles du texte fourni.
Tu dois renvoyer STRICTEMENT un JSON contenant un tableau de prix agricoles avec ce format exact :
{
  "prices": [
    {
      "name": "Nom du produit (ex: Maïs blanc)",
      "category": "CEREALE, INTRANT, BETAIL ou AUTRE",
      "price": 1500,
      "unit": "Unité (ex: kg, sac de 50kg, bol)",
      "location": "Lieu, marché ou ville mentionné (ex: Lomé)"
    }
  ]
}
Si aucun prix n'est mentionné, renvoie {"prices": []}. Ne renvoie RIEN d'autre que du JSON valide.`
        },
        {
          role: 'user',
          content: textContent
        }
      ],
      // Le mode JSON garantit un retour structuré
      response_format: { type: 'json_object' }
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("La réponse de l'IA est vide.");
    }
    
    console.log(`🤖 Réponse JSON brute de l'IA :\n${responseContent}\n`);

    // Nettoyage des backticks markdown si le modèle (openrouter/free) en rajoute
    let jsonString = responseContent.trim();
    if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
    }

    const data = JSON.parse(jsonString) as { prices: PriceRecord[] };
    const prices = data.prices;
    
    console.log(`🤖 L'IA a trouvé ${prices.length} relevé(s) de prix.`);

    if (prices.length === 0) {
      return;
    }

    // Sauvegarde dans Supabase
    for (const record of prices) {
      console.log(`➡️ Traitement de : ${record.name} - ${record.price} FCFA/${record.unit}`);
      
      // 1. Chercher si le produit existe déjà
      let { data: product, error: fetchError } = await supabase
        .from('products')
        .select('id')
        .ilike('name', record.name)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Erreur inattendue lors de la recherche du produit:", fetchError);
        continue;
      }

      let productId = product?.id;

      // 2. Création dynamique si le produit n'existe pas
      if (!productId) {
        console.log(`   ✨ Produit inconnu, création dynamique en cours...`);
        const { data: newProduct, error: insertError } = await supabase
          .from('products')
          .insert({
            name: record.name,
            category: record.category,
            default_unit: record.unit
          })
          .select('id')
          .single();

        if (insertError || !newProduct) {
          console.error("   ❌ Erreur lors de la création du produit:", insertError);
          continue;
        }
        productId = newProduct.id;
      }

      // 3. Insérer le prix
      const { error: priceError } = await supabase
        .from('price_records')
        .insert({
          product_id: productId,
          price: record.price,
          currency: 'FCFA',
          location: record.location,
          record_date: new Date().toISOString().split('T')[0], // Date du jour
          source: 'agridigitale.net',
          raw_text: responseContent // On garde le JSON généré en trace brute
        });

      if (priceError) {
        console.error("   ❌ Erreur lors de l'insertion du prix:", priceError);
      } else {
        console.log(`   ✅ Prix sauvegardé en base de données.`);
      }
    }
  } catch (err) {
    console.error('❌ Une erreur est survenue:', err);
  } finally {
    await browser.close();
  }
}

// Récupération de l'URL passée en argument
const targetUrl = process.argv[2];
if (!targetUrl) {
  console.error("Utilisation: npm run scrape:agri <URL_AGRIDIGITALE>");
  process.exit(1);
}

scrapeAgridigitale(targetUrl);
