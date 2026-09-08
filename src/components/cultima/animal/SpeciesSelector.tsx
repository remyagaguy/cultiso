"use client";
import React from 'react';
import { 
  Egg, 
  Fish, 
  Layers, 
  Milk, 
  Beef,
  Sparkles
} from 'lucide-react';
import { SpeciesCategory } from './types';

interface SpeciesSelectorProps {
  selectedSpecies: SpeciesCategory;
  onSelect: (species: SpeciesCategory) => void;
  counts: {
    all: number;
    poultry: number;
    cattle: number;
    swine: number;
    aquaculture: number;
  };
}

export const SpeciesSelector: React.FC<SpeciesSelectorProps> = ({
  selectedSpecies,
  onSelect,
  counts,
}) => {
  const tabs = [
    {
      id: 'all' as SpeciesCategory,
      label: 'Vue Consolidée',
      sublabel: 'Tous ateliers confondus',
      icon: Layers,
      count: counts.all,
      highlight: '5 Ateliers Actifs',
      color: 'border-slate-800 text-slate-900',
    },
    {
      id: 'poultry' as SpeciesCategory,
      label: 'Aviculture',
      sublabel: 'Chair (Cobb 500) & Pondeuses (ISA)',
      icon: Egg,
      count: counts.poultry,
      highlight: '38 450 œufs/j • IC 1.56',
      color: 'border-[#0B5345] text-[#0B5345]',
    },
    {
      id: 'cattle' as SpeciesCategory,
      label: 'Bétail & Ruminants',
      sublabel: 'Laitier (Holstein) & Embouche',
      icon: Milk,
      count: counts.cattle,
      highlight: '4 820 L/j • TB 40.2 g/kg',
      color: 'border-[#0B5345] text-[#0B5345]',
    },
    {
      id: 'swine' as SpeciesCategory,
      label: 'Filière Porcine',
      sublabel: 'Naisseur-Engraisseur (Large White)',
      icon: Beef,
      count: counts.swine,
      highlight: 'GMQ 810 g/j • IC 2.62',
      color: 'border-[#D35400] text-[#D35400]',
    },
    {
      id: 'aquaculture' as SpeciesCategory,
      label: 'Pisciculture',
      sublabel: 'Bassins Tilapia GIFT & Silure',
      icon: Fish,
      count: counts.aquaculture,
      highlight: 'O2: 5.9 mg/L • IC 1.22',
      color: 'border-teal-700 text-teal-800',
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5">
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedSpecies === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelect(tab.id)}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-left transition whitespace-nowrap border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                    isSelected
                      ? tab.id === 'swine'
                        ? 'bg-[#D35400] text-white'
                        : 'bg-[#0B5345] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="pr-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {tab.label}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {tab.count.toLocaleString('fr-FR')} têtes
                    </span>
                  </div>
                  <div
                    className={`text-[10px] truncate max-w-[190px] font-medium ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {tab.highlight}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
