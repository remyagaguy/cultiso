"use client";

import React, { useState } from "react";
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
} from "@ant-design/icons";
import { Dropdown, Avatar, Badge } from "antd";
import { createClient } from "@/lib/supabase/client";

/* ─── Navigation items ─── */
const NAV_ITEMS = [
  { name: "Tableau de bord", href: "/dashboard", icon: AppstoreOutlined },
  { name: "Cultiplan", href: "/cultiplan", icon: LineChartOutlined },
  { name: "Cultima", href: "/cultima", icon: ThunderboltOutlined },
  { name: "Cultisia", href: "/cultisia", icon: RobotOutlined },
  {
    name: "Cultishop",
    href: "/cultishop",
    icon: ShopOutlined,
    disabled: true,
  },
  {
    name: "Cultiseil",
    href: "/cultiseil",
    icon: UserOutlined,
    disabled: true,
  },
];

/* ─── Sidebar width constant (keep in sync) ─── */
const SIDEBAR_W = "w-[260px] min-w-[260px] max-w-[260px]";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

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

  return (
    <div className="h-screen overflow-hidden bg-[#F8F9FB] flex">
      {/* ════════════════════════════════════════════════════
          MOBILE BACKDROP
         ════════════════════════════════════════════════════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ════════════════════════════════════════════════════
          SIDEBAR — fixed on mobile, static on lg+
         ════════════════════════════════════════════════════ */}
      <aside
        className={[
          // Base
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#052821]",
          // Fixed width — never shrink, never grow
          SIDEBAR_W,
          // Transform for mobile slide-in
          "transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          // On lg+: always visible, static in flow
          "lg:translate-x-0 lg:static",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 no-underline"
          >
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/15">
              <img
                src="/favicon.png"
                alt="Cultiso"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="font-unbounded font-bold text-white text-lg tracking-tight">
              cultiso
            </span>
          </Link>
          <button
            className="lg:hidden text-white/60 hover:text-white p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <CloseOutlined />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <ul className="space-y-1 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const Icon = item.icon;

              if (item.disabled) {
                return (
                  <li key={item.name}>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-white/30 rounded-lg cursor-not-allowed text-sm">
                      <Icon />
                      <span>{item.name}</span>
                      <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-white/5 text-white/30 px-1.5 py-0.5 rounded border border-white/10">
                        Bientôt
                      </span>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={[
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-all duration-150",
                      isActive
                        ? "bg-[#22c55e] text-white shadow-md shadow-[#22c55e]/25"
                        : "text-white/60 hover:bg-white/8 hover:text-white",
                    ].join(" ")}
                  >
                    <Icon />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom card */}
        <div className="px-3 pb-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white font-semibold text-xs mb-1">
              Besoin d'aide ?
            </p>
            <p className="text-white/50 text-[11px] mb-3 leading-relaxed">
              Contactez notre support agronomique.
            </p>
            <button className="w-full py-1.5 bg-white/10 hover:bg-white/15 text-white text-[11px] font-semibold rounded-lg transition-colors border border-white/10">
              Ouvrir un ticket
            </button>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════
          MAIN COLUMN
         ════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 shrink-0">
          {/* Left: hamburger + search */}
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

          {/* Right: notifications + profile */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Badge dot color="#EF4444" offset={[-2, 4]}>
                <BellOutlined className="text-lg" />
              </Badge>
            </button>

            <div
              className="hidden lg:block h-5 w-px bg-gray-200"
              aria-hidden="true"
            />

            <Dropdown
              menu={userMenuItems}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 rounded-full py-1 px-1.5 transition-colors">
                <Avatar
                  size={32}
                  className="bg-[#D35400] font-unbounded font-bold text-xs"
                >
                  RA
                </Avatar>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold text-gray-800">
                    Rémy Agaguy
                  </span>
                  <span className="text-[11px] text-gray-400">Admin</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
