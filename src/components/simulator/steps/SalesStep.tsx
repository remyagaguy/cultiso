"use client";
import React, { useEffect } from 'react';
import { useSimulator } from '@/lib/simulator/SimulatorContext';
import { NumberInput } from '../ui';
import { calculateAgronomicYield } from '@/lib/simulator/agronomicEngine';

export function SalesStep() {
  const { state, updateSales } = useSimulator();

  const dynamicYield = calculateAgronomicYield(state);
  
  // S'assurer que le expectedYield dans l'état est synchronisé si on en a besoin ailleurs
  useEffect(() => {
    if (state.sales.expectedYield !== dynamicYield) {
      updateSales({ expectedYield: dynamicYield });
    }
  }, [dynamicYield, state.sales.expectedYield, updateSales]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-unbounded text-2xl text-white font-bold mb-2">Prévisions de Ventes</h2>
        <p className="text-[#6B857E] text-sm">Les revenus sont basés sur le rendement simulé.</p>
      </div>

      <div className="bg-[#0D211A] border border-[#1A3329] rounded-xl p-5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#D35400] opacity-5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <h3 className="text-white font-medium mb-1">Rendement Agronomique Simulé</h3>
        <p className="text-[#6B857E] text-sm mb-4">Calculé automatiquement selon le sol, la culture et la surface.</p>
        <div className="text-3xl font-unbounded font-bold text-[#D35400]">
          {dynamicYield} <span className="text-lg text-white font-normal">Tonnes</span>
        </div>
      </div>

      <NumberInput
        label="Prix de vente unitaire moyen"
        description="Prix estimé sur le marché (FCFA / Tonne)"
        unit="FCFA / T"
        value={state.sales.unitPrice || ''}
        onChange={e => updateSales({ unitPrice: parseFloat(e.target.value) || 0 })}
      />
    </div>
  );
}
