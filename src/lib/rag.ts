export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfKey) {
      console.warn("Missing HUGGINGFACE_API_KEY in environment variables.");
      return [];
    }

    const response = await fetch("https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2", {
      headers: { 
        "Authorization": `Bearer ${hfKey}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    });

    if (!response.ok) {
      console.warn(`HuggingFace API error: ${response.status}`);
      return [];
    }

    const result = await response.json();
    
    if (Array.isArray(result)) {
      if (Array.isArray(result[0])) {
        return result[0] as number[];
      }
      return result as number[];
    }
    
    return [];
  } catch (err) {
    console.warn("Embedding API failed:", err);
    return [];
  }
}

export async function getRagContext(supabase: any, combinedQuery: string) {
  let contextText = "";
  let sources: { file_name: string }[] = [];

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

  return { contextText, sources };
}
