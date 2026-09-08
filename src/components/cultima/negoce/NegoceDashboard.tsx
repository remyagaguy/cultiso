'use client';

import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, ComposedChart, Scatter, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Truck, 
  Search, Bell, Settings, Menu, ChevronDown, 
  ArrowUpRight, ArrowDownRight, Activity, Percent, Scale, 
  Warehouse, Zap, Anchor, Info
} from 'lucide-react';

// --- MOCK DATA ---
const marketPrices = [
  { month: 'Jan', ble: 215, mais: 190, soja: 420 },
  { month: 'Fev', ble: 220, mais: 195, soja: 430 },
  { month: 'Mar', ble: 235, mais: 192, soja: 445 },
  { month: 'Avr', ble: 230, mais: 205, soja: 440 },
  { month: 'Mai', ble: 245, mais: 210, soja: 460 },
  { month: 'Jun', ble: 240, mais: 215, soja: 450 },
  { month: 'Jul', ble: 255, mais: 220, soja: 470 },
];

const treasuryData = [
  { week: 'S1', entrees: 125000, sorties: 98000 },
  { week: 'S2', entrees: 145000, sorties: 110000 },
  { week: 'S3', entrees: 110000, sorties: 135000 },
  { week: 'S4', entrees: 180000, sorties: 120000 },
];

const warehouseData = [
  { name: 'Silo A (Blé)', volume: 8500, capacity: 10000, lossRate: 0.8 },
  { name: 'Silo B (Maïs)', volume: 6200, capacity: 8000, lossRate: 1.2 },
  { name: 'Entrepôt C (Soja)', volume: 3100, capacity: 5000, lossRate: 0.5 },
];

const logisticsData = [
  { name: 'En transit', value: 45, color: '#0B5345' },
  { name: 'À quai (Chargement)', value: 25, color: '#D35400' },
  { name: 'Déchargement', value: 15, color: '#f5b041' },
  { name: 'En attente', value: 15, color: '#94a3b8' },
];

const marginData = [
  { month: 'Jan', physique: 12, forward: 14 },
  { month: 'Fev', physique: 14, forward: 15 },
  { month: 'Mar', physique: 13, forward: 18 },
  { month: 'Avr', physique: 15, forward: 16 },
  { month: 'Mai', physique: 18, forward: 20 },
];

// --- COMPONENTS ---

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const KPICard = ({ title, value, change, isPositive, icon: Icon, unit = "" }: any) => (
  <Card className="p-5 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
        <Icon size={20} />
      </div>
      <div className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{Math.abs(change)}%</span>
      </div>
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-slate-800 tracking-tight">
        {value} <span className="text-lg font-normal text-slate-500">{unit}</span>
      </div>
    </div>
  </Card>
);

export default function NegoceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-cultima-green text-white flex-shrink-0 md:min-h-screen border-r border-cultima-green-dark">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-8 h-8 bg-cultima-orange rounded-lg flex items-center justify-center">
              <Scale size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Cultima</span>
          </div>
          
          <nav className="space-y-1">
            {[
              { id: 'overview', icon: Activity, label: 'Vue d\'ensemble' },
              { id: 'trading', icon: TrendingUp, label: 'Trading & Marchés' },
              { id: 'treasury', icon: DollarSign, label: 'Trésorerie' },
              { id: 'warehouse', icon: Warehouse, label: 'Entrepôts' },
              { id: 'logistics', icon: Truck, label: 'Logistique' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  activeTab === item.id 
                    ? 'bg-cultima-green-dark text-white shadow-inner' 
                    : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
           <div className="bg-cultima-green-dark/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                 <Anchor size={16} className="text-cultima-orange" />
                 <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">Port de Rouen</span>
              </div>
              <div className="text-sm">Statut: <span className="text-emerald-400 font-medium">Opérationnel</span></div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center flex-1">
            <button className="md:hidden mr-4 text-slate-500 hover:text-slate-700">
              <Menu size={24} />
            </button>
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un contrat, un navire..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cultima-green/20 focus:border-cultima-green transition-all"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cultima-orange rounded-full"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cultima-green text-white rounded-full flex items-center justify-center font-medium text-sm">
                JD
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-slate-700 leading-tight">Jean Dupont</div>
                <div className="text-xs text-slate-500">Head of Trading</div>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tableau de Bord Corporate</h1>
              <p className="text-slate-500 mt-1">Synthèse des opérations de négoce et chaîne d'approvisionnement.</p>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
              <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-100 text-slate-800">Semaine</button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-50">Mois</button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-50">Année</button>
            </div>
          </div>

          {/* KPI GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard title="Chiffre d'Affaires (Mois)" value="14.2" unit="M€" change={8.4} isPositive={true} icon={DollarSign} />
            <KPICard title="Volume Physique Stocké" value="17,800" unit="MT" change={2.1} isPositive={true} icon={Warehouse} />
            <KPICard title="Marge Nette Moyenne" value="16.5" unit="€/T" change={-1.2} isPositive={false} icon={Percent} />
            <KPICard title="Contrats à Terme (Open)" value="245" unit="lots" change={12.5} isPositive={true} icon={TrendingUp} />
          </div>

          {/* MAIN CHARTS AREA */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            
            {/* VEILLE DES PRIX - 2 COLUMNS WIDE */}
            <Card className="xl:col-span-2 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Veille des Prix du Marché (Euronext)</h2>
                  <p className="text-sm text-slate-500">Évolution des cours de clôture (€/Tonne)</p>
                </div>
                <div className="flex items-center space-x-4">
                   <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-[#0B5345]"></div><span className="text-xs text-slate-600">Blé</span></div>
                   <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-[#D35400]"></div><span className="text-xs text-slate-600">Maïs</span></div>
                   <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-[#f5b041]"></div><span className="text-xs text-slate-600">Soja</span></div>
                </div>
              </div>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketPrices} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Line type="monotone" dataKey="ble" stroke="#0B5345" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="mais" stroke="#D35400" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="soja" stroke="#f5b041" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* TRÉSORERIE - 1 COLUMN WIDE */}
            <Card className="p-6 flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Flux de Trésorerie</h2>
                <p className="text-sm text-slate-500">Entrées vs Sorties (Semaines)</p>
              </div>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={treasuryData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `${value/1000}k`} />
                    <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="entrees" fill="#0B5345" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="sorties" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                 <div className="text-sm text-slate-500">Balance Nette (Mois)</div>
                 <div className="text-lg font-bold text-emerald-600">+ 117,000 €</div>
              </div>
            </Card>

          </div>

          {/* LOWER GRID: LOGISTICS, WAREHOUSE, TRADING WIDGET */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* WAREHOUSE ROTATION & LOSS */}
            <Card className="p-6 lg:col-span-1">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center"><Warehouse size={18} className="mr-2 text-slate-400"/> Stockage & Pertes</h2>
                <p className="text-sm text-slate-500">Taux d'occupation et perte matière</p>
              </div>
              
              <div className="space-y-5 mt-6">
                {warehouseData.map((silo, idx) => {
                  const occupancy = (silo.volume / silo.capacity) * 100;
                  return (
                    <div key={idx} className="relative">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">{silo.name}</span>
                        <span className="text-slate-500">{silo.volume}T / {silo.capacity}T</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${occupancy > 80 ? 'bg-cultima-orange' : 'bg-cultima-green'}`} 
                          style={{ width: `${occupancy}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1.5">
                        <span className="text-slate-400">Occupation: <span className="text-slate-600 font-medium">{occupancy.toFixed(0)}%</span></span>
                        <span className="text-rose-500 flex items-center">
                          <Zap size={12} className="mr-0.5" /> Perte: {silo.lossRate}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-3 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-700 flex items-start">
                 <Info size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                 <p>Alerte: Taux de freinte anormal détecté sur Silo B (Maïs). Vérifier ventilation.</p>
              </div>
            </Card>

            {/* EXPERT WIDGET: DYNAMIC MARGIN CALCULATOR */}
            <Card className="p-6 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-white relative overflow-hidden">
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cultima-green/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center"><Activity size={18} className="mr-2 text-emerald-400"/> Marges Nettes Dynamiques</h2>
                  <p className="text-sm text-slate-400">Physique vs Papier (Couverture)</p>
                </div>

                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marginData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPhysique" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B5345" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0B5345" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorForward" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D35400" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#D35400" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `${val}€`} />
                      <RechartsTooltip 
                         contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                         itemStyle={{ color: '#f8fafc' }}
                      />
                      <Area type="monotone" dataKey="physique" stroke="#10b981" fillOpacity={1} fill="url(#colorPhysique)" strokeWidth={2} />
                      <Area type="monotone" dataKey="forward" stroke="#f97316" fillOpacity={1} fill="url(#colorForward)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Spread Moyen</div>
                    <div className="text-lg font-semibold text-emerald-400">+2.4 €/T</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Risque Base</div>
                    <div className="text-lg font-semibold text-rose-400">Modéré</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* LOGISTICS */}
            <Card className="p-6 lg:col-span-1">
              <div className="mb-2">
                <h2 className="text-lg font-bold text-slate-800 flex items-center"><Truck size={18} className="mr-2 text-slate-400"/> Flux Logistiques</h2>
                <p className="text-sm text-slate-500">Statut des expéditions/réceptions</p>
              </div>
              
              <div className="flex items-center justify-center h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={logisticsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {logisticsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2 mt-2">
                {logisticsData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
