"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ThunderboltOutlined
} from '@ant-design/icons';
import { Dropdown, Avatar, Badge } from 'antd';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: AppstoreOutlined },
  { name: 'Cultiplan', href: '/cultiplan', icon: LineChartOutlined },
  { name: 'Cultima', href: '/cultima', icon: ThunderboltOutlined },
  { name: 'Cultisia', href: '/cultisia', icon: RobotOutlined },
  { name: 'Cultishop', href: '/cultishop', icon: ShopOutlined, disabled: true },
  { name: 'Cultiseil', href: '/cultiseil', icon: UserOutlined, disabled: true },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const userMenu = {
    items: [
      { key: 'profile', label: 'Mon profil', icon: <UserOutlined /> },
      { key: 'settings', label: 'Paramètres', icon: <SettingOutlined /> },
      { type: 'divider' as const },
      { key: 'logout', label: 'Se déconnecter', icon: <LogoutOutlined />, onClick: handleLogout, danger: true },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={\ixed inset-y-0 left-0 z-50 w-72 bg-[#052821] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col \\}>
        <div className="flex h-20 shrink-0 items-center px-6 border-b border-white/10 justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <img src="/favicon.png" alt="Cultiso" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-unbounded font-bold text-white text-xl tracking-tight">cultiso</span>
          </Link>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <CloseOutlined className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-4 py-8 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return item.disabled ? (
                <div key={item.name} className="flex items-center gap-3 px-4 py-3 text-white/40 rounded-xl cursor-not-allowed">
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">Bientôt</span>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={\lex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 \\}
                >
                  <Icon className={\	ext-lg \\} />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div className="mt-auto pt-8">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D35400]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h4 className="text-white font-bold text-sm mb-1">Besoin d'aide ?</h4>
              <p className="text-white/60 text-xs mb-4">Contactez notre support agronomique.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors border border-white/10">
                Ouvrir un ticket
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Column */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
            <MenuOutlined className="text-xl" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
            <div className="flex-1 flex">
              <div className="relative w-full max-w-md hidden sm:block">
                <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher une simulation, une tâche, un prix..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 focus:border-[#22c55e] transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="text-gray-400 hover:text-gray-500 relative">
                <Badge dot color="#EF4444" offset={[-2, 4]}>
                  <BellOutlined className="text-xl" />
                </Badge>
              </button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

              <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
                <div className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-gray-50 transition-colors">
                  <Avatar className="bg-[#D35400] font-unbounded font-bold">RA</Avatar>
                  <span className="hidden lg:flex lg:flex-col lg:items-start text-sm leading-none">
                    <span className="font-semibold text-gray-900">Rémy Agaguy</span>
                    <span className="text-gray-500 text-xs mt-1">Admin</span>
                  </span>
                </div>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
