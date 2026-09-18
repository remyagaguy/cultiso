const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'components', 'cultisia', 'SharedChat.tsx');
let content = fs.readFileSync(tsPath, 'utf8');

// 1. Update SharedChatProps
content = content.replace(
  'onTransactionDraft?: (data: any) => void;\n}',
  'onTransactionDraft?: (data: any) => void;\n  onNewDiscussion?: () => void;\n}'
);

content = content.replace(
  'onTransactionDraft\n}: SharedChatProps) {',
  'onTransactionDraft,\n  onNewDiscussion\n}: SharedChatProps) {'
);

// 2. Call onNewDiscussion when creating a new session
const startNewDiscussionFunc = `const startNewDiscussion = async () => {
    setSessionId(null);
    setMessages(activeMode === "cultima" 
      ? [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)" }] 
      : [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
    if (onNewDiscussion) onNewDiscussion();
    if (window.innerWidth < 768) setSidebarOpen(false);
  };`;
  
// I'll replace the existing startNewDiscussion with the new one.
content = content.replace(
  /const startNewDiscussion = async \(\) => \{[\s\S]*?(?=const handleDeleteSession)/,
  startNewDiscussionFunc + '\n\n  '
);

// 3. When loading history, check for simulation complete block and call onSimulationComplete if found
const extractSimulationLogic = `
const extractSimulationData = (msgs) => {
  if (!onSimulationComplete) return;
  
  // Find the last assistant message
  const lastAssistantMsg = [...msgs].reverse().find(m => m.role === "assistant");
  if (!lastAssistantMsg) {
    onSimulationComplete(null);
    return;
  }
  
  const content = lastAssistantMsg.content;
  let jsonString = null;
  const fencedMatch = content.match(/\`\`\`json\\s+([\\s\\S]*?)\\s+\`\`\`/);
  if (fencedMatch) {
    jsonString = fencedMatch[1];
  } else {
    const rawMatch = content.match(/\\{\\s*"action"\\s*:\\s*"complete_simulation"[\\s\\S]*\\}/);
    if (rawMatch) {
      jsonString = rawMatch[0];
    }
  }
  
  if (jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.action === "complete_simulation") {
        onSimulationComplete(parsed);
        return;
      }
    } catch(e) {}
  }
  onSimulationComplete(null);
};
`;

// Inject extractSimulationLogic somewhere near the top of the component
content = content.replace(
  'const [activeMode, setActiveMode] = useState<"cultisia" | "cultiplan" | "cultiseil" | "cultima">(toolContext);',
  'const [activeMode, setActiveMode] = useState<"cultisia" | "cultiplan" | "cultiseil" | "cultima">(toolContext);\n  ' + extractSimulationLogic
);

// Modify the history loading in the two places:
// Place 1: useEffect loadSession
content = content.replace(
  'setMessages(history as ChatMessage[]);\n                  }',
  'setMessages(history as ChatMessage[]);\n                  }\n                  extractSimulationData(history);'
);
content = content.replace(
  '...history as ChatMessage[]\n            ]);\n          }',
  '...history as ChatMessage[]\n            ]);\n            extractSimulationData(history);\n          }'
);

// Place 2: onClick for a session in the sidebar
content = content.replace(
  'if (history) setMessages(history as ChatMessage[]);\n                      if (window.innerWidth < 768) setSidebarOpen(false);\n                      setIsLoading(false);',
  'if (history) {\n                        setMessages(history as ChatMessage[]);\n                        extractSimulationData(history);\n                      }\n                      if (window.innerWidth < 768) setSidebarOpen(false);\n                      setIsLoading(false);'
);

// 4. Remove all emojis from SharedChat.tsx
content = content.replace(/👋/g, '');
content = content.replace(/✏️/g, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>');
content = content.replace(/🗑️/g, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>');
content = content.replace(/➡️/g, '->');
content = content.replace(/✅/g, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>');

fs.writeFileSync(tsPath, content);
console.log('Patched SharedChat.tsx successfully');
