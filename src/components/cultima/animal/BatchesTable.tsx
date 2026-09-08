"use client";
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle, 
  Scale, 
  Calendar, 
  Clock, 
  ChevronRight,
  ShieldAlert,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { BatchItem, SpeciesCategory } from './types';

interface BatchesTableProps {
  batches: BatchItem[];
  selectedSpecies: SpeciesCategory;
  onSelectBatch: (batch: BatchItem) => void;
}

export const BatchesTable: React.FC<BatchesTableProps> = ({
  batches,
  selectedSpecies,
  onSelectBatch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');

  // Filter batches based on species, phase, search
  const filteredBatches = batches.filter((b) => {
    const matchesSpecies = selectedSpecies === 'all' || b.species === selectedSpecies;
    const matchesSearch = 
      b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = phaseFilter === 'all' || b.phase === phaseFilter;

    return matchesSpecies && matchesSearch && matchesPhase;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:px-6 sm:py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-slate-900">
            Bandes & Lots en Production Active
          </h2>
          <span className="text-xs bg-[#0B5345]/10 text-[#0B5345] font-bold px-2 py-0.5 rounded-full font-mono">
            {filteredBatches.length} {filteredBatches.length > 1 ? 'lots' : 'lot'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par code, souche, bâtiment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B5345] text-slate-800"
            />
          </div>

          {/* Phase Filter */}
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#0B5345]"
          >
            <option value="all">Toutes phases</option>
            <option value="Démarrage">Démarrage</option>
            <option value="Croissance">Croissance</option>
            <option value="Finition">Finition</option>
            <option value="Ponte Pic">Ponte Pic</option>
            <option value="Production Lait">Production Lait</option>
            <option value="Grossissement">Grossissement</option>
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
              <th className="py-3 px-4 sm:px-6">Lot / Souche</th>
              <th className="py-3 px-3">Bâtiment / Bassin</th>
              <th className="py-3 px-3">Âge physiologique</th>
              <th className="py-3 px-3">Effectif Actif</th>
              <th className="py-3 px-3">Mortalité (%)</th>
              <th className="py-3 px-3">Poids Moyen</th>
              <th className="py-3 px-3">Indice IC (FCR)</th>
              <th className="py-3 px-3">Prochaine Intervention</th>
              <th className="py-3 px-4 text-right">Fiche Zootech</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {filteredBatches.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  Aucun lot trouvé correspondant aux critères.
                </td>
              </tr>
            ) : (
              filteredBatches.map((batch) => {
                const isMortalityHigh = batch.mortalityPercent > 1.8;
                const isFcrOptimal = batch.fcrCurrent <= batch.fcrTarget;

                return (
                  <tr 
                    key={batch.id} 
                    className="hover:bg-slate-50/80 transition group cursor-pointer"
                    onClick={() => onSelectBatch(batch)}
                  >
                    {/* Code & Name */}
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[11px] border border-slate-200">
                          {batch.code}
                        </span>
                        {batch.status === 'harvest_ready' && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            Prêt Récolte
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-slate-800 mt-1">
                        {batch.name}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Tag className="w-3 h-3 text-slate-400" />
                        <span>{batch.breed}</span>
                      </div>
                    </td>

                    {/* Building */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-700">{batch.building}</div>
                      <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {batch.phase}
                      </span>
                    </td>

                    {/* Age */}
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-slate-900">
                        {batch.ageWeeks ? `Sem ${batch.ageWeeks} (${batch.ageDays}j)` : `${batch.ageDays} jours`}
                      </div>
                      <div className="text-[10px] text-slate-400">Démarré le {batch.startDate}</div>
                    </td>

                    {/* Count */}
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-slate-900">
                        {batch.currentCount.toLocaleString('fr-FR')}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Init : {batch.initialCount.toLocaleString('fr-FR')}
                      </div>
                    </td>

                    {/* Mortality */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono font-bold ${
                          isMortalityHigh ? 'text-rose-600' : 'text-emerald-700'
                        }`}>
                          {batch.mortalityPercent.toFixed(2)}%
                        </span>
                        {isMortalityHigh && <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {batch.mortalityCount} pertes
                      </div>
                    </td>

                    {/* Weight */}
                    <td className="py-3 px-3">
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono font-bold text-slate-900">
                          {batch.currentWeightAvg > 100 ? `${batch.currentWeightAvg}g` : `${batch.currentWeightAvg}kg`}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          / {batch.targetWeightAvg > 100 ? `${batch.targetWeightAvg}g` : `${batch.targetWeightAvg}kg`}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        GMQ: +{batch.gmqActual}g/j
                      </div>
                    </td>

                    {/* FCR (IC) */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-xs ${
                          isFcrOptimal 
                            ? 'bg-emerald-50 text-[#0B5345] border border-emerald-200' 
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {batch.fcrCurrent.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          (cible {batch.fcrTarget.toFixed(2)})
                        </span>
                      </div>
                      {batch.epef && (
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          EPEF: <span className="font-bold text-slate-700">{batch.epef}</span>
                        </div>
                      )}
                    </td>

                    {/* Next action */}
                    <td className="py-3 px-3 max-w-[210px]">
                      <div className="text-[11px] text-slate-800 line-clamp-1 font-semibold">
                        {batch.nextAction.description}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Échéance : {batch.nextAction.dueDate}</span>
                      </div>
                    </td>

                    {/* Detail Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBatch(batch);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B5345] hover:bg-emerald-50 transition"
                        title="Consulter le dossier zootechnique complet"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
