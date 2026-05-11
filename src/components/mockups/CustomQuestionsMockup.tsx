"use client";
import React from 'react';
import { MessageSquare, Brain, Sparkles, Check, Info, LayoutList } from 'lucide-react';

const CustomQuestionsMockup = () => {
  const questions = [
    { 
      q: "How would you handle a design system migration for a product with 10k+ active users?", 
      reason: "Verify experience with large-scale migrations mentioned in resume.",
      icon: <Brain size={12} />,
      type: "Technical"
    },
    { 
      q: "Tell me about a time you had a strong disagreement with an engineer. What was the outcome?", 
      reason: "Culture fit: Looking for collaborative conflict resolution patterns.",
      icon: <MessageSquare size={12} />,
      type: "Collaboration"
    },
  ];

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles size={10} className="text-brand-primary" />
          <span className="text-[10px] font-semibold text-ink-700 tracking-tight">AI Interview Architect</span>
        </div>
        <div className="w-12" />
      </div>

      <div className="p-5 bg-white">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[13px] font-bold text-ink-900 leading-tight">Custom Questions for Alex</h4>
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Tailored for Round 2</span>
          </div>
          <p className="text-[11px] text-ink-500 font-medium">AI generated based on Resume + Round 1 Screening notes.</p>
        </div>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl border border-black/[0.06] bg-[#FAFAF7] group hover:border-brand-primary/20 transition-all">
                <div className="shrink-0 w-7 h-7 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center text-brand-primary group-hover:shadow-sm transition-all">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-ink-300">{item.type}</span>
                    <span className="w-1 h-1 rounded-full bg-ink-200" />
                    <span className="text-[9px] font-bold text-brand-primary">High Priority</span>
                  </div>
                  <p className="text-[12px] font-bold text-ink-900 leading-normal">{item.q}</p>
                </div>
              </div>
              
              <div className="ml-10 flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                <Info size={10} className="text-brand-primary mt-0.5" />
                <p className="text-[10px] text-brand-deep font-medium italic">Why we ask this: {item.reason}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-black/[0.08] text-[11px] font-bold text-ink-700 shadow-sm hover:border-brand-primary/20 transition-all">
            <LayoutList size={12} className="text-brand-primary" />
            Generate more questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomQuestionsMockup;
