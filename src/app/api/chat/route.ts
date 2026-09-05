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

/* ─── Intent Detection ─── */
function needsRAG(message: string): boolean {
  const text = message.toLowerCase().trim();
  const agriKeywords = [
    "culture", "cultiver", "plante", "semence", "engrais", "fertilisant",
    "maladie", "parasite", "insecte", "traitement", "pesticide", "fongicide",
    "irrigation", "arrosage", "sol", "compost", "récolte", "rendement",
    "hectare", "parcelle", "champ", "ferme", "exploitation", "agriculture",
    "tomate", "maïs", "manioc", "riz", "soja", "cacao", "café", "igname",
    "poulet", "porc", "boeuf", "poisson", "élevage", "bétail", "volaille",
    "rentabilité", "coût", "bénéfice", "investissement", "production",
    "sécheresse", "npk", "azote", "phosphore", "potassium", "ph",
    "biologique", "organique", "chimique", "conservation", "stockage",
    "pisciculture", "aquaculture", "apiculture", "aviculture", "maraîchage", "agroforesterie",
    "entreprendre", "projet agricole", "conseil agricole"
  ];
  return agriKeywords.some((kw) => text.includes(kw));
}

export async function POST(req: Request) {
  try {
    const { message, mode, model } = await req.json();

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

    const systemPrompt = `Tu es Cultisia, l'agronome virtuel expert de la plateforme Cultiso, spécialisée dans l'agriculture africaine.

RÈGLES DE FORMATAGE :
- Structure tes réponses techniques avec des titres (##), sous-titres (###) et listes à puces (-).
- Aère tes paragraphes. Pas d'astérisques bruts pour les listes.
- Ne mentionne JAMAIS tes sources documentaires dans ta réponse texte.

LOGIQUE DU QUESTIONNAIRE DYNAMIQUE (TRÈS IMPORTANT) :
Si l'utilisateur pose une question vague, un projet vaste ou demande un conseil général (ex: "Je veux entreprendre"), tu dois D'ABORD générer un questionnaire intelligent pour cerner son besoin.
Tu dois obéir à ces règles de logique agronomique stricte :
1. LA PERTINENCE ABSOLUE : Les questions doivent être 100% adaptées au domaine. Ne demande JAMAIS d'accès à l'eau/irrigation pour de l'élevage, ni de race pour de la production végétale.
2. L'ENTONNOIR LOGIQUE : Pose tes questions dans un ordre réfléchi.
   - Étape 1 : La nature exacte (ex: Si on te dit "élevage", demande quel type d'animaux. Si on te dit "agriculture", demande quelle culture).
   - Étape 2 : L'échelle ou le milieu (Surface, capacité, région/climat).
   - Étape 3 : Les ressources (Budget, niveau d'expérience).
   ATTENTION : Ne demande jamais le budget en première question si tu ne sais pas encore ce que l'utilisateur veut faire exactement.
3. NOMBRE DE QUESTIONS VARIABLE : Génère entre 1 et 4 questions maximum. Le nombre doit varier selon les éléments manquants dans la requête de l'utilisateur.

Si le contexte nécessite des précisions, NE POSE PAS tes questions dans le texte libre. Écris juste une phrase d'encouragement très courte, puis génère STRICTEMENT ce bloc JSON à la fin :

\`\`\`json
{
  "type": "questionnaire",
  "questions": [
    {
      "question": "[Ta première question logique (ex: Type d'activité précise)]",
      "options": ["[Option 1]", "[Option 2]", "[Option 3]"]
    },
    {
      "question": "[Ta deuxième question (ex: Échelle/Surface/Capacité)]",
      "options": ["[Option A]", "[Option B]"]
    }
  ]
}
\`\`\`
*(Adapte le nombre d'objets dans le tableau "questions" selon le besoin réel).*

RÉPONSE PERSONNALISÉE :
Quand l'utilisateur te renvoie ses réponses sous forme de liste (ex: "Voici mes précisions..."), fournis-lui un plan d'action technique et financier SUR-MESURE, structuré de façon professionnelle, en tenant compte de CHAQUE réponse qu'il a donnée dans le questionnaire.

${contextText ? `\nDOCUMENTS DE RÉFÉRENCE :\n${contextText}` : ""}`;

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
        { role: "user", content: message },
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
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", content: "Erreur de génération" })}\n\n`));
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
