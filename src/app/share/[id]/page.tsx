"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export default function SharedConversationPage() {
  const { id } = useParams();
  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedConversation() {
      if (!id) return;

      try {
        setLoading(true);
        // Find session by share_id
        const { data: sessionData, error: sessionError } = await supabase
          .from("chat_sessions")
          .select("id, title, user_id")
          .eq("share_id", id)
          .single();

        if (sessionError || !sessionData) {
          setError("Cette conversation partagée n'existe pas ou le lien est invalide.");
          return;
        }

        setSession(sessionData);

        // Fetch messages for this session
        const { data: messagesData, error: messagesError } = await supabase
          .from("chat_messages")
          .select("id, role, content")
          .eq("session_id", sessionData.id)
          .order("created_at", { ascending: true });

        if (messagesError) {
          setError("Impossible de charger les messages.");
        } else {
          setMessages(messagesData || []);
        }
      } catch (err) {
        setError("Une erreur inattendue est survenue.");
      } finally {
        setLoading(false);
      }
    }

    fetchSharedConversation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] font-manrope">
        <div className="w-10 h-10 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FB] font-manrope px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mx-auto mb-4">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Lien invalide</h1>
          <p className="text-gray-500 text-[14px]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f3fbe9]/40 via-white to-white font-manrope">
      {/* HEADER */}
      <header className="h-[72px] flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#0B5345] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <img src="/favicon.png" alt="Cultiso" className="w-5 h-5 object-contain brightness-0 invert" />
          </div>
          <div>
            <span className="font-unbounded font-bold text-[#0B5345] text-[17px] tracking-tight block leading-none">cultiso</span>
            <span className="text-[11px] font-semibold text-[#D35400] uppercase tracking-wider block mt-0.5">Conversation partagée</span>
          </div>
        </div>
        <div className="text-[13px] font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 hidden sm:block truncate max-w-[300px]">
          {session?.title || "Discussion"}
        </div>
      </header>

      {/* MESSAGES */}
      <main className="flex-1 overflow-y-auto pt-8 pb-20">
        <div className="max-w-[800px] mx-auto px-6 space-y-7">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 font-medium">Cette discussion est vide.</p>
          ) : (
            messages.map((msg, idx) => {
              // Same cleanup logic as SharedChat
              let displayContent = msg.content;
              if (msg.role === "assistant") {
                const fencedMatch = displayContent.match(/```json\s+([\s\S]*?)\s+```/);
                if (fencedMatch) displayContent = displayContent.replace(fencedMatch[0], "").trim();
                else {
                  const rawMatch = displayContent.match(/\{\s*"(?:action|type|meta)"\s*:[\s\S]*\}/);
                  if (rawMatch) displayContent = displayContent.replace(rawMatch[0], "").trim();
                }
              }

              return (
                <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-9 h-9 rounded-full bg-[#f3fbe9] flex items-center justify-center flex-shrink-0 mt-1 border border-[#22c55e]/20 shadow-sm relative">
                      <img src="/favicon.png" alt="Cultisia" className="w-5 h-5 object-contain" />
                    </div>
                  )}
                  <div className={`flex flex-col gap-1.5 ${msg.role === "user" ? "items-end max-w-[85%]" : "items-start w-full"}`}>
                    {msg.role === "user" ? (
                      <div className="px-5 py-3.5 rounded-3xl bg-[#0B5345] text-white text-[15px] font-medium leading-[1.65] whitespace-pre-wrap shadow-sm">
                        {displayContent}
                      </div>
                    ) : (
                      <div className="relative w-full">
                        {displayContent && (
                          <div className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-[1.75]
                            prose-headings:font-unbounded prose-headings:font-bold prose-headings:text-[#0B5345] 
                            prose-h1:text-[22px] prose-h2:text-[18px] prose-h3:text-[15px] prose-h1:border-b-2 prose-h1:border-[#22c55e] prose-h1:pb-2
                            prose-p:text-[15px] prose-p:mb-4
                            prose-strong:text-[#0B5345] prose-strong:font-bold
                            prose-a:text-[#D35400] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                            prose-ul:list-disc prose-ul:pl-5 prose-li:mb-2
                            prose-blockquote:border-l-4 prose-blockquote:border-[#22c55e] prose-blockquote:bg-[#f3fbe9]/50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:italic
                            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[#D35400] prose-code:text-[13px] prose-code:font-mono
                            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-sm"
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {displayContent}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 border-t border-gray-100 bg-white shrink-0 text-center flex flex-col items-center justify-center">
        <p className="text-[13px] text-gray-500 font-medium mb-3">Cette conversation a été générée avec Cultisia.</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B5345] text-white rounded-xl text-[13px] font-bold hover:bg-[#073c32] transition-colors shadow-sm"
        >
          Découvrir Cultiso
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
        </a>
      </footer>
    </div>
  );
}
