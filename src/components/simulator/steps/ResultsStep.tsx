"use client";
import React from 'react';
import { useSimulator } from '@/lib/simulator/SimulatorContext';
import { calculateRevenue, calculateTotalCapex, calculateTotalOpex, calculateROI } from '@/lib/simulator/logic';

export function ResultsStep() {
  const { state } = useSimulator();

  const revenue = calculateRevenue(state);
  const totalCapex = calculateTotalCapex(state);
  const totalOpex = calculateTotalOpex(state);
  const roi = calculateROI(state);
  
  // Fake blurred logic
  return (
    <div className="flex flex-col items-center text-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8">
      <div>
        <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 className="font-unbounded text-3xl text-white font-bold mb-3">Simulation terminée</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto">
          Vos données ont été analysées. Connectez-vous pour découvrir la viabilité financière de votre projet <strong className="text-white">{state.project.name || "Agricole"}</strong>.
        </p>
      </div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
        
        {/* Blurry Overlay */}
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-[#052821]/60 flex flex-col items-center justify-center transition-all">
          <button className="px-8 py-3.5 bg-[#D35400] text-white rounded-xl font-bold text-sm hover:bg-[#E67E22] transition-all shadow-[0_0_20px_rgba(211,84,0,0.3)] hover:shadow-[0_0_30px_rgba(211,84,0,0.5)] active:scale-[0.98]">
            Créer un compte
          </button>
          <div className="text-xs text-white/50 mt-4 hover:text-white transition-colors cursor-pointer">
            Voir un aperçu invité
          </div>
        </div>

        {/* Fake underlying data */}
        <div className="flex flex-col gap-4 opacity-40 select-none pointer-events-none">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-white/60 uppercase text-xs font-semibold tracking-widest">Chiffre d'affaires</span>
            <span className="text-white font-unbounded">{new Intl.NumberFormat('fr-FR').format(revenue)} FCFA</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-white/60 uppercase text-xs font-semibold tracking-widest">Investissements (CAPEX)</span>
            <span className="text-white font-unbounded">{new Intl.NumberFormat('fr-FR').format(totalCapex)} FCFA</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-white/60 uppercase text-xs font-semibold tracking-widest">Charges (OPEX)</span>
            <span className="text-white font-unbounded">{new Intl.NumberFormat('fr-FR').format(totalOpex)} FCFA</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[#22c55e] uppercase text-sm font-bold tracking-widest">Retour sur investissement</span>
            <span className="text-[#22c55e] font-unbounded font-bold text-xl">{roi.toFixed(1)} %</span>
          </div>
        </div>
      </div>
    </div>
  );
}
