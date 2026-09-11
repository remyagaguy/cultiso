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
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0B5345] to-[#148f6c] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#0B5345]/10">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
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

/* â”€â”€â”€ Interactive Premium Questionnaire Widget â”€â”€â”€ */
const QuestionnaireWidget = ({
  data,
  onSubmit
}: {
  data: QuestionnaireData;
  onSubmit: (answers: Record<number, string>) => void;
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [step]: option };
    setAnswers(newAnswers);
    if (step < data.questions.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  const handleSkip = () => {
    const newAnswers = { ...answers, [step]: "Non spécifié" };
    setAnswers(newAnswers);
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
        <div className="flex justify-between items-center pt-3 px-1">
          <button 
            onClick={() => setStep(Math.max(0, step - 1))} 
            disabled={step === 0} 
            className="text-[13px] font-medium text-gray-400 hover:text-gray-700 disabled:opacity-0 transition-colors px-2 py-1"
          >
            â† Précédent
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
}

export function SharedChat({ toolContext, title = "Cultisia", subtitle = "Votre agronome virtuel, propulsé par l'IA", icon, isEmbedded = false, hideSidebar = false, onSimulationComplete, onConfigComplete }: SharedChatProps) {
  const [activeMode, setActiveMode] = useState<"cultisia" | "cultiplan" | "cultiseil" | "cultima">(toolContext);
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(
    activeMode === "cultiplan" 
      ? [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }] 
      : activeMode === "cultima"
      ? [{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)" }]
      : []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  useEffect(() => {
    if (messages.length <= 1 && !messages.some(m => m.role === 'user')) {
      if (activeMode === "cultiplan") {
        setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
      } else if (activeMode === "cultima") {
        setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia, votre assistant de configuration ERP. Parlez-moi de votre entreprise agricole. Quelle est votre activité principale ? (Ex: Elevage bovin, culture de maïs, etc.)" }]);
      } else {
        setMessages([]);
      }
    }
  }, [activeMode]);

  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history if authenticated
  useEffect(() => {
    const loadSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      // Find existing session or create one
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

  const startNewDiscussion = async () => {
    if (userId) {
      const { data: newSession } = await supabase
        .from("chat_sessions")
        .insert({ user_id: userId, title: "Discussion Cultisia" })
        .select("id, title")
        .single();
      if (newSession) {
        setSessionId(newSession.id);
        setSessions(prev => [{id: newSession.id, title: newSession.title, updated_at: new Date().toISOString()}, ...prev]);
      }
    }
    
    if (activeMode === "cultiplan") {
      setMessages([{ id: "welcome", role: "assistant", content: "Bonjour ! Je suis Cultisia. Mon rôle ici est de t'aider à bâtir le plan de ton futur business agricole. Pour commencer, parle-moi de ton idée (ex : culture de tomates, production de jus de fruits, élevage de 50 poulets à Kpalimé...)." }]);
    } else {
      setMessages([]);
    }
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
              setMessages((p) => {
                const updated = [...p];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg && lastMsg.role === "assistant") {
                  updated[updated.length - 1] = { ...lastMsg, isStreaming: false };
                }
                return updated;
              });
              // Sauvegarde de la réponse finale en DB
              if (sessionId) {
                supabase.from("chat_messages").insert({ session_id: sessionId, role: "assistant", content: assistantContent }).then();
              }
            }
          } catch {
            // Skip malformed lines
          }
        }
      }

      if (!assistantMsgAdded) {
        setIsThinking(false);
        setMessages((p) => [...p, { role: "assistant", content: "Désolé, une erreur s'est produite." }]);
      }
    } catch {
      setIsThinking(false);
      setMessages((p) => [...p, { role: "assistant", content: "Désolé, le service est temporairement indisponible. Veuillez réessayer." }]);
    }
    setIsLoading(false);
    setIsThinking(false);
  };

  const handleSend = () => doSend(input);
  const handleSuggestion = (prompt: string) => doSend(prompt);
  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  /* â”€â”€â”€ Input Bar â”€â”€â”€ */
  const renderInputBar = (placeholder: string, large?: boolean) => (
    <div className={`w-full bg-white border border-gray-200 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.12)] focus-within:border-[#0B5345]/40 transition-all duration-300`}>
      <div className={`flex items-start gap-3 ${large ? "px-5 pt-4 pb-2" : "px-4 pt-3 pb-1"}`}>
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={large ? 2 : 1}
          className={`flex-1 resize-none bg-transparent ${large ? "text-[16px]" : "text-[15.5px]"} text-gray-800 placeholder:text-gray-400 focus:outline-none leading-relaxed max-h-[200px] py-1`}
        />
      </div>
      <div className={`flex items-center justify-between ${large ? "px-5 pb-3.5 pt-1" : "px-4 pb-2.5 pt-0.5"}`}>
        <div className="flex items-center">
            {!isEmbedded && (
               <div className="relative">
                 <button
                   onClick={() => setIsModeMenuOpen(!isModeMenuOpen)}
                   className="flex items-center gap-1.5 text-[12.5px] font-semibold bg-white border border-gray-200 text-[#0B5345] rounded-full pl-3 pr-2.5 py-[5px] hover:border-[#0B5345]/30 shadow-sm transition-all focus:outline-none"
                 >
                   {activeMode === "cultisia" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>}
                   {activeMode === "cultiplan" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>}
                   {activeMode === "cultima" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
                   {activeMode === "cultiseil" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                   <span>{activeMode === "cultisia" ? "Cultisia Général" : activeMode === "cultiplan" ? "Mode CultiPlan" : activeMode === "cultima" ? "Mode Cultima" : "Mode Cultiseil"}</span>
                   <svg className="w-3.5 h-3.5 text-[#0B5345]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </button>
                 
                 {isModeMenuOpen && (
                   <>
                     <div className="fixed inset-0 z-40" onClick={() => setIsModeMenuOpen(false)} />
                     <div className="absolute left-0  w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in  duration-200">
                       <button onClick={() => { setActiveMode("cultisia"); setIsModeMenuOpen(false); }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-gray-50 transition-colors ${activeMode === "cultisia" ? "text-[#0B5345] bg-[#0B5345]/5" : "text-gray-700"}`}>
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                         Cultisia Général
                       </button>
                       <button onClick={() => { setActiveMode("cultiplan"); setIsModeMenuOpen(false); }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-gray-50 transition-colors ${activeMode === "cultiplan" ? "text-[#0B5345] bg-[#0B5345]/5" : "text-gray-700"}`}>
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                         Mode CultiPlan
                       </button>
                       <button onClick={() => { setActiveMode("cultima"); setIsModeMenuOpen(false); }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-gray-50 transition-colors ${activeMode === "cultima" ? "text-[#0B5345] bg-[#0B5345]/5" : "text-gray-700"}`}>
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                         Mode Cultima
                       </button>
                       <button onClick={() => { setActiveMode("cultiseil"); setIsModeMenuOpen(false); }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-gray-50 transition-colors ${activeMode === "cultiseil" ? "text-[#0B5345] bg-[#0B5345]/5" : "text-gray-700"}`}>
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5345]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                         Mode Cultiseil
                       </button>
                     </div>
                   </>
                 )}
               </div>
            )}
          </div>
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-full bg-[#0B5345] hover:bg-[#084236] disabled:bg-gray-100 disabled:cursor-not-allowed text-white disabled:text-gray-300 flex items-center justify-center transition-all duration-200 active:scale-[0.92] shadow-sm"
          aria-label="Envoyer"
        >
          {isLoading ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-75 transition-opacity">
            <img src="/favicon.png" alt="Cultiso" className="w-7 h-7 object-contain flex-shrink-0" />
            {sidebarOpen && <span className="font-unbounded font-bold text-[16px] text-[#052821]">{title}</span>}
          </Link>
          
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
                <button
                  key={s.id}
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
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors truncate ${s.id === sessionId ? "bg-[#0B5345]/10 text-[#0B5345] font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {s.title}
                </button>
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

      {/* â•â•â•â•â•â•â• MAIN â•â•â•â•â•â•â• */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-white overflow-hidden relative">
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
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
            <div className="w-16 h-16 flex items-center justify-center mb-6">
                <img src="/favicon.png" alt="Cultiso" className="w-full h-full object-contain drop-shadow-xl" />
              </div>
            <h1 className="font-unbounded text-3xl sm:text-[34px] font-bold text-[#052821] mb-3 text-center leading-tight tracking-tight">
              {activeMode === "cultiplan" ? (
                <>Cultisia Business Plan<br className="hidden sm:block" /> Prêt pour ton projet ?</>
              ) : (
                <>Bonjour, comment puis-je<br className="hidden sm:block" /> vous aider ?</>
              )}
            </h1>
            <p className="text-[15px] text-gray-400 mb-10 text-center font-medium">{subtitle}</p>
            <div className="w-full max-w-2xl">{renderInputBar(`Posez votre question à ${title}...`, true)}</div>
            
          </div>
        ) : (
          <>
            {/* Entête du chat (Actions) */}
            <div className="w-full h-14 border-b border-gray-100 flex items-center justify-end px-6 flex-shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              {messages.length > 0 && (
                <Tooltip title="Effacer la discussion">
                  <button 
                    onClick={clearHistory}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 flex items-center gap-2 text-sm font-medium"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <span className="hidden sm:inline">Effacer</span>
                  </button>
                </Tooltip>
              )}
            </div>
            <div className="flex-1 overflow-y-auto scroll-smooth min-h-0">
              <div className="max-w-[780px] mx-auto px-6 py-8 space-y-7">
                {messages.map((msg, idx) => {
                  let displayContent = msg.content;
                  let questionnaireData: QuestionnaireData | null = null;

                  let simulationData: any = null;
                  if (msg.role === "assistant") {
                    // Try to match fenced JSON first, then fallback to raw JSON block containing action complete_simulation
                    let jsonString = null;
                    let matchToRemove = null;
                    
                    const fencedMatch = displayContent.match(/```json\s+([\s\S]*?)\s+```/);
                    if (fencedMatch) {
                      jsonString = fencedMatch[1];
                      matchToRemove = fencedMatch[0];
                    } else {
                      const rawMatch = displayContent.match(/\{\s*"action"\s*:\s*"complete_simulation"[\s\S]*\}/);
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
                          simulationData = parsed;
                          displayContent = displayContent.replace(matchToRemove as string, "").trim();
                        }
                      } catch (e) {
                        // ignore JSON parse errors
                      }
                    } else if (msg.isStreaming) {
                      displayContent = displayContent.replace(/```json\s+[^`]*$/, "").replace(/\{\s*"action"\s*:\s*"complete_simulation"[\s\S]*$/, "").trim();
                    }
                  }

                  return (
                    <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0B5345] to-[#148f6c] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-[#0B5345]/10">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
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
