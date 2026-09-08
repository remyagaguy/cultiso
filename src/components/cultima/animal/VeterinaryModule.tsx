"use client";
import React from 'react';
import { 
  ShieldCheck, 
  Stethoscope, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { VeterinaryRecord } from './types';

interface VeterinaryModuleProps {
  records: VeterinaryRecord[];
  onNewPrescription: () => void;
}

export const VeterinaryModule: React.FC<VeterinaryModuleProps> = ({
  records,
  onNewPrescription,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:px-6 sm:py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0B5345] flex items-center justify-center">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Registre Sanitaire & Délais d'Attente Médicamenteux
            </h2>
            <p className="text-xs text-slate-500">
              Traçabilité vétérinaire, prophylaxie vaccinale et gestion des temps d'attente (zéro résidu)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-900 border border-amber-200/70 px-2.5 py-1 rounded-lg font-medium">
            <Clock className="w-3.5 h-3.5 text-[#D35400]" />
            <span><strong>2 lots</strong> sous délai d'attente actif</span>
          </div>
          <button
            onClick={onNewPrescription}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B5345] hover:bg-[#116a58] text-white text-xs font-bold rounded-lg transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Nouvelle Ordonnance</span>
          </button>
        </div>
      </div>

      {/* Sanitary Cards & Table */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Withdrawal Times (Délais d'attente) */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Délais d'Attente Viande / Lait</span>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded">Priorité Sanitaire</span>
          </h3>

          <div className="space-y-2.5">
            {records
              .filter((r) => r.isWithdrawalActive)
              .map((rec) => (
                <div
                  key={rec.id}
                  className="bg-orange-50/40 border border-orange-200/80 rounded-xl p-3.5 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[11px] font-bold bg-white text-slate-800 px-1.5 py-0.5 rounded border border-orange-200">
                        {rec.batchCode}
                      </span>
                      <span className="ml-2 text-xs font-semibold text-slate-800">
                        {rec.species}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D35400] bg-orange-100 px-1.5 py-0.5 rounded">
                      Attente active
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-bold text-slate-900">
                    {rec.treatmentName}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {rec.indication}
                  </div>

                  <div className="mt-3 pt-2 border-t border-orange-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">Fin de délai :</span>
                    <span className="font-mono font-bold text-[#D35400] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rec.withdrawalEndDate}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Biosecurity Checklist Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0B5345]" />
              <span>Contrôle Biosécurité Hebdomadaire</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span>Pédiluves désinfectants (Glutaraldéhyde)</span>
              <span className="text-emerald-700 font-bold">Renouvelé (07/09)</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span>Sas sanitaire & Hygiène personnel</span>
              <span className="text-emerald-700 font-bold">100% Conforme</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span>Plan de dératisation / désinsectisation</span>
              <span className="text-emerald-700 font-bold">Postes vérifiés</span>
            </div>
          </div>
        </div>

        {/* Right Column: Historical Veterinary Register Table */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Dernières Interventions & Prophylaxie Vaccinale
          </h3>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Lot concerné</th>
                  <th className="py-2.5 px-3">Produit & Posologie</th>
                  <th className="py-2.5 px-3">Prescripteur</th>
                  <th className="py-2.5 px-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap">
                      {r.date}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                      {r.batchCode}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-900">{r.treatmentName}</div>
                      <div className="text-[11px] text-slate-500">{r.dosage}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {r.administeredBy}
                    </td>
                    <td className="py-2.5 px-3">
                      {r.isWithdrawalActive ? (
                        <span className="text-[10px] font-bold text-[#D35400] bg-orange-100 px-2 py-0.5 rounded">
                          Attente ({r.withdrawalPeriodDays}j)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Clôturé
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
