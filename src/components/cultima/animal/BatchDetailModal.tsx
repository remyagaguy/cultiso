"use client";
import React from 'react';
import { 
  X, 
  Tag, 
  Calendar, 
  Scale, 
  Wheat, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Building,
  Layers,
  FileCheck
} from 'lucide-react';
import { BatchItem } from './types';

interface BatchDetailModalProps {
  batch: BatchItem | null;
  onClose: () => void;
}

export const BatchDetailModal: React.FC<BatchDetailModalProps> = ({ batch, onClose }) => {
  if (!batch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B5345] flex items-center justify-center text-white font-mono font-bold text-sm">
              {batch.code.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{batch.name}</h3>
                <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded text-emerald-300 font-bold">
                  {batch.code}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {batch.breed} • {batch.building}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Key Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Effectif Vivant</span>
              <span className="text-lg font-black font-mono text-slate-900">
                {batch.currentCount.toLocaleString('fr-FR')}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                / {batch.initialCount.toLocaleString('fr-FR')} (Départ)
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Poids Moyen Pesé</span>
              <span className="text-lg font-black font-mono text-slate-900">
                {batch.currentWeightAvg > 100 ? `${batch.currentWeightAvg} g` : `${batch.currentWeightAvg} kg`}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                Cible : {batch.targetWeightAvg > 100 ? `${batch.targetWeightAvg} g` : `${batch.targetWeightAvg} kg`}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Indice FCR (IC)</span>
              <span className="text-lg font-black font-mono text-[#0B5345]">
                {batch.fcrCurrent.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Benchmark : {batch.fcrTarget.toFixed(2)}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Mortalité Lot</span>
              <span className="text-lg font-black font-mono text-emerald-700">
                {batch.mortalityPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                {batch.mortalityCount} pertes déclarées
              </span>
            </div>
          </div>

          {/* Zootech Passport Detail Box */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-800 text-xs flex items-center justify-between">
              <span>Passeport Zootechnique & Fiche de Lot</span>
              <span className="text-[11px] font-mono text-[#0B5345] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Phase : {batch.phase}
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Date de mise en place :</span>
                  <span className="font-semibold text-slate-800 font-mono">{batch.startDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Âge physiologique :</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    {batch.ageDays} jours {batch.ageWeeks ? `(${batch.ageWeeks} sem)` : ''}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Gain Moyen Quotidien (GMQ) :</span>
                  <span className="font-semibold text-emerald-700 font-mono">+{batch.gmqActual} g/j</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Provende totale consommée :</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    {(batch.feedCumulativeKg / 1000).toFixed(1)} Tonnes
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Consommation journalière :</span>
                  <span className="font-semibold text-slate-800 font-mono">{batch.feedDailyKg} kg/j</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Facteur EPEF (Volaille) :</span>
                  <span className="font-semibold text-slate-800 font-mono">{batch.epef || '388'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Action Box */}
          <div className="bg-orange-50/50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D35400] text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Action Vétérinaire / Zootechnique Programmée
              </div>
              <div className="text-xs text-slate-700 mt-1 font-medium">
                {batch.nextAction.description}
              </div>
              <div className="text-[11px] text-[#D35400] font-semibold mt-1 font-mono">
                Date d'échéance : {batch.nextAction.dueDate}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => alert(`Certificat de traçabilité exporté pour le lot ${batch.code}`)}
            className="px-3.5 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <FileCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Télécharger Certificat Traçabilité</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
