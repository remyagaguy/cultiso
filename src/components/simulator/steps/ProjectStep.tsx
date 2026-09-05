"use client";
import React from 'react';
import { useSimulator } from '@/lib/simulator/SimulatorContext';
import { TextInput, NumberInput, RadioCards, RadioOption } from '../ui';
import { CultivationType } from '@/lib/simulator/types';

const TYPE_OPTIONS: RadioOption[] = [
  { id: 'cultures_vivrieres', label: 'Cultures vivrières', description: 'Maïs, manioc, riz, mil...' },
  { id: 'cultures_de_rente', label: 'Cultures de rente', description: 'Cacao, café, coton, hévéa...' },
  { id: 'maraichage', label: 'Maraîchage', description: 'Tomates, oignons, légumes...' },
  { id: 'elevage', label: 'Élevage', description: 'Aviculture, porciculture, bovin...' },
];

export function ProjectStep() {
  const { state, updateProject } = useSimulator();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-unbounded text-2xl text-white font-bold mb-2">Définition du projet</h2>
        <p className="text-[#6B857E] text-sm">Commençons par les bases de votre exploitation.</p>
      </div>

      <TextInput
        label="Nom du projet"
        placeholder="Ex: Ferme Espoir..."
        value={state.project.name}
        onChange={e => updateProject({ name: e.target.value })}
      />

      <RadioCards
        label="Type d'exploitation"
        options={TYPE_OPTIONS}
        value={state.project.type}
        onChange={val => updateProject({ type: val as CultivationType })}
      />

      <NumberInput
        label="Taille de l'exploitation"
        description="Superficie ou nombre de têtes pour l'élevage"
        unit="Hectares / Têtes"
        value={state.project.areaSize || ''}
        onChange={e => updateProject({ areaSize: parseFloat(e.target.value) || 0 })}
      />
    </div>
  );
}
