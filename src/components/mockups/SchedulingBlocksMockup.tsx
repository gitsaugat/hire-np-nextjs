"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, MessageSquare, Check, Clock, Sparkles, Send } from 'lucide-react';

const SchedulingBlocksMockup = () => {
  const [typed, setTyped] = useState("");
  const [showAI, setShowAI] = useState(false);
  const fullText = "Add interview blocks for May every Monday at 9am - 10am";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowAI(true), 500);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      {/* Chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Smart Scheduling</span>
        <div className="w-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] h-[340px]">
        {/* Calendar View */}
        <div className="border-r border-black/[0.06] p-4 bg-white overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[12px] font-bold text-ink-900">May 2026</p>
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded border border-black/[0.06] flex items-center justify-center bg-[#FAFAF7]"><Clock size={10} className="text-ink-400" /></div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <span key={i} className="text-[9px] font-bold text-ink-300 text-center uppercase">{d}</span>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isMonday = day % 7 === 4; // Mock logic for Mondays in May
              return (
                <div key={i} className={`aspect-square rounded-md border flex flex-col items-center justify-center transition-all ${
                  isMonday && showAI 
                    ? 'border-brand-primary/30 bg-brand-soft/50 ring-1 ring-brand-primary/10' 
                    : 'border-black/[0.04] bg-[#FAFAF7]'
                }`}>
                  <span className={`text-[10px] font-bold ${isMonday && showAI ? 'text-brand-primary' : 'text-ink-400'}`}>{day}</span>
                  {isMonday && showAI && <div className="w-1 h-1 rounded-full bg-brand-primary mt-0.5 animate-soft-pulse" />}
                </div>
              );
            })}
          </div>

          {showAI && (
            <div className="mt-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 animate-fadeInUp">
              <div className="flex items-center gap-2 mb-1">
                <Check size={10} className="text-brand-primary" />
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">Blocks Synced</p>
              </div>
              <p className="text-[9px] text-ink-600 font-medium">4 interview blocks added to Google Calendar (Mondays, 9:00 AM)</p>
            </div>
          )}
        </div>

        {/* AI Chat Area */}
        <div className="p-4 bg-[#FAFAF7] flex flex-col">
          <div className="flex-1 space-y-3">
            <div className="flex justify-end">
              <div className="max-w-[90%] px-3 py-2 rounded-xl rounded-br-sm bg-brand-primary text-white text-[11px] font-medium shadow-brand">
                {typed}<span className="inline-block w-[1.5px] h-3 bg-white/80 ml-0.5 animate-soft-pulse align-middle" />
              </div>
            </div>

            {showAI && (
              <div className="flex items-start gap-2 animate-fadeInUp">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-primary to-brand-bright flex items-center justify-center text-white font-bold text-[10px] shrink-0 mt-0.5 shadow-sm">E</div>
                <div className="max-w-[90%] px-3 py-2 rounded-xl rounded-bl-sm bg-white border border-black/[0.04] text-[11px] text-ink-700 font-medium shadow-sm">
                  Done! I've connected to your Google Calendar and created those 1 hour blocks for every Monday in May. 
                  <br /><br />
                  Would you like me to prioritize Alex Morgan for the first slot?
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg border border-black/[0.08] bg-white">
            <div className="flex-1 text-[10px] text-ink-300 font-medium italic">Type to manage schedule...</div>
            <Send size={12} className="text-ink-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingBlocksMockup;
