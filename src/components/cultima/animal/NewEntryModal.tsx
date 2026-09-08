"use client";
import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Scale, 
  Egg, 
  Activity, 
  Wheat, 
  Stethoscope, 
  CheckCircle,
  Milk
} from 'lucide-react';
import { BatchItem } from './types';

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  batches: BatchItem[];
  onSaveEntry: (entry: any) => void;
}

export const NewEntryModal: React.FC<NewEntryModalProps> = ({
  isOpen,
  onClose,
  batches,
  onSaveEntry,
}) => {
  if (!isOpen) return null;

  const [entryType, setEntryType] = useState<'weighing' | 'egg_collection' | 'mortality' | 'feed' | 'vet'>('weighing');
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || '');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [numericValue, setNumericValue] = useState<string>('2450');
  const [notes, setNotes] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEntry({
      type: entryType,
      batchId: selectedBatchId,
      date,
      value: Number(numericValue),
      notes,
    });

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0B5345] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <PlusCircle className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Nouveau Relevé Zootechnique</h3>
              <p className="text-xs text-emerald-200">Enregistrement terrain temps réel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {successMessage ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-600 animate-bounce" />
              <div className="text-base font-bold text-slate-900">Relevé enregistré avec succès !</div>
              <p className="text-xs text-slate-500">Mise à jour des courbes et indicateurs en cours...</p>
            </div>
          ) : (
            <>
              {/* Entry Type Switcher */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Type d'opération
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setEntryType('weighing'); setNumericValue('2450'); }}
                    className={`p-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                      entryType === 'weighing'
                        ? 'border-[#0B5345] bg-emerald-50 text-[#0B5345] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Pesée (g)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEntryType('egg_collection'); setNumericValue('38400'); }}
                    className={`p-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                      entryType === 'egg_collection'
                        ? 'border-[#0B5345] bg-emerald-50 text-[#0B5345] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <Egg className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Ponte</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEntryType('mortality'); setNumericValue('3'); }}
                    className={`p-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                      entryType === 'mortality'
                        ? 'border-rose-600 bg-rose-50 text-rose-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Mortalité</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEntryType('feed'); setNumericValue('2800'); }}
                    className={`p-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                      entryType === 'feed'
                        ? 'border-[#D35400] bg-orange-50 text-[#D35400] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <Wheat className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Aliment (kg)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEntryType('vet'); setNumericValue('1'); }}
                    className={`p-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                      entryType === 'vet'
                        ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Soin / Vaccin</span>
                  </button>
                </div>
              </div>

              {/* Batch selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Sélectionner le lot / bande
                </label>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B5345] bg-white font-medium"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.code} — {b.name} ({b.building})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Value */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Date du relevé
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B5345] font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {entryType === 'weighing' ? 'Poids Moyen Pesé (g)' :
                     entryType === 'egg_collection' ? 'Quantité Récoltée (œufs)' :
                     entryType === 'mortality' ? 'Sujets Perdu(s)' :
                     entryType === 'feed' ? 'Aliment Distribué (kg)' :
                     'Quantité administrée'}
                  </label>
                  <input
                    type="number"
                    value={numericValue}
                    onChange={(e) => setNumericValue(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B5345] font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Observations */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Observations cliniques ou zootechniques
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Température ambiante normale, comportement homogène du cheptel, fientes normales..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B5345]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B5345] hover:bg-[#116a58] text-white rounded-lg text-xs font-bold shadow-xs transition"
                >
                  Valider et Enregistrer
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
