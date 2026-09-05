"use client";
import React from 'react';
import { useSimulator } from '@/lib/simulator/SimulatorContext';
import { NumberInput } from '../ui';

export function InvestStep() {
  const { state, updateCapex } = useSimulator();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-unbounded text-2xl text-white font-bold mb-2">Investissements Initiaux (CAPEX)</h2>
        <p className="text-[#6B857E] text-sm">Quels sont les coûts de démarrage avant même de produire ?</p>
      </div>

      <NumberInput
        label="Infrastructures & Bâtiments"
        description="Aménagements, forages, serres, poulaillers, etc."
        unit="FCFA"
        value={state.capex.infrastructure || ''}
        onChange={e => updateCapex({ infrastructure: parseFloat(e.target.value) || 0 })}
      />

      <NumberInput
        label="Matériel & Équipements"
        description="Tracteurs, systèmes d'irrigation, petits outillages..."
        unit="FCFA"
        value={state.capex.equipment || ''}
        onChange={e => updateCapex({ equipment: parseFloat(e.target.value) || 0 })}
      />
    </div>
  );
}
