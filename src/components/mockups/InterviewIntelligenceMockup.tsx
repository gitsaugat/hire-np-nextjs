"use client";
import React, { useEffect, useState } from 'react';
import { Mic, Brain, Eye, Sparkles, Check, X, ShieldAlert, MessageSquare, Video, Info, FileText, Send } from 'lucide-react';

const InterviewIntelligenceMockup = () => {
  const [pulse, setPulse] = useState(0);
  const [typedInsight, setTypedInsight] = useState('');
  const insightText = "Strong alignment between resume technical claims and live coding performance. High communication clarity.";

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 4), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setTypedInsight('');
    let i = 0;
    const typing = setInterval(() => {
      i++;
      setTypedInsight(insightText.slice(0, i));
      if (i >= insightText.length) clearInterval(typing);
    }, 30);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      {/* Chrome */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-brand-primary" />
          <span className="text-[9px] font-bold text-ink-700 tracking-tight uppercase">AI Combined Candidate Record · Post-Interview</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="p-3 lg:p-4">
        {/* Header: Combined Score */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-black/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-bright flex items-center justify-center text-white font-black text-sm shadow-brand">
              AM
            </div>
            <div>
              <p className="text-[12px] font-bold text-ink-900 tracking-tight leading-none">Alex Morgan</p>
              <p className="text-[9px] text-ink-500 font-medium mt-1">Senior Designer · Nexus Tech</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[8px] font-bold text-ink-300 uppercase tracking-widest">Combined Score</p>
              <p className="text-16 font-black text-brand-primary leading-none mt-0.5">92/100</p>
            </div>
            <div className="px-2 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-1.5 animate-soft-pulse">
              <Check size={10} className="text-brand-primary" strokeWidth={3} />
              <span className="text-[9px] font-black text-brand-primary uppercase tracking-wider">Hire</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Left Column: Data Points */}
          <div className="space-y-3">
            {/* Resume Analysis */}
            <div className="p-2.5 rounded-xl border border-black/[0.04] bg-[#FAFAF7]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <FileText size={10} className="text-ink-400" />
                  <span className="text-[9px] font-bold text-ink-700 uppercase tracking-wider">Resume Insights</span>
                </div>
                <span className="text-[9px] font-bold text-brand-primary">94% Match</span>
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-1.5 text-[9px] text-ink-600 font-medium">
                  <Check size={8} className="text-brand-primary" /> 7+ years in SaaS Design
                </li>
                <li className="flex items-center gap-1.5 text-[9px] text-ink-600 font-medium">
                  <Check size={8} className="text-brand-primary" /> Master of Figma & Systems
                </li>
              </ul>
            </div>

            {/* Core Ratings Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg border border-black/[0.04] bg-white text-center">
                <p className="text-[8px] font-bold text-ink-300 uppercase mb-1">Comm. Skill</p>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[1,2,3,4,5].map(s => <Sparkles key={s} size={8} className={s <= 5 ? "text-brand-primary" : "text-ink-100"} />)}
                </div>
                <p className="text-[10px] font-black text-ink-900">Expert</p>
              </div>
              <div className="p-2 rounded-lg border border-black/[0.04] bg-white text-center">
                <p className="text-[8px] font-bold text-ink-300 uppercase mb-1">Cultural Fit</p>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[1,2,3,4,5].map(s => <Brain key={s} size={8} className={s <= 4 ? "text-brand-primary" : "text-ink-100"} />)}
                </div>
                <p className="text-[10px] font-black text-ink-900">High</p>
              </div>
            </div>

            {/* Skills Matrix */}
            <div className="p-2.5 rounded-xl border border-black/[0.04] bg-white">
              <p className="text-[9px] font-bold text-ink-400 uppercase tracking-wider mb-2">Skills Rating</p>
              <div className="space-y-2">
                {[
                  { label: 'Technical Implementation', score: 88 },
                  { label: 'Strategic Problem Solving', score: 95 },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-[8px] font-bold text-ink-700 mb-0.5">
                      <span>{s.label}</span>
                      <span>{s.score}%</span>
                    </div>
                    <div className="h-1 bg-ink-50 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary" style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-bold text-ink-400 uppercase tracking-widest">Live AI Reasoning</p>
              <div className="flex items-center gap-1 text-brand-primary">
                <Brain size={10} />
                <span className="text-[8px] font-bold uppercase tracking-wider">Generated</span>
              </div>
            </div>
            
            <div className="p-3 rounded-xl border border-brand-primary/20 bg-brand-soft/30 min-h-[120px]">
              <p className="text-[11px] text-ink-900 leading-relaxed font-bold">
                {typedInsight}<span className="inline-block w-1 h-3.5 bg-brand-primary ml-0.5 animate-soft-pulse align-middle" />
              </p>
            </div>

            <div className="p-3 rounded-xl border border-amber-100 bg-amber-50/40">
              <div className="flex items-center gap-1.5 mb-2">
                <ShieldAlert size={12} className="text-amber-600" />
                <p className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">Hiring Flags</p>
              </div>
              <p className="text-[10px] text-amber-900 leading-tight font-semibold italic">
                "Alex is slightly above the typical budget range, but technical scores suggest a high-ROI hire for this critical role."
              </p>
            </div>

            <button className="w-full py-2 rounded-lg bg-brand-primary text-white text-[9px] font-black uppercase tracking-[0.1em] shadow-brand flex items-center justify-center gap-2">
              <Send size={12} />
              Finalize Hire Decision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntelligenceMockup;
