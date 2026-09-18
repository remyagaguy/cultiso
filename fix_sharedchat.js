const fs = require('fs');

let code = fs.readFileSync('src/components/cultisia/SharedChat.tsx', 'utf8');

const regex = /\{\!hideSidebar && \(\r?\n\s*<aside[\s\S]*?<\/aside>\r?\n\s*\)\}/g;
if (!regex.test(code)) {
    console.log('REGEX DID NOT MATCH');
} else {
    code = code.replace(regex, `{!hideSidebar && (
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
      )}`);
    console.log('REPLACED ASIDE WITH DRAWER');
}

fs.writeFileSync('src/components/cultisia/SharedChat.tsx', code);
