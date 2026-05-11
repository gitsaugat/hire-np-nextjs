"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Check, Clock, Sparkles, Send, User, MapPin, Video, Info } from 'lucide-react';

const CandidateSchedulingMockup = () => {
  const [selected, setSelected] = useState(0);
  const slots = [
    { day: "Mon", date: "May 11", time: "09:00 AM", status: "recommended" },
    { day: "Mon", date: "May 11", time: "10:00 AM", status: "available" },
    { day: "Mon", date: "May 18", time: "09:00 AM", status: "available" },
    { day: "Tue", date: "May 12", time: "02:00 PM", status: "available" },
    { day: "Wed", date: "May 13", time: "11:00 AM", status: "available" },
  ];

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      {/* Chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Interview Invitation</span>
        <div className="w-12" />
      </div>

      <div className="p-4 lg:p-6 bg-white">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-soft flex items-center justify-center border border-brand-primary/10">
              <span className="text-brand-primary font-bold text-lg">H</span>
            </div>
            <div>
              <p className="text-[14px] font-bold text-ink-900 leading-tight">HireNP · Invitation</p>
              <p className="text-[11px] text-ink-500 font-medium mt-0.5">Senior Product Designer Interview</p>
            </div>
          </div>
          <p className="text-[12px] text-ink-700 leading-relaxed max-w-lg">
            Hi Alex! You've been advanced to the next round. Our AI has matched your availability with our team. <span className="text-brand-primary font-bold">Please select one of the top 5 picks below:</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
          {slots.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                selected === i 
                  ? 'border-brand-primary bg-brand-soft ring-1 ring-brand-primary/20 scale-[1.02]' 
                  : 'border-black/[0.06] bg-white hover:border-black/[0.12] hover:bg-[#FAFAF7]'
              }`}
            >
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${selected === i ? 'text-brand-primary' : 'text-ink-400'}`}>
                {s.day}
              </p>
              <p className="text-[14px] font-bold text-ink-900 mb-0.5">{s.date}</p>
              <p className="text-[11px] text-ink-500 font-medium mb-2">{s.time}</p>
              {s.status === 'recommended' && (
                <div className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                  selected === i ? 'bg-brand-primary text-white' : 'bg-emerald-50 text-brand-primary'
                }`}>
                  Top Pick
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
          <div className="flex items-center gap-3 text-ink-400">
            <div className="flex items-center gap-1.5">
              <Video size={12} />
              <span className="text-[10px] font-bold uppercase tracking-tight">Google Meet</span>
            </div>
            <div className="w-px h-3 bg-black/[0.08]" />
            <div className="flex items-center gap-1.5 text-brand-primary">
              <Sparkles size={12} />
              <span className="text-[10px] font-bold uppercase tracking-tight">AI Assisted</span>
            </div>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold text-ink-500 bg-[#FAFAF7] border border-black/[0.06] hover:bg-white hover:border-black/[0.12] transition-all">
              Request Other Times
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold text-white bg-brand-primary shadow-brand hover:bg-brand-deep transition-all">
              Confirm Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSchedulingMockup;
