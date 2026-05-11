"use client";
import React, { useEffect, useState } from 'react';
import { Calendar, Video, Check, Clock } from 'lucide-react';

const PIPELINE = [
  { label: 'Screening', state: 'done' },
  { label: 'Technical', state: 'done' },
  { label: 'Culture', state: 'active' },
  { label: 'Final', state: 'pending' },
];

const INTERVIEWS = [
  { name: "Alex Morgan", stage: "Technical", date: "May 10 · 10:00 AM", state: "completed", score: 88 },
  { name: "Priya Sharma", stage: "Culture",   date: "May 14 · 2:00 PM",  state: "scheduled" },
  { name: "Jordan Kim",  stage: "Screening", date: "May 16 · 11:00 AM", state: "scheduled" },
];

const InterviewHubMockup = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 3), 1400);
    return () => clearInterval(id);
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
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Interview hub</span>
        <span className="w-12" />
      </div>

      {/* Pipeline header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-semibold text-ink-900 tracking-tight">Senior Product Designer · Pipeline</p>
          <span className="text-[10px] font-semibold text-ink-400">8 candidates</span>
        </div>
        <div className="flex items-center gap-1">
          {PIPELINE.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold flex-1 justify-center transition-all ${
                s.state === 'done'
                  ? 'bg-emerald-50 border border-emerald-100 text-brand-primary'
                  : s.state === 'active'
                  ? 'bg-brand-primary text-white shadow-brand'
                  : 'bg-ink-50 border border-black/[0.04] text-ink-300'
              }`}>
                {s.state === 'done' && <Check size={9} strokeWidth={3} />}
                {s.state === 'active' && <span className="w-1 h-1 rounded-full bg-white animate-soft-pulse" />}
                {s.label}
              </div>
              {i < PIPELINE.length - 1 && <div className="w-2 h-px bg-ink-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-3 grid grid-cols-3 gap-1.5">
        {[
          { label: 'Today', val: '2' },
          { label: 'This week', val: '5' },
          { label: 'Avg score', val: '78%' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-black/[0.06] bg-[#FAFAF7] px-2.5 py-2">
            <p className="text-[9px] font-bold text-ink-400 uppercase tracking-[0.14em]">{s.label}</p>
            <p className="text-[14px] font-serif text-ink-900 tracking-tight leading-tight">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Interviews list */}
      <div className="px-4 pb-4 space-y-1.5">
        {INTERVIEWS.map((it, i) => {
          const isCompleted = it.state === 'completed';
          const isActive = pulse === i && !isCompleted;
          return (
            <div
              key={it.name}
              className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-all ${
                isActive ? 'border-emerald-200 bg-emerald-50/40' : 'border-black/[0.06] bg-white'
              }`}
            >
              <div className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center ${
                isCompleted ? 'bg-emerald-100 text-brand-primary' : 'bg-ink-50 text-ink-400'
              }`}>
                <Video size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] font-semibold text-ink-900 truncate tracking-tight">{it.name}</p>
                  <span className="text-[9px] font-semibold text-ink-400">·</span>
                  <span className="text-[9px] font-semibold text-ink-500">{it.stage}</span>
                </div>
                <p className="text-[9px] text-ink-400 truncate flex items-center gap-1 mt-0.5">
                  <Calendar size={8} /> {it.date}
                </p>
              </div>

              {/* AI bot badge */}
              <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-primary text-[9px] font-bold">
                <span className="w-1 h-1 rounded-full bg-brand-primary animate-soft-pulse" /> AI bot
              </div>

              {/* Status */}
              {isCompleted ? (
                <div className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-primary text-[9px] font-bold">
                  <Check size={9} strokeWidth={3} /> {it.score}
                </div>
              ) : (
                <div className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[9px] font-bold">
                  <Clock size={9} /> Scheduled
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewHubMockup;
