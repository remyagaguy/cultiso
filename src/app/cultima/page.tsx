"use client";

import { useState } from "react";
import Link from "next/link";
import { AppstoreOutlined, DashboardOutlined } from "@ant-design/icons";
import { SharedChat } from "@/components/cultisia/SharedChat";
import VegetalDashboard from "@/components/cultima/vegetal/VegetalDashboard";
import AnimalDashboard from "@/components/cultima/animal/AnimalDashboard";
import TransformationDashboard from "@/components/cultima/transformation/TransformationDashboard";
import ServiceDashboard from "@/components/cultima/service/ServiceDashboard";
import NegoceDashboard from "@/components/cultima/negoce/NegoceDashboard";
import { BrainCircuit } from "lucide-react";

export default function CultimaPage() {
  const [config, setConfig] = useState<"vegetal" | "animal" | "mixte" | "transformation" | "service" | "negoce" | null>(null);

  // Pour la démo, on simule l'activation d'un dashboard après que l'utilisateur ait cliqué sur un profil type
  // Idéalement cela viendrait de `onConfigComplete` du composant SharedChat.
  
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-white font-manrope">
      {/* 1. LEFT SIDEBAR */}
      <aside className="hidden md:flex w-[72px] bg-white border-r border-gray-200 flex-col items-center py-6 gap-8 flex-shrink-0 z-20">
        <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
          <img src="/favicon.png" alt="Cultiso" className="w-8 h-8 object-contain" />
        </Link>
        <nav className="flex flex-col gap-4 w-full px-3">
          <Link href="/cultisia" className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0B5345] hover:bg-gray-50 transition-colors">
            <AppstoreOutlined style={{fontSize:"20px"}} />
          </Link>
          <div className="relative w-full aspect-square rounded-xl flex items-center justify-center bg-[#0B5345] text-white shadow-sm cursor-default">
            <DashboardOutlined style={{fontSize:"20px"}} />
          </div>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto bg-[#F3F5EF] relative z-10 flex flex-col">
        <header className="h-[72px] shrink-0 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-10">
          <div>
            <h1 className="font-unbounded font-bold text-2xl text-[#17231F] tracking-tight">Cultima</h1>
            <p className="text-[13px] text-[#6E8A75] font-medium">L'ERP Agricole Propulsé par Cultisia</p>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col">
          {!config ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-white border border-[#DFE4DA] rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <BrainCircuit size={40} className="text-[#0B5345]" />
              </div>
              <h2 className="font-unbounded text-3xl font-bold text-[#17231F] mb-4">
                ERP non configuré
              </h2>
              <p className="text-[#6E8A75] text-[15px] max-w-lg mx-auto mb-10">
                Discutez avec Cultisia dans le panneau latéral. Elle analysera votre profil et assemblera votre tableau de bord sur-mesure (Production Végétale, Animale ou Mixte).
              </p>

              {/* Temporary demo buttons to trigger dashboard states until backend integration */}
              <div className="flex flex-col gap-3 max-w-sm w-full">
                <p className="text-xs font-bold text-[#17231F] uppercase mb-2">Simulation de la configuration (Démo)</p>
                <button onClick={() => setConfig("vegetal")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Charger le profil Végétal</button>
                <button onClick={() => setConfig("animal")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Charger le profil Animal</button>
                <button onClick={() => setConfig("mixte")} className="p-3 bg-[#0B5345] text-white border border-transparent rounded-xl hover:bg-[#072F27] transition-all text-sm font-medium shadow-md">Charger le profil Mixte (Recommandé)</button>
                <div className="w-full h-[1px] bg-[#DFE4DA] my-2"></div>
                <button onClick={() => setConfig("transformation")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Transformation Agroalimentaire</button>
                <button onClick={() => setConfig("service")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Services Agricoles</button>
                <button onClick={() => setConfig("negoce")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Agro-Commerce & Négoce</button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {config === "vegetal" && <VegetalDashboard />}
              {config === "animal" && (
                <div className="animal-wrapper">
                  <AnimalDashboard />
                </div>
              )}
              {config === "mixte" && (
                <div className="mixte-wrapper flex flex-col">
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
              {config === "transformation" && <TransformationDashboard />}
              {config === "service" && <ServiceDashboard />}
              {config === "negoce" && <NegoceDashboard />}
            </div>
          )}
        </div>
      </main>

      {/* 3. RIGHT PANEL (Chatbot) */}
      <aside className="w-full md:w-[400px] h-full flex-none bg-white border-l border-gray-200 flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative">
        <SharedChat 
          toolContext="cultima" 
          title="CULTISIA ERP" 
          subtitle="Configuration Cultima" 
          isEmbedded={true}
          hideSidebar={true}
          onConfigComplete={(data) => {
             // In a real scenario, Cultisia would emit { "type": "cultima_config", "config": "mixte" }
             if (data && (data === "vegetal" || data === "animal" || data === "mixte" || data === "transformation" || data === "service" || data === "negoce")) {
                setConfig(data);
             }
          }}
        />
      </aside>
    </div>
  );
}
