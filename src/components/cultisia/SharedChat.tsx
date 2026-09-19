"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { message as antMessage, Tooltip, Dropdown, Drawer, Modal } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getGreetingMessage(mode: string): Promise<string> {
  const hour = new Date().getHours();
  const greeting = hour >= 18 ? "Bonsoir" : "Bonjour";
  
  let firstName = "";
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.prenom;
      if (fullName) {
        firstName = " " + fullName.split(' ')[0];
      } else if (user.email) {
        // Fallback to email prefix if no name is available
        const emailPrefix = user.email.split('@')[0];
        // Capitalize the first letter
        firstName = " " + emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      }
    }
  } catch (e) {
    console.error("Error fetching user for greeting:", e);
  }

  if (mode === "cultiplan") {
    return `${greeting}${firstName} ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...).`;
  } else if (mode === "cultima") {
    return `${greeting}${firstName} ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)`;
  }
  return `${greeting}${firstName} ! Je suis Cultisia. Comment puis-je vous aider aujourd'hui ?`;
}

/* â”€â”€â”€ Types â”€â”€â”€ */
interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  sources?: { file_name: string }[];
  isStreaming?: boolean;
  questionnaireCompleted?: boolean;
}

interface ChatSession { id: string; title: string; updated_at: string; is_pinned?: boolean; is_archived?: boolean; share_id?: string; }

interface QuestionnaireData {
  type: string;
  questions: { question: string; options: string[]; allow_multiple?: boolean }[];
}

/* â”€â”€â”€ SVG Icons â”€â”€â”€ */
const SuggestLeaf = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);
const SuggestSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const SuggestChart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
const SuggestDroplet = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
);

/* â”€â”€â”€ Thinking Animation â”€â”€â”€ */
const ThinkingIndicator = () => (
  <div className="flex items-center gap-3 py-4">
    <div className="w-9 h-9 rounded-full bg-[#f3fbe9] flex items-center justify-center flex-shrink-0 border border-[#22c55e]/20 relative shadow-sm">
      <img src="/favicon.png" alt="Cultisia" className="w-5 h-5 object-contain" />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-[1.5px] border-white rounded-full"></span>
    </div>
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-[#D35400] rounded-full animate-bounce opacity-80" />
        <span className="w-1.5 h-1.5 bg-[#D35400] rounded-full animate-bounce opacity-80" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 bg-[#D35400] rounded-full animate-bounce opacity-80" style={{ animationDelay: "300ms" }} />
      </div>
      <span className="text-[13.5px] text-gray-500 font-medium italic">Cultisia réfléchit...</span>
    </div>
  </div>
);

/* â”€â”€â”€ Markdown Renderer â”€â”€â”€ */
const MarkdownContent = ({ content }: { content: string }) => (
  <div className="prose prose-sm max-w-none text-gray-800 prose-headings:text-[#0B5345] prose-headings:font-unbounded prose-h2:text-[18px] prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-[16px] prose-h3:mt-5 prose-h3:mb-2 prose-p:text-[15.5px] prose-p:leading-[1.75] prose-p:mb-4 prose-li:text-[15px] prose-li:leading-[1.7] prose-strong:text-[#052821] prose-strong:font-bold prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-a:text-[#D35400] hover:prose-a:text-[#a04000] prose-a:no-underline">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);

const QuestionnaireWidget = ({
  data,
  onSubmit
}: {
  data: QuestionnaireData;
  onSubmit: (answers: Record<number, string>) => void;
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [freeTextMode, setFreeTextMode] = useState(false);
  const [freeTextValue, setFreeTextValue] = useState("");
  const [multiSelections, setMultiSelections] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Delay appearance so the user has time to read the text
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1200); // 1.2s delay
    return () => clearTimeout(timer);
  }, []);

  const q = data.questions[step];

  const handleSelectSingle = (option: string) => {
    const newAnswers = { ...answers, [step]: option };
    setAnswers(newAnswers);
    setFreeTextMode(false);
    setFreeTextValue("");
    if (step < data.questions.length - 1) {
      setStep(step + 1);
      setMultiSelections([]);
    } else {
      onSubmit(newAnswers);
    }
  };

  const handleToggleMulti = (option: string) => {
    if (multiSelections.includes(option)) {
      setMultiSelections(multiSelections.filter(o => o !== option));
    } else {
      setMultiSelections([...multiSelections, option]);
    }
  };

  const handleValidateMulti = () => {
    if (multiSelections.length === 0 && !freeTextValue.trim()) return;
    
    let finalAnswer = multiSelections.join(", ");
    if (freeTextValue.trim()) {
      finalAnswer += finalAnswer ? `, ${freeTextValue.trim()}` : freeTextValue.trim();
    }
    
    handleSelectSingle(finalAnswer);
  };

  const handleSkip = () => {
    const newAnswers = { ...answers, [step]: "Non spécifié" };
    setAnswers(newAnswers);
    setFreeTextMode(false);
    setFreeTextValue("");
    if (step < data.questions.length - 1) {
      setStep(step + 1);
      setMultiSelections([]);
    } else {
      onSubmit(newAnswers);
    }
  };

  if (!q || !isReady) return null;

  const isMulti = !!q.allow_multiple;

  return (
    <div className="mt-4 border border-gray-200 rounded-3xl bg-white shadow-sm overflow-hidden w-full max-w-3xl transition-all duration-500 ease-out animate-in slide-in-from-bottom-2 fade-in">
      <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
        <div>
          <h4 className="font-unbounded font-semibold text-[#0B5345] text-[15px] leading-snug pr-4">{q.question}</h4>
          {isMulti && <p className="text-[12px] text-gray-500 font-medium mt-1">Plusieurs choix possibles</p>}
        </div>
        <div className="flex items-center text-[11px] text-gray-400 font-medium gap-1 shrink-0 px-2 mt-0.5">
          <span>{step + 1} sur {data.questions.length}</span>
        </div>
      </div>
      <div className="flex flex-col">
        {freeTextMode && !isMulti ? (
          <div className="p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <textarea
              autoFocus
              placeholder="Précisez votre réponse..."
              value={freeTextValue}
              onChange={(e) => setFreeTextValue(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-[#f9f8f6] focus:bg-white focus:border-[#0B5345] focus:ring-1 focus:ring-[#0B5345] outline-none transition-all resize-none text-[14px] text-gray-700 min-h-[100px]"
            />
            <div className="flex justify-between items-center mt-1">
              <button
                onClick={() => setFreeTextMode(false)}
                className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors py-1"
              >
                ← Retour
              </button>
              <button
                onClick={() => handleSelectSingle(freeTextValue)}
                disabled={!freeTextValue.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#0B5345] text-white text-[13px] font-semibold hover:bg-[#084236] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Valider
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {q.options.map((opt, i) => {
              const isSelected = multiSelections.includes(opt);
              return (
                <button
                  key={i}
                  onClick={() => isMulti ? handleToggleMulti(opt) : handleSelectSingle(opt)}
                  className={`group w-full text-left px-6 py-4 border-b border-gray-100 last:border-0 transition-all duration-150 text-[14.5px] flex items-center gap-4 active:bg-gray-50 ${
                    isSelected 
                      ? "bg-green-50/50 text-green-900" 
                      : "bg-white hover:bg-gray-50/80 text-gray-700"
                  }`}
                >
                  <span className={`flex items-center justify-center w-6 h-6 rounded-md text-[11.5px] font-semibold shrink-0 transition-colors ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                  }`}>
                    {isSelected ? "✓" : (i + 1)}
                  </span>
                  <span className={`font-medium transition-colors leading-relaxed ${isSelected ? "text-green-900" : "group-hover:text-gray-900"}`}>{opt}</span>
                </button>
              );
            })}
            
            {isMulti && (
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <input
                  type="text"
                  placeholder="Autre (préciser)..."
                  value={freeTextValue}
                  onChange={(e) => setFreeTextValue(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:border-[#D35400] outline-none transition-all text-[14px] text-gray-700 mb-3"
                />
                <button
                  onClick={handleValidateMulti}
                  disabled={multiSelections.length === 0 && !freeTextValue.trim()}
                  className="w-full py-3 rounded-xl bg-[#0B5345] text-white text-[14px] font-bold hover:bg-[#084236] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Valider ces choix
                </button>
              </div>
            )}

            {!isMulti && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white hover:bg-gray-50/80 transition-colors">
                <button
                  onClick={() => setFreeTextMode(true)}
                  className="flex items-center gap-3 text-[14px] text-gray-500 hover:text-gray-800 transition-colors flex-1 text-left font-medium"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-[12px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </span>
                  Autre chose...
                </button>
                <button
                  onClick={handleSkip}
                  className="text-[13px] font-medium text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors"
                >
                  Passer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


interface SharedChatProps {
  toolContext: "cultisia" | "cultiplan" | "cultiseil" | "cultima";
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  isEmbedded?: boolean;
  hideSidebar?: boolean;
  onSimulationComplete?: (data: any) => void;
  onConfigComplete?: (data: any) => void;
  onTransactionDraft?: (data: any) => void;
  onNewDiscussion?: () => void;
  triggerNewSession?: number;
}

export function SharedChat({ toolContext, title = "Cultisia", subtitle = "Votre agronome virtuel, propulsé par l'IA", icon,  isEmbedded = false,
  hideSidebar = false, onSimulationComplete, onConfigComplete, onTransactionDraft, onNewDiscussion, triggerNewSession
}: SharedChatProps) {
  const [activeMode, setActiveMode] = useState<"cultisia" | "cultiplan" | "cultiseil" | "cultima">(toolContext);
  
const extractSimulationData = (msgs: ChatMessage[]) => {
  if (!onSimulationComplete) return;
  
  // Find the most recent assistant message that contains the JSON payload
  const assistantMsgs = [...msgs].reverse().filter(m => m.role === "assistant");
  
  for (const msg of assistantMsgs) {
    const content = msg.content;
    let jsonString = null;
    const fencedMatch = content.match(/```json\s+([\s\S]*?)\s+```/);
    if (fencedMatch) {
      jsonString = fencedMatch[1];
    } else {
      const rawMatch = content.match(/\{\s*"(?:action|type|meta)"\s*:[\s\S]*\}/);
      if (rawMatch) {
        jsonString = rawMatch[0];
      }
    }
    
    if (jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (
          ["complete_simulation", "business_plan"].includes(parsed.action || parsed.type) ||
          parsed.payload ||
          (parsed.meta && parsed.projet && parsed.financier)
        ) {
          const finalData = parsed.payload || parsed.data || parsed;
          onSimulationComplete(finalData);
          return;
        }
      } catch(e) {}
    }
  }
  
  // If we reach here, no simulation was found in any message
  onSimulationComplete(null);
};

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  useEffect(() => {
    if (messages.length <= 1 && !messages.some(m => m.role === 'user')) {
      if (activeMode === "cultima") {
        getGreetingMessage(activeMode).then(msg => {
          setMessages([{ id: "welcome", role: "assistant", content: msg }]);
        });
      } else if (activeMode !== "cultiplan") {
        setMessages([]);
      }
    }
  }, [activeMode]);

  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasAutoGreeted = useRef(false);
  useEffect(() => {
    if (activeMode === "cultiplan" && messages.length === 0 && !sessionId && !isLoading && !hasAutoGreeted.current) {
      hasAutoGreeted.current = true;
      const runAutoGreeting = async () => {
        setIsThinking(true);
        await new Promise(r => setTimeout(r, 800));
        setIsThinking(false);
        
        let msg1: ChatMessage = { id: "welcome-1", role: "assistant", content: "" };
        setMessages([msg1]);
        
        const fullGreeting = await getGreetingMessage("cultiplan");
        
        for (let i = 0; i <= fullGreeting.length; i += 2) {
          msg1 = { ...msg1, content: fullGreeting.slice(0, i) };
          setMessages([msg1]);
          await new Promise(r => setTimeout(r, 10));
        }
        setMessages([{ ...msg1, content: fullGreeting }]);
      };
      runAutoGreeting();
    }
  }, [activeMode, messages.length, sessionId, isLoading]);

  // Load chat history if authenticated
  useEffect(() => {
    const loadSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return; // Si pas connecté, on arrête là (comme exigé)
      setUserId(user.id);

      // Find existing session for logged in user
      let { data: sessions } = await supabase
        .from("chat_sessions")
        .select("id, title")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      let { data: allSessions } = await supabase
        .from("chat_sessions")
        .select("id, title, updated_at, is_pinned, is_archived, share_id")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
        
      if (allSessions) setSessions(allSessions);

      let currentSessionId = null;

      if (sessions && sessions.length > 0) {
        currentSessionId = sessions[0].id;
      }

      if (currentSessionId) {
        setSessionId(currentSessionId);
        // Load messages
        const { data: history } = await supabase
          .from("chat_messages")
          .select("id, role, content")
          .eq("session_id", currentSessionId)
          .order("created_at", { ascending: true });

        if (history && history.length > 0) {
          if (activeMode === "cultiplan" && history[0].role !== "assistant") {
            const msg = await getGreetingMessage(activeMode);
            setMessages([
              { id: "welcome", role: "assistant", content: msg },
              ...(history as ChatMessage[])
            ]);
          } else {
            setMessages(history as ChatMessage[]);
          }
        } else if (activeMode === "cultiplan") {
          const msg = await getGreetingMessage(activeMode);
          setMessages([{ id: "welcome", role: "assistant", content: msg }]);
        }
      }
    };
    loadSession();
  }, []);

  const clearHistory = async () => {
    if (sessionId) {
      await supabase.from("chat_messages").delete().eq("session_id", sessionId);
    }
    if (activeMode === "cultiplan" || activeMode === "cultima") {
      const msg = await getGreetingMessage(activeMode);
      setMessages([{ role: "assistant", content: msg }]);
    } else {
      setMessages([]);
    }
    antMessage.success("Historique effacé");
  };

  const handleDeleteSession = async (id: string, e: any) => {
    e.stopPropagation();
    if (confirm("Êtes-vous sûr de vouloir supprimer cette discussion ?")) {
      await supabase.from("chat_sessions").delete().eq("id", id);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (sessionId === id) {
        setMessages([]);
        setSessionId(null);
      }
      antMessage.success("Discussion supprimée");
    }
  };

  const handlePinSession = async (id: string, currentPinStatus: boolean, e: any) => {
    e.stopPropagation();
    await supabase.from("chat_sessions").update({ is_pinned: !currentPinStatus }).eq("id", id);
    setSessions(prev => prev.map(s => s.id === id ? { ...s, is_pinned: !currentPinStatus } : s));
  };

  const handleArchiveSession = async (id: string, e: any) => {
    e.stopPropagation();
    await supabase.from("chat_sessions").update({ is_archived: true }).eq("id", id);
    setSessions(prev => prev.map(s => s.id === id ? { ...s, is_archived: true } : s));
    if (sessionId === id) {
      setMessages([]);
      setSessionId(null);
    }
    antMessage.success("Discussion archivée");
  };

  const handleUnarchiveSession = async (id: string) => {
    await supabase.from("chat_sessions").update({ is_archived: false }).eq("id", id);
    setSessions(prev => prev.map(s => s.id === id ? { ...s, is_archived: false } : s));
    antMessage.success("Discussion désarchivée");
  };

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedSessionToShare, setSelectedSessionToShare] = useState<ChatSession | null>(null);

  const handleShareClick = (session: ChatSession, e: any) => {
    e.stopPropagation();
    setSelectedSessionToShare(session);
    setIsShareModalOpen(true);
  };


  const startNewDiscussion = async () => {
    setSessionId(null);
    setMessages([]);
    hasAutoGreeted.current = false; // Reset auto greeting for new discussion
    setIsLoading(false); 
    setIsThinking(false); 
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (triggerNewSession) {
      startNewDiscussion();
    }
  }, [triggerNewSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      // Small timeout to ensure DOM is ready and we don't aggressively steal focus if the user clicked elsewhere
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  }, [isLoading]);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, []);

  useEffect(() => { autoResize(); }, [input, autoResize]);

  /* ─── Streaming Send ─── */
  const doSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsThinking(true);

    let currentSessionId = sessionId;

    // Créer une session au premier message si elle n'existe pas
    if (!currentSessionId && userId) {
      const title = text.substring(0, 30) + (text.length > 30 ? "..." : "");
      const { data: newSession, error } = await supabase
        .from("chat_sessions")
        .insert({ user_id: userId, title: title })
        .select("id, title")
        .single();
        
      if (error) {
        console.error("Erreur création de session :", error);
        antMessage.error("Erreur création de session: " + error.message);
      }
        
      if (newSession) {
        currentSessionId = newSession.id;
        setSessionId(currentSessionId);
        setSessions(prev => [{id: newSession.id, title: newSession.title, updated_at: new Date().toISOString()}, ...prev]);
      }
    }

    // Sauvegarde en DB (si connecté)
    if (currentSessionId) {
      await supabase.from("chat_messages").insert({ session_id: currentSessionId, role: "user", content: text });
    }

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData?.session?.access_token;
        
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          },
          // On envoie tout l'historique pour la mémoire temporelle, et l'outil courant !
          body: JSON.stringify({ messages: newMessages, mode: "Chat", toolContext: activeMode, model: "google/gemini-2.5-flash" }),
        });

      if (!res.ok) {
        if (res.status === 402) {
          throw new Error("CREDITS_EMPTY");
        }
        const errorText = await res.text();
        console.error("Backend error response:", errorText);
        throw new Error("Response error: " + errorText);
      }
      if (!res.body) throw new Error("Response error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let assistantSources: { file_name: string }[] = [];
      let assistantMsgAdded = false;
      let toolCallName = "";
      let toolCallArgs = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.type === "sources") {
              assistantSources = data.sources;
            } else if (data.type === "tool_call_start") {
              toolCallName = data.name;
              toolCallArgs += data.arguments;
            } else if (data.type === "tool_call_delta") {
              toolCallArgs += data.arguments;
            } else if (data.type === "token") {
              if (!assistantMsgAdded) {
                setIsThinking(false);
                setMessages((p) => [...p, { role: "assistant", content: data.content, sources: assistantSources, isStreaming: true }]);
                assistantContent = data.content;
                assistantMsgAdded = true;
              } else {
                assistantContent += data.content;
                setMessages((p) => {
                  const updated = [...p];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg && lastMsg.role === "assistant") {
                    updated[updated.length - 1] = { ...lastMsg, content: assistantContent };
                  }
                  return updated;
                });
              }
            } else if (data.type === "cultima_config" && onConfigComplete) {
              onConfigComplete(data.config);
            } else if (data.type === "done") {
              if (toolCallName === "route_to_tool") {
                try {
                  const args = JSON.parse(toolCallArgs);
                  const redirectMsg = args.reason + "\n\n*-> Redirection en cours vers " + args.target_tool + "...*";
                  setMessages((p) => [...p, { role: "assistant", content: redirectMsg, isStreaming: false }]);
                  assistantContent = redirectMsg;
                  assistantMsgAdded = true;
                  setTimeout(() => {
                    setActiveMode(args.target_tool);
                  }, 2000);
                } catch(e) {}
              } else if (toolCallName === "prepare_transaction") {
                try {
                  const args = JSON.parse(toolCallArgs);
                  if (onTransactionDraft) onTransactionDraft(args);
                  
                  const msg = "*-> J'ai préparé la transaction. Veuillez vérifier les informations dans le formulaire et cliquer sur 'Enregistrer' pour valider.*";
                  setMessages((p) => [...p, { role: "assistant", content: msg, isStreaming: false }]);
                  assistantContent = msg;
                  assistantMsgAdded = true;
                } catch(e) {}
              } else {
                setMessages((p) => {
                  const updated = [...p];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg && lastMsg.role === "assistant") {
                    updated[updated.length - 1] = { ...lastMsg, isStreaming: false };
                  }
                  return updated;
                });
              }
              // Sauvegarde de la réponse finale en DB
              if (currentSessionId && assistantContent) {
                supabase.from("chat_messages").insert({ session_id: currentSessionId, role: "assistant", content: assistantContent }).then();
              }
              
              // Détecter si on a reçu les données de simulation finales
              if (onSimulationComplete && assistantContent) {
                let jsonString = null;
                const fencedMatch = assistantContent.match(/```json\s+([\s\S]*?)\s+```/);
                if (fencedMatch) {
                  jsonString = fencedMatch[1];
                } else {
                  const rawMatch = assistantContent.match(/\{\s*"(?:action|type|meta)"\s*:[\s\S]*\}/);
                  if (rawMatch) {
                    jsonString = rawMatch[0];
                  }
                }
                
                if (jsonString) {
                  try {
                    const parsed = JSON.parse(jsonString);
                    if (
                      ["complete_simulation", "business_plan"].includes(parsed.action || parsed.type) || 
                      parsed.payload || 
                      (parsed.meta && parsed.projet && parsed.financier)
                    ) {
                      const finalData = parsed.payload || parsed.data || parsed;
                      onSimulationComplete(finalData);
                    }
                  } catch (e) {
                    console.error("Erreur parsing complete_simulation:", e);
                  }
                }
              }
            }
          } catch {
            // Skip malformed lines
          }
        }
      }

      if (!assistantMsgAdded && !toolCallName) {
        setIsThinking(false);
        setMessages((p) => [...p, { role: "assistant", content: "Désolé, une erreur s'est produite." }]);
      }
    } catch (err: any) {
      setIsThinking(false);
      if (err.message === "CREDITS_EMPTY") {
        setMessages((p) => [...p, { role: "assistant", content: "Désolé, vous n'avez plus d'énergie (crédits épuisés). ⚡" }]);
      } else {
        setMessages((p) => [...p, { role: "assistant", content: "Désolé, le service est temporairement indisponible. Veuillez réessayer." }]);
      }
    }
    setIsLoading(false);
    setIsThinking(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      antMessage.error("La saisie vocale n'est pas supportée par votre navigateur.");
      return;
    }

    const originalInput = input;
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    let sessionFinalTranscript = '';

    recognition.onresult = (event: any) => {
      let currentInterim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          sessionFinalTranscript += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }
      
      const space = originalInput.length > 0 && !originalInput.endsWith(' ') ? ' ' : '';
      const newText = originalInput + space + sessionFinalTranscript + currentInterim;
      setInput(newText);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSend = () => doSend(input);
  const handleSuggestion = (prompt: string) => doSend(prompt);
  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  /* ─── Input Bar ─── */
  const renderInputBar = (placeholder: string, large?: boolean) => (
    <div className={`w-full bg-white border border-gray-200/80 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-within:border-[#0B5345]/20 transition-all duration-300 overflow-hidden flex items-center`}>
      <div className={`flex-1 flex items-center ${large ? "px-6 py-4" : "px-4 py-3"}`}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={1}
          className={`flex-1 resize-none bg-transparent ${large ? "text-[16px]" : "text-[15px]"} text-gray-800 placeholder:text-gray-400 focus:outline-none leading-relaxed max-h-[200px] self-center`}
          style={{ paddingTop: '2px', paddingBottom: '2px' }}
        />
      </div>
      <div className={`flex items-center gap-1.5 ${large ? "pr-4" : "pr-3"}`}>
          <button
            onClick={toggleRecording}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-[0.92] ${
              isRecording 
                ? "bg-red-50 text-red-500 animate-pulse" 
                : "bg-transparent hover:bg-gray-50 text-gray-600"
            }`}
            aria-label="Saisie vocale"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
          </button>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-[0.92] ${
              input.trim() 
                ? "bg-gray-900 hover:bg-black text-white shadow-sm" 
                : "bg-transparent text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Envoyer"
          >
            {isLoading ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            )}
          </button>
        </div>
    </div>
  );

  const activeSessions = sessions.filter(s => !s.is_archived);
  const pinnedSessions = activeSessions.filter(s => s.is_pinned);
  const recentSessions = activeSessions.filter(s => !s.is_pinned);
  const archivedSessions = sessions.filter(s => s.is_archived);

  const renderSessionItem = (s: ChatSession) => (
    <div 
      key={s.id} 
      className={`group flex items-center justify-between w-full px-3 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 cursor-pointer 
      ${s.id === sessionId 
        ? "bg-[#f3fbe9] text-[#0B5345] border border-[#22c55e]/20" 
        : "bg-transparent text-gray-600 hover:bg-gray-50 border border-transparent"
      }`}
    >
      <button
        onClick={async () => {
          setSessionId(s.id);
          setIsLoading(true);
          const { data: history } = await supabase
            .from("chat_messages")
            .select("id, role, content")
            .eq("session_id", s.id)
            .order("created_at", { ascending: true });
          if (history) {
            setMessages(history as ChatMessage[]);
            extractSimulationData(history);
          }
          if (window.innerWidth < 768) setSidebarOpen(false);
          setIsLoading(false);
        }}
        className="flex-1 flex items-center gap-3 text-left truncate focus:outline-none"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={s.id === sessionId ? "text-[#22c55e]" : "text-gray-400"}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span className="truncate w-full block pt-0.5">{s.title}</span>
      </button>
      <Dropdown
        menu={{
          items: [
            { key: "pin", label: s.is_pinned ? "Désépingler" : "Épingler", icon: <span className="mr-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></span>, onClick: (e) => handlePinSession(s.id, !!s.is_pinned, e.domEvent) },
            { key: "share", label: "Partager", icon: <span className="mr-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></span>, onClick: (e) => handleShareClick(s, e.domEvent) },
            { key: "rename", label: "Renommer", icon: <span className="mr-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></span>, onClick: () => {
              const newTitle = prompt("Nouveau nom de la discussion :", s.title);
              if (newTitle && newTitle.trim()) {
                supabase.from("chat_sessions").update({ title: newTitle }).eq("id", s.id).then(() => {
                  setSessions(prev => prev.map(session => session.id === s.id ? { ...session, title: newTitle } : session));
                });
              }
            } },
            { key: "archive", label: "Archiver", icon: <span className="mr-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg></span>, onClick: (e) => handleArchiveSession(s.id, e.domEvent) },
            { type: 'divider' },
            { key: "delete", label: "Supprimer", danger: true, icon: <span className="mr-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></span>, onClick: (e) => handleDeleteSession(s.id, e.domEvent) }
          ]
        }}
        trigger={['click']}
        placement="bottomRight"
      >
        <button className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all focus:outline-none focus:opacity-100 ${s.id === sessionId ? 'text-white/80 hover:bg-white/20' : 'text-gray-400 hover:bg-black/5'}`} onClick={e => e.stopPropagation()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </Dropdown>
    </div>
  );

  return (
    <div className={isEmbedded ? "w-full h-full flex bg-white font-manrope relative" : "w-full h-full flex bg-white font-manrope relative"} style={{}}>
      {/* â•â•â•â•â•â•â• SIDEBAR â•â•â•â•â•â•â• */}
      {!hideSidebar && (
        <Drawer
          title={<span className="font-unbounded font-bold text-[#0B5345] text-lg tracking-tight">Historique</span>}
          placement="right"
          closable={true}
          onClose={() => setSidebarOpen(false)}
          open={sidebarOpen}
          width={340}
          getContainer={false}
          style={{ position: 'absolute' }}
          styles={{
            body: { padding: '0', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' },
            header: { backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0', padding: '20px 24px' }
          }}
        >
          <div className="px-6 py-6 border-b border-gray-50">
            <button 
              onClick={startNewDiscussion} 
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#0B5345] hover:bg-[#073c32] rounded-xl font-bold text-white transition-all shadow-[0_4px_12px_rgba(11,83,69,0.15)] hover:shadow-[0_6px_16px_rgba(11,83,69,0.2)] active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nouvelle discussion
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
            {pinnedSessions.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  Épinglées
                </h3>
                {pinnedSessions.map(s => renderSessionItem(s))}
              </div>
            )}
            
            <div className="space-y-1">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2 mt-4">Récentes</h3>
              {recentSessions.length === 0 && <p className="text-[13px] text-gray-400 px-2 font-medium">Aucune discussion récente.</p>}
              {recentSessions.map(s => renderSessionItem(s))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-50">
             <button onClick={() => setIsArchiveModalOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-[13px] font-bold text-gray-600 transition-colors border border-gray-100">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
               Voir les archives ({archivedSessions.length})
             </button>
          </div>
        </Drawer>
      )}

      {/* ═══ MAIN CHAT AREA ═══ */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-gradient-to-b from-[#f3fbe9]/60 via-white to-white overflow-hidden relative">

        {!hideSidebar && (
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-md z-10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-800 text-[14px]">
                {activeMode.charAt(0).toUpperCase() + activeMode.slice(1)}
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-[13px] text-gray-500 truncate max-w-[200px]">
                {sessions.find(s => s.id === sessionId)?.title || "Nouvelle discussion"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                title="Historique"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className="hidden sm:inline text-[13px] font-medium">Historique</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu toggle (visible only when sidebar is closed on small screens) */}
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden absolute top-4 left-4 z-50 w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800"
            aria-label="Ouvrir le menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        )}
        
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-[15vh]">
            <h1 className="font-manrope text-[28px] sm:text-[36px] text-gray-800 mb-8 text-center font-medium tracking-tight leading-snug">
              {activeMode === "cultiplan" ? (
                <>Prêt à bâtir votre business plan agricole ?</>
              ) : (
                <>Bonjour, comment puis-je vous aider ?</>
              )}
            </h1>
            <div className="w-full max-w-[860px]">{renderInputBar(`Posez votre question à ${title}...`, true)}</div>
          </div>
        ) : (
            <>
              <div className="flex-1 overflow-y-auto scroll-smooth min-h-0 pt-6">
                <div className="max-w-[880px] mx-auto px-6 py-12 space-y-7">
                {messages.map((msg, idx) => {
                  let displayContent = msg.content;
                  let questionnaireData: QuestionnaireData | null = null;

                  let simulationData: Record<string, unknown> | null = null;
                  if (msg.role === "assistant") {
                    // Try to match fenced JSON first, then fallback to raw JSON block containing action complete_simulation
                    let jsonString = null;
                    let matchToRemove = null;
                    
                    const fencedMatch = displayContent.match(/```json\s+([\s\S]*?)\s+```/);
                    if (fencedMatch) {
                      jsonString = fencedMatch[1];
                      matchToRemove = fencedMatch[0];
                    } else {
                      const rawMatch = displayContent.match(/\{\s*"(?:action|type|meta)"\s*:[\s\S]*\}/);
                      if (rawMatch) {
                        jsonString = rawMatch[0];
                        matchToRemove = rawMatch[0];
                      }
                    }

                    if (jsonString) {
                      try {
                        const parsed = JSON.parse(jsonString);
                        if (parsed.type === "questionnaire" && parsed.questions) {
                          questionnaireData = parsed;
                          displayContent = displayContent.replace(matchToRemove as string, "").trim();
                        }
                        if (
                          ["complete_simulation", "business_plan"].includes(parsed.action || parsed.type) ||
                          parsed.payload ||
                          parsed.meta || parsed.projet || parsed.synthese
                        ) {
                          simulationData = parsed.payload || parsed.data || parsed;
                          displayContent = displayContent.replace(matchToRemove as string, "").trim();
                        }
                      } catch (e) {
                        // ignore JSON parse errors
                      }
                    } 
                    
                    if (msg.isStreaming || (!jsonString && displayContent.includes('{"meta"'))) {
                      // Hide raw JSON stream and show progress message
                      let progressMsg = "";
                      if (displayContent.includes('"conclusion"')) progressMsg = "Génération de la conclusion...";
                      else if (displayContent.includes('"financier"')) progressMsg = "Modélisation financière en cours...";
                      else if (displayContent.includes('"risques"')) progressMsg = "Analyse des risques en cours...";
                      else if (displayContent.includes('"marketing"')) progressMsg = "Stratégie marketing en cours...";
                      else if (displayContent.includes('"technique"')) progressMsg = "Étude technique en cours...";
                      else if (displayContent.includes('"etude_marche"') || displayContent.includes('"marche"')) progressMsg = "Étude de marché en cours...";
                      else if (displayContent.includes('"projet"')) progressMsg = "Structuration du projet en cours...";
                      else if (displayContent.includes('"synthese"')) progressMsg = "Génération de la synthèse...";
                      else if (displayContent.includes('"meta"')) progressMsg = "Initialisation du business plan...";
                      else if (displayContent.includes('```json') || displayContent.includes('{')) progressMsg = "Génération en cours...";

                      if (progressMsg) {
                        const jsonStartIndex = displayContent.indexOf('```json');
                        const altJsonStartIndex = displayContent.indexOf('{');
                        const startIdx = jsonStartIndex !== -1 ? jsonStartIndex : (altJsonStartIndex !== -1 ? altJsonStartIndex : -1);
                        if (startIdx !== -1) {
                          displayContent = displayContent.substring(0, startIdx).trim();
                        }
                        displayContent += (displayContent ? "\n\n" : "") + "*\u23F3 " + progressMsg + "*";
                      } else {
                        // Fallback cleaning
                        displayContent = displayContent.replace(/```json\s+[^`]*$/, "").replace(/\{[\s\S]*$/, "").trim();
                      }
                    }
                  }

                  return (
                    <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-9 h-9 rounded-full bg-[#f3fbe9] flex items-center justify-center flex-shrink-0 mt-1 border border-[#22c55e]/20 relative shadow-sm">
                          <img src="/favicon.png" alt="Cultisia" className="w-5 h-5 object-contain" />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-[1.5px] border-white rounded-full"></span>
                        </div>
                      )}
                      <div className={`flex flex-col gap-1.5 ${msg.role === "user" ? "items-end max-w-[75%]" : "items-start w-full"}`}>
                        {msg.role === "user" ? (
                          <div className="px-5 py-3.5 rounded-3xl bg-[#f9f8f6] border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-gray-800 text-[15px] font-medium leading-[1.65] whitespace-pre-wrap">
                            {displayContent}
                          </div>
                        ) : (
                          <div className="relative w-full">
                            {displayContent && (
                              <MarkdownContent content={displayContent} />
                            )}
                            {msg.isStreaming && (
                              <span className="inline-block w-1 h-5 bg-[#D35400] animate-pulse ml-1 align-text-bottom rounded-sm" />
                            )}
                            {questionnaireData && !msg.isStreaming && !msg.questionnaireCompleted && (
                              <QuestionnaireWidget
                                data={questionnaireData}
                                onSubmit={(answers) => {
                                  setMessages(prev => {
                                    const next = [...prev];
                                    next[idx].questionnaireCompleted = true;
                                    return next;
                                  });
                                  const lines = questionnaireData!.questions.map((q, i) => `â€¢ ${q.question} : ${answers[i] || "Non spécifié"}`);
                                  doSend("Voici mes précisions pour affiner mon projet :\n" + lines.join("\n"));
                                }}
                              />
                            )}
                            {simulationData && !msg.isStreaming && (
                              <div className="mt-4 p-4 bg-[#f3fbe9] rounded-2xl border border-[#22c55e]/30 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm">
                                <p className="text-[14.5px] text-[#0B5345] font-semibold mb-4 text-center">🎉 La collecte d'informations est terminée.</p>
                                <button
                                  onClick={() => onSimulationComplete?.(simulationData)}
                                  className="bg-[#22c55e] text-white px-6 py-3 rounded-xl text-[14.5px] font-bold hover:bg-[#16a34a] hover:shadow-md transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
                                >
                                  Générer mon plan d'affaires
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        {msg.role === "assistant" && !msg.isStreaming && msg.sources && msg.sources.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {msg.sources.map((s, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#0B5345]/20 rounded-lg text-[11px] text-[#0B5345] font-semibold shadow-[0_1px_2px_rgba(11,83,69,0.05)] cursor-default">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                {s.file_name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {isThinking && <ThinkingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="flex-shrink-0 px-6 pb-6 pt-2 bg-gradient-to-t from-white via-white to-white/0">
              <div className="max-w-[860px] mx-auto">
                {renderInputBar("Répondre à Cultisia...")}
                <p className="text-center mt-3.5 text-[11.5px] font-medium text-gray-400">Cultisia peut faire des erreurs. Vérifiez les informations agronomiques avant toute action.</p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* ═══ MODALS ═══ */}
      <Modal
        title={<span className="font-unbounded font-bold text-gray-800 tracking-tight flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg> Archives</span>}
        open={isArchiveModalOpen}
        onCancel={() => setIsArchiveModalOpen(false)}
        footer={null}
        width={500}
        centered
        className="font-manrope"
      >
        <div className="py-4 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {archivedSessions.length === 0 ? (
            <p className="text-gray-500 text-center py-6 font-medium text-[14px]">Vos archives sont vides.</p>
          ) : (
            archivedSessions.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:border-gray-200 transition-all">
                <div className="flex items-center gap-3 truncate">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  <span className="font-medium text-gray-700 text-[14px] truncate">{s.title}</span>
                </div>
                <div className="flex gap-1.5 shrink-0 ml-2">
                  <Tooltip title="Désarchiver">
                    <button 
                      onClick={() => handleUnarchiveSession(s.id)}
                      className="p-1.5 text-gray-500 hover:text-[#0B5345] hover:bg-[#0B5345]/10 rounded-lg transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </button>
                  </Tooltip>
                  <Tooltip title="Supprimer définitivement">
                    <button 
                      onClick={(e) => handleDeleteSession(s.id, e)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>

      <Modal
        title={<span className="font-unbounded font-bold text-gray-800 tracking-tight flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> Partager la discussion</span>}
        open={isShareModalOpen}
        onCancel={() => setIsShareModalOpen(false)}
        footer={null}
        width={480}
        centered
        className="font-manrope"
      >
        <div className="py-6 space-y-6">
          <div className="p-4 bg-[#f3fbe9]/50 border border-[#0B5345]/10 rounded-xl">
            <h4 className="font-bold text-[#0B5345] mb-1">Copie Locale</h4>
            <p className="text-[13px] text-gray-600 mb-3 leading-relaxed">Téléchargez la conversation actuelle sous forme de fichier texte enrichi (.txt) sur votre appareil.</p>
            <button 
              onClick={async () => {
                if (!selectedSessionToShare) return;
                const { data: messages } = await supabase.from("chat_messages").select("role, content").eq("session_id", selectedSessionToShare.id).order("created_at", { ascending: true });
                if (messages) {
                  const textContent = messages.map((m: any) => `${m.role === 'user' ? 'Vous' : 'Cultisia'} :\n${m.content}\n\n`).join("---\n");
                  const blob = new Blob([textContent], { type: 'text/plain' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `cultiso-chat-${selectedSessionToShare.title.substring(0, 20)}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                  antMessage.success("Copie locale téléchargée !");
                }
              }}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-[13px] hover:bg-gray-50 transition-colors shadow-sm"
            >
              Télécharger .txt
            </button>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-1">Lien Public</h4>
            <p className="text-[13px] text-gray-600 mb-3 leading-relaxed">Générez un lien unique accessible par tous pour lire cette conversation.</p>
            <button 
              onClick={async () => {
                if (!selectedSessionToShare) return;
                try {
                  let shareId = selectedSessionToShare.share_id;
                  if (!shareId) {
                    const cryptoLib = window.crypto || (window as any).msCrypto;
                    shareId = cryptoLib.randomUUID();
                    await supabase.from("chat_sessions").update({ share_id: shareId }).eq("id", selectedSessionToShare.id);
                    setSessions(prev => prev.map(s => s.id === selectedSessionToShare.id ? { ...s, share_id: shareId } : s));
                  }
                  const link = `${window.location.origin}/share/${shareId}`;
                  await navigator.clipboard.writeText(link);
                  antMessage.success("Lien public copié dans le presse-papier !");
                } catch (err) {
                  antMessage.error("Erreur lors du partage public.");
                  console.error(err);
                }
              }}
              className="px-4 py-2 bg-[#0B5345] text-white font-bold rounded-lg text-[13px] hover:bg-[#073c32] transition-all shadow-[0_2px_8px_rgba(11,83,69,0.2)] active:scale-[0.98]"
            >
              Créer et copier le lien
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
