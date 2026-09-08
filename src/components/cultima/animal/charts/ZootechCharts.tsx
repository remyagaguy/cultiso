"use client";
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  GrowthDataPoint, 
  LayingDataPoint, 
  FeedIntakeDataPoint, 
  FinancialBreakdownPoint, 
  SpeciesCategory 
} from '../types';
import { 
  TrendingUp, 
  Egg, 
  Wheat, 
  DollarSign, 
  Info,
  Maximize2
} from 'lucide-react';

interface ZootechChartsProps {
  growthData: GrowthDataPoint[];
  layingData: LayingDataPoint[];
  feedData: FeedIntakeDataPoint[];
  financialData: FinancialBreakdownPoint[];
  species: SpeciesCategory;
}

export const ZootechCharts: React.FC<ZootechChartsProps> = ({
  growthData,
  layingData,
  feedData,
  financialData,
  species,
}) => {
  const [activeTab, setActiveTab] = useState<'growth' | 'laying' | 'feed' | 'treasury'>('growth');

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Chart Top Navigation Tabs */}
      <div className="border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('growth')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'growth'
                ? 'bg-[#0B5345] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Croissance & GMQ (Poids Vif)</span>
          </button>

          {(species === 'poultry' || species === 'all') && (
            <button
              onClick={() => setActiveTab('laying')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'laying'
                  ? 'bg-[#0B5345] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Egg className="w-3.5 h-3.5" />
              <span>Courbe de Ponte & Calibrage</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'feed'
                ? 'bg-[#0B5345] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            <span>Provendes & Indice FCR (IC)</span>
          </button>

          <button
            onClick={() => setActiveTab('treasury')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'treasury'
                ? 'bg-[#0B5345] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Trésorerie & Marge Aliment (MCAS)</span>
          </button>
        </div>

        {/* Legend / Status pill */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B5345]"></span>
            <span className="font-medium text-slate-700">Données Réelles Lot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D35400]"></span>
            <span className="font-medium text-slate-700">Standard Génétique Guide</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="p-4 sm:p-6">
        {/* TAB 1: CROISSANCE & GMQ */}
        {activeTab === 'growth' && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  Dynamique de Croissance Pondérale & GMQ (Gain Moyen Quotidien)
                </h3>
                <p className="text-xs text-slate-500">
                  Comparaison du poids moyen pesé (g) contre le standard de sélection (Cobb 500 / ISA / Large White) avec tolérance ±5%
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs bg-emerald-50 text-[#0B5345] border border-emerald-200/60 px-2.5 py-1 rounded-md font-semibold">
                <span>Avance de croissance : +70g / sujet</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={growthData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tickLine={false} 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tickFormatter={(val) => `J${val}`}
                  />
                  <YAxis 
                    yAxisId="weight"
                    tickLine={false} 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tickFormatter={(val) => `${val}g`}
                    domain={[0, 'dataMax + 200']}
                  />
                  <YAxis 
                    yAxisId="gmq" 
                    orientation="right"
                    tickLine={false} 
                    stroke="#D35400" 
                    fontSize={11}
                    tickFormatter={(val) => `${val}g/j`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '8px', 
                      color: '#fff', 
                      border: 'none',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'actualWeight') return [`${value} g`, 'Poids Réel Mesuré'];
                      if (name === 'standardWeight') return [`${value} g`, 'Standard Génétique'];
                      if (name === 'gmq') return [`${value} g/j`, 'GMQ Quotidien'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Âge physiologique : Jour ${label}`}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(val) => {
                      if (val === 'actualWeight') return <span className="text-xs text-slate-700 font-semibold">Poids Réel Mesuré (g)</span>;
                      if (val === 'standardWeight') return <span className="text-xs text-slate-700 font-semibold">Standard Génétique (g)</span>;
                      if (val === 'gmq') return <span className="text-xs text-orange-700 font-semibold">GMQ (g/jour)</span>;
                      return val;
                    }}
                  />
                  {/* Standard Guide line */}
                  <Line 
                    yAxisId="weight" 
                    type="monotone" 
                    dataKey="standardWeight" 
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    strokeDasharray="4 4" 
                    dot={false} 
                  />
                  {/* Actual Measured Line */}
                  <Line 
                    yAxisId="weight" 
                    type="monotone" 
                    dataKey="actualWeight" 
                    stroke="#0B5345" 
                    strokeWidth={3} 
                    dot={{ fill: '#0B5345', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#D35400' }}
                  />
                  {/* GMQ Bar */}
                  <Bar 
                    yAxisId="gmq" 
                    dataKey="gmq" 
                    fill="#D35400" 
                    opacity={0.3} 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={32}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 2: PONTE & CALIBRAGE */}
        {activeTab === 'laying' && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  Courbe de Ponte Hebdomadaire & Calibrage Œufs (ISA Brown)
                </h3>
                <p className="text-xs text-slate-500">
                  Taux de ponte constaté vs courbe théorique de ponte (Semaine 18 à 40) et poids moyen de l'œuf
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs bg-orange-50 text-[#D35400] border border-orange-200/60 px-2.5 py-1 rounded-md font-semibold">
                <span>Pic de ponte atteint à Sem 25 (95.8%)</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={layingData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="week" 
                    tickLine={false} 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tickFormatter={(val) => `Sem ${val}`}
                  />
                  <YAxis 
                    yAxisId="rate"
                    tickLine={false} 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tickFormatter={(val) => `${val}%`}
                    domain={[0, 100]}
                  />
                  <YAxis 
                    yAxisId="eggWeight" 
                    orientation="right"
                    tickLine={false} 
                    stroke="#D35400" 
                    fontSize={11}
                    tickFormatter={(val) => `${val}g`}
                    domain={[40, 75]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '8px', 
                      color: '#fff', 
                      border: 'none',
                      fontSize: '12px'
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'actualRate') return [`${value} %`, 'Taux de Ponte Réel'];
                      if (name === 'standardRate') return [`${value} %`, 'Standard de Ponte'];
                      if (name === 'eggWeightAvg') return [`${value} g`, 'Poids Moyen Œuf'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Semaine de vie ${label}`}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    formatter={(val) => {
                      if (val === 'actualRate') return <span className="text-xs text-slate-700 font-semibold">Taux de Ponte Réel (%)</span>;
                      if (val === 'standardRate') return <span className="text-xs text-slate-700 font-semibold">Objectif Standard (%)</span>;
                      if (val === 'eggWeightAvg') return <span className="text-xs text-[#D35400] font-semibold">Poids Moyen Œuf (g)</span>;
                      return val;
                    }}
                  />
                  <Line 
                    yAxisId="rate" 
                    type="monotone" 
                    dataKey="standardRate" 
                    stroke="#cbd5e1" 
                    strokeWidth={2} 
                    strokeDasharray="4 4" 
                    dot={false} 
                  />
                  <Area 
                    yAxisId="rate" 
                    type="monotone" 
                    dataKey="actualRate" 
                    stroke="#0B5345" 
                    fill="#0B5345" 
                    fillOpacity={0.15} 
                    strokeWidth={3}
                  />
                  <Line 
                    yAxisId="eggWeight" 
                    type="monotone" 
                    dataKey="eggWeightAvg" 
                    stroke="#D35400" 
                    strokeWidth={2.5} 
                    dot={{ fill: '#D35400', r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 3: PROVENDES & INDICE FCR (IC) */}
        {activeTab === 'feed' && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  Consommation Provendes (kg) & Évolution de l'Indice de Conversion (FCR)
                </h3>
                <p className="text-xs text-slate-500">
                  Suivi de la quantité d'aliment distribuée et ratio de conversion biologique de la bande
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs bg-emerald-50 text-[#0B5345] border border-emerald-200/60 px-2.5 py-1 rounded-md font-semibold">
                <span>IC Cumulé Actuel : 1.58 (Excellente valorisation alimentaire)</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={feedData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="dayOrWeek" tickLine={false} stroke="#94a3b8" fontSize={11} />
                  <YAxis 
                    yAxisId="kg"
                    tickLine={false} 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)} T`}
                  />
                  <YAxis 
                    yAxisId="fcr" 
                    orientation="right"
                    tickLine={false} 
                    stroke="#D35400" 
                    fontSize={11}
                    domain={[1.0, 2.0]}
                    tickFormatter={(val) => `${val.toFixed(2)}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                    formatter={(val: any, name: any) => {
                      if (name === 'intakeKg') return [`${val.toLocaleString('fr-FR')} kg`, 'Aliment Semaine'];
                      if (name === 'cumulativeKg') return [`${val.toLocaleString('fr-FR')} kg`, 'Aliment Cumulé'];
                      if (name === 'fcrPoint') return [val, 'Indice IC'];
                      return [val, name];
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    formatter={(val) => {
                      if (val === 'intakeKg') return <span className="text-xs text-slate-700 font-semibold">Aliment Hebdo (kg)</span>;
                      if (val === 'cumulativeKg') return <span className="text-xs text-slate-700 font-semibold">Cumulé Lot (kg)</span>;
                      if (val === 'fcrPoint') return <span className="text-xs text-[#D35400] font-semibold">Indice IC (FCR)</span>;
                      return val;
                    }}
                  />
                  <Bar yAxisId="kg" dataKey="intakeKg" fill="#0B5345" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Line yAxisId="kg" type="monotone" dataKey="cumulativeKg" stroke="#334155" strokeWidth={2} dot={false} />
                  <Line yAxisId="fcr" type="monotone" dataKey="fcrPoint" stroke="#D35400" strokeWidth={3} dot={{ fill: '#D35400', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 4: TRÉSORERIE & MARGE SUR COÛT ALIMENT (MCAS) */}
        {activeTab === 'treasury' && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  Structure des Coûts & Marge sur Coût Alimentaire (MCAS)
                </h3>
                <p className="text-xs text-slate-500">
                  Analyse financière zootechnique : L'aliment représente 68% des coûts variables d'élevage
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2.5 py-1 rounded-md font-semibold">
                <span>MCAS Moyen : +51.6% de marge brute</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={financialData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} stroke="#94a3b8" fontSize={11} />
                  <YAxis 
                    tickLine={false} 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)} k€`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                    formatter={(val: any, name: any) => {
                      if (name === 'revenue') return [`${val.toLocaleString('fr-FR')} €`, 'Chiffre d\'Affaires Ventes'];
                      if (name === 'feedOpex') return [`${val.toLocaleString('fr-FR')} €`, 'Coût Provende (Aliment)'];
                      if (name === 'vetOpex') return [`${val.toLocaleString('fr-FR')} €`, 'Soins & Prophylaxie Vétérinaire'];
                      if (name === 'grossMarginFeed') return [`${val.toLocaleString('fr-FR')} €`, 'Marge sur Aliment (MCAS)'];
                      return [val, name];
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    formatter={(val) => {
                      if (val === 'revenue') return <span className="text-xs text-slate-800 font-semibold">Ventes (k€)</span>;
                      if (val === 'feedOpex') return <span className="text-xs text-[#D35400] font-semibold">Coût Provende</span>;
                      if (val === 'vetOpex') return <span className="text-xs text-purple-700 font-semibold">Vétérinaire</span>;
                      if (val === 'grossMarginFeed') return <span className="text-xs text-[#0B5345] font-semibold">Marge Brute MCAS</span>;
                      return val;
                    }}
                  />
                  <Bar dataKey="feedOpex" stackId="costs" fill="#D35400" radius={[0, 0, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="vetOpex" stackId="costs" fill="#9333ea" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  <Line type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={3} dot={{ fill: '#0f172a', r: 4 }} />
                  <Line type="monotone" dataKey="grossMarginFeed" stroke="#0B5345" strokeWidth={3} dot={{ fill: '#0B5345', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
