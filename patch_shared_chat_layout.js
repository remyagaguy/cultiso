const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'components', 'cultisia', 'SharedChat.tsx');
let content = fs.readFileSync(tsPath, 'utf8');

// Ensure Drawer is imported
if (!content.includes('Drawer')) {
  content = content.replace(/import \{ Dropdown, message as antMessage \} from "antd";/, 'import { Dropdown, message as antMessage, Drawer } from "antd";');
}

// 1. Remove the old mobile menu button logic at the top of <main>
content = content.replace(/\{\/\* Mobile menu toggle[\s\S]*?<\/button>\s*\}/, '');

// 2. Replace the aside with a Drawer
const asideRegex = /\{\/\* ═══ SIDEBAR ═══ \*\/\}\s*\{!hideSidebar && \([\s\S]*?<\/aside>\s*\}/;

const drawerContent = `
      {!hideSidebar && (
        <Drawer
          title={<span className="font-unbounded font-bold text-[#0B5345]">Historique</span>}
          placement="left"
          closable={true}
          onClose={() => setSidebarOpen(false)}
          open={sidebarOpen}
          width={320}
          bodyStyle={{ padding: '0', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f8f6' }}
          headerStyle={{ backgroundColor: '#f9f8f6', borderBottom: '1px solid #f0f0f0' }}
        >
          <div className="px-4 py-4">
            <button onClick={startNewDiscussion} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 transition-all shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D35400]"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nouvelle discussion
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">Sessions récentes</h3>
            {sessions.map(s => (
              <div key={s.id} className={\`group flex items-center justify-between w-full px-3 py-3 rounded-xl text-[14px] font-medium transition-colors cursor-pointer \${s.id === sessionId ? "bg-[#0B5345] text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"}\`}>
                <button
                  onClick={async () => {
                    setSessionId(s.id);
                    setIsLoading(true);
                    const { data: history } = await supabase
                      .from("chat_messages")
                      .select("id, role, content")
                      .eq("session_id", s.id)
                      .order("created_at", { ascending: true });
                    if (history) {
                      setMessages(history as ChatMessage[]);
                      extractSimulationData(history);
                    }
                    if (window.innerWidth < 768) setSidebarOpen(false);
                    setIsLoading(false);
                  }}
                  className="flex-1 text-left truncate focus:outline-none"
                >
                  {s.title}
                </button>
                <Dropdown
                  menu={{
                    items: [
                      { key: "rename", label: "Renommer", icon: <span className="mr-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></span>, onClick: () => {
                        const newTitle = prompt("Nouveau nom de la discussion :", s.title);
                        if (newTitle && newTitle.trim()) {
                          supabase.from("chat_sessions").update({ title: newTitle }).eq("id", s.id).then(() => {
                            setSessions(prev => prev.map(session => session.id === s.id ? { ...session, title: newTitle } : session));
                          });
                        }
                      } },
                      { key: "delete", label: "Supprimer", danger: true, icon: <span className="mr-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></span>, onClick: (e) => handleDeleteSession(s.id, e.domEvent) }
                    ]
                  }}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <button className={\`opacity-0 group-hover:opacity-100 p-1 rounded transition-all focus:outline-none focus:opacity-100 \${s.id === sessionId ? 'text-white/80 hover:bg-white/20' : 'text-gray-400 hover:bg-black/5'}\`} onClick={e => e.stopPropagation()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>
                </Dropdown>
              </div>
            ))}
          </div>
        </Drawer>
      )}
`;

content = content.replace(asideRegex, drawerContent);

// 3. Inject the new Header in main chat area
const mainStartRegex = /<main className="flex-1 flex flex-col h-full min-w-0 bg-gradient-to-b from-\[#f3fbe9\]\/60 via-white to-white overflow-hidden relative">/;
const newHeader = `
        {!hideSidebar && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3fbe9] flex items-center justify-center border border-[#22c55e]/30 shadow-sm text-[#0B5345]">
                {icon}
              </div>
              <div>
                <h1 className="font-bold text-[#0B5345] text-[16px] font-unbounded leading-tight">{title}</h1>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide">{subtitle || "Assistant IA"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className="hidden sm:inline text-[13px] font-semibold">Historique</span>
              </button>
            </div>
          </div>
        )}
`;

content = content.replace(mainStartRegex, `<main className="flex-1 flex flex-col h-full min-w-0 bg-gradient-to-b from-[#f3fbe9]/60 via-white to-white overflow-hidden relative">\n${newHeader}`);

// Make sure sidebar is false by default since it's a drawer now
content = content.replace('const [sidebarOpen, setSidebarOpen] = useState(true);', 'const [sidebarOpen, setSidebarOpen] = useState(false);');

fs.writeFileSync(tsPath, content);
console.log('Patched SharedChat.tsx layout to Drawer successfully');
