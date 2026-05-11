"use client";
import React from 'react';
import { MessageSquare, Hash, Rocket, ShieldCheck, Zap } from 'lucide-react';

const OnboardingIntegrationsMockup = () => {
  const platforms = [
    { name: "Slack", icon: <Hash className="text-[#4A154B]" size={16} />, status: "Coming Soon", color: "bg-purple-50" },
    { name: "Teams", icon: <div className="text-[#6264A7] font-bold text-sm">T</div>, status: "Coming Soon", color: "bg-indigo-50" },
    { name: "Discord", icon: <MessageSquare className="text-[#5865F2]" size={16} />, status: "Coming Soon", color: "bg-blue-50" },
    { name: "Rocket", icon: <Rocket className="text-[#F5455C]" size={16} />, status: "Coming Soon", color: "bg-red-50" },
  ];

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Onboarding Integrations</span>
        <div className="w-12" />
      </div>

      <div className="p-4 bg-white h-[360px] flex flex-col">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 mb-2">
            <Zap size={10} className="text-brand-primary" />
            <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest">Connect Tools</span>
          </div>
          <h4 className="text-[14px] font-bold text-ink-900 tracking-tight">Automate your onboarding</h4>
          <p className="text-[10px] text-ink-500 mt-0.5 max-w-[240px] mx-auto leading-relaxed">
            Sync new hires to your company channels automatically.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 flex-1">
          {platforms.map((p, i) => (
            <div key={i} className="group relative p-3 rounded-xl border border-black/[0.04] bg-[#FAFAF7] flex flex-col items-center justify-center gap-2 transition-all hover:border-brand-primary/20 hover:bg-white overflow-hidden">
              <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                {p.icon}
              </div>
              <p className="text-[10px] font-bold text-ink-900">{p.name}</p>
              
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-1.5 py-0.5 rounded-md bg-ink-900 text-white text-[8px] font-bold uppercase tracking-widest">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-2.5 rounded-lg border border-emerald-50 bg-emerald-50/30 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-brand-primary shrink-0">
            <ShieldCheck size={14} />
          </div>
          <p className="text-[9px] font-semibold text-emerald-800 leading-tight">
            Enterprise-grade security and compliance for all channel syncs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingIntegrationsMockup;
