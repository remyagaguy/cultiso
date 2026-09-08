import os

file_path = 'src/components/cultisia/SharedChat.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix initial state definition
old_state = '''const [messages, setMessages] = useState<ChatMessage[]>(
    activeMode === "cultiplan" 
      ? [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }] 
      : []
  );'''

new_state = '''const [messages, setMessages] = useState<ChatMessage[]>(
    activeMode === "cultiplan" 
      ? [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }] 
      : activeMode === "cultima"
      ? [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)" }]
      : []
  );'''

content = content.replace(old_state, new_state)

# Fix useEffect
old_effect = '''if (activeMode === "cultiplan") {
        setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
      } else {
        setMessages([]);
      }'''

new_effect = '''if (activeMode === "cultiplan") {
        setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
      } else if (activeMode === "cultima") {
        setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)" }]);
      } else {
        setMessages([]);
      }'''

content = content.replace(old_effect, new_effect)

# Fix clearHistory and startNewDiscussion
old_clear = '''if (activeMode === "cultiplan") {
      setMessages([{ role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
    } else {
      setMessages([]);
    }'''

new_clear = '''if (activeMode === "cultiplan") {
      setMessages([{ role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
    } else if (activeMode === "cultima") {
      setMessages([{ role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ?" }]);
    } else {
      setMessages([]);
    }'''

content = content.replace(old_clear, new_clear)

# Add onConfigComplete prop to SharedChatProps
if 'onConfigComplete?: (data: any) => void;' not in content:
    content = content.replace(
        'onSimulationComplete?: (data: any) => void;',
        'onSimulationComplete?: (data: any) => void;\n  onConfigComplete?: (data: any) => void;'
    )

# When Cultisia replies with a Cultima config, it could be a JSON block with type="cultima_config"
# We can intercept that and call onConfigComplete
intercept_old = '''} else if (data.type === "done") {'''
intercept_new = '''} else if (data.type === "cultima_config" && onConfigComplete) {
              onConfigComplete(data.config);
            } else if (data.type === "done") {'''
if 'cultima_config' not in content:
    content = content.replace(intercept_old, intercept_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
