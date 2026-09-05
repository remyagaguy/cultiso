import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function parseWhatsAppLog(filePath: string, sourceName: string) {
  console.log(`Lecture du fichier: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Les fichiers WhatsApp peuvent être massifs (ex: 1.6 Mo). 
  // On va découper le texte en blocs de 1000 lignes pour éviter les erreurs de tokens LLM et accélérer l'extraction.
  const lines = content.split('\n');
  const chunkSize = 1000; 
  let extractedPricesCount = 0;

  console.log(`Fichier chargé: ${lines.length} lignes à analyser.`);

  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize).join('\n');
    
    // On skip les chunks trop petits ou vides
    if (chunk.trim().length < 50) continue;

    console.log(`Analyse du bloc ${Math.floor(i/chunkSize) + 1}/${Math.ceil(lines.length/chunkSize)}...`);

    try {
      const response = await ai.chat.completions.create({
        model: 'deepseek/deepseek-v4-flash-0731',
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en agrobusiness. Ton rôle est d'extraire les prix des produits agricoles mentionnés dans cet export WhatsApp.
            
            REGLE CRUCIALE SUR LES NOMS DE PRODUITS :
            Ne reprends pas le jargon ou les phrases longues, MAIS conserve absolument les attributs de qualité, de variété ou de saison s'ils influencent le prix.
            Exemples : 
            - "maïs nouveau récolté hier" -> "Maïs nouveau"
            - "vieux maïs bien sec" -> "Maïs ancien"
            - "poussins goliath de 2 semaines" -> "Poussins Goliath (2 semaines)"
            - "super engrais npk 15 15" -> "Engrais NPK 15-15-15"
            - "beaux lapins sevrés" -> "Lapin (sevré)"

            Tu DOIS renvoyer STRICTEMENT un objet JSON avec cette structure :
            {
              "prices": [
                {
                  "name": "Nom standardisé mais nuancé du produit",
                  "category": "INTRANT, CEREALE, VOLAILLE, TUBERCULE, BETAIL, FRUIT, LEGUME, ou AUTRE",
                  "price": Prix en nombre (ex: 15000),
                  "unit": "Unité (ex: kg, sac 50kg, plateau)",
                  "location": "Nom de la localité et de la ville (ex: 'Agoè, Lomé' ou 'Marché central, Notsè'). Cherche ces détails dans le texte.",
                  "country": "Pays déduit de la ville ou du contexte (ex: Togo, Bénin, Côte d'Ivoire).",
                  "date": "Date de l'annonce",
                  "raw_text": "Texte original"
                }
              ]
            }
            Si aucun prix n'est trouvé, renvoie {"prices": []}. Renvoie uniquement du JSON valide.`
          },
          {
            role: 'user',
            content: chunk
          }
        ],
      });

      const resultText = response.choices[0].message.content || '{"prices": []}';
      const cleanJson = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanJson);

      if (data.prices && data.prices.length > 0) {
        console.log(`🎯 ${data.prices.length} prix trouvés dans ce bloc !`);
        
        for (const record of data.prices) {
          let { data: product } = await supabase
            .from('products')
            .select('id')
            .ilike('name', record.name)
            .single();

          if (!product) {
            const { data: newProduct, error: insertErr } = await supabase
              .from('products')
              .insert({
                name: record.name,
                category: record.category || 'AUTRE',
                default_unit: record.unit || 'unité'
              })
              .select('id')
              .single();
              
            if (insertErr) {
               console.error("Erreur création produit:", insertErr.message);
               continue;
            }
            product = newProduct;
          }

          const { error: priceErr } = await supabase
            .from('price_records')
            .insert({
              product_id: product.id,
              price: record.price,
              currency: 'FCFA',
              location: record.location || 'Inconnue',
              country: record.country || 'Inconnu',
              record_date: record.date.includes('202') ? record.date : new Date().toISOString().split('T')[0],
              source: sourceName,
              raw_text: record.raw_text
            });

          if (!priceErr) {
            extractedPricesCount++;
          }
        }
      }
    } catch (err) {
      console.error(`Erreur sur l'analyse du bloc:`, err);
    }
  }

  console.log(`✅ Extraction terminée pour ${sourceName}. ${extractedPricesCount} nouveaux prix ajoutés !`);
}

// Lancement manuel du script
const targetFile = process.argv[2];
const sourceName = process.argv[3];

if (!targetFile || !sourceName) {
  console.log("Usage: npx tsx scripts/parse_whatsapp.ts <chemin_du_fichier.txt> <nom_de_la_source>");
  process.exit(1);
}

parseWhatsAppLog(targetFile, sourceName);
