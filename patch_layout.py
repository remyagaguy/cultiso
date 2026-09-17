import re

with open("src/app/(app)/layout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add states for user data
state_original = """  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);"""

state_modified = """  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);"""

content = content.replace(state_original, state_modified)

# Add useEffect to fetch user
effect_original = """  /* Persist collapsed state */
  useEffect(() => {
    const saved = localStorage.getItem("cultiso_sidebar_collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);"""

effect_modified = """  /* Persist collapsed state & fetch user */
  useEffect(() => {
    const saved = localStorage.getItem("cultiso_sidebar_collapsed");
    if (saved === "true") setCollapsed(true);
    
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserProfile(data.user);
      }
    };
    fetchUser();
  }, [supabase]);"""

content = content.replace(effect_original, effect_modified)

# Update UI to use the fetched user Profile
ui_original = """            <Dropdown menu={userMenuItems} placement="bottomRight" trigger={["click"]}>
              <div className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 rounded-full py-1 px-1.5 transition-colors">
                <Avatar size={32} className="bg-[#D35400] font-unbounded font-bold text-xs">
                  RA
                </Avatar>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold text-gray-800">RǸmy Agaguy</span>
                  <span className="text-[11px] text-gray-400">Admin</span>
                </div>
              </div>
            </Dropdown>"""

ui_modified = """            <Dropdown menu={userMenuItems} placement="bottomRight" trigger={["click"]}>
              <div className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 rounded-full py-1 px-1.5 transition-colors">
                
                {/* Balance Affichage */}
                <div className="hidden sm:flex items-center gap-1.5 bg-[#f3fbe9] text-[#0B5345] px-2.5 py-1 rounded-md border border-[#22c55e]/30 mr-2">
                  <span className="text-[13px]">⚡</span>
                  <span className="text-xs font-bold font-mono-numbers">
                    {userProfile?.app_metadata?.tokens_balance != null 
                      ? new Intl.NumberFormat('fr-FR').format(userProfile.app_metadata.tokens_balance) 
                      : "100 000"}
                  </span>
                </div>

                <Avatar size={32} className="bg-[#D35400] font-unbounded font-bold text-xs">
                  {userProfile?.user_metadata?.full_name?.substring(0, 2)?.toUpperCase() || "CU"}
                </Avatar>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold text-gray-800">
                    {userProfile?.user_metadata?.full_name || "Utilisateur"}
                  </span>
                  <span className="text-[11px] text-gray-400 capitalize">
                    {userProfile?.user_metadata?.role?.replace('_', ' ') || "Testeur"}
                  </span>
                </div>
              </div>
            </Dropdown>"""

# Replace all occurrences (watch out for encoding issues, python reads utf-8 so RǸmy might be different)
# We will use regex
content = re.sub(r'<Dropdown menu=\{userMenuItems\}.*?</Dropdown>', ui_modified, content, flags=re.DOTALL)

with open("src/app/(app)/layout.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched layout.tsx")
