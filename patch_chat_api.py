import re

with open("src/app/api/chat/route.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Add authentication extraction
auth_snippet = """
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
"""

# Replace "const body = await req.json();" with auth check + body parse
content = content.replace(
    "const body = await req.json();",
    auth_snippet + "\n    const body = await req.json();"
)

# Add stream_options to openrouter call
content = content.replace(
    "stream: true,\n    });",
    "stream: true,\n      stream_options: { include_usage: true }\n    });"
)

# Modify the loop to intercept usage
loop_original = """        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content })}\\n\\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\\n\\n`));"""

loop_modified = """        try {
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
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content })}\\n\\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\\n\\n`));"""

content = content.replace(loop_original, loop_modified)

with open("src/app/api/chat/route.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched route.ts")
