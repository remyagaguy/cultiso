"use client";
import React from 'react';
import { 
  Wheat, 
  AlertTriangle, 
  CheckCircle, 
  Truck, 
  Clock, 
  TrendingDown, 
  Layers,
  ArrowRight,
  Plus
} from 'lucide-react';
import { SiloItem } from './types';

interface FeedSiloModuleProps {
  silos: SiloItem[];
  onOrderFeed: (silo: SiloItem) => void;
}

export const FeedSiloModule: React.FC<FeedSiloModuleProps> = ({ silos, onOrderFeed }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:px-6 sm:py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0B5345] flex items-center justify-center">
            <Wheat className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Gestion Alimentaire & Télémétrie Silos (Provendes)
            </h2>
            <p className="text-xs text-slate-500">
              Niveaux en temps réel, vitesse d'épuisement et gestion des réapprovisionnements
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">
            Capacité totale : <strong className="text-slate-800">91 Tonnes</strong>
          </span>
        </div>
      </div>

      {/* Silos Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {silos.map((silo) => {
          const isCritical = silo.daysRemaining < 3;
          const isWarning = silo.daysRemaining >= 3 && silo.daysRemaining < 5;

          return (
            <div
              key={silo.id}
              className={`rounded-xl border p-4 flex flex-col justify-between transition relative overflow-hidden ${
                isCritical
                  ? 'border-[#D35400] bg-orange-50/30 ring-1 ring-[#D35400]/30'
                  : isWarning
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Top info */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                    {silo.name.split('—')[0].trim()}
                  </span>
                  {isCritical ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-[#D35400] text-white px-1.5 py-0.2 rounded">
                      <AlertTriangle className="w-3 h-3" />
                      Critique
                    </span>
                  ) : isWarning ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                      Alerte
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      Nominal
                    </span>
                  )}
                </div>

                <div className="mt-2 font-bold text-slate-900 text-sm leading-tight">
                  {silo.name.split('—')[1] || silo.name}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                  {silo.feedType}
                </div>

                {/* Visual Silo Gauge Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 text-[11px]">Remplissage</span>
                    <span className="font-mono font-bold text-slate-900">{silo.fillPercentage}%</span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical
                          ? 'bg-[#D35400]'
                          : isWarning
                          ? 'bg-amber-500'
                          : 'bg-[#0B5345]'
                      }`}
                      style={{ width: `${silo.fillPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stock Stats */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Stock Actuel</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {silo.currentTons} T
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">/ {silo.capacityTons} T</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Autonomie</span>
                    <span
                      className={`font-mono font-bold text-sm ${
                        isCritical ? 'text-[#D35400]' : 'text-slate-900'
                      }`}
                    >
                      {silo.daysRemaining.toFixed(1)} j
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      -{silo.dailyConsumptionTons} T/j
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onOrderFeed(silo)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    isCritical
                      ? 'bg-[#D35400] text-white hover:bg-[#a04000]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{isCritical ? 'Commander d\'urgence' : 'Commander provende'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
