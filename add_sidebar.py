import os

file_path = 'src/components/cultisia/SharedChat.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Session type and state
if 'interface ChatSession {' not in content:
    content = content.replace(
        'interface QuestionnaireData {',
        'interface ChatSession { id: string; title: string; updated_at: string; }\n\ninterface QuestionnaireData {'
    )

if 'const [sessions, setSessions] = useState<ChatSession[]>(' not in content:
    content = content.replace(
        'const [sessionId, setSessionId] = useState<string | null>(null);',
        'const [sessionId, setSessionId] = useState<string | null>(null);\n  const [sessions, setSessions] = useState<ChatSession[]>([]);'
    )

# 2. Fetch all sessions
fetch_logic = """
      let { data: allSessions } = await supabase
        .from("chat_sessions")
        .select("id, title, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
        
      if (allSessions) setSessions(allSessions);
"""
if 'allSessions' not in content:
    content = content.replace(
        'let currentSessionId = null;',
        fetch_logic + '\n      let currentSessionId = null;'
    )

# 3. Render sessions in sidebar
old_sidebar_content = '<div className="flex-1 overflow-y-auto px-3 mt-1 custom-scrollbar">\n              \n            </div>'
new_sidebar_content = """
<div className="flex-1 overflow-y-auto px-3 mt-2 space-y-1 custom-scrollbar">
              {sessions.map(s => (
                <button
                  key={s.id}
                  onClick={async () => {
                    setSessionId(s.id);
                    setIsLoading(true);
                    const { data: history } = await supabase
                      .from("chat_messages")
                      .select("id, role, content")
                      .eq("session_id", s.id)
                      .order("created_at", { ascending: true });
                    if (history) setMessages(history as ChatMessage[]);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                    setIsLoading(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors truncate ${s.id === sessionId ? "bg-[#0B5345]/10 text-[#0B5345] font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {s.title}
                </button>
              ))}
            </div>
"""
if old_sidebar_content in content:
    content = content.replace(old_sidebar_content, new_sidebar_content)

# 4. On new discussion, update sessions list
start_new_update = """if (newSession) {
        setSessionId(newSession.id);
        setSessions(prev => [{id: newSession.id, title: newSession.title, updated_at: new Date().toISOString()}, ...prev]);
      }"""
if 'if (newSession) setSessionId(newSession.id);' in content:
    content = content.replace('if (newSession) setSessionId(newSession.id);', start_new_update)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Sidebar History Implemented')
