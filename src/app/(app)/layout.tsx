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
  CloseOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  /* Persist collapsed state */
  useEffect(() => {
    const saved = localStorage.getItem("cultiso_sidebar_collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("cultiso_sidebar_collapsed", String(next));
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

  const sidebarWidth = collapsed ? "w-[72px]" : "w-[260px]";

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F8F9FB] flex">
      {/* ══ MOBILE BACKDROP ══ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══ SIDEBAR ══ */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#052821]",
          "transform transition-all duration-300 ease-in-out",
          // Mobile: always full-width sidebar when open
          sidebarOpen ? "translate-x-0 w-[260px]" : "-translate-x-full w-[260px]",
          // Desktop: static, respect collapsed state
          "lg:translate-x-0 lg:static lg:shrink-0",
          collapsed ? "lg:w-[72px] lg:min-w-[72px]" : "lg:w-[260px] lg:min-w-[260px]",
        ].join(" ")}
      >
        {/* Logo row */}
        <div className="flex h-[72px] items-center justify-between px-4 border-b border-white/10 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5 no-underline overflow-hidden">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/15 shrink-0">
              <img src="/favicon.png" alt="Cultiso" className="w-5 h-5 object-contain" />
            </div>
            {!collapsed && (
              <span className="font-unbounded font-bold text-white text-lg tracking-tight whitespace-nowrap">
                cultiso
              </span>
            )}
          </Link>
          {/* Mobile close */}
          <button
            className="lg:hidden text-white/60 hover:text-white p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <CloseOutlined />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-5">
          <ul className="space-y-1 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const Icon = item.icon;

              const linkContent = (
                <div
                  className={[
                    "flex items-center rounded-lg transition-all duration-150",
                    collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
                    item.disabled
                      ? "text-white/25 cursor-not-allowed"
                      : isActive
                        ? "bg-[#22c55e] text-white shadow-md shadow-[#22c55e]/25"
                        : "text-white/60 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className={collapsed ? "text-lg" : "text-base"} />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                      {item.disabled && (
                        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-white/5 text-white/30 px-1.5 py-0.5 rounded border border-white/10">
                          Bientôt
                        </span>
                      )}
                    </>
                  )}
                </div>
              );

              if (item.disabled) {
                return (
                  <li key={item.name}>
                    {collapsed ? (
                      <Tooltip title={item.name} placement="right">
                        {linkContent}
                      </Tooltip>
                    ) : (
                      linkContent
                    )}
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  {collapsed ? (
                    <Tooltip title={item.name} placement="right">
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className="no-underline block"
                      >
                        {linkContent}
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="no-underline block"
                    >
                      {linkContent}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:block border-t border-white/10 px-2.5 py-3 shrink-0">
          <button
            onClick={toggleCollapsed}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors text-sm"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            {!collapsed && <span className="font-medium">Réduire</span>}
          </button>
        </div>

        {/* Bottom help card (only when expanded) */}
        {!collapsed && (
          <div className="px-3 pb-4 shrink-0 hidden lg:block">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white font-semibold text-xs mb-1 m-0">Besoin d'aide ?</p>
              <p className="text-white/50 text-[11px] mb-3 m-0 leading-relaxed">
                Contactez notre support agronomique.
              </p>
              <button className="w-full py-1.5 bg-white/10 hover:bg-white/15 text-white text-[11px] font-semibold rounded-lg transition-colors border border-white/10">
                Ouvrir un ticket
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ══ MAIN COLUMN ══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-[72px] flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8 shrink-0 z-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative">
          {/* Left */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuOutlined className="text-lg" />
            </button>

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
                <Avatar size={32} className="bg-[#D35400] font-unbounded font-bold text-xs">
                  RA
                </Avatar>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold text-gray-800">Rémy Agaguy</span>
                  <span className="text-[11px] text-gray-400">Admin</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Page content — scrollable area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
