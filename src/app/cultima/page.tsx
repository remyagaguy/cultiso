"use client";
import React, { useState } from "react";
import VegetalDashboard from "@/components/cultima/vegetal/VegetalDashboard";
import AnimalDashboard from "@/components/cultima/animal/AnimalDashboard";
import { Sparkles, BrainCircuit, Check, ArrowRight } from "lucide-react";

export default function CultimaOrchestrator() {
  // Configuration simulée provenant de Cultisia
  const [config, setConfig] = useState<"vegetal" | "animal" | "mixte" | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);

  // Vue de démarrage : L'IA Cultisia "configure" le tableau de bord
  if (!config) {
    return (
      <div className="min-h-screen bg-[#F3F5EF] flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-[#DFE4DA]">
          <div className="w-20 h-20 bg-[#0B5345] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#0B5345]/20">
            <BrainCircuit size={40} className="text-[#D35400]" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#17231F] font-serif mb-4">
            Configuration Cultima
          </h1>
          <p className="text-[#6E8A75] mb-10 text-lg">
            Cultisia a analysé votre exploitation. Choisissez le profil généré pour découvrir votre ERP sur-mesure.
          </p>

          {isConfiguring ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Sparkles className="animate-spin text-[#D35400] w-10 h-10" />
              <p className="text-[#0B5345] font-medium animate-pulse">Assemblage dynamique des modules en cours...</p>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              <button 
                onClick={() => { setIsConfiguring(true); setTimeout(() => setConfig("vegetal"), 1500); }}
                className="w-full group flex items-center justify-between p-5 rounded-2xl border-2 border-[#E4ECE6] hover:border-[#0B5345] hover:bg-[#F3F5EF] transition-all"
              >
                <div>
                  <h3 className="font-bold text-[#17231F] text-lg">Ferme Agricole (Végétal)</h3>
                  <p className="text-sm text-[#6E8A75] mt-1">Modules: Champs, Météo, Rendements, NDVI</p>
                </div>
                <ArrowRight className="text-[#D35400] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button 
                onClick={() => { setIsConfiguring(true); setTimeout(() => setConfig("animal"), 1500); }}
                className="w-full group flex items-center justify-between p-5 rounded-2xl border-2 border-[#E4ECE6] hover:border-[#0B5345] hover:bg-[#F3F5EF] transition-all"
              >
                <div>
                  <h3 className="font-bold text-[#17231F] text-lg">Domaine Élevage (Animal)</h3>
                  <p className="text-sm text-[#6E8A75] mt-1">Modules: Cheptel, Santé, Silos, Zootechnie</p>
                </div>
                <ArrowRight className="text-[#D35400] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button 
                onClick={() => { setIsConfiguring(true); setTimeout(() => setConfig("mixte"), 2500); }}
                className="w-full group flex items-center justify-between p-5 rounded-2xl border-2 border-[#D35400]/20 bg-[#F5D9C2]/10 hover:border-[#D35400] hover:bg-[#F5D9C2]/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#D35400] text-lg">Exploitation Mixte (Hybride)</h3>
                    <span className="bg-[#0B5345] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Recommandé</span>
                  </div>
                  <p className="text-sm text-[#6E8A75] mt-1">Fusion dynamique du Végétal et de l'Animal</p>
                </div>
                <ArrowRight className="text-[#D35400] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Rendu de l'ERP assemblé dynamiquement
  return (
    <div className="min-h-screen bg-[#F3F5EF]">
      {/* Barre de navigation simplifiée pour simuler l'environnement maître */}
      <div className="bg-[#0B5345] text-white p-2 text-center text-xs font-semibold flex items-center justify-between px-6 shadow-md z-50 relative">
        <div className="flex items-center gap-2">
          <BrainCircuit size={14} className="text-[#D35400]" />
          <span>Environnement dynamique généré par Cultisia</span>
        </div>
        <button 
          onClick={() => setConfig(null)}
          className="text-white/80 hover:text-white underline decoration-white/30"
        >
          Changer de profil
        </button>
      </div>

      {config === "vegetal" && <VegetalDashboard />}
      
      {config === "animal" && (
        <div className="animal-wrapper">
          <AnimalDashboard />
        </div>
      )}

      {config === "mixte" && (
        <div className="mixte-wrapper flex flex-col">
          {/* Dans une VRAIE version, on fusionnerait les widgets individuellement. 
              Pour l'instant, on empile les deux interfaces pour la démo conceptuelle */}
          <div className="bg-[#072F27] text-white text-center py-8 px-4 shadow-inner">
            <h2 className="text-3xl font-serif font-bold text-[#F5D9C2] mb-2">Tableau de Bord Mixte</h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              Cultisia a fusionné vos activités Végétales et Animales. Vos données financières et opérationnelles sont centralisées.
            </p>
          </div>
          
          <div className="border-b-[10px] border-[#D35400]">
            <VegetalDashboard />
          </div>
          
          <div className="bg-slate-50 pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#0B5345] text-white flex items-center justify-center text-sm">2</span>
                Supervision Zootechnique
              </h3>
            </div>
            <AnimalDashboard />
          </div>
        </div>
      )}
    </div>
  );
}
