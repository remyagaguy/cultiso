import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

let pipeline: unknown;

async function getEmbedding(text: string): Promise<number[]> {
  try {
    if (!pipeline) {
      const transformers = await import("@xenova/transformers");
      transformers.env.allowLocalModels = false;
      pipeline = await transformers.pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    }
    const result = await (pipeline as CallableFunction)(text, { pooling: "mean", normalize: true });
    return Array.from(result.data as Float32Array);
  } catch (err) {
    console.warn("Embedding pipeline failed:", err);
    return [];
  }
}

export const dynamic = "force-dynamic";

/* â”€â”€â”€ Intent Detection â”€â”€â”€ */
function needsRAG(message: string): boolean {
  const text = message.toLowerCase().trim();
  const agriKeywords = [
    "culture", "cultiver", "plante", "semence", "engrais", "fertilisant",
    "maladie", "parasite", "insecte", "traitement", "pesticide", "fongicide",
    "irrigation", "arrosage", "sol", "compost", "rÃ©colte", "rendement",
    "hectare", "parcelle", "champ", "ferme", "exploitation", "agriculture",
    "tomate", "maÃ¯s", "manioc", "riz", "soja", "cacao", "cafÃ©", "igname",
    "poulet", "porc", "boeuf", "poisson", "Ã©levage", "bÃ©tail", "volaille",
    "rentabilitÃ©", "coÃ»t", "bÃ©nÃ©fice", "investissement", "production",
    "sÃ©cheresse", "npk", "azote", "phosphore", "potassium", "ph",
    "biologique", "organique", "chimique", "conservation", "stockage",
    "pisciculture", "aquaculture", "apiculture", "aviculture", "maraÃ®chage", "agroforesterie",
    "entreprendre", "projet agricole", "conseil agricole"
  ];
  return agriKeywords.some((kw) => text.includes(kw));
}

import prixData from "@/data/prix_extraits_togo.json";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY n'est pas définie sur le serveur.");
    }

    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Non autorisǸ" }), { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Token invalide" }), { status: 401 });
    }
    const user = userData.user;
    let tokensBalance = user.app_metadata?.tokens_balance;
    if (tokensBalance === undefined) tokensBalance = 100000;
    
    if (tokensBalance <= 0) {
      return new Response(JSON.stringify({ error: "CrǸdits ǸpuisǸs" }), { status: 402 });
    }

    const body = await req.json();
    const mode = body.mode;
    const toolContext = body.toolContext || "cultisia";
    const model = body.model;
    const messages = body.messages || [{ role: "user", content: body.message || "" }];
    
    // Pour une recherche contextuelle de RAG, on prend les 2 derniers messages utilisateurs.
    const userMessages = messages.filter((m: any) => m.role === "user");
    const lastUserMessage = userMessages.pop()?.content || "";
    const previousUserMessage = userMessages.pop()?.content || "";
    const message = lastUserMessage;
    const combinedQuery = `${previousUserMessage} ${lastUserMessage}`.trim();

    let contextText = "";
    let sources: { file_name: string }[] = [];
    const shouldRAG = needsRAG(combinedQuery);

    if (mode === "Chat" && shouldRAG) {
      try {
        const queryEmbedding = await getEmbedding(combinedQuery);
        if (queryEmbedding.length > 0) {
          const { data: documents, error } = await supabase.rpc("match_cultisia_knowledge", {
            query_embedding: queryEmbedding,
            match_threshold: 0.45,
            match_count: 3,
          });
          if (!error && documents && documents.length > 0) {
            contextText = documents.map((doc: { content: string }) => doc.content).join("\n\n---\n\n");
            const allSources = documents.map((doc: { file_name: string }) => ({ file_name: doc.file_name }));
            sources = allSources.filter(
              (v: { file_name: string }, i: number, s: { file_name: string }[]) =>
                i === s.findIndex((t) => t.file_name === v.file_name)
            );
          }
        }
      } catch (ragError) {
        console.warn("RAG error:", ragError);
      }
    }

    // Injection des données de prix si l'utilisateur parle de prix
    const isPriceQuery = message.toLowerCase().includes("prix") || message.toLowerCase().includes("coût") || message.toLowerCase().includes("coute") || message.toLowerCase().includes("combien");
    if (isPriceQuery) {
      let dbPriceContext = "";
      try {
        const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const normalizedQuery = removeAccents(combinedQuery);
        
        const { data: allProducts } = await supabase.from('products').select('*');
        if (allProducts) {
          const matchedProducts = allProducts.filter((p: any) => normalizedQuery.includes(removeAccents(p.name)));
          const matchedProductIds = matchedProducts.map((p: any) => p.id);
          
          if (matchedProductIds.length > 0) {
            // Solution au problème N+1 : On fait UNE SEULE requête avec .in() au lieu d'une boucle
            const { data: allPrices } = await supabase.from('price_records')
               .select('*')
               .in('product_id', matchedProductIds)
               .order('record_date', { ascending: false });
               
            if (allPrices) {
               matchedProducts.forEach((p: any) => {
                  // On filtre et limite côté serveur Node.js (Eager Loading manuel)
                  const pPrices = allPrices.filter((pr: any) => pr.product_id === p.id).slice(0, 10);
                  pPrices.forEach((pr: any) => {
                     dbPriceContext += `- ${p.name}: ${pr.price} ${pr.currency} / ${p.default_unit} (Lieu: ${pr.location || 'Non précisé'}, Date: ${pr.record_date})\n`;
                  });
               });
            }
          }
        }
      } catch (err) {
         console.error("DB Price fetch error:", err);
      }

      const jsonPriceContext = prixData
        .map((item: any) => `- ${item.produit} : ${item.prix || "Non précisé"} (Vendeur: ${item.vendeur}, Date: ${item.date})`)
        .join("\n");
        
      contextText += `\n\nDONNÉES DE PRIX DU MARCHÉ (BASE DE DONNÉES) :\n${dbPriceContext}\n\nAUTRES PRIX (WHATSAPP) :\n${jsonPriceContext}`;
    }

    let roleContext = "";

    switch (mode) {
      case "cultiplan":
        roleContext = `TU ES DANS L'OUTIL : CULTIPLAN (Salle Business & Gestion).
Ton rôle : Analyste Financier et Secrétaire de Direction d'Exploitation.
- En MODE SIMULATION (Idée -> Projet) : Tu dois évaluer la faisabilité d'un projet, calculer les CAPEX (investissements), OPEX (charges), le ROI et le seuil de rentabilité.
- En MODE GESTION (Business existant) : Tu dois agir comme un "Collecteur & Profiler". Pose des questions pour cartographier l'exploitation (taille, animaux, budget).
- Ton but ultime dans cet outil est de rassembler les données exactes pour que notre "Agent Dashboard" puisse générer l'interface visuelle. Sois mathématique, structuré, et orienté rentabilité.`;
        break;
      case "cultiseil":
        roleContext = `TU ES DANS L'OUTIL : CULTISEIL (Salle Terrain & Technique).
Ton rôle : Tour de Contrôle Agronomique et de Précision.
- Tu as (virtuellement) accès aux Agents Télémétrie (Météo, Sols), Diagnostic Visuel (Maladies) et Modélisation (Rendements).
- Tu dois analyser les paramètres physiques : sol, humidité, climat, santé des plantes/animaux.
- Si le diagnostic est trop complexe ou incertain (<80% de certitude), propose de transférer le dossier à un Expert Humain Cultiso. Ne prends aucun risque avec la récolte de l'utilisateur.`;
        break;
      case "cultishop":
        roleContext = `TU ES DANS L'OUTIL : CULTISHOP (Salle Marché & Logistique).
Ton rôle : Expert en marchés agricoles et négociant.
- Aide l'agriculteur à trouver les meilleurs intrants, analyse les prix du marché en temps réel et gère la commercialisation de ses récoltes.
- Oriente toujours vers la rentabilité et la sécurité des transactions.`;
        break;
      default:
        // Global Cultisia (Interface générale)
        roleContext = `TU ES L'INTERFACE GLOBALE DE CULTISIA.
Ton rôle : Ingénieur Agronome et Chef d'Orchestre de l'écosystème Cultiso.
- Réponds de manière experte aux questions générales en agronomie, agroécologie et agrobusiness africain.
- Si la question relève de la création d'un budget, dis à l'utilisateur qu'il pourra utiliser l'outil CultiPlan. Si c'est pour un conseil technique pointu de terrain, parle de Cultiseil.`;
        break;
    }

    let systemPrompt = `Tu es Cultisia, l'Intelligence Artificielle centrale, le "Cerveau" de l'écosystème Cultiso, spécialisée dans l'agriculture africaine.

${roleContext}

RÈGLES DE COMMUNICATION (STRICTES) :
1. SOIS TRÈS CONCIS : Réponds brièvement. Pas de longs monologues.
2. ÉCOUTE D'ABORD : Prends en compte tout l'historique de la conversation. Si le dernier message est court (ex: "et à Lomé ?"), base-toi sur le contexte des messages précédents.
3. PAS DE WIDGET DE QUESTIONNAIRE : Réponds TOUJOURS directement dans le texte en langage naturel.
4. MONNAIE ET DONNÉES DE PRIX (FCFA / BOLS) :
   - Base-toi EXCLUSIVEMENT sur la section "DONNÉES DE PRIX DU MARCHÉ" (fournie plus bas) si on te demande un prix. N'invente jamais de prix.
   - Si la donnée exacte n'y est pas, dis-le clairement ("Je n'ai pas le prix exact en base de données..."), puis fournis une ESTIMATION, en précisant que c'est une estimation.
   - Toutes les estimations doivent être en Francs CFA (FCFA) et adaptées à la réalité économique du Togo.
   - Fais attention aux unités de mesure locales ! Utilise "le bol" si c'est l'unité pertinente, sinon le kg ou le sac (ex: sac de 100 kg), selon ce qui est affiché dans les données.

CONTEXTE INTERNE:
${contextText}`;

    if (toolContext === "cultima") {
      systemPrompt = `Tu es Cultisia, sous ton rôle de MANAGER AGROBUSINESS (outil Cultima).
Ton objectif est d'aider l'agriculteur à gérer son exploitation au quotidien (finances, production, suivi, calendrier de semis, formulation de provendes).
Réponds toujours en gardant à l'esprit la réalité du terrain et de la gestion agricole (ERP).`;
    } else if (toolContext === "cultiplan") {
      systemPrompt = `Tu es Cultisia, sous ton rôle d'EXPERT AGROBUSINESS (outil CultiPlan).
Ton objectif est de mener un entretien approfondi avec l'utilisateur pour collecter les informations nécessaires à la création de son Business Plan Agricole (au Togo).

RÈGLES DE L'ENTRETIEN :
1. Mène une vraie discussion, comme un consultant.
2. Pose UNE SEULE question à la fois. Adapte tes questions aux réponses de l'utilisateur en utilisant tes connaissances expertes (RAG).
3. Ne demande jamais des prix de marché courants (tu les connais déjà). Demande uniquement ses capacités (terrain disponible, budget propre, ambition, marché visé, processus envisagé).
4. Garde à l'esprit que tu dois récolter les éléments pour 3 ÉTUDES :
   - ÉTUDE DE MARCHÉ (Analyse de l'offre/demande, PESTEL, Porter, FFOM/SWOT, Objectifs SMART, Marketing Mix)
   - ÉTUDE TECHNIQUE (Processus de production, Ressources Humaines, Matérielles, Financières, Chronogramme)
   - ÉTUDE FINANCIÈRE (Besoins en investissement, Fonds de roulement, Sources de financement, Plan de trésorerie)
5. Ne dis JAMAIS que tu vas générer un JSON. Agis toujours comme un humain qui discute.

Une fois que tu as obtenu des réponses claires pour pouvoir rédiger le Business Plan complet (ces 3 études), tu dois générer STRICTEMENT ce bloc JSON final dans ta réponse, et rien d'autre :
\`\`\`json
{
  "action": "complete_simulation",
  "payload": {
    "nom_projet": "Nom déduit du projet",
    "resume": "Résumé exécutif du projet",
    "pestel": "Analyse PESTEL générée",
    "swot": "Analyse FFOM générée"
  }
}
\`\`\`

CONTEXTE INTERNE (RAG / PRIX DU MARCHÉ) :
${contextText}`;
    }

    const openrouter = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Cultiso",
      },
    });

    const stream = await openrouter.chat.completions.create({
      model: model || "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.3,
      stream: true,
      stream_options: { include_usage: true }
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        if (shouldRAG && sources.length > 0) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "sources", sources })}\n\n`));
        }
        try {
          for await (const chunk of stream) {
            // Check for usage in chunk
            if ((chunk as any).usage) {
               const usedTokens = (chunk as any).usage.total_tokens;
               if (usedTokens > 0) {
                  const newBalance = tokensBalance - usedTokens;
                  await supabase.auth.admin.updateUserById(user.id, {
                    app_metadata: { ...user.app_metadata, tokens_balance: newBalance }
                  });
               }
            }
            
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", content: "Erreur de gÃ©nÃ©ration" })}\n\n`));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ reply: "Désolé, le service est temporairement indisponible.", sources: [] }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
