"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  LineChartOutlined,
  RobotOutlined,
  ShopOutlined,
  UserOutlined,
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  MenuOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  PushpinOutlined,
  PushpinFilled,
} from "@ant-design/icons";
import { Dropdown, Avatar, Badge, Tooltip } from "antd";
import { createClient } from "@/lib/supabase/client";

/* ─── Navigation items ─── */
const NAV_ITEMS = [
  { name: "Tableau de bord", href: "/dashboard", icon: AppstoreOutlined },
  { name: "Cultiplan", href: "/cultiplan", icon: LineChartOutlined },
  { name: "Cultima", href: "/cultima", icon: ThunderboltOutlined },
  { name: "Cultisia", href: "/cultisia", icon: RobotOutlined },
  { name: "Cultishop", href: "/cultishop", icon: ShopOutlined, disabled: true },
  { name: "Cultiseil", href: "/cultiseil", icon: UserOutlined, disabled: true },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  /* Persist pinned state & fetch user */
  useEffect(() => {
    const saved = localStorage.getItem("cultiso_sidebar_pinned");
    if (saved === "true") setIsPinned(true);
    
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserProfile(data.user);
      }
    };
    fetchUser();
  }, [supabase]);

  const togglePinned = () => {
    const next = !isPinned;
    setIsPinned(next);
    localStorage.setItem("cultiso_sidebar_pinned", String(next));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const userMenuItems = {
    items: [
      { key: "profile", label: "Mon profil", icon: <UserOutlined /> },
      { key: "settings", label: "Paramètres", icon: <SettingOutlined /> },
      { type: "divider" as const },
      {
        key: "logout",
        label: "Se déconnecter",
        icon: <LogoutOutlined />,
        onClick: handleLogout,
        danger: true,
      },
    ],
  };

  const isExpanded = isPinned || isHovered;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F8F9FB] flex flex-col lg:flex-row">
      {/* ══ MOBILE BOTTOM TAB BAR ══ */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] flex justify-around items-center h-16 z-50 pb-safe">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.disabled ? "#" : item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${item.disabled ? 'opacity-30 cursor-not-allowed' : isActive ? 'text-[#0B5345]' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <div className="p-1 transition-colors">
                <Icon className="text-[22px]" />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-[#0B5345]' : 'text-gray-400'}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* ══ DESKTOP SIDEBAR RAIL ══ */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={[
          "hidden lg:flex inset-y-0 left-0 z-50 flex-col bg-white border-r border-gray-200 absolute h-full",
          "transform transition-all duration-300 ease-in-out",
          isExpanded ? "w-[240px] shadow-[4px_0_24px_rgba(0,0,0,0.02)]" : "w-[72px]"
        ].join(" ")}
      >
        {/* Logo row */}
        <div className="flex h-[72px] items-center justify-center px-4 shrink-0 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-3 no-underline overflow-hidden w-full justify-center">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img src="/favicon.png" alt="Cultiso" className="w-8 h-8 object-contain" />
            </div>
            <div className={`transition-all duration-300 overflow-hidden flex items-center ${isExpanded ? "w-auto opacity-100 ml-1" : "w-0 opacity-0"}`}>
              <span className="font-unbounded font-bold text-[#0B5345] text-xl tracking-tight whitespace-nowrap">
                cultiso
              </span>
            </div>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 custom-scrollbar">
          <ul className="list-none m-0 p-0 space-y-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const Icon = item.icon;

              const linkContent = (
                <div
                  className={[
                    "flex items-center transition-all duration-200 cursor-pointer overflow-hidden group",
                    !isExpanded ? "justify-center h-12 w-12 mx-auto" : "gap-4 px-4 py-3",
                    item.disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : isActive
                        ? "text-[#0B5345]"
                        : "text-gray-400 hover:text-gray-600",
                  ].join(" ")}
                >
                  <Icon className={`text-[24px] shrink-0 transition-transform duration-200 ${!item.disabled && !isActive && 'group-hover:scale-110'}`} />
                  <div className={`transition-all duration-300 flex items-center shrink-0 overflow-hidden ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                    <span className="text-[15px] font-medium whitespace-nowrap">{item.name}</span>
                    {item.disabled && (
                      <span className="ml-3 text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-md">
                        Bientôt
                      </span>
                    )}
                  </div>
                </div>
              );

              if (item.disabled) {
                return (
                  <li key={item.name} className="block">
                    {!isExpanded ? (
                      <Tooltip title={item.name} placement="right" color="#0B5345">
                        {linkContent}
                      </Tooltip>
                    ) : (
                      linkContent
                    )}
                  </li>
                );
              }

              return (
                <li key={item.name} className="block">
                  {!isExpanded ? (
                    <Tooltip title={item.name} placement="right" color="#0B5345">
                      <Link href={item.href} className="no-underline block">
                        {linkContent}
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link href={item.href} className="no-underline block">
                      {linkContent}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pin toggle (desktop only) */}
        <div className={`hidden lg:flex border-t border-gray-100 px-3 py-4 shrink-0 justify-center transition-all duration-300 bg-gray-50/50`}>
          <button
            onClick={togglePinned}
            className={`flex items-center justify-center gap-3 h-10 rounded-xl text-gray-400 hover:text-[#0B5345] hover:bg-gray-100 transition-all text-sm border border-transparent ${isExpanded ? "w-full px-3" : "w-10"}`}
            title={isPinned ? "Détacher" : "Épingler le menu"}
          >
            {isPinned ? <PushpinFilled className="text-xl" /> : <PushpinOutlined className="text-xl" />}
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap font-medium ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
              {isPinned ? "Détacher" : "Épingler"}
            </span>
          </button>
        </div>
      </aside>

      {/* ══ MAIN COLUMN ══ */}
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300 ease-in-out ${isPinned ? 'lg:ml-[240px]' : 'lg:ml-[72px]'} pb-16 lg:pb-0`}>
        {/* Topbar */}
        {!pathname?.startsWith("/cultiplan") && (
          <header className="h-[72px] flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8 shrink-0 z-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative">
            {/* Left */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Mobile logo when no sidebar */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0B5345] rounded-lg flex items-center justify-center shrink-0">
                  <img src="/favicon.png" alt="Cultiso" className="w-4 h-4 object-contain brightness-0 invert" />
                </div>
                <span className="font-unbounded font-bold text-[#0B5345] text-lg">cultiso</span>
              </div>
            
              <div className="relative hidden sm:block w-full max-w-sm">
                <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/40 focus:border-[#22c55e] transition-all"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 shrink-0">
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <Badge dot color="#EF4444" offset={[-2, 4]}>
                  <BellOutlined className="text-lg" />
                </Badge>
              </button>

              <div className="hidden lg:block h-5 w-px bg-gray-200" aria-hidden="true" />

              <Dropdown menu={userMenuItems} placement="bottomRight" trigger={["click"]}>
                <div className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 rounded-full py-1 px-1.5 transition-colors">
                  
                  {/* Balance Affichage */}
                  <div className="hidden sm:flex items-center gap-1.5 bg-[#f3fbe9] text-[#0B5345] px-2.5 py-1 rounded-md border border-[#22c55e]/30 mr-2">
                    <span className="text-[13px]">⚡</span>
                    <span className="text-xs font-bold font-mono-numbers">
                      {userProfile?.app_metadata?.tokens_balance != null 
                        ? new Intl.NumberFormat('fr-FR').format(userProfile.app_metadata.tokens_balance) 
                        : "20 000"}
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
              </Dropdown>
            </div>
          </header>
        )}

        {/* Page content — scrollable area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
