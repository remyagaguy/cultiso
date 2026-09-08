'use client';

import React, { useState } from 'react';
import { 
  Tractor, 
  Droplets, 
  Users, 
  LineChart, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Wallet,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  Activity,
  MapPin,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';

// --- MOCK DATA ---

const revenueData = [
  { name: 'Jan', chiffreAffaires: 240, charges: 180 },
  { name: 'Fév', chiffreAffaires: 290, charges: 195 },
  { name: 'Mar', chiffreAffaires: 410, charges: 250 },
  { name: 'Avr', chiffreAffaires: 580, charges: 310 },
  { name: 'Mai', chiffreAffaires: 620, charges: 330 },
  { name: 'Juin', chiffreAffaires: 680, charges: 360 },
];

const fleetStatusData = [
  { name: 'En mission', value: 58, color: '#0B5345' }, // cultima-green
  { name: 'Maintenance', value: 14, color: '#D35400' }, // cultima-orange
  { name: 'Au dépôt', value: 28, color: '#cbd5e1' }, // slate-300
];

const activeMissions = [
  { id: 'MSN-809', type: 'Forage Profond', client: 'Domaine de la Vallée', team: 'Équipe Alpha', status: 'En cours', progress: 65, equipement: 'Foreuse T-90', location: 'Parcelle Nord' },
  { id: 'MSN-810', type: 'Moisson', client: 'Coopérative Les Blés', team: 'Équipe Beta', status: 'En cours', progress: 40, equipement: '2x JD-S780', location: 'Secteur 4' },
  { id: 'MSN-811', type: 'Labour', client: 'EARL des Sources', team: 'Équipe Gamma', status: 'En attente', progress: 0, equipement: 'Fendt 936 Vario', location: 'Champs de l\'Est' },
  { id: 'MSN-812', type: 'Irrigation', client: 'SCEA Les Vergers', team: 'Équipe Delta', status: 'Terminé', progress: 100, equipement: 'Pivot central 400m', location: 'Vergers Sud' },
];

const pendingQuotes = [
  { id: 'DEV-1452', client: 'Vignobles Rousseau', amount: '24 500 €', service: 'Installation Goutte-à-goutte', status: 'Attente signature', date: 'Aujourd\'hui' },
  { id: 'DEV-1453', client: 'Ferme des Peupliers', amount: '12 800 €', service: 'Location Tracteur + Charrue', status: 'Négociation', date: 'Hier' },
  { id: 'DEV-1454', client: 'Agri-Nord', amount: '45 000 €', service: 'Contrat Moisson 300ha', status: 'Envoyé', date: 'Il y a 2j' },
];

export default function ServiceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-surface-bg font-sans text-slate-800">
      
      {/* --- SIDEBAR --- */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-cultima-green text-white transition-all duration-300 flex flex-col sticky top-0 h-screen z-50`}
      >
        <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
          {sidebarOpen ? (
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cultima-orange rounded-xl flex items-center justify-center shadow-lg shadow-cultima-orange/20">
                   <Tractor size={24} className="text-white" />
                </div>
                <span className="font-bold text-2xl tracking-wide">Cultima</span>
             </div>
          ) : (
             <div className="w-10 h-10 bg-cultima-orange rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-cultima-orange/20">
                <Tractor size={24} className="text-white" />
             </div>
          )}
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
           <NavItem icon={<LineChart size={20} />} label="Tableau de Bord" active collapsed={!sidebarOpen} />
           <NavItem icon={<Wallet size={20} />} label="Trésorerie" collapsed={!sidebarOpen} />
           <NavItem icon={<MapPin size={20} />} label="Dispatch & Planning" collapsed={!sidebarOpen} />
           <NavItem icon={<Wrench size={20} />} label="Flotte & Matériel" collapsed={!sidebarOpen} />
           <NavItem icon={<Users size={20} />} label="Équipes & RH" collapsed={!sidebarOpen} />
           <NavItem icon={<FileText size={20} />} label="CRM & Devis" collapsed={!sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings size={20} />} label="Paramètres" collapsed={!sidebarOpen} />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-surface-card border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un devis, matériel, équipe..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-cultima-green/20 outline-none w-80 transition-all focus:bg-white"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-500 hover:text-cultima-green transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cultima-orange rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-cultima-green/10 flex items-center justify-center text-cultima-green font-bold text-sm">
                JD
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-cultima-green transition-colors">Jean Dupont</p>
                <p className="text-xs text-slate-500">Dir. Opérations</p>
              </div>
              <ChevronDown size={16} className="text-slate-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Vue d'Ensemble Opérationnelle</h1>
              <p className="text-slate-500 mt-1">Supervision de l'activité, trésorerie et flotte matérielle en temps réel.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                <Calendar size={16} />
                Période: Ce Mois
              </button>
              <button className="px-4 py-2 bg-cultima-orange text-white rounded-lg text-sm font-medium hover:bg-cultima-orange-dark transition-colors shadow-sm shadow-cultima-orange/20 flex items-center gap-2">
                Nouvelle Mission
              </button>
            </div>
          </div>

          {/* KPI ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            <KpiCard 
              title="Trésorerie Nette" 
              value="452 300 €" 
              trend="+12.5%" 
              isPositive={true} 
              icon={<Wallet size={22} className="text-cultima-green" />}
              iconBg="bg-cultima-green/10"
              subtext="vs mois dernier"
            />
            
            <KpiCard 
              title="Taux d'Occupation Flotte" 
              value="84%" 
              trend="+4.2%" 
              isPositive={true} 
              icon={<Tractor size={22} className="text-cultima-orange" />}
              iconBg="bg-cultima-orange/10"
              subtext="Objectif: >80%"
            />
            
            <KpiCard 
              title="Missions en Cours" 
              value="18" 
              trend="-2" 
              isPositive={false} 
              icon={<Activity size={22} className="text-blue-600" />}
              iconBg="bg-blue-600/10"
              subtext="3 nécessitent attention"
            />
            
            <KpiCard 
              title="Pipeline Devis (CRM)" 
              value="1.25 M€" 
              trend="+18%" 
              isPositive={true} 
              icon={<FileText size={22} className="text-purple-600" />}
              iconBg="bg-purple-600/10"
              subtext="32 devis en attente"
            />

          </div>

          {/* CHARTS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Financial Chart */}
            <div className="bg-surface-card rounded-2xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Performances Financières</h2>
                  <p className="text-sm text-slate-500">Chiffre d'affaires vs Charges (en k€)</p>
                </div>
                <button className="text-sm text-cultima-green font-medium hover:underline flex items-center gap-1">
                  Rapport complet <ArrowRight size={14} />
                </button>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0B5345" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0B5345" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCharges" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D35400" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#D35400" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="chiffreAffaires" name="CA Brut" stroke="#0B5345" strokeWidth={3} fillOpacity={1} fill="url(#colorCA)" />
                    <Area type="monotone" dataKey="charges" name="Charges" stroke="#D35400" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorCharges)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fleet Status Donut */}
            <div className="bg-surface-card rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800">Disponibilité du Matériel</h2>
                <p className="text-sm text-slate-500">Répartition du parc actuel</p>
              </div>
              <div className="flex-1 min-h-[200px] relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fleetStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {fleetStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#1e293b' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-slate-800">100</span>
                  <span className="text-xs text-slate-500">Unités totales</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {fleetStatusData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-slate-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* TABLES ROW */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Active Missions */}
            <div className="bg-surface-card rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <div>
                    <h2 className="text-lg font-bold text-slate-800">Missions Terrain (Live)</h2>
                    <p className="text-sm text-slate-500">Dispatching des équipes et avancement</p>
                 </div>
                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                    <MoreVertical size={18} />
                 </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 font-medium">Mission / Localisation</th>
                      <th className="px-6 py-3 font-medium">Équipe & Matériel</th>
                      <th className="px-6 py-3 font-medium">Statut</th>
                      <th className="px-6 py-3 font-medium">Progression</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {activeMissions.map((mission) => (
                      <tr key={mission.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">{mission.type}</p>
                          <div className="flex items-center gap-1.5 text-slate-500 mt-1 text-xs">
                             <MapPin size={12} />
                             {mission.location} ({mission.client})
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-700">{mission.team}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{mission.equipement}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            mission.status === 'En cours' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            mission.status === 'Terminé' ? 'bg-green-50 text-green-700 border-green-200' :
                            'bg-orange-50 text-orange-700 border-orange-200'
                          }`}>
                            {mission.status === 'En cours' && <Activity size={10} className="mr-1.5" />}
                            {mission.status === 'Terminé' && <CheckCircle2 size={10} className="mr-1.5" />}
                            {mission.status === 'En attente' && <Clock size={10} className="mr-1.5" />}
                            {mission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  mission.progress === 100 ? 'bg-green-500' : 'bg-cultima-green'
                                }`} 
                                style={{ width: `${mission.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600 w-8">{mission.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-slate-100 text-center">
                 <button className="text-sm font-medium text-cultima-green hover:text-cultima-green-light">Voir le planning complet</button>
              </div>
            </div>

            {/* CRM Pending Quotes */}
            <div className="bg-surface-card rounded-2xl shadow-sm border border-slate-200 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <div>
                    <h2 className="text-lg font-bold text-slate-800">Derniers Devis (CRM)</h2>
                    <p className="text-sm text-slate-500">Opportunités en cours de négociation</p>
                 </div>
                 <button className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                    Nouveau Devis
                 </button>
              </div>
              
              <div className="flex-1 p-6 space-y-4">
                {pendingQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-cultima-green/30 hover:shadow-sm transition-all group bg-white">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-cultima-green group-hover:bg-cultima-green/5 transition-colors shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-cultima-green transition-colors">{quote.client}</h3>
                        <p className="text-sm text-slate-500 mt-0.5">{quote.service}</p>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="text-xs text-slate-400 flex items-center gap-1">
                             <Clock size={12} /> {quote.date}
                           </span>
                           <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                             {quote.status}
                           </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-slate-800">{quote.amount}</p>
                      <p className="text-xs text-slate-400 mt-1">{quote.id}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-slate-100 text-center">
                 <button className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2 w-full">
                    Accéder au CRM <ArrowRight size={16} />
                 </button>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}


// --- SUB-COMPONENTS ---

function NavItem({ icon, label, active = false, collapsed = false }: { icon: React.ReactNode, label: string, active?: boolean, collapsed?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
      active 
        ? 'bg-white/15 text-white shadow-sm' 
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    } ${collapsed ? 'justify-center' : 'justify-start'}`}>
      <span className={`${active ? 'text-white' : 'text-white/70 group-hover:text-white'} transition-colors`}>
        {icon}
      </span>
      {!collapsed && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
      
      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-20 bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  )
}

function KpiCard({ title, value, trend, isPositive, icon, iconBg, subtext }: { 
  title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode, iconBg: string, subtext: string 
}) {
  return (
    <div className="bg-surface-card rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
          isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 mt-1 tracking-tight">{value}</p>
        <p className="text-xs text-slate-400 mt-2">{subtext}</p>
      </div>
    </div>
  )
}
