"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  AppstoreOutlined,
  CalculatorOutlined,
  SendOutlined,
  LoadingOutlined,
  CheckCircleFilled,
  AimOutlined,
  BarChartOutlined,
  LineChartOutlined
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

export default function CultiPlanPage() {
  const [appMode, setAppMode] = useState<"simulation" | "gestion" | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  
  const [formAnswers, setFormAnswers] = useState<Record<string, string>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const startMode = (mode: "simulation" | "gestion") => {
    setAppMode(mode);
    setMessages([
      {
        role: "assistant",
        content: mode === "simulation" 
          ? "Bonjour ! Je suis Cultisia, ton Analyste Financier. Prête à simuler et transformer ton idée en un projet agricole hautement rentable ? Décris-moi ton projet (ex: 5000 poulets au Sénégal)."
          : "Bonjour ! Je suis Cultisia, ton Analyste Financier. Prêt à optimiser la gestion de ton exploitation existante ? Décris-moi ton activité actuelle et tes objectifs d'optimisation."
      }
    ]);
  };

  const handleSend = async (e?: React.FormEvent, forcedText?: string) => {
    if (e) e.preventDefault();
    const textToSend = forcedText || input;
    if (!textToSend.trim() || !appMode) return;

    const newMessages = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setInput("");
    setIsThinking(true);
    setFormAnswers({});

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode: "cultiplan", appMode }),
      });

      if (!res.ok) throw new Error("API Error");
      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantMsg = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === "token" && data.content) {
                  assistantMsg += data.content;
                }
              } catch (e) {}
            }
          }
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1].content = assistantMsg;
            return copy;
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Désolé, une erreur est survenue." }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleFormSubmit = () => {
    const answersText = Object.entries(formAnswers)
      .map(([q, a]) => `- ${q} : ${a}`)
      .join("\n");
    handleSend(undefined, "Voici mes informations :\n" + answersText);
  };

  let activeQuestionnaire = null;
  const lastMsg = messages[messages.length - 1];
  if (lastMsg && lastMsg.role === "assistant") {
    const match = lastMsg.content.match(/```json\n([\s\S]*?)\n```/);
    if (match) {
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed.type === "questionnaire") {
          activeQuestionnaire = parsed;
        }
      } catch (e) {}
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-white font-manrope">
      {/* 1. LEFT SIDEBAR (Ultra Minimalist / Swiss Style) */}
      <aside className="hidden md:flex w-[72px] bg-white border-r border-gray-200 flex-col items-center py-6 gap-8 flex-shrink-0 z-20">
        <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
          <img src="/logo.png" alt="Cultiso" className="w-8 h-8 object-contain" />
        </Link>
        <nav className="flex flex-col gap-4 w-full px-3">
          <Link href="/cultisia" className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0B5345] hover:bg-gray-50 transition-colors">
            <AppstoreOutlined style={{fontSize:"20px"}} />
          </Link>
          <div className="relative w-full aspect-square rounded-xl flex items-center justify-center bg-[#0B5345] text-white shadow-sm cursor-default">
            <CalculatorOutlined style={{fontSize:"20px"}} />
          </div>
          <Link href="/cultiseil" className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0B5345] hover:bg-gray-50 transition-colors">
            <AimOutlined style={{fontSize:"20px"}} />
          </Link>
        </nav>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA] relative overflow-hidden md:h-auto h-[50vh]">
        {/* Header */}
        <header className="px-6 md:px-10 py-4 md:py-8 shrink-0 flex justify-between items-end border-b border-gray-100 bg-white/50 backdrop-blur-sm z-10">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="md:hidden">
                <img src="/favicon.png" alt="Cultiso" className="w-6 h-6 object-contain" />
              </Link>
              <h1 className="font-unbounded text-xl md:text-2xl font-bold text-[#0B5345] tracking-tight">CultiPlan</h1>
            </div>
            <p className="text-gray-500 font-medium text-xs md:text-sm mt-1">Espace de Modélisation Financière</p>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          {!appMode ? (
            /* SELECTION DU MODE */
            <div className="max-w-4xl mx-auto w-full h-full flex flex-col justify-center items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <CalculatorOutlined style={{fontSize:"28px", color:"#0B5345"}} />
              </div>
              <h2 className="font-unbounded text-3xl font-bold text-gray-900 mb-4">
                Que souhaitez-vous faire ?
              </h2>
              <p className="text-gray-500 text-[15px] max-w-lg mx-auto mb-12">
                Choisissez le mode adapté à votre situation pour une analyse financière sur-mesure.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <button 
                  onClick={() => startMode("simulation")}
                  className="bg-white border-2 border-transparent hover:border-[#22c55e] rounded-2xl p-8 text-left shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e] mb-5 group-hover:scale-110 transition-transform">
                    <LineChartOutlined style={{fontSize: "24px"}} />
                  </div>
                  <h3 className="font-unbounded font-bold text-[#052821] text-lg mb-2">Mode Simulation</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    J'ai une idée de projet. Je veux simuler sa rentabilité financière, faire une étude de marché et générer mon business plan.
                  </p>
                </button>
                
                <button 
                  onClick={() => startMode("gestion")}
                  className="bg-white border-2 border-transparent hover:border-[#0B5345] rounded-2xl p-8 text-left shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0B5345]/10 flex items-center justify-center text-[#0B5345] mb-5 group-hover:scale-110 transition-transform">
                    <BarChartOutlined style={{fontSize: "24px"}} />
                  </div>
                  <h3 className="font-unbounded font-bold text-[#052821] text-lg mb-2">Mode Gestion</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    J'ai déjà une exploitation en cours. Je veux suivre mes KPIs, optimiser ma rentabilité et piloter mes finances.
                  </p>
                </button>
              </div>
            </div>
          ) : activeQuestionnaire ? (
            /* INTERFACE COLLECTEUR DYNAMIQUE */
            <div className="max-w-3xl mx-auto w-full bg-white rounded-2xl border border-gray-200 p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-[#D35400]/10 flex items-center justify-center text-[#D35400]">
                  <BarChartOutlined style={{fontSize: "20px"}} />
                </div>
                <div>
                  <h2 className="font-unbounded text-xl font-bold text-gray-900">Paramétrage du projet</h2>
                  <p className="text-gray-500 text-sm mt-1">Sélectionnez vos critères pour affiner l'analyse.</p>
                </div>
              </div>

              <div className="space-y-8">
                {activeQuestionnaire.questions.map((q: any, i: number) => (
                  <div key={i} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-gray-900 text-base mb-4">{q.question}</h3>
                    <div className="flex flex-wrap gap-3">
                      {q.options.map((opt: string, j: number) => {
                        const isSelected = formAnswers[q.question] === opt;
                        return (
                          <button
                            key={j}
                            onClick={() => setFormAnswers({...formAnswers, [q.question]: opt})}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                              isSelected 
                                ? "border-[#0B5345] bg-[#0B5345] text-white shadow-sm" 
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                      <input
                        type="text"
                        placeholder="Autre (précisez)..."
                        value={(!q.options.includes(formAnswers[q.question]) && formAnswers[q.question]) || ""}
                        onChange={(e) => setFormAnswers({...formAnswers, [q.question]: e.target.value})}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0B5345] focus:bg-white transition-all flex-1 min-w-[200px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-end pt-6 border-t border-gray-100">
                <button
                  onClick={handleFormSubmit}
                  disabled={Object.keys(formAnswers).length < activeQuestionnaire.questions.length}
                  className="px-6 py-3 bg-[#D35400] text-white rounded-lg font-bold text-sm hover:bg-[#E67E22] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Valider les paramètres
                </button>
              </div>
            </div>
          ) : (
            /* INTERFACE PAR DÉFAUT (Swiss Style) */
            <div className="max-w-3xl mx-auto w-full h-full flex flex-col justify-center items-center text-center">
              
              {/* Stepper minimaliste */}
              <div className="flex items-center gap-4 mb-16 w-full max-w-lg mx-auto opacity-70">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0B5345]"></div>
                  <span className="text-[10px] font-bold text-[#0B5345] uppercase tracking-widest">Faisabilité</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 mb-5"></div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Finances</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 mb-5"></div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rentabilité</span>
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <LineChartOutlined style={{fontSize:"28px", color:"#0B5345"}} />
              </div>
              
              <h2 className="font-unbounded text-2xl font-bold text-gray-900 mb-4">
                Prêt pour la {appMode === "simulation" ? "simulation" : "gestion"}
              </h2>
              
              <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-12">
                Commencez par discuter avec Cultisia dans le panneau latéral. Le système générera automatiquement les formulaires et les tableaux de bord requis ici.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="bg-white border border-gray-100 rounded-xl p-5 text-left shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-3 text-gray-400">01</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Cadrage</h3>
                  <p className="text-xs text-gray-500">Définissez vos objectifs.</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-5 text-left shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-3 text-gray-400">02</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Analyse</h3>
                  <p className="text-xs text-gray-500">Génération des KPIs.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. RIGHT PANEL (Chatbot) */}
      <aside className="w-full md:w-[380px] flex-1 md:flex-none bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
        <div className="py-4 md:py-6 shrink-0 border-b border-gray-100 flex items-center px-6 gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-[#0B5345] flex items-center justify-center text-white font-unbounded font-bold text-lg">
            C
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-unbounded font-bold text-gray-900 text-sm leading-tight">Cultisia</h3>
            <p className="text-[11px] text-[#D35400] font-bold tracking-wider uppercase mt-1 leading-none">Analyste Financier</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          {!appMode ? (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-gray-400 text-sm px-4">
                Sélectionnez un mode dans l'espace central pour démarrer l'analyse.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => {
                const isJsonBlock = msg.content.includes("```json");
                const visibleContent = msg.content.replace(/```json\n[\s\S]*?\n```/g, "").trim();
                
                if (!visibleContent && isJsonBlock) {
                  return (
                    <div key={i} className="flex justify-start">
                      <div className="bg-gray-50 text-gray-500 border border-gray-200 text-[11px] font-bold px-3 py-1.5 rounded-md flex items-center gap-2">
                        <CheckCircleFilled className="text-[#0B5345]" /> Interface mise à jour
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-[#0B5345] text-white rounded-br-sm" 
                        : "bg-[#F5F5F5] text-gray-800 rounded-bl-sm"
                    }`}>
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-unbounded prose-headings:text-[#0B5345] prose-strong:text-gray-900">
                          <ReactMarkdown>
                            {visibleContent}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                );
              })}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-[#F5F5F5] rounded-2xl rounded-bl-sm px-4 py-4 flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          )}
        </div>

        <div className="p-5 shrink-0 border-t border-gray-100 bg-white">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={appMode ? "Décrivez votre projet..." : "Choisissez un mode d'abord..."}
              className="w-full bg-gray-50 border border-gray-200 focus:border-[#0B5345]/50 focus:bg-white rounded-xl pl-4 pr-12 py-3.5 text-[13.5px] text-gray-800 outline-none transition-all disabled:opacity-50"
              disabled={isThinking || !!activeQuestionnaire || !appMode}
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking || !!activeQuestionnaire || !appMode}
              className="absolute right-2 w-8 h-8 rounded-lg bg-[#0B5345] flex items-center justify-center text-white hover:bg-[#148f6c] transition-colors disabled:opacity-50 disabled:hover:bg-[#0B5345]"
            >
              {isThinking ? <LoadingOutlined style={{fontSize:"14px"}} className="animate-spin" /> : <SendOutlined style={{fontSize:"14px"}} className="-ml-0.5" />}
            </button>
          </form>
          {activeQuestionnaire && (
            <p className="text-[11px] text-center text-gray-500 mt-3 font-medium">
              Action requise dans le panneau central.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
