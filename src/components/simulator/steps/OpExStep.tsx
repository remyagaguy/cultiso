"use client";
import React from 'react';
import { useSimulator } from '@/lib/simulator/SimulatorContext';
import { NumberInput } from '../ui';

export function OpExStep() {
  const { state, updateOpex } = useSimulator();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-unbounded text-2xl text-white font-bold mb-2">Charges d'Exploitation (OPEX)</h2>
        <p className="text-[#6B857E] text-sm">Combien vous coûte un cycle de production ?</p>
      </div>

      <NumberInput
        label="Intrants agricoles"
        description="Semences, engrais, produits phytosanitaires, aliments bétail..."
        unit="FCFA"
        value={state.opex.inputs || ''}
        onChange={e => updateOpex({ inputs: parseFloat(e.target.value) || 0 })}
      />

      <NumberInput
        label="Main d'œuvre"
        description="Salaires, journaliers, location de machines..."
        unit="FCFA"
        value={state.opex.labor || ''}
        onChange={e => updateOpex({ labor: parseFloat(e.target.value) || 0 })}
      />
    </div>
  );
}
