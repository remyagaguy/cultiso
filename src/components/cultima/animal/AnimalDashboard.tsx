"use client";
import React, { useState, useMemo } from 'react';
import { 
  mockKPIs, 
  mockBatches, 
  mockGrowthCurve, 
  mockLayingCurve, 
  mockFeedCurve, 
  mockFinancials, 
  mockSilos, 
  mockVeterinaryRecords, 
  mockWaterQuality 
} from './data/mockData';
import { SpeciesCategory, BatchItem, SiloItem } from './types';
import { Header } from './Header';
import { SpeciesSelector } from './SpeciesSelector';
import { MetricCards } from './MetricCards';
import { ZootechCharts } from './charts/ZootechCharts';
import { BatchesTable } from './BatchesTable';
import { FeedSiloModule } from './FeedSiloModule';
import { VeterinaryModule } from './VeterinaryModule';
import { ZootechSimulatorModal } from './ZootechSimulatorModal';
import { BatchDetailModal } from './BatchDetailModal';
import { NewEntryModal } from './NewEntryModal';
import { 
  Fish, 
  Waves, 
  Thermometer, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AnimalDashboard() {
  const [currentSite, setCurrentSite] = useState<string>('Domaine Agro-Pastoral de la Vallée');
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesCategory>('all');
  const [batches, setBatches] = useState<BatchItem[]>(mockBatches);
  const [silos, setSilos] = useState<SiloItem[]>(mockSilos);
  
  // Modals
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null);

  // Quick Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs filtered by species
  const currentKPIs = mockKPIs[selectedSpecies] || mockKPIs.all;

  // Counts for species tabs
  const counts = useMemo(() => ({
    all: mockKPIs.all.totalHeads,
    poultry: mockKPIs.poultry.totalHeads,
    cattle: mockKPIs.cattle.totalHeads,
    swine: mockKPIs.swine.totalHeads,
    aquaculture: mockKPIs.aquaculture.totalHeads,
  }), []);

  // Save new field entry
  const handleSaveEntry = (newEntry: any) => {
    if (newEntry.type === 'mortality') {
      setBatches(prev => prev.map(b => {
        if (b.id === newEntry.batchId) {
          const newMort = b.mortalityCount + newEntry.value;
          const newCurrent = Math.max(0, b.currentCount - newEntry.value);
          const newPercent = (newMort / b.initialCount) * 100;
          return {
            ...b,
            mortalityCount: newMort,
            currentCount: newCurrent,
            mortalityPercent: newPercent,
          };
        }
        return b;
      }));
      showToast(`Mortalité de ${newEntry.value} sujet(s) enregistrée au registre sanitaire.`);
    } else if (newEntry.type === 'weighing') {
      setBatches(prev => prev.map(b => {
        if (b.id === newEntry.batchId) {
          return {
            ...b,
            currentWeightAvg: newEntry.value,
          };
        }
        return b;
      }));
      showToast(`Pesée de contrôle (${newEntry.value}g) synchronisée sur la courbe de croissance.`);
    } else {
      showToast(`Relevé de production enregistré avec succès.`);
    }
  };

  // Order feed trigger
  const handleOrderFeed = (silo: SiloItem) => {
    showToast(`Bon de commande provende généré pour ${silo.name} (${silo.supplier}). Livraison planifiée sous 24h.`);
  };

  // Export Audit report
  const handleExportAudit = () => {
    showToast(`Dossier d'Audit Zootechnique & Registre Réglementaire (Format PDF ISO 22000) généré avec succès.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-[#0B5345] selection:text-white">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentSite={currentSite}
        onSelectSite={(site) => {
          setCurrentSite(site);
          showToast(`Changement de site d'exploitation : ${site}`);
        }}
        kpis={currentKPIs}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenNewEntry={() => setIsNewEntryOpen(true)}
        onExportAudit={handleExportAudit}
      />

      {/* Species / Atelier Navigation Filter */}
      <SpeciesSelector
        selectedSpecies={selectedSpecies}
        onSelect={(sp) => setSelectedSpecies(sp)}
        counts={counts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Core Zootechnical & Financial KPI Cards */}
        <section>
          <MetricCards kpis={currentKPIs} species={selectedSpecies} />
        </section>

        {/* Aquaculture Dedicated Sensors (when Aquaculture or All is selected) */}
        {(selectedSpecies === 'aquaculture' || selectedSpecies === 'all') && (
          <section className="bg-gradient-to-r from-teal-900 to-[#0B5345] text-white rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-800 flex items-center justify-center text-teal-200">
                  <Fish className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Station Télémétrique Aquacole & Qualité de l'Eau
                    <span className="text-[10px] bg-teal-700 text-teal-100 font-bold px-1.5 py-0.2 rounded font-mono">
                      Capteurs Submersibles IoT
                    </span>
                  </h3>
                  <p className="text-xs text-teal-200/80">
                    Paramètres critiques de l'étang semi-intensif et des bassins bétonnés Tilapia / Silure
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-teal-200">
                  Biomasse estimée : <strong className="text-white font-mono">14 250 kg</strong>
                </span>
                <span className="text-teal-400">•</span>
                <span className="text-teal-200">
                  IC Aquacole : <strong className="text-emerald-300 font-mono">1.22</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {mockWaterQuality.map((wq, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-teal-950/40 border border-teal-700/40 rounded-lg p-3">
                    <div className="text-[11px] text-teal-300 font-semibold truncate">{wq.bassinId}</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-lg font-black font-mono text-white">{wq.dissolvedOxygenMgL}</span>
                      <span className="text-xs text-teal-300">mg/L O₂</span>
                    </div>
                    <div className="text-[10px] text-teal-400 mt-0.5">
                      {wq.dissolvedOxygenMgL >= 5.0 ? 'Saturation optimale (>5mg/L)' : 'Aération d\'appoint requise'}
                    </div>
                  </div>

                  <div className="bg-teal-950/40 border border-teal-700/40 rounded-lg p-3">
                    <div className="text-[11px] text-teal-300 font-semibold">Température & pH</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-lg font-black font-mono text-white">{wq.temperatureC}°C</span>
                      <span className="text-xs text-teal-300">• pH {wq.ph}</span>
                    </div>
                    <div className="text-[10px] text-teal-400 mt-0.5">
                      NH3 : {wq.ammoniaMgL} mg/L (Sécurisé)
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Interactive Recharts Visualizations */}
        <section>
          <ZootechCharts
            growthData={mockGrowthCurve}
            layingData={mockLayingCurve}
            feedData={mockFeedCurve}
            financialData={mockFinancials}
            species={selectedSpecies}
          />
        </section>

        {/* Active Batches & Livestock Dynamics Table */}
        <section>
          <BatchesTable
            batches={batches}
            selectedSpecies={selectedSpecies}
            onSelectBatch={(batch) => setSelectedBatch(batch)}
          />
        </section>

        {/* Feed & Silo Management Module (Provendes) */}
        <section>
          <FeedSiloModule
            silos={silos}
            onOrderFeed={handleOrderFeed}
          />
        </section>

        {/* Veterinary Care & Drug Withdrawal Times Module */}
        <section>
          <VeterinaryModule
            records={mockVeterinaryRecords}
            onNewPrescription={() => {
              showToast("Ouverture de l'ordonnancier vétérinaire électronique.");
            }}
          />
        </section>
      </main>

      {/* Modals */}
      <ZootechSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

      <BatchDetailModal
        batch={selectedBatch}
        onClose={() => setSelectedBatch(null)}
      />

      <NewEntryModal
        isOpen={isNewEntryOpen}
        onClose={() => setIsNewEntryOpen(false)}
        batches={batches}
        onSaveEntry={handleSaveEntry}
      />

      {/* Corporate ERP Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">Cultima ERP</span>
            <span>— Plateforme Intégrée d'Ingénierie Zootechnique & Gestion d'Élevage</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Conforme Traçabilité Sanitaire Régionale & Normes ISO</span>
            <span>•</span>
            <span className="font-mono text-slate-700">Cultima v4.8 Enterprise</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
