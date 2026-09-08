import os

file_path = 'src/components/cultisia/SharedChat.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_parsing = """                  let simulationData: any = null;
                  if (msg.role === "assistant") {
                    const jsonMatch = displayContent.match(/```json\\s+([\\s\\S]*?)\\s+```/);
                    if (jsonMatch) {
                      try {
                        const parsed = JSON.parse(jsonMatch[1]);
                        if (parsed.type === "questionnaire" && parsed.questions) {
                          questionnaireData = parsed;
                          displayContent = displayContent.replace(jsonMatch[0], "").trim();
                        } else if (parsed.action === "complete_simulation" || parsed.payload) {
                          simulationData = parsed;
                          displayContent = displayContent.replace(jsonMatch[0], "").trim();
                        }
                      } catch (e) {
                        // ignore JSON parse errors
                      }
                    } else if (msg.isStreaming) {
                      displayContent = displayContent.replace(/```json\\s+[^`]*$/, "").trim();
                    }
                  }"""

new_parsing = """                  let simulationData: any = null;
                  if (msg.role === "assistant") {
                    // Try to match fenced JSON first, then fallback to raw JSON block containing action complete_simulation
                    let jsonString = null;
                    let matchToRemove = null;
                    
                    const fencedMatch = displayContent.match(/```json\\s+([\\s\\S]*?)\\s+```/);
                    if (fencedMatch) {
                      jsonString = fencedMatch[1];
                      matchToRemove = fencedMatch[0];
                    } else {
                      const rawMatch = displayContent.match(/\\{\\s*"action"\\s*:\\s*"complete_simulation"[\\s\\S]*\\}/);
                      if (rawMatch) {
                        jsonString = rawMatch[0];
                        matchToRemove = rawMatch[0];
                      }
                    }

                    if (jsonString) {
                      try {
                        const parsed = JSON.parse(jsonString);
                        if (parsed.type === "questionnaire" && parsed.questions) {
                          questionnaireData = parsed;
                          displayContent = displayContent.replace(matchToRemove as string, "").trim();
                        } else if (parsed.action === "complete_simulation" || parsed.payload) {
                          simulationData = parsed;
                          displayContent = displayContent.replace(matchToRemove as string, "").trim();
                        }
                      } catch (e) {
                        // ignore JSON parse errors
                      }
                    } else if (msg.isStreaming) {
                      displayContent = displayContent.replace(/```json\\s+[^`]*$/, "").replace(/\\{\\s*"action"\\s*:\\s*"complete_simulation"[\\s\\S]*$/, "").trim();
                    }
                  }"""

if old_parsing in content:
    content = content.replace(old_parsing, new_parsing)
else:
    print("Could not find old parsing logic.")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Robust JSON matcher implemented')
