"use client";

import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';
import { 
  LayoutDashboard, Factory, FlaskConical, PackageSearch, Wallet, Wrench, 
  Bell, Search, UserCircle, ArrowUpRight, ArrowDownRight, Settings, Menu, 
  AlertTriangle, CheckCircle2, Clock, ChevronDown
} from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- MOCK DATA ---

const yieldData = [
  { name: 'Lun', rendement: 78, cible: 80, pertes: 2.5 },
  { name: 'Mar', rendement: 81, cible: 80, pertes: 2.1 },
  { name: 'Mer', rendement: 83, cible: 80, pertes: 1.8 },
  { name: 'Jeu', rendement: 82, cible: 80, pertes: 1.9 },
  { name: 'Ven', rendement: 85, cible: 80, pertes: 1.5 },
  { name: 'Sam', rendement: 84, cible: 80, pertes: 1.6 },
  { name: 'Dim', rendement: 86, cible: 80, pertes: 1.2 },
];

const stockData = [
  { name: 'Matières Premières', value: 450, color: '#0B5345' },
  { name: 'Produits Finis', value: 320, color: '#1A6C5B' },
  { name: 'Emballages', value: 150, color: '#D35400' },
  { name: 'En transit', value: 80, color: '#E67E22' },
];

const activeBatches = [
  { id: 'L-2409-A', produit: 'Jus d\'Orange Premium', phase: 'Pasteurisation', statut: 'En cours', progression: 65, responsable: 'M. Dubois' },
  { id: 'L-2409-B', produit: 'Farine de Blé T55', phase: 'Mouture', statut: 'En attente', progression: 30, responsable: 'A. Leroux' },
  { id: 'L-2409-C', produit: 'Huile d\'Olive Extra', phase: 'Pressage à froid', statut: 'Optimisé', progression: 90, responsable: 'S. Morel' },
  { id: 'L-2409-D', produit: 'Mangues Séchées', phase: 'Séchage (Four 2)', statut: 'En cours', progression: 45, responsable: 'L. Garcia' },
];

const qualityAlerts = [
  { id: 'Q-101', type: 'DLUO Proche', lot: 'PF-2311-A', produit: 'Farine de Maïs', date: 'Dans 15 jours', severite: 'high' },
  { id: 'Q-102', type: 'Contrôle T°', lot: 'L-2409-A', produit: 'Jus d\'Orange', date: 'Actuel', severite: 'medium' },
  { id: 'Q-103', type: 'Maintenance', lot: '-', produit: 'Presse Hydraulique 3', date: 'Demain', severite: 'low' },
];

// --- COMPONENTS ---

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-cultima-surface rounded-xl border border-cultima-border shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

const KPICard = ({ title, value, trend, trendValue, icon: Icon, color }: any) => {
  const isPositive = trend === 'up';
  return (
    <Card className="p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-cultima-text-light mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-cultima-text">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-lg", color === 'green' ? 'bg-cultima-green/10 text-cultima-green' : 'bg-cultima-orange/10 text-cultima-orange')}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={cn("flex items-center font-medium", isPositive ? 'text-green-600' : 'text-red-600')}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trendValue}
        </span>
        <span className="text-cultima-text-light ml-2">vs mois précédent</span>
      </div>
    </Card>
  );
};

export default function TransformationDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-cultima-bg">
      {/* SIDEBAR */}
      <aside className={cn(
        "bg-cultima-green text-white transition-all duration-300 flex flex-col relative z-20",
        isSidebarOpen ? "w-64" : "w-20 lg:w-64"
      )}>
        <div className="h-16 flex items-center justify-center border-b border-white/10 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cultima-orange flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <span className={cn("font-bold text-xl tracking-wider uppercase", !isSidebarOpen && "lg:block hidden")}>
              Cultima
            </span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Vue d'ensemble", active: true },
            { icon: Factory, label: "Production & Lots" },
            { icon: FlaskConical, label: "Contrôle Qualité" },
            { icon: PackageSearch, label: "Gestion Stocks" },
            { icon: Wallet, label: "Trésorerie" },
            { icon: Wrench, label: "Maintenance" },
          ].map((item, i) => (
            <button key={i} className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm font-medium",
              item.active 
                ? "bg-cultima-green-light text-white shadow-sm" 
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}>
              <item.icon className="w-5 h-5 shrink-0" />
              <span className={cn(!isSidebarOpen && "lg:block hidden")}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors text-sm font-medium">
            <Settings className="w-5 h-5 shrink-0" />
            <span className={cn(!isSidebarOpen && "lg:block hidden")}>Paramètres</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* TOPBAR */}
        <header className="h-16 bg-cultima-surface border-b border-cultima-border flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-cultima-bg rounded-md lg:hidden">
              <Menu className="w-5 h-5 text-cultima-text" />
            </button>
            <div className="hidden md:flex relative w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cultima-text-light" />
              <input 
                type="text" 
                placeholder="Rechercher un lot, un produit, un équipement..." 
                className="w-full bg-cultima-bg border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-cultima-green focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-cultima-text-light hover:text-cultima-text transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cultima-orange rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-cultima-border"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-cultima-text leading-none">Dir. Operations</p>
                <p className="text-xs text-cultima-text-light mt-1">Usine Nord</p>
              </div>
              <UserCircle className="w-9 h-9 text-cultima-green" />
              <ChevronDown className="w-4 h-4 text-cultima-text-light" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD AREA */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* PAGE HEADER */}
            <div>
              <h1 className="text-2xl font-bold text-cultima-text">Tableau de bord de Production</h1>
              <p className="text-cultima-text-light text-sm mt-1">Aperçu en temps réel des opérations agroalimentaires.</p>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Trésorerie Actuelle" value="1 245 K€" trend="up" trendValue="+4.2%" icon={Wallet} color="green" />
              <KPICard title="Rendement Transformation" value="84.5%" trend="up" trendValue="+1.5%" icon={FlaskConical} color="orange" />
              <KPICard title="Taux de Perte Moyen" value="1.8%" trend="down" trendValue="-0.4%" icon={AlertTriangle} color="green" />
              <KPICard title="Disponibilité Machines" value="98.2%" trend="up" trendValue="+0.8%" icon={Wrench} color="green" />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* RENDEMENT CHART */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-cultima-text text-lg">Évolution du Rendement & Pertes</h3>
                    <p className="text-sm text-cultima-text-light">Semaine en cours (Cible: 80%)</p>
                  </div>
                  <select className="bg-cultima-bg border border-cultima-border text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cultima-green">
                    <option>Tous les ateliers</option>
                    <option>Jus de fruits</option>
                    <option>Mouture</option>
                  </select>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRendement" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B5345" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0B5345" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7F8C8D' }} dy={10} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7F8C8D' }} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7F8C8D' }} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                      <Area yAxisId="left" type="monotone" dataKey="rendement" name="Rendement (%)" stroke="#0B5345" strokeWidth={3} fillOpacity={1} fill="url(#colorRendement)" />
                      <Line yAxisId="left" type="monotone" dataKey="cible" name="Cible (%)" stroke="#7F8C8D" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      <Line yAxisId="right" type="monotone" dataKey="pertes" name="Pertes (%)" stroke="#D35400" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* STOCK CHART */}
              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="font-bold text-cultima-text text-lg">Répartition des Stocks</h3>
                  <p className="text-sm text-cultima-text-light">Valeur estimée en K€</p>
                </div>
                <div className="h-60 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stockData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stockData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value) => `${value} K€`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-2xl font-bold text-cultima-text">1.0M€</span>
                    <span className="text-xs text-cultima-text-light">Total Stocks</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {stockData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div className="text-xs">
                        <p className="text-cultima-text font-medium truncate">{item.name}</p>
                        <p className="text-cultima-text-light">{item.value} K€</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* BOTTOM PANELS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* BATCH TRACKING */}
              <Card className="lg:col-span-2 p-0 flex flex-col">
                <div className="p-6 border-b border-cultima-border flex justify-between items-center bg-white">
                  <div>
                    <h3 className="font-bold text-cultima-text text-lg">Suivi des Lots en Cours (Batch)</h3>
                    <p className="text-sm text-cultima-text-light">Traçabilité et avancement de la production</p>
                  </div>
                  <button className="text-sm text-cultima-green font-medium hover:underline">Voir tout</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-cultima-text-light uppercase bg-cultima-bg/50">
                      <tr>
                        <th className="px-6 py-4 font-medium">ID Lot</th>
                        <th className="px-6 py-4 font-medium">Produit</th>
                        <th className="px-6 py-4 font-medium">Phase Actuelle</th>
                        <th className="px-6 py-4 font-medium">Progression</th>
                        <th className="px-6 py-4 font-medium">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cultima-border">
                      {activeBatches.map((batch, i) => (
                        <tr key={i} className="hover:bg-cultima-bg/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-cultima-text">{batch.id}</td>
                          <td className="px-6 py-4 text-cultima-text">{batch.produit}</td>
                          <td className="px-6 py-4 text-cultima-text-light">{batch.phase}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-cultima-border rounded-full h-2">
                                <div 
                                  className="bg-cultima-green h-2 rounded-full" 
                                  style={{ width: `${batch.progression}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium w-8">{batch.progression}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-medium border",
                              batch.statut === 'En cours' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              batch.statut === 'Optimisé' ? 'bg-green-50 text-green-700 border-green-200' :
                              'bg-orange-50 text-orange-700 border-orange-200'
                            )}>
                              {batch.statut}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* QUALITY ALERTS */}
              <Card className="p-0 flex flex-col">
                <div className="p-6 border-b border-cultima-border">
                  <h3 className="font-bold text-cultima-text text-lg flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-cultima-orange" />
                    Contrôle Qualité & DLC
                  </h3>
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-4">
                    {qualityAlerts.map((alert, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-lg border border-cultima-border bg-cultima-bg/30">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          alert.severite === 'high' ? 'bg-red-100 text-red-600' :
                          alert.severite === 'medium' ? 'bg-orange-100 text-orange-600' :
                          'bg-blue-100 text-blue-600'
                        )}>
                          {alert.type.includes('DLUO') ? <Clock className="w-5 h-5" /> : 
                           alert.type.includes('T°') ? <AlertTriangle className="w-5 h-5" /> : 
                           <Wrench className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-cultima-text">{alert.type}</p>
                          <p className="text-xs text-cultima-text-light mt-0.5">
                            {alert.produit} <span className="mx-1">•</span> Lot: {alert.lot}
                          </p>
                          <p className={cn(
                            "text-xs font-medium mt-2",
                            alert.severite === 'high' ? 'text-red-600' : 'text-cultima-text-light'
                          )}>
                            {alert.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-2.5 rounded-lg border border-cultima-border text-sm font-medium text-cultima-text hover:bg-cultima-bg transition-colors">
                    Voir le rapport complet
                  </button>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
