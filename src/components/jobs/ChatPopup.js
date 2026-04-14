"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Send,
  X,
  Sparkles,
  User,
  Bot,
  Mic,
  MicOff,
  MessageCircle,
  ChevronRight,
  Info
} from "lucide-react";

export default function ChatPopup({ isOpen, onClose, job }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Reset chat when job changes
  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [job?.id]);

  // Sync initial message when job is loaded or chat is opened
  useEffect(() => {
    if (job?.title && messages.length === 0) {
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: `Hi there! I'm your AI assistant for HireNP. I've analyzed the **${job.title}** position at **${job.company_name || 'this company'}**. How can I help you today?`
        }
      ]);
    }
  }, [job, isOpen, messages.length]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const [isListening, setIsListening] = useState(false);
  const baseInputRef = useRef("");

  // Speech Recognition Setup
  useEffect(() => {
    let recognition = null;
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          let sessionTranscript = "";
          for (let i = 0; i < event.results.length; ++i) {
            sessionTranscript += event.results[i][0].transcript;
          }
          setInput(baseInputRef.current + (baseInputRef.current ? " " : "") + sessionTranscript);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
      }
    }

    if (isListening) {
      baseInputRef.current = input;
      if (recognition) recognition.start();
    } else {
      if (recognition) recognition.stop();
    }

    return () => { if (recognition) recognition.stop(); };
  }, [isListening]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    // Word limit check (200 words)
    const wordCount = input.trim().split(/\s+/).length;
    if (wordCount > 200) {
      alert("Please limit your message to 200 words or less.");
      return;
    }

    if (isListening) setIsListening(false);

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const systemPrompt = `You are an AI assistant for HireNP, a job platform. 
      You are helping a candidate learn more about this specific job opening.
      
      JOB DETAILS:
      - TITLE: ${job?.title}
      - COMPANY: ${job?.company_name || 'HireNP Partner'}
      - LOCATION: ${job?.location || 'Remote'}
      - SALARY: ${job?.salary_range || 'Competitive / Negotiable'}
      - TYPE: ${job?.job_type || 'Full-time'}
      - EXPERIENCE LEVEL: ${job?.experience_level || 'Not specified'}
      
      REQUIRED SKILLS:
      ${job?.skills?.length > 0 ? job.skills.map(s => `- ${s}`).join('\n') : '- General proficiency in the role'}
      
      KEY RESPONSIBILITIES:
      ${job?.responsibilities?.length > 0 ? job.responsibilities.map(r => `- ${r}`).join('\n') : '- Mentioned in full description'}
      
      FULL DESCRIPTION:
      ${job?.description}
      
      GUIDELINES:
      - Answer based ONLY on the info above. 
      - FORMATTING: Use Markdown strictly. Use **bold** for key terms and bulleted lists for several points.
      - If info is missing (like specific travel or benefits), say you don't have that detail and suggest they discuss it during an interview.
      - Keep it professional, encouraging, and helpful.`;

      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-oss:20b-cloud",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: input }
          ],
          stream: false,
        }),
      });

      if (!response.ok) throw new Error("Could not connect to AI assistant.");

      const data = await response.json();
      const aiContent = data.message?.content || "I'm sorry, I'm having trouble processing that right now.";

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: aiContent
      }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "I'm currently offline. Please try again in a moment!"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const MarkdownText = ({ content }) => {
    // Very simple bolding and list support
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 whitespace-pre-wrap">
        {lines.map((line, i) => {
          let processed = line;
          // Handle bold
          const boldMatch = line.match(/\*\*(.*?)\*\*/g);
          if (boldMatch) {
            return (
              <p key={i} className="leading-relaxed">
                {line.split(/\*\*(.*?)\*\*/).map((part, j) => 
                  j % 2 === 1 ? <strong key={j} className="text-[#0d4f3c] font-black">{part}</strong> : part
                )}
              </p>
            );
          }
          // Handle bullets
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return <div key={i} className="pl-4 relative flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-[#0d4f3c] mt-2 shrink-0" />
              <span>{line.trim().substring(2)}</span>
            </div>;
          }
          return <p key={i} className="leading-relaxed">{line}</p>;
        })}
      </div>
    );
  };

  const starterQuestions = [
    "What are the core skills needed?",
    "Tell me about the salary and location.",
    "What will be my daily responsibilities?",
    "Is this an office-based or remote role?"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 md:p-8 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-[420px] h-[600px] bg-white rounded-[32px] shadow-[0_30px_90px_-20px_rgba(13,79,60,0.25)] border border-slate-100 flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 bg-[#0d4f3c] text-white relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Sparkles size={20} className="text-teal-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Chat With HireNp</h3>
                    <p className="text-[10px] text-teal-200/80 font-medium">Powered by AI Assistant</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30"
            >
              <div className="flex items-center gap-3 p-3 bg-teal-50/50 rounded-2xl border border-teal-100/50 mb-6">
                <Info size={14} className="text-teal-600 shrink-0" />
                <p className="text-[11px] font-bold text-teal-800 leading-tight">
                  Discussing: <span className="text-forest underline">{job?.title}</span>
                </p>
              </div>

              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-[#0d4f3c] text-white" : "bg-white border border-slate-200 text-slate-400"
                    }`}>
                    {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-[13px] font-semibold leading-relaxed ${msg.role === "assistant"
                      ? "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none"
                      : "bg-[#0d4f3c] text-white shadow-md shadow-teal/5 rounded-tr-none"
                    }`}>
                    <MarkdownText content={msg.content} />
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0d4f3c] text-white flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-50 shrink-0">
              {messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {starterQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-bold text-slate-500 hover:border-teal-200 hover:text-teal-600 hover:bg-teal-50 transition-all flex items-center gap-1.5 group"
                    >
                      {q} <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSend} className="relative flex flex-col gap-2">
                <div className="flex justify-end px-2">
                  <span className={`text-[10px] font-bold ${input.trim().split(/\s+/).length > 200 ? "text-red-500" : "text-slate-400"}`}>
                    {input.trim() ? input.trim().split(/\s+/).length : 0} / 200 words
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about this role..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-12 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:bg-white focus:border-teal-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setIsListening(!isListening)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "text-slate-400 hover:text-teal-600 hover:bg-teal-50"
                      }`}
                  >
                    {isListening ? <X size={18} /> : <Mic size={18} />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping || input.trim().split(/\s+/).length > 200}
                  className="w-12 h-12 bg-[#0d4f3c] text-white rounded-2xl flex items-center justify-center hover:bg-[#0f9e76] transition-all disabled:opacity-50 disabled:scale-95 active:scale-90 shadow-lg shadow-teal/10 shrink-0"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
