"use client";
import React from 'react';
import { 
  Users, 
  Activity, 
  Scale, 
  Wheat, 
  Egg, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Droplets,
  DollarSign,
  Milk,
  Fish
} from 'lucide-react';
import { ZootechKPIs, SpeciesCategory } from './types';

interface MetricCardsProps {
  kpis: ZootechKPIs;
  species: SpeciesCategory;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ kpis, species }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {/* CARD 1: Cheptel Actif */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Cheptel Actif</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0B5345] flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            {kpis.totalHeads.toLocaleString('fr-FR')}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            Sujets sous monitoring continu
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center text-emerald-700 font-semibold">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            +{kpis.totalHeadsChangePercent}% ce mois
          </span>
          <span className="text-slate-400 font-medium">Bande saine</span>
        </div>
      </div>

      {/* CARD 2: Indice de Consommation Alimentaire (IC / FCR) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full pointer-events-none -mr-4 -mt-4 opacity-50"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#0B5345] uppercase tracking-wider">Indice FCR (IC)</span>
            <span className="text-[9px] bg-emerald-100/70 text-[#0B5345] font-bold px-1 rounded">Clé</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-[#0B5345]/10 text-[#0B5345] flex items-center justify-center">
            <Scale className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-[#0B5345] font-mono tracking-tight">
              {kpis.feedConversionRatio.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 font-medium">kg alim/kg</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            Objectif guide : <span className="font-semibold text-slate-700">{kpis.fcrBenchmark.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
            <ArrowDownRight className="w-3 h-3 mr-0.5" />
            -4.7% (Gain efficience)
          </span>
          <span className="text-emerald-700 font-bold">Optimal</span>
        </div>
      </div>

      {/* CARD 3: Taux de Mortalité Cumulée */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mortalité Cumulée</span>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            kpis.mortalityRate <= kpis.mortalityBenchmark 
              ? 'bg-emerald-50 text-emerald-700' 
              : 'bg-rose-50 text-rose-700'
          }`}>
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black font-mono tracking-tight ${
              kpis.mortalityRate <= kpis.mortalityBenchmark ? 'text-slate-900' : 'text-rose-600'
            }`}>
              {kpis.mortalityRate.toFixed(2)}%
            </span>
            <span className="text-xs text-slate-400">du lot</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            Seuil max toléré : <span className="font-semibold text-slate-700">{kpis.mortalityBenchmark.toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
            Sous seuil critique
          </span>
          <span className="text-slate-500 font-mono">0.03%/j</span>
        </div>
      </div>

      {/* CARD 4: Production Journalière Spécialisée */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {species === 'poultry' ? 'Ponte Journalière' : 
             species === 'cattle' ? 'Traite Journalière' : 
             species === 'aquaculture' ? 'Biomasse Bassin' : 
             'Rendement / Jour'}
          </span>
          <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#D35400] flex items-center justify-center">
            {species === 'poultry' ? <Egg className="w-3.5 h-3.5" /> : 
             species === 'cattle' ? <Milk className="w-3.5 h-3.5" /> : 
             species === 'aquaculture' ? <Fish className="w-3.5 h-3.5" /> : 
             <TrendingUp className="w-3.5 h-3.5" />}
          </div>
        </div>

        <div className="mt-2.5">
          {species === 'poultry' || species === 'all' ? (
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {kpis.dailyProduction.eggs.toLocaleString('fr-FR')}
                </span>
                <span className="text-xs text-slate-500 font-medium">œufs</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                <span>Taux de ponte :</span>
                <span className="font-bold text-[#0B5345]">{kpis.dailyProduction.layingRate}%</span>
              </div>
            </div>
          ) : species === 'cattle' ? (
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {kpis.dailyProduction.milk.toLocaleString('fr-FR')}
                </span>
                <span className="text-xs text-slate-500 font-medium">Litres</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                TB: 40.2 g/kg • TP: 32.8 g/kg
              </div>
            </div>
          ) : species === 'aquaculture' ? (
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  +{kpis.dailyProduction.fishBiomassGainKg}
                </span>
                <span className="text-xs text-slate-500 font-medium">kg/j</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Gain biomasse (Tilapia + Silure)
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {kpis.gmq}
                </span>
                <span className="text-xs text-slate-500 font-medium">g/j</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Gain Moyen Quotidien (GMQ)
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Qualité Grade A</span>
          <span className="font-bold text-slate-700">98.4%</span>
        </div>
      </div>

      {/* CARD 5: Trésorerie & Marge sur Coût Aliment (MCAS) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Marge Aliment (MCAS)</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
              {kpis.treasury.marginOverFeedRate.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-500 font-medium">Marge brute</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            Rev. MTD : <span className="font-semibold text-slate-800">{kpis.treasury.revenueMonth.toLocaleString('fr-FR')} €</span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Break-even IC :</span>
          <span className="font-mono font-bold text-slate-800">{kpis.treasury.breakEvenFcr}</span>
        </div>
      </div>

      {/* CARD 6: Stocks Silos & Autonomie Provendes */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Autonomie Silos</span>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            kpis.feedStock.autonomyDays < 4 
              ? 'bg-amber-100 text-[#D35400]' 
              : 'bg-emerald-50 text-[#0B5345]'
          }`}>
            <Wheat className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black font-mono tracking-tight ${
              kpis.feedStock.autonomyDays < 4 ? 'text-[#D35400]' : 'text-slate-900'
            }`}>
              {kpis.feedStock.autonomyDays.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-medium">Jours</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            Stock total : <span className="font-semibold text-slate-800">{kpis.feedStock.totalTons} Tonnes</span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Conso/jour :</span>
          <span className="font-mono font-semibold text-slate-700">
            {(kpis.feedStock.consumptionTodayKg / 1000).toFixed(1)} T/j
          </span>
        </div>
      </div>
    </div>
  );
};
