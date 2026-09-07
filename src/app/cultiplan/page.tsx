"use client";

import { useState } from "react";
import Link from "next/link";
import { AppstoreOutlined, CalculatorOutlined, CheckCircleFilled } from "@ant-design/icons";
import { SharedChat } from "@/components/cultisia/SharedChat";

export default function CultiPlanPage() {
  const [simulationData, setSimulationData] = useState<any>(null);
  
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
            <CalculatorOutlined style={{fontSize:"20px"}} />
          </div>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto bg-[#FAFAFA] relative z-10 flex flex-col">
        <header className="h-[72px] shrink-0 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-10">
          <div>
            <h1 className="font-unbounded font-bold text-2xl text-gray-900 tracking-tight">CultiPlan</h1>
            <p className="text-[13px] text-gray-500 font-medium">Espace de Modélisation de Business Agricole</p>
          </div>
        </header>
        
        <div className="p-8 flex-1 flex flex-col items-center justify-center">
          {simulationData ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-3xl">
              <h2 className="text-2xl font-bold font-unbounded text-[#0B5345] mb-4">Projet : {simulationData.nom_projet}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Résumé Exécutif</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{simulationData.resume}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Analyse PESTEL</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{simulationData.pestel}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Analyse FFOM / SWOT</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{simulationData.swot}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <CalculatorOutlined style={{fontSize:"28px", color:"#0B5345"}} />
              </div>
              <h2 className="font-unbounded text-3xl font-bold text-gray-900 mb-4">
                Prêt pour la simulation
              </h2>
              <p className="text-gray-500 text-[15px] max-w-lg mx-auto mb-12">
                Commencez par discuter avec l'Expert Agrobusiness dans le panneau latéral. Le système générera automatiquement les études de marché, techniques et financières ici.
              </p>
              
              <div className="flex gap-4 opacity-70">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm w-48 text-left">
                  <span className="text-[#0B5345] font-bold text-sm block mb-1">01. Étude de marché</span>
                  <span className="text-xs text-gray-500">Marketing, PESTEL, Porter, SMART</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm w-48 text-left">
                  <span className="text-[#0B5345] font-bold text-sm block mb-1">02. Étude Technique</span>
                  <span className="text-xs text-gray-500">Besoins et processus de production</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm w-48 text-left">
                  <span className="text-[#0B5345] font-bold text-sm block mb-1">03. Étude Financière</span>
                  <span className="text-xs text-gray-500">Fonds propres, CAPEX, Bilan, ROI</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. RIGHT PANEL (Chatbot) */}
      <aside className="w-full md:w-[400px] h-full flex-none bg-white border-l border-gray-200 flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative">
        <SharedChat 
          toolContext="cultiplan" 
          title="EXPERT AGROBUSINESS" 
          subtitle="Analyste de Business Agricole" 
          isEmbedded={true}
          hideSidebar={true}
          onSimulationComplete={(data) => setSimulationData(data)}
        />
      </aside>
    </div>
  );
}
