"use client";
import React, { useState, useRef, useEffect } from "react";
import VegetalDashboard from "@/components/cultima/vegetal/VegetalDashboard";
import AnimalDashboard from "@/components/cultima/animal/AnimalDashboard";
import { Sparkles, BrainCircuit, ArrowRight, Send, User, Bot } from "lucide-react";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
};

export default function CultimaOrchestrator() {
  const [config, setConfig] = useState<"vegetal" | "animal" | "mixte" | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Bonjour ! Je suis Cultisia, votre intelligence artificielle. Je vais concevoir votre tableau de bord sur-mesure. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Cultisia's response logic
    setTimeout(() => {
      if (messages.length === 1) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: "ai",
          text: "Très bien. Avez-vous également d'autres activités complémentaires (comme de l'élevage, de la transformation ou du négoce) ?"
        }]);
      } else if (messages.length === 3) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: "ai",
          text: "C'est noté ! J'ai analysé votre profil et vos besoins. Je génère immédiatement un ERP hybride adapté à votre réalité terrain."
        }]);
        
        setTimeout(() => {
          setIsConfiguring(true);
          // On peut simuler une détection intelligente. Pour l'instant on montre le mixte pour la démo.
          setTimeout(() => setConfig("mixte"), 2500);
        }, 1500);
      }
    }, 1000);
  };

  // Vue de démarrage : L'IA Cultisia "configure" le tableau de bord
  if (!config) {
    return (
      <div className="min-h-screen bg-[#F3F5EF] flex items-center justify-center p-4 md:p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-[#DFE4DA] overflow-hidden flex flex-col" style={{ height: "80vh" }}>
          
          {/* Header */}
          <div className="bg-[#0B5345] p-6 flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <BrainCircuit size={24} className="text-[#F5D9C2]" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif">Cultisia IA</h1>
              <p className="text-sm text-white/80">Configuration de l'ERP Cultima</p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F3F5EF]/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-[#D35400] text-white" : "bg-[#0B5345] text-white"}`}>
                  {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm md:text-base ${
                  msg.sender === "user" 
                    ? "bg-[#D35400]/10 text-[#17231F] rounded-tr-none" 
                    : "bg-white border border-[#DFE4DA] text-[#17231F] rounded-tl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isConfiguring && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0B5345] text-white flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-[#DFE4DA] rounded-2xl rounded-tl-none p-5 shadow-sm flex flex-col items-center gap-3">
                  <Sparkles className="animate-spin text-[#D35400] w-8 h-8" />
                  <p className="text-[#0B5345] font-medium animate-pulse text-sm">Assemblage dynamique des modules en cours...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {!isConfiguring && (
            <div className="p-4 bg-white border-t border-[#DFE4DA]">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex: J'ai une ferme de 20ha de maïs et un petit élevage..."
                  className="flex-1 bg-[#F3F5EF] border border-[#DFE4DA] rounded-xl px-4 py-3 outline-none focus:border-[#0B5345] focus:ring-1 focus:ring-[#0B5345] transition-all text-[#17231F]"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-[#D35400] hover:bg-[#A23B2E] text-white rounded-xl p-3 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </form>
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
          onClick={() => {
            setConfig(null);
            setIsConfiguring(false);
            setMessages([{
              id: Date.now().toString(),
              sender: "ai",
              text: "Re-bonjour ! Reprenons la configuration. Parlez-moi de votre activité principale."
            }]);
          }}
          className="text-white/80 hover:text-white underline decoration-white/30"
        >
          Reconfigurer
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
