"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  AppstoreOutlined,
  CalculatorOutlined,
  SendOutlined,
  LoadingOutlined,
  CheckCircleFilled,
  ExperimentOutlined,
  CloudOutlined,
  BugOutlined,
  CameraOutlined
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

export default function CultiseilPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis Cultisia, ton Ingénieur Agronome. Quel problème ou culture souhaites-tu analyser aujourd'hui sur le terrain ? (ex: Mes tomates ont des taches noires, Analyse de mon sol argileux)."
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  
  const [formAnswers, setFormAnswers] = useState<Record<string, string>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = async (e?: React.FormEvent, forcedText?: string) => {
    if (e) e.preventDefault();
    const textToSend = forcedText || input;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setInput("");
    setIsThinking(true);
    setFormAnswers({});

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // IMPORTANT : mode "cultiseil" pour activer le prompt agronome dans l'API
        body: JSON.stringify({ messages: newMessages, mode: "cultiseil" }),
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
    handleSend(undefined, "Voici les paramètres du terrain :\n" + answersText);
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
    <div className="flex-1 flex h-[calc(100vh-80px)] flex-col md:flex-row bg-white font-manrope">
      {/* 1. LEFT SIDEBAR (Ultra Minimalist) */}
      <aside className="hidden" bg-white border-r border-gray-200 flex-col items-center py-6 gap-8 flex-shrink-0 z-20">
        <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
          <img src="/logo.png" alt="Cultiso" className="w-8 h-8 object-contain" />
        </Link>
        <nav className="flex flex-col gap-4 w-full px-3">
          <Link href="/cultisia" className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0B5345] hover:bg-gray-50 transition-colors">
            <AppstoreOutlined style={{fontSize:"20px"}} />
          </Link>
          <Link href="/cultiplan" className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0B5345] hover:bg-gray-50 transition-colors">
            <CalculatorOutlined style={{fontSize:"20px"}} />
          </Link>
          <div className="relative w-full aspect-square rounded-xl flex items-center justify-center bg-[#0B5345] text-white shadow-sm cursor-default">
            <ExperimentOutlined style={{fontSize:"20px"}} />
            <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#0B5345] rounded-r-md"></div>
          </div>
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
              <h1 className="font-unbounded text-xl md:text-2xl font-bold text-[#0B5345] tracking-tight">CultiSeil</h1>
            </div>
            <p className="text-gray-500 font-medium text-xs md:text-sm mt-1">Votre guide agronomique intelligent</p>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          {activeQuestionnaire ? (
            /* INTERFACE COLLECTEUR DYNAMIQUE */
            <div className="max-w-3xl mx-auto w-full bg-white rounded-2xl border border-gray-200 p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-[#0B5345]/10 flex items-center justify-center text-[#0B5345]">
                  <ExperimentOutlined style={{fontSize: "20px"}} />
                </div>
                <div>
                  <h2 className="font-unbounded text-xl font-bold text-gray-900">Analyse du Terrain</h2>
                  <p className="text-gray-500 text-sm mt-1">Fournissez les relevés physiques pour affiner le diagnostic.</p>
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
                  Valider les relevés
                </button>
              </div>
            </div>
          ) : (
            /* INTERFACE PAR DÉFAUT (Swiss Style) */
            <div className="max-w-3xl mx-auto w-full h-full flex flex-col justify-center items-center text-center">
              
              {/* Stepper minimaliste / Radar */}
              <div className="flex items-center gap-4 mb-16 w-full max-w-lg mx-auto opacity-70">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0B5345]"></div>
                  <span className="text-[10px] font-bold text-[#0B5345] uppercase tracking-widest">Symptômes</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 mb-5"></div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Télémétrie</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 mb-5"></div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Diagnostic</span>
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm relative">
                 <div className="absolute inset-0 bg-[#0B5345]/5 rounded-2xl animate-pulse"></div>
                 <ExperimentOutlined style={{fontSize:"28px", color:"#0B5345"}} className="relative z-10" />
              </div>
              
              <h2 className="font-unbounded text-2xl font-bold text-gray-900 mb-4">
                En attente d'analyse
              </h2>
              
              <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-12">
                Décrivez les symptômes de votre culture ou votre type de sol à Cultisia dans le panneau de droite. Les agents de télémétrie s'activeront ici pour établir un diagnostic.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="bg-white border border-gray-100 rounded-xl p-5 text-left shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-3 text-gray-400">
                    <CloudOutlined />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Climat & Sol</h3>
                  <p className="text-xs text-gray-500">Intégration des données environnementales.</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-5 text-left shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-3 text-[#D35400]/70">
                    <BugOutlined />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Pathologies</h3>
                  <p className="text-xs text-gray-500">Identification des maladies et carences.</p>
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
            <p className="text-[11px] text-[#D35400] font-bold tracking-wider uppercase mt-1 leading-none">Ingénieur Agronome</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          {messages.map((msg, i) => {
            const isJsonBlock = msg.content.includes("```json");
            const visibleContent = msg.content.replace(/```json\n[\s\S]*?\n```/g, "").trim();
            
            if (!visibleContent && isJsonBlock) {
              return (
                <div key={i} className="flex justify-start">
                  <div className="bg-gray-50 text-gray-500 border border-gray-200 text-[11px] font-bold px-3 py-1.5 rounded-md flex items-center gap-2">
                    <CheckCircleFilled className="text-[#0B5345]" /> Analyse requise
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
        </div>

        <div className="p-5 shrink-0 border-t border-gray-100 bg-white">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décrivez vos symptômes (ex: feuilles jaunes)..."
              className="w-full bg-gray-50 border border-gray-200 focus:border-[#0B5345]/50 focus:bg-white rounded-xl pl-4 pr-12 py-3.5 text-[13.5px] text-gray-800 outline-none transition-all"
              disabled={isThinking || !!activeQuestionnaire}
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking || !!activeQuestionnaire}
              className="absolute right-2 w-8 h-8 rounded-lg bg-[#0B5345] flex items-center justify-center text-white hover:bg-[#148f6c] transition-colors disabled:opacity-50 disabled:hover:bg-[#0B5345]"
            >
              {isThinking ? <LoadingOutlined style={{fontSize:"14px"}} className="animate-spin" /> : <SendOutlined style={{fontSize:"14px"}} className="-ml-0.5" />}
            </button>
          </form>
          {activeQuestionnaire && (
            <p className="text-[11px] text-center text-gray-500 mt-3 font-medium">
              Saisie requise dans le panneau central pour le diagnostic.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
