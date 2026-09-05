import { useMemo, useState } from 'react';
import { PriceRecord } from '@/types/prices';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const COLORS = [
  '#0B5345', // Vert principal
  '#D35400', // Orange latérite
  '#2E86C1', // Bleu
  '#8E44AD', // Violet
  '#28B463', // Vert clair
  '#F1C40F', // Jaune
  '#E74C3C', // Rouge
  '#16A085', // Turquoise
  '#34495E', // Gris foncé
  '#E67E22', // Orange clair
];

export default function TrendChart({ data }: { data: PriceRecord[] }) {
  const [activeTimeRange, setActiveTimeRange] = useState('ALL');

  const { chartData, locations, productName, currentPrice, currentUnit } = useMemo(() => {
    if (!data || data.length === 0) {
      return { chartData: [], locations: [], productName: '', currentPrice: null, currentUnit: '' };
    }

    const pName = data[0]?.product?.name || 'Inconnu';
    const currentPrice = data[0]?.price;
    const currentUnit = data[0]?.product?.default_unit || 'unité';

    // 1. Filtrer par plage de temps si nécessaire (simplifié pour ALL pour l'instant)
    const now = new Date();
    const filteredData = data.filter(record => {
      const d = new Date(record.record_date);
      if (activeTimeRange === '7J') return (now.getTime() - d.getTime()) <= 7 * 24 * 3600 * 1000;
      if (activeTimeRange === '1M') return (now.getTime() - d.getTime()) <= 30 * 24 * 3600 * 1000;
      if (activeTimeRange === '3M') return (now.getTime() - d.getTime()) <= 90 * 24 * 3600 * 1000;
      if (activeTimeRange === '1A') return (now.getTime() - d.getTime()) <= 365 * 24 * 3600 * 1000;
      if (activeTimeRange === 'YTD') return d.getFullYear() === now.getFullYear();
      return true; // ALL
    });

    // 2. Trier chronologiquement
    const sortedData = [...filteredData].sort((a, b) => new Date(a.record_date).getTime() - new Date(b.record_date).getTime());

    // 3. Pivoter les données pour Recharts : { date: 'Jan', Lomé: 500, Mango: 350 }
    const dateMap = new Map<string, any>();
    const locs = new Set<string>();

    sortedData.forEach(record => {
      const d = new Date(record.record_date);
      const dateKey = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' });
      
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, { date: dateKey, fullDate: d });
      }
      
      const entry = dateMap.get(dateKey);
      const loc = record.location || 'Inconnu';
      locs.add(loc);
      
      // On affecte le prix pour cette ville à cette date
      entry[loc] = record.price;
    });

    return {
      chartData: Array.from(dateMap.values()),
      locations: Array.from(locs).sort(),
      productName: pName,
      currentPrice,
      currentUnit
    };
  }, [data, activeTimeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-[rgba(5,40,33,0.08)] rounded-[9px] shadow-lg min-w-[200px] z-50">
          <p className="font-medium text-[#052821] mb-3 pb-2 border-b border-gray-100">{label}</p>
          <div className="flex flex-col gap-2">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex justify-between items-center text-[14px] font-mono-numbers gap-4">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-gray-600 font-sans">{entry.name}</span>
                </span>
                <span className="font-bold text-gray-900">
                  {entry.value.toLocaleString('fr-FR')} F
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="w-full bg-white p-6 rounded-[9px] border border-gray-200 shadow-sm flex flex-col items-center justify-center" style={{ height: 400 }}>
        <h3 className="font-unbounded font-medium text-lg text-gray-900 mb-2 opacity-70">Évolution des prix</h3>
        <p className="text-gray-500 text-[15px]">Aucune donnée disponible pour la période sélectionnée.</p>
        <button 
          onClick={() => setActiveTimeRange('ALL')} 
          className="mt-4 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          Voir tout l'historique
        </button>
      </div>
    );
  }

  const timeRanges = [
    { label: '7J', value: '7J' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1A', value: '1A' },
    { label: 'YTD', value: 'YTD' },
    { label: 'TOUT', value: 'ALL' },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-[9px] border border-gray-200 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h3 className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D35400] inline-block animate-pulse"></span>
            Évolution {productName}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-unbounded font-bold text-3xl text-gray-900">
              {currentPrice?.toLocaleString('fr-FR')} FCFA
            </span>
            <span className="text-gray-500 text-sm">/ {currentUnit} (dernier relevé)</span>
          </div>
        </div>
        
        <div className="flex gap-2 bg-gray-50 p-1 rounded-md border border-gray-200 self-start overflow-x-auto max-w-full">
          {timeRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setActiveTimeRange(range.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeTimeRange === range.value 
                  ? 'bg-white text-[#0B5345] shadow-sm border border-gray-200' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full font-mono-numbers relative" style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#6b7280', fontFamily: 'var(--font-manrope)' }}
              axisLine={false}
              tickLine={false}
              dy={15}
              minTickGap={20}
            />
            <YAxis 
              tickFormatter={(val) => `${val}`}
              tick={{ fontSize: 11, fill: '#6b7280', fontFamily: 'var(--font-manrope)' }}
              axisLine={false}
              tickLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(11,83,69,0.1)', strokeWidth: 40 }} />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-manrope)', paddingTop: '20px' }} 
            />
            
            {locations.map((loc, index) => (
              <Line
                key={loc}
                type="monotone"
                dataKey={loc}
                name={loc}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 1, fill: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                connectNulls={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
