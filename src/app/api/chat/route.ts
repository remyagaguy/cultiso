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

    const body = await req.json();
    const mode = body.mode;
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
      const priceContext = prixData
        .map((item: any) => `- ${item.produit} : ${item.prix || "Non précisé"} (Vendeur: ${item.vendeur}, Date: ${item.date})`)
        .join("\n");
      contextText += `\n\nDONNÉES DE PRIX DU MARCHÉ (BASE DE DONNÉES) :\n${priceContext}`;
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

    const systemPrompt = `Tu es Cultisia, l'Intelligence Artificielle centrale, le "Cerveau" de l'écosystème Cultiso, spécialisée dans l'agriculture africaine.

${roleContext}

RÈGLES DE COMMUNICATION (STRICTES) :
1. SOIS TRÈS CONCIS : Réponds brièvement. Pas de longs monologues.
2. ÉCOUTE D'ABORD : Prends en compte tout l'historique de la conversation. Si le dernier message est court (ex: "et à Lomé ?"), base-toi sur le contexte des messages précédents.
3. QUESTIONS SIMPLES = PAS DE WIDGET : Pour des questions comme des demandes de prix, des définitions, ou de simples suivis de conversation, réponds DIRECTEMENT dans le texte. NE CRÉE JAMAIS DE WIDGET DE QUESTIONNAIRE pour ces interactions.
4. UTILISATION DU WIDGET LIMITÉE : N'utilise le bloc JSON de questionnaire QUE si l'utilisateur indique clairement qu'il veut DÉMARRER UN PROJET (ex: "Je veux lancer une ferme", "Faisons une simulation", "Aide-moi à structurer mon idée").
5. MONNAIE ET DONNÉES DE PRIX (FCFA / BOLS) :
   - Base-toi EXCLUSIVEMENT sur la section "DONNÉES DE PRIX DU MARCHÉ" (fournie plus bas) si on te demande un prix. N'invente jamais de prix.
   - Si la donnée exacte n'y est pas, dis-le clairement ("Je n'ai pas le prix exact en base de données..."), puis fournis une ESTIMATION, en précisant que c'est une estimation.
   - Toutes les estimations doivent être en Francs CFA (FCFA) et adaptées à la réalité économique du Togo.
   - Fais attention aux unités de mesure locales ! Utilise "le bol" si c'est l'unité pertinente, sinon le kg ou le sac (ex: sac de 100 kg), selon ce qui est affiché dans les données.

LOGIQUE DU WIDGET FORMULAIRE (JSON) :
Quand (ET SEULEMENT QUAND) tu dois diagnostiquer un projet complexe (création de ferme, business plan) :
1. Pose SEULEMENT les questions essentielles.
2. Rédige STRICTEMENT ce bloc JSON à la fin de ton message :

\`\`\`json
{
  "type": "questionnaire",
  "questions": [
    {
      "question": "[Question 1 (ex: Quel est votre type de sol ?)]",
      "options": ["[Choix 1]", "[Choix 2]", "[Choix 3]"]
    }
  ]
}
\`\`\`

RÉPONSE PERSONNALISÉE :
Quand l'utilisateur valide le formulaire, fournis une analyse experte SUR-MESURE.

${contextText ? `\nDOCUMENTS ET DONNÉES DE RÉFÉRENCE :\n${contextText}` : ""}`;

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
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        if (shouldRAG && sources.length > 0) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "sources", sources })}\n\n`));
        }
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
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
