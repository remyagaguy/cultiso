"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppstoreOutlined, CalculatorOutlined, CheckCircleFilled } from "@ant-design/icons";
import { SharedChat } from "@/components/cultisia/SharedChat";

export default function CultiPlanPage() {
  const [simulationData, setSimulationData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cultiplan_latest");
    if (saved) {
      try {
        setSimulationData(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  const handleSimulationComplete = (data: any) => {
    setIsGenerating(true);
    setTimeout(() => {
      setSimulationData(data);
      localStorage.setItem("cultiplan_latest", JSON.stringify(data));
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <div className="flex-1 flex h-full flex-col md:flex-row bg-white font-manrope relative">
      
      {isGenerating && (
        <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="w-16 h-16 border-4 border-[#22c55e]/20 border-t-[#22c55e] rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold font-unbounded text-[#0B5345] mb-2">Génération en cours...</h2>
          <p className="text-gray-600 font-medium text-center max-w-md">Nous structurons vos données pour créer un Business Plan professionnel et adapté à la réalité du terrain.</p>
        </div>
      )}

      {/* 1. CANVAS AREA (Only visible when Business Plan is ready) */}
      {simulationData && (
        <main className="flex-1 h-full overflow-y-auto bg-[#FAFAFA] relative z-10 flex flex-col border-r border-gray-200">
          <header className="h-[72px] shrink-0 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-10">
            <div>
              <h1 className="font-unbounded font-bold text-2xl text-gray-900 tracking-tight">Business Plan</h1>
              <p className="text-[13px] text-gray-500 font-medium">Résultat de la simulation</p>
            </div>
          </header>
          
          <div className="p-8 flex-1 flex flex-col items-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-4xl">
              <h2 className="text-2xl font-bold font-unbounded text-[#0B5345] mb-4">Projet : {simulationData.nom_projet}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Résumé Exécutif</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{simulationData.resume}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Analyse PESTEL</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{simulationData.pestel}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Analyse FFOM / SWOT</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{simulationData.swot}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 2. CHAT AREA (Fullscreen when empty, Sidebar when Canvas is open) */}
      <aside className={`${simulationData ? 'w-full md:w-[450px]' : 'flex-1'} h-full bg-white flex flex-col flex-shrink-0 z-20 relative transition-all duration-500`}>
        <SharedChat 
          toolContext="cultiplan" 
          title="Expert Agrobusiness" 
          isEmbedded={true}
          hideSidebar={!!simulationData}
          onSimulationComplete={handleSimulationComplete}
        />
      </aside>
    </div>
  );
}
