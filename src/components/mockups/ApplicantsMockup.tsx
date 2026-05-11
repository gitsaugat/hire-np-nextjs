"use client";
import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Check, AlertTriangle, X, Eye, BarChart3, Archive, MoreVertical } from 'lucide-react';

const APPLICANTS = [
  { name: "Alex Morgan", initials: "AM", role: "Senior Product Designer", score: 94, status: "Strong match", tone: "good" as const, flags: 0 },
  { name: "Priya Sharma", initials: "PS", role: "Senior Product Designer", score: 87, status: "Good fit", tone: "good" as const, flags: 0 },
  { name: "Jordan Kim", initials: "JK", role: "Senior Product Designer", score: 67, status: "Review", tone: "warn" as const, flags: 1 },
  { name: "Sam Rivera", initials: "SR", role: "Senior Product Designer", score: 34, status: "Weak fit", tone: "bad" as const, flags: 3 },
  { name: "Maya Chen", initials: "MC", role: "Senior Product Designer", score: 92, status: "Strong match", tone: "good" as const, flags: 0 },
  { name: "Liam Wilson", initials: "LW", role: "Senior Product Designer", score: 78, status: "Good fit", tone: "good" as const, flags: 0 },
  { name: "Sarah Connor", initials: "SC", role: "Senior Product Designer", score: 45, status: "Weak fit", tone: "bad" as const, flags: 2 },
  { name: "David Miller", initials: "DM", role: "Senior Product Designer", score: 81, status: "Good fit", tone: "good" as const, flags: 0 },
];

const ApplicantsMockup = () => {
  const [scored, setScored] = useState(0);

  useEffect(() => {
    setScored(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setScored(i);
      if (i >= APPLICANTS.length) clearInterval(id);
    }, 280);
    return () => clearInterval(id);
  }, []);

  const toneClasses = {
    good: { bar: 'bg-brand-primary', chip: 'bg-emerald-50 text-brand-primary border-emerald-100', icon: <Check size={9} strokeWidth={3} /> },
    warn: { bar: 'bg-amber-400', chip: 'bg-amber-50 text-amber-700 border-amber-100', icon: <AlertTriangle size={9} strokeWidth={2.5} /> },
    bad: { bar: 'bg-red-400', chip: 'bg-red-50 text-red-600 border-red-100', icon: <X size={9} strokeWidth={3} /> },
  };

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      {/* Chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Applicants · Senior Product Designer</span>
        <span className="w-12" />
      </div>

      {/* Header row */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <div className="pl-7 pr-2.5 py-1.5 rounded-md bg-[#FAFAF7] border border-black/[0.06] text-[10px] font-medium text-ink-400">
            Filter by skill, location, score...
          </div>
        </div>
        <button className="px-2 py-1.5 rounded-md bg-[#FAFAF7] border border-black/[0.06] text-[10px] font-semibold text-ink-500 inline-flex items-center gap-1">
          <SlidersHorizontal size={10} /> Sort
        </button>
      </div>

      {/* Filter chips */}
      <div className="px-4 pb-3 flex items-center gap-1.5">
        {[
          { label: 'All', count: APPLICANTS.length, active: true },
          { label: 'High match', count: 2 },
          { label: 'Needs review', count: 1 },
          { label: 'Rejected', count: 1 },
        ].map((c) => (
          <button
            key={c.label}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold transition-all ${
              c.active
                ? 'bg-ink-900 text-white'
                : 'bg-white border border-black/[0.06] text-ink-500'
            }`}
          >
            {c.label}
            <span className={`${c.active ? 'text-white/70' : 'text-ink-400'}`}>· {c.count}</span>
          </button>
        ))}
      </div>

      {/* Live scoring banner */}
      <div className="mx-4 mb-3 rounded-lg border border-emerald-100 bg-emerald-50/70 px-2.5 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-soft-pulse" />
          AI scoring in real time
        </div>
        <span className="text-[10px] font-bold text-brand-primary">{scored} / {APPLICANTS.length} analyzed</span>
      </div>

      {/* Rows */}
      <div className="px-4 pb-4 space-y-1.5 max-h-[260px] overflow-y-auto custom-scrollbar">
        {APPLICANTS.map((a, i) => {
          const isScored = i < scored;
          const t = toneClasses[a.tone];
          return (
            <div
              key={a.name}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-300 ${
                isScored ? 'border-black/[0.06] bg-white' : 'border-dashed border-black/[0.06] bg-[#FAFAF7]'
              }`}
            >
              {/* Avatar */}
              <div className={`relative shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                isScored ? 'bg-emerald-100 text-brand-primary' : 'bg-ink-100 text-ink-400'
              }`}>
                {a.initials}
                {isScored && a.flags > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-500 border border-white flex items-center justify-center text-[7px] font-bold text-white">{a.flags}</span>
                )}
              </div>

              {/* Name/role */}
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-ink-900 truncate tracking-tight">{a.name}</p>
                <p className="text-[9px] text-ink-400 truncate">{a.role}</p>
              </div>

              {/* Score */}
              <div className="hidden sm:flex items-center gap-2 shrink-0 w-32">
                <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isScored ? t.bar : 'bg-ink-200'}`}
                    style={{ width: isScored ? `${a.score}%` : '0%' }}
                  />
                </div>
                <span className={`text-[11px] font-bold tabular-nums w-8 text-right transition-colors duration-500 ${
                  isScored ? 'text-ink-900' : 'text-ink-300'
                }`}>
                  {isScored ? `${a.score}%` : '—'}
                </span>
              </div>

              {/* Status chip */}
              <div className={`shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border transition-all ${
                isScored ? t.chip : 'bg-ink-50 text-ink-300 border-black/[0.04]'
              }`}>
                {isScored ? t.icon : null}
                {isScored ? a.status : 'Pending'}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 ml-2">
                <button className="p-1.5 rounded-md hover:bg-emerald-50 text-ink-400 hover:text-brand-primary transition-all">
                  <Eye size={14} />
                </button>
                <button className="p-1.5 rounded-md hover:bg-amber-50 text-ink-400 hover:text-amber-500 transition-all">
                  <BarChart3 size={14} />
                </button>
                <button className="p-1.5 rounded-md hover:bg-rose-50 text-ink-400 hover:text-rose-500 transition-all">
                  <Archive size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicantsMockup;
