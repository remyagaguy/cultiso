"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { message as antMessage, Tooltip, Dropdown } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* â”€â”€â”€ Types â”€â”€â”€ */
interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  sources?: { file_name: string }[];
  isStreaming?: boolean;
  questionnaireCompleted?: boolean;
}

interface ChatSession { id: string; title: string; updated_at: string; }

interface QuestionnaireData {
  type: string;
  questions: { question: string; options: string[] }[];
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

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [step]: option };
    setAnswers(newAnswers);
    setFreeTextMode(false);
    setFreeTextValue("");
    if (step < data.questions.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  const handleSkip = () => {
    const newAnswers = { ...answers, [step]: "Non spécifié" };
    setAnswers(newAnswers);
    setFreeTextMode(false);
    setFreeTextValue("");
    if (step < data.questions.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  const q = data.questions[step];
  if (!q) return null;

  return (
    <div className="mt-6 border border-gray-100 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden w-full max-w-xl transition-all duration-500 ease-out opacity-100 translate-y-0">
      <div className="flex items-start justify-between px-6 pt-6 pb-4">
        <h4 className="font-unbounded font-semibold text-[#0B5345] text-[15.5px] leading-snug pr-4">{q.question}</h4>
        <div className="flex items-center text-[11.5px] text-gray-500 font-medium gap-2 shrink-0 bg-[#f9f8f6] px-3 py-1.5 rounded-full border border-gray-100">
          <span>{step + 1} / {data.questions.length}</span>
        </div>
      </div>
      <div className="px-5 pb-5 space-y-2.5">
        {freeTextMode ? (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <textarea
              autoFocus
              placeholder="Précisez votre réponse..."
              value={freeTextValue}
              onChange={(e) => setFreeTextValue(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-200 bg-[#f9f8f6] focus:bg-white focus:border-[#0B5345] focus:ring-2 focus:ring-[#0B5345]/20 outline-none transition-all resize-none text-[14.5px] text-gray-700 min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => setFreeTextMode(false)}
                className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors px-3 py-2"
              >
                ← Retour aux suggestions
              </button>
              <button
                onClick={() => handleSelect(freeTextValue)}
                disabled={!freeTextValue.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#0B5345] text-white text-[14px] font-semibold hover:bg-[#084236] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Valider
              </button>
            </div>
          </div>
        ) : (
          <>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className="group w-full text-left px-4 py-3.5 rounded-2xl border border-transparent bg-[#f9f8f6] hover:bg-white hover:border-[#0B5345] hover:shadow-[0_2px_12px_rgba(11,83,69,0.08)] transition-all duration-200 text-[14.5px] text-gray-700 flex items-center gap-3.5 active:scale-[0.99]"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-white border border-gray-200 text-gray-400 group-hover:border-[#0B5345]/30 group-hover:text-[#0B5345] group-hover:bg-[#0B5345]/5 text-[13px] font-semibold shrink-0 transition-colors">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-medium group-hover:text-[#0B5345] transition-colors">{opt}</span>
              </button>
            ))}
            <button
              onClick={() => setFreeTextMode(true)}
              className="w-full text-left px-4 py-3.5 rounded-2xl border border-dashed border-gray-300 bg-white hover:border-[#D35400] hover:bg-[#D35400]/5 transition-all duration-200 text-[14.5px] text-gray-600 hover:text-[#D35400] flex items-center gap-3.5 active:scale-[0.99] mt-1"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-white border border-dashed border-gray-300 text-gray-400 text-[13px] font-semibold shrink-0 transition-colors">
                ✏️
              </span>
              <span className="font-medium">Autre (Saisir ma propre réponse)</span>
            </button>
          </>
        )}
        <div className="flex justify-between items-center pt-3 px-1 border-t border-gray-100 mt-3">
          <button 
            onClick={() => {
              setStep(Math.max(0, step - 1));
              setFreeTextMode(false);
            }} 
            disabled={step === 0} 
            className="text-[13px] font-medium text-gray-400 hover:text-gray-700 disabled:opacity-0 transition-colors px-2 py-1"
          >
            ← Précédent
          </button>
          <button 
            onClick={handleSkip} 
            className="text-[13px] font-medium text-gray-400 hover:text-[#D35400] transition-colors px-2 py-1"
          >
            Passer cette question
          </button>
        </div>
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
}

export function SharedChat({ toolContext, title = "Cultisia", subtitle = "Votre agronome virtuel, propulsé par l'IA", icon,  isEmbedded = false,
  hideSidebar = false,
  onSimulationComplete,
  onConfigComplete,
  onTransactionDraft
}: SharedChatProps) {
  const [activeMode, setActiveMode] = useState<"cultisia" | "cultiplan" | "cultiseil" | "cultima">(toolContext);
  const [messages, setMessages] = useState<ChatMessage[]>(
    activeMode === "cultima"
      ? [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)" }]
      : []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  useEffect(() => {
    if (messages.length <= 1 && !messages.some(m => m.role === 'user')) {
      if (activeMode === "cultima") {
        setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)" }]);
      } else {
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
        
        const msg1: ChatMessage = { id: "welcome-1", role: "assistant", content: "" };
        setMessages([msg1]);
        
        const text1 = "Bonjour ! 👋";
        for (let i = 0; i <= text1.length; i++) {
          setMessages([{ ...msg1, content: text1.slice(0, i) }]);
          await new Promise(r => setTimeout(r, 25));
        }

        await new Promise(r => setTimeout(r, 500));
        setIsThinking(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsThinking(false);
        
        const msg2: ChatMessage = { id: "welcome-2", role: "assistant", content: "" };
        setMessages([msg1, msg2]);
        
        const text2 = "Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...).";
        for (let i = 0; i <= text2.length; i += 2) {
          setMessages([msg1, { ...msg2, content: text2.slice(0, i) }]);
          await new Promise(r => setTimeout(r, 15));
        }
        setMessages([msg1, { ...msg2, content: text2 }]);
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
        .select("id, title, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
        
      if (allSessions) setSessions(allSessions);

      let currentSessionId = null;

      if (sessions && sessions.length > 0) {
        currentSessionId = sessions[0].id;
      } else {
        // Create new session if none exists
        const { data: newSession, error } = await supabase
          .from("chat_sessions")
          .insert({ user_id: user.id, title: "Discussion Cultisia" })
          .select("id, title")
          .single();
        if (newSession && !error) {
          currentSessionId = newSession.id;
        }
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
            setMessages([
              { id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." },
              ...(history as ChatMessage[])
            ]);
          } else {
            setMessages(history as ChatMessage[]);
          }
        } else if (activeMode === "cultiplan") {
          setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
        }
      }
    };
    loadSession();
  }, []);

  const clearHistory = async () => {
    if (sessionId) {
      await supabase.from("chat_messages").delete().eq("session_id", sessionId);
    }
    if (activeMode === "cultiplan") {
      setMessages([{ role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
    } else if (activeMode === "cultima") {
      setMessages([{ role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ?" }]);
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

  const startNewDiscussion = async () => {
    if (userId) {
      const { data: newSession } = await supabase
        .from("chat_sessions")
        .insert({ user_id: userId, title: "Nouvelle discussion" })
        .select("id, title")
        .single();
        
      if (newSession) {
        setSessionId(newSession.id);
        setSessions(prev => [{id: newSession.id, title: newSession.title, updated_at: new Date().toISOString()}, ...prev]);
      }
    }
    
    setMessages([]);
    hasAutoGreeted.current = false; // Reset auto greeting for new discussion
    setIsLoading(false); 
    setIsThinking(false); 
    setSidebarOpen(false);
  };

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

  /* â”€â”€â”€ Streaming Send â”€â”€â”€ */
  const doSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsThinking(true);

    // Sauvegarde en DB (si connecté)
    if (sessionId) {
      await supabase.from("chat_messages").insert({ session_id: sessionId, role: "user", content: text });
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
        throw new Error("Response error");
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
                  const redirectMsg = args.reason + "\n\n*➡️ Redirection en cours vers " + args.target_tool + "...*";
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
                  
                  const msg = "*➡️ J'ai préparé la transaction. Veuillez vérifier les informations dans le formulaire et cliquer sur 'Enregistrer' pour valider.*";
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
              if (sessionId && assistantContent) {
                supabase.from("chat_messages").insert({ session_id: sessionId, role: "assistant", content: assistantContent }).then();
              }
              
              // Détecter si on a reçu les données de simulation finales
              if (onSimulationComplete && assistantContent) {
                let jsonString = null;
                const fencedMatch = assistantContent.match(/```json\s+([\s\S]*?)\s+```/);
                if (fencedMatch) {
                  jsonString = fencedMatch[1];
                } else {
                  const rawMatch = assistantContent.match(/\{\s*"action"\s*:\s*"complete_simulation"[\s\S]*\}/);
                  if (rawMatch) {
                    jsonString = rawMatch[0];
                  }
                }
                
                if (jsonString) {
                  try {
                    const parsed = JSON.parse(jsonString);
                    if (parsed.action === "complete_simulation" || parsed.payload) {
                      onSimulationComplete(parsed);
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
      <div className={`flex items-center justify-center ${large ? "pl-5" : "pl-4"}`}>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1" aria-label="Ajouter un fichier">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
      <div className={`flex-1 flex items-center ${large ? "px-4 py-4" : "px-3 py-3"}`}>
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

  return (
    <div className={isEmbedded ? "w-full h-full flex bg-white font-manrope relative" : "w-full h-full flex bg-white font-manrope relative"} style={{}}>
      {/* â•â•â•â•â•â•â• SIDEBAR â•â•â•â•â•â•â• */}
      {!hideSidebar && (
      <aside 
        style={{ width: sidebarOpen ? 260 : 60 }} 
        className={`h-full bg-[#f9f8f6] flex flex-col flex-shrink-0 border-r border-gray-100 transition-all duration-300 ease-in-out ${sidebarOpen ? 'absolute md:relative z-[1000] shadow-2xl md:shadow-none' : 'hidden md:flex'}`}
      >
        <div className={`flex items-center ${sidebarOpen ? "justify-between pl-5 pr-3" : "justify-center"} h-[64px]`}>
          <div className="flex items-center gap-2.5">
            {sidebarOpen && <span className="font-unbounded font-bold text-[#0B5345] text-[15px] tracking-tight">Historique</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-black/5 rounded-lg text-gray-500 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          </button>
        </div>
        <div className={`${sidebarOpen ? "px-3" : "px-2"} mb-4 mt-2`}>
            <button onClick={startNewDiscussion} className={`${sidebarOpen ? "w-full gap-2.5 px-4 py-2.5 text-[13px] justify-start" : "w-10 h-10 justify-center mx-auto"} flex items-center bg-white hover:bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_5px_rgba(0,0,0,0.05)] hover:border-[#0B5345]/20 active:scale-[0.98]`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D35400]"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {sidebarOpen && "Nouvelle discussion"}
            </button>
          </div>
        {!sidebarOpen ? (
          <div className="flex flex-col items-center gap-2 mt-2">
            <Tooltip title="Ouvrir le menu" placement="right">
              <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors shadow-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></button>
            </Tooltip>
            <Tooltip title="Accueil" placement="right">
              <Link href="/" className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-gray-400 hover:text-[#0B5345] transition-colors shadow-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></Link>
            </Tooltip>
          </div>
        ) : (
          <>
            
<div className="flex-1 overflow-y-auto px-3 mt-2 space-y-1 custom-scrollbar">
              {sessions.map(s => (
                <div key={s.id} className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${s.id === sessionId ? "bg-[#0B5345]/10 text-[#0B5345] font-semibold" : "text-gray-600 hover:bg-gray-100"}`}>
                  <button
                    onClick={async () => {
                      setSessionId(s.id);
                      setIsLoading(true);
                      const { data: history } = await supabase
                        .from("chat_messages")
                        .select("id, role, content")
                        .eq("session_id", s.id)
                        .order("created_at", { ascending: true });
                      if (history) setMessages(history as ChatMessage[]);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                      setIsLoading(false);
                    }}
                    className="flex-1 text-left truncate focus:outline-none"
                  >
                    {s.title}
                  </button>
                  <Dropdown
                    menu={{
                      items: [
                        { key: "rename", label: "Renommer", icon: <span className="mr-1">✏️</span>, onClick: () => {
                          const newTitle = prompt("Nouveau nom de la discussion :", s.title);
                          if (newTitle && newTitle.trim()) {
                            supabase.from("chat_sessions").update({ title: newTitle }).eq("id", s.id).then(() => {
                              setSessions(prev => prev.map(session => session.id === s.id ? { ...session, title: newTitle } : session));
                            });
                          }
                        } },
                        { key: "delete", label: "Supprimer", danger: true, icon: <span className="mr-1">🗑️</span>, onClick: (e) => handleDeleteSession(s.id, e.domEvent) }
                      ]
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-black/5 text-gray-500 transition-all focus:outline-none focus:opacity-100" onClick={e => e.stopPropagation()}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                  </Dropdown>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200/50">
              <div className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-white hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0B5345] flex items-center justify-center text-[13px] font-bold text-white shadow-sm shrink-0">R</div>
                  <span className="text-[13.5px] font-medium text-gray-800">Agriculteur</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-[#D35400] transition-colors" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
            </div>
          </>
        )}
      </aside>
      )}

      {/* ═══ MAIN CHAT AREA ═══ */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-gradient-to-b from-[#f3fbe9]/60 via-white to-white overflow-hidden relative">
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
            <div className="w-full max-w-[760px]">{renderInputBar(`Posez votre question à ${title}...`, true)}</div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto scroll-smooth min-h-0 pt-6">
              <div className="max-w-[780px] mx-auto px-6 py-12 space-y-7">
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
                      const rawMatch = displayContent.match(/\{\s*"action"\s*:\s*"complete_simulation"[\s\S]*\}/) || displayContent.match(/\{\s*"type"\s*:\s*"questionnaire"[\s\S]*\}/);
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
                        } else if (parsed.action === "complete_simulation" || parsed.payload) {
                          simulationData = parsed.payload || parsed.data || parsed;
                          displayContent = displayContent.replace(matchToRemove as string, "").trim();
                        }
                      } catch (e) {
                        // ignore JSON parse errors
                      }
                    } else if (msg.isStreaming) {
                      displayContent = displayContent.replace(/```json\s+[^`]*$/, "").replace(/\{\s*"action"\s*:\s*"complete_simulation"[\s\S]*$/, "").replace(/\{\s*"type"\s*:\s*"questionnaire"[\s\S]*$/, "").trim();
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
                      <div className={`flex flex-col gap-1.5 ${msg.role === "user" ? "items-end max-w-[70%]" : "items-start max-w-[90%]"}`}>
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
              <div className="max-w-[760px] mx-auto">
                {renderInputBar("Répondre à Cultisia...")}
                <p className="text-center mt-3.5 text-[11.5px] font-medium text-gray-400">Cultisia peut faire des erreurs. Vérifiez les informations agronomiques avant toute action.</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
