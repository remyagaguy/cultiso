"use client";
import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Wallet, 
  TrendingUp, 
  PlusCircle, 
  Calculator, 
  Download, 
  Bell, 
  ChevronDown,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { ZootechKPIs } from './types';

interface HeaderProps {
  currentSite: string;
  onSelectSite: (site: string) => void;
  kpis: ZootechKPIs;
  onOpenSimulator: () => void;
  onOpenNewEntry: () => void;
  onExportAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSite,
  onSelectSite,
  kpis,
  onOpenSimulator,
  onOpenNewEntry,
  onExportAudit,
}) => {
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sites = [
    { id: 'site-1', name: 'Domaine Agro-Pastoral de la Vallée', role: 'Siège & Multi-Ateliers' },
    { id: 'site-2', name: 'Station Avicole & Couvoir Ouest', role: 'Volaille Chair & Pondeuses' },
    { id: 'site-3', name: 'Complexe Porcin Nord-Koba', role: 'Naisseur-Engraisseur' },
    { id: 'site-4', name: 'Ferme Aquacole Djoliba Bassins', role: 'Pisciculture Tilapia & Clarias' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner: Corporate System Status & Brand Bar */}
      <div className="bg-[#07382e] text-emerald-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white font-semibold">Cultima Telemetry v4.8</span>
            <span className="text-emerald-300/70">|</span>
            <span className="hidden sm:inline text-emerald-200">Réseau Capteurs IoT Silos & Peseuses Connectées</span>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-[#0B5345] px-2 py-0.5 rounded border border-emerald-600/40 text-[11px] text-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Biosécurité Niveau 3 • Conforme Décret Vétérinaire</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-emerald-200">
            Délai d'attente médicamenteux : <strong className="text-amber-300">2 lots sous surveillance</strong>
          </span>
          <span className="hidden lg:inline text-emerald-300/60">•</span>
          <span className="text-emerald-200">
            Dernière sync : <span className="font-mono text-white">08/09/2026 - 10:14</span>
          </span>
        </div>
      </div>

      {/* Main App Header */}
      <div className="px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Site Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Cultima Monogram Crest */}
            <div className="w-11 h-11 rounded-xl bg-[#0B5345] flex items-center justify-center text-white font-black text-xl shadow-md border border-emerald-700/50 relative overflow-hidden group">
              <div className="absolute -right-2 -bottom-2 w-7 h-7 bg-[#D35400] rounded-full opacity-90"></div>
              <span className="relative z-10 tracking-tight">C</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                  Cultima
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#fbeee6] text-[#D35400] px-2 py-0.5 rounded border border-[#D35400]/20">
                  ERP ZOOTECH
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Système Central de Pilotage de la Production Animale
              </p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

          {/* Farm Site Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSiteDropdownOpen(!siteDropdownOpen)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 transition"
            >
              <Building2 className="w-3.5 h-3.5 text-[#0B5345]" />
              <span className="max-w-[210px] truncate text-left">{currentSite}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${siteDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {siteDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Sélectionner un site d'élevage
                </div>
                {sites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => {
                      onSelectSite(site.name);
                      setSiteDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-start gap-2.5 transition ${
                      currentSite === site.name ? 'bg-emerald-50/70 border-l-3 border-[#0B5345]' : ''
                    }`}
                  >
                    <Building2 className={`w-4 h-4 mt-0.5 ${currentSite === site.name ? 'text-[#0B5345]' : 'text-slate-400'}`} />
                    <div>
                      <div className={`text-xs font-semibold ${currentSite === site.name ? 'text-[#0B5345]' : 'text-slate-800'}`}>
                        {site.name}
                      </div>
                      <div className="text-[11px] text-slate-500">{site.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Treasury ticker & High-level actions */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Treasury Quick Badge */}
          <div className="hidden xl:flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Wallet className="w-3.5 h-3.5 text-[#0B5345]" />
              <span className="text-slate-500">Trésorerie Dispo:</span>
              <span className="font-bold text-slate-900 font-mono">
                {kpis.treasury.cashBalance.toLocaleString('fr-FR')} €
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Marge/Aliment (MCAS):</span>
              <span className="font-bold text-emerald-700 font-mono bg-emerald-100/60 px-1.5 py-0.5 rounded">
                +{kpis.treasury.marginOverFeedRate}%
              </span>
            </div>
          </div>

          {/* Zootech Simulator Button */}
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-orange-50/50 border border-[#D35400]/40 text-[#D35400] text-xs font-semibold shadow-xs transition active:scale-95"
            title="Simulateur Zootechnique & Marge sur Coût Alimentaire"
          >
            <Calculator className="w-3.5 h-3.5 text-[#D35400]" />
            <span className="hidden sm:inline">Simulateur IC & Marge</span>
            <span className="sm:hidden">Simulateur</span>
          </button>

          {/* Export Report / Audit */}
          <button
            onClick={onExportAudit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition active:scale-95"
            title="Exporter Registre Réglementaire & Audit Zootechnique"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Export Audit</span>
          </button>

          {/* New Event / Weighing Entry Button */}
          <button
            onClick={onOpenNewEntry}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B5345] hover:bg-[#116a58] text-white text-xs font-bold shadow-sm transition active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-200" />
            <span>Nouveau Relevé</span>
          </button>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            title="Actualiser les données capteurs"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#0B5345]' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
