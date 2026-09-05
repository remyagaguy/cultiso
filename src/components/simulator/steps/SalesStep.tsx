"use client";
import React from 'react';
import { useSimulator } from '@/lib/simulator/SimulatorContext';
import { NumberInput } from '../ui';

export function SalesStep() {
  const { state, updateSales } = useSimulator();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-unbounded text-2xl text-white font-bold mb-2">Prévisions de Ventes</h2>
        <p className="text-[#6B857E] text-sm">Estimez vos revenus attendus à la récolte ou vente.</p>
      </div>

      <NumberInput
        label="Rendement attendu"
        description="Quantité totale produite (Tonnes, Kg, ou unités)"
        unit="Qté"
        value={state.sales.expectedYield || ''}
        onChange={e => updateSales({ expectedYield: parseFloat(e.target.value) || 0 })}
      />

      <NumberInput
        label="Prix de vente unitaire moyen"
        description="Prix estimé sur le marché au moment de la vente"
        unit="FCFA / Qté"
        value={state.sales.unitPrice || ''}
        onChange={e => updateSales({ unitPrice: parseFloat(e.target.value) || 0 })}
      />
    </div>
  );
}
