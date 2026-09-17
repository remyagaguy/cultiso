import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { getRagContext } from "@/lib/rag";
import { getPriceContext } from "@/lib/prices";
import { getSystemPrompt } from "@/lib/personas";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY n'est pas définie sur le serveur.");
    }
    
    // Auth Check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Token invalide" }), { status: 401 });
    }
    const user = userData.user;
    let tokensBalance = user.app_metadata?.tokens_balance ?? 20000;
    
    // Auto-recharge pour le développement
    if (tokensBalance <= 0) {
      tokensBalance = 20000;
      await supabase.auth.admin.updateUserById(user.id, {
        app_metadata: { ...user.app_metadata, tokens_balance: 20000 }
      });
    }

    // Body parsing
    const body = await req.json();
    const mode = body.mode;
    const toolContext = body.toolContext || "cultisia";
    const model = body.model;
    const messages = body.messages || [{ role: "user", content: body.message || "" }];
    
    // Extract query for RAG and Pricing
    const userMessages = messages.filter((m: any) => m.role === "user");
    const lastUserMessage = userMessages.pop()?.content || "";
    const previousUserMessage = userMessages.pop()?.content || "";
    const message = lastUserMessage;
    const combinedQuery = `${previousUserMessage} ${lastUserMessage}`.trim();

    // 1. Fetch RAG Context
    let contextText = "";
    let sources: { file_name: string }[] = [];
    if (mode === "Chat") {
      const ragResult = await getRagContext(supabase, combinedQuery);
      contextText = ragResult.contextText;
      sources = ragResult.sources;
    }

    // 2. Fetch Price Context
    const priceContext = await getPriceContext(supabase, message, combinedQuery);

    // 3. Get System Prompt
    const systemPrompt = getSystemPrompt(mode, toolContext, contextText, priceContext);

    // 4. Setup OpenRouter
    const openrouter = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Cultiso",
      },
    });

    const tools = toolContext === "cultisia" ? [
      {
        type: "function" as const,
        function: {
          name: "route_to_tool",
          description: "Redirige l'utilisateur vers un outil spécifique de l'écosystème Cultiso lorsqu'il le demande ou que son besoin correspond à un outil.",
          parameters: {
            type: "object",
            properties: {
              target_tool: {
                type: "string",
                enum: ["cultiplan", "cultima", "cultiseil"],
                description: "cultiplan: pour simuler un projet, créer un business plan. cultima: pour gérer une ferme existante au quotidien (trésorerie). cultiseil: pour diagnostiquer une maladie ou le sol."
              },
              reason: {
                type: "string",
                description: "Message très court adressé à l'utilisateur pour expliquer qu'on va le rediriger vers le bon outil."
              }
            },
            required: ["target_tool", "reason"]
          }
        }
      }
    ] : undefined;

    const stream = await openrouter.chat.completions.create({
      model: model || "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.3,
      stream: true,
      stream_options: { include_usage: true },
      tools: tools
    });

    // 5. Stream processing
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        if (sources.length > 0) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "sources", sources })}\n\n`));
        }
        try {
          for await (const chunk of stream) {
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

            const tool_calls = chunk.choices?.[0]?.delta?.tool_calls;
            if (tool_calls && tool_calls.length > 0) {
              const tc = tool_calls[0];
              if (tc.function?.name) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_call_start", name: tc.function.name, arguments: tc.function.arguments || "" })}\n\n`));
              } else if (tc.function?.arguments) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_call_delta", arguments: tc.function.arguments })}\n\n`));
              }
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
