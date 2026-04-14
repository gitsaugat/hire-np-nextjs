"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  X, 
  Sparkles, 
  User, 
  Bot, 
  MessageCircle, 
  ChevronRight,
  Info
} from "lucide-react";

export default function ChatPopup({ isOpen, onClose, job }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: "assistant", 
      content: `Hi there! I'm your AI assistant for HireNP. I've analyzed the ${job?.title} position at ${job?.company_name || 'this company'}. How can I help you today?` 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on the job description, this role focuses heavily on direct impact and technical growth.",
        `For the ${job?.title} role, the team is looking for someone who can hit the ground running with their core tech stack.`,
        "The company culture seems to prioritize collaboration and fast-paced innovation. Would you like to know more about the specific requirements?",
        "I've checked the requirements: you'll need strong experience in the mentioned areas, but they also value 'soft skills' like leadership and communication."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: randomResponse 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const starterQuestions = [
    "What are the key responsibilities?",
    "Tell me about the culture.",
    "What tech stack is used?",
    "Is this role remote?"
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
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "bg-[#0d4f3c] text-white" : "bg-white border border-slate-200 text-slate-400"
                  }`}>
                    {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-[13px] font-semibold leading-relaxed ${
                    msg.role === "assistant" 
                      ? "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none" 
                      : "bg-[#0d4f3c] text-white shadow-md shadow-teal/5 rounded-tr-none"
                  }`}>
                    {msg.content}
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

              <form onSubmit={handleSend} className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about this role..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-14 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:bg-white focus:border-teal-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-2 bottom-2 w-10 bg-[#0d4f3c] text-white rounded-xl flex items-center justify-center hover:bg-[#0f9e76] transition-all disabled:opacity-50 disabled:scale-95 active:scale-90 shadow-lg shadow-teal/10"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
