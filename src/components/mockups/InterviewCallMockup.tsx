"use client";
import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, MoreVertical, MessageSquare, Users, Sparkles, Brain } from 'lucide-react';

const InterviewCallMockup = () => {
  return (
    <div className="w-full rounded-xl bg-[#1A1C1E] border border-white/10 shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden flex flex-col h-[360px]">
      {/* Meet Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1C1E]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
            <Video size={14} className="text-white" />
          </div>
          <span className="text-[12px] font-medium text-white/90">Nexus Tech | Senior Designer Interview</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-medium text-white/60">12:15 PM</span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-[11px] font-medium text-white/60">abc-defg-hij</span>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-3">
        {/* HR - Sarah */}
        <div className="relative rounded-xl overflow-hidden bg-[#2D2E30] border border-white/5 flex flex-col items-center justify-center group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
            SJ
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
            <Mic size={10} className="text-white" />
            <span className="text-[10px] font-medium text-white">Sarah Jenkins (HR)</span>
          </div>
        </div>

        {/* Candidate - Alex */}
        <div className="relative rounded-xl overflow-hidden bg-[#2D2E30] border border-white/5 flex flex-col items-center justify-center group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
            AM
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
            <Mic size={10} className="text-white" />
            <span className="text-[10px] font-medium text-white">Alex Morgan (Candidate)</span>
          </div>
        </div>

        {/* AI Listener - Emma */}
        <div className="relative col-span-2 rounded-xl overflow-hidden bg-brand-primary/5 border border-brand-primary/20 flex flex-col items-center justify-center group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,182,122,0.1),transparent_70%)]" />
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-bright flex items-center justify-center text-xl font-bold text-white shadow-[0_0_20px_rgba(0,182,122,0.4)] animate-soft-pulse relative z-10">
            E
          </div>
          <div className="mt-3 flex flex-col items-center relative z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30">
              <Sparkles size={10} className="text-brand-primary" />
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">AI Listening</span>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
            <Brain size={10} className="text-brand-primary" />
            <span className="text-[10px] font-medium text-white">HireNP Intelligence</span>
          </div>
          {/* Animated Waveform */}
          <div className="absolute bottom-3 right-4 flex items-end gap-0.5 h-3">
            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4].map((h, i) => (
              <div 
                key={i} 
                className="w-0.5 bg-brand-primary rounded-full animate-pulse" 
                style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-16 bg-[#1A1C1E] flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2">
          <button className="p-2.5 rounded-full bg-[#3C4043] hover:bg-[#4C5054] text-white transition-colors">
            <Mic size={18} />
          </button>
          <button className="p-2.5 rounded-full bg-[#3C4043] hover:bg-[#4C5054] text-white transition-colors">
            <Video size={18} />
          </button>
          <button className="p-2.5 rounded-full bg-[#3C4043] hover:bg-[#4C5054] text-white transition-colors">
            <MessageSquare size={18} />
          </button>
          <button className="p-2.5 rounded-full bg-[#3C4043] hover:bg-[#4C5054] text-white transition-colors">
            <Settings size={18} />
          </button>
          <button className="p-2.5 px-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors flex items-center gap-2">
            <PhoneOff size={18} />
            <span className="text-[12px] font-bold">Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCallMockup;