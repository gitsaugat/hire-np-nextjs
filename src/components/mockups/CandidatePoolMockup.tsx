"use client";
import React, { useState } from 'react';
import { Search, Filter, Users, MapPin, Star, Tag, MoreHorizontal } from 'lucide-react';

const CandidatePoolMockup = () => {
  const candidates = [
    { name: "Sarah Chen", role: "Senior Frontend Engineer", loc: "San Francisco", tags: ["React", "TypeScript"], score: 94 },
    { name: "Marcus Miller", role: "Product Designer", loc: "New York", tags: ["Figma", "Design Systems"], score: 88 },
    { name: "Aisha Gupta", role: "Backend Architect", loc: "Remote", tags: ["Go", "Kubernetes"], score: 91 },
  ];

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Your Candidate Pool</span>
        <div className="w-12" />
      </div>

      <div className="p-4 bg-white">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/[0.06] bg-[#FAFAF7]">
            <Search size={12} className="text-ink-300" />
            <div className="text-[11px] text-ink-400 font-medium">Search 12,402 candidates...</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-black/[0.06] bg-white flex items-center gap-1.5">
            <Filter size={12} className="text-ink-400" />
            <span className="text-[11px] font-bold text-ink-700">Filters</span>
          </div>
        </div>

        <div className="space-y-2">
          {candidates.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-black/[0.04] bg-white hover:border-brand-primary/20 transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ink-50 to-ink-100 flex items-center justify-center border border-black/[0.06] text-ink-700 font-bold text-xs group-hover:from-brand-soft group-hover:to-brand-soft/50 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-all">
                {c.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[12px] font-bold text-ink-900 truncate">{c.name}</p>
                  <div className="px-1.5 py-0.5 rounded bg-emerald-50 text-brand-primary text-[8px] font-black uppercase tracking-widest border border-emerald-100">Owned</div>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <p className="text-[10px] text-ink-500 font-medium truncate">{c.role}</p>
                  <div className="flex items-center gap-1 text-ink-300">
                    <MapPin size={10} />
                    <span className="text-[10px] font-medium">{c.loc}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  {c.tags.slice(0, 1).map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-[#FAFAF7] border border-black/[0.04] text-[9px] font-bold text-ink-400">{t}</span>
                  ))}
                </div>
                <div className="text-[11px] font-black text-brand-primary">{c.score}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-brand-primary shadow-brand flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-white" />
            <p className="text-[11px] font-bold text-white uppercase tracking-wider">Talent Rediscovery</p>
          </div>
          <p className="text-[10px] font-medium text-white/90">3 matches from past roles found</p>
        </div>
      </div>
    </div>
  );
};

export default CandidatePoolMockup;
