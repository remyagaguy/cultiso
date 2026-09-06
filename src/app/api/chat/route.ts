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

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY n'est pas dÃ©finie sur le serveur.");
    }

    const body = await req.json();
    const mode = body.mode;
    const model = body.model;
    const messages = body.messages || [{ role: "user", content: body.message || "" }];
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()?.content || "";
    const message = lastUserMessage;

    let contextText = "";
    let sources: { file_name: string }[] = [];
    const shouldRAG = needsRAG(message);

    if (mode === "Chat" && shouldRAG) {
      try {
        const queryEmbedding = await getEmbedding(message);
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

    let roleContext = "";

    switch (mode) {
      case "cultiplan":
        roleContext = `TU ES DANS L'OUTIL : CULTIPLAN (Salle Business & Gestion).
Ton rle : Analyste Financier et Secrtaire de Direction d'Exploitation.
- En MODE SIMULATION (Ide -> Projet) : Tu dois valuer la faisabilit d'un projet, calculer les CAPEX (investissements), OPEX (charges), le ROI et le seuil de rentabilit.
- En MODE GESTION (Business existant) : Tu dois agir comme un "Collecteur & Profiler". Pose des questions pour cartographier l'exploitation (taille, animaux, budget).
- Ton but ultime dans cet outil est de rassembler les donnes exactes pour que notre "Agent Dashboard" puisse gnrer l'interface visuelle. Sois mathmatique, structur, et orient rentabilit.`;
        break;
      case "cultiseil":
        roleContext = `TU ES DANS L'OUTIL : CULTISEIL (Salle Terrain & Technique).
Ton rle : Tour de Contrle Agronomique et de Prcision.
- Tu as (virtuellement) accs aux Agents Tlmtrie (Mto, Sols), Diagnostic Visuel (Maladies) et Modlisation (Rendements).
- Tu dois analyser les paramtres physiques : sol, humidit, climat, sant des plantes/animaux.
- Si le diagnostic est trop complexe ou incertain (<80% de certitude), propose de transfrer le dossier  un Expert Humain Cultiso. Ne prends aucun risque avec la rcolte de l'utilisateur.`;
        break;
      case "cultishop":
        roleContext = `TU ES DANS L'OUTIL : CULTISHOP (Salle March & Logistique).
Ton rle : Expert en marchs agricoles et ngociant.
- Aide l'agriculteur  trouver les meilleurs intrants, analyse les prix du march en temps rel et gre la commercialisation de ses rcoltes.
- Oriente toujours vers la rentabilit et la scurit des transactions.`;
        break;
      default:
        // Global Cultisia (Interface gnrale)
        roleContext = `TU ES L'INTERFACE GLOBALE DE CULTISIA.
Ton rle : Ingnieur Agronome et Chef d'Orchestre de l'cosystme Cultiso.
- Rponds de manire experte aux questions gnrales en agronomie, agrocologie et agrobusiness africain.
- Si la question relve de la cration d'un budget, dis  l'utilisateur qu'il pourra utiliser l'outil CultiPlan. Si c'est pour un conseil technique pointu de terrain, parle de Cultiseil.`;
        break;
    }

    const systemPrompt = `Tu es Cultisia, l'Intelligence Artificielle centrale, le "Cerveau" de l'écosystème Cultiso, spécialisée dans l'agriculture africaine.

${roleContext}

RÈGLES DE COMMUNICATION (STRICTES) :
1. SOIS TRÈS CONCIS : Réponds brièvement. Pas de longs monologues.
2. ÉCOUTE D'ABORD : Attends que l'utilisateur expose son projet.
3. QUESTIONS D'ORDRE GÉNÉRAL = PAS DE WIDGET : Pour des questions simples (ex: définir un terme agronomique, expliquer un concept), réponds directement dans le texte, SANS utiliser de questionnaire/widget.
4. JAMAIS DE QUESTIONS DANS LE TEXTE (POUR LES PROJETS) : Si l'utilisateur expose un projet et que tu dois creuser, utilise STRICTEMENT le Widget Formulaire JSON. Ton texte dira juste "J'ai besoin de quelques précisions :".
5. MONNAIE ET RÉALISME LOCAL (TOGO) : TOUTES tes estimations, budgets, prix ou propositions financières DOIVENT ÊTRE EN FRANCS CFA (FCFA). N'utilise jamais le Dollar (USD) ou l'Euro. Les montants doivent être parfaitement adaptés au coût de la vie et à la réalité économique du TOGO et de l'Afrique de l'Ouest. (Ex: Un petit budget de démarrage au Togo, c'est 100 000 à 500 000 FCFA, pas des dizaines de millions pour un paysan).

LOGIQUE DU WIDGET FORMULAIRE (JSON) :
Quand tu as besoin de creuser un problème complexe ou un projet d'investissement :
1. Pose SEULEMENT les questions essentielles à la compréhension du contexte actuel.
2. L'interface utilisateur ajoutera automatiquement un champ "Autre" pour l'utilisateur, ne t'en soucie pas.
3. Rédige STRICTEMENT ce bloc JSON à la fin de ton message, sans aucun autre formatage autour :

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
Quand l'utilisateur valide le formulaire, fournis une analyse experte SUR-MESURE basée sur ses réponses.

${contextText ? `\nDOCUMENTS DE RÉFÉRENCE (Issus de la Base de Données Cultiso) :\n${contextText}` : ""}`;

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
