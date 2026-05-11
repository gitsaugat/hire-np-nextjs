"use client";
import React from 'react';
import { BarChart3, TrendingUp, Users, Zap, Globe, MousePointer2 } from 'lucide-react';

const JobAnalyticsMockup = () => {
  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Real-time Job Analytics</span>
        <div className="w-12" />
      </div>

      <div className="p-5 bg-white">
        <div className="mb-5">
          <p className="text-[14px] font-bold text-ink-900 leading-tight">Senior Product Designer · Performance</p>
          <p className="text-[10px] text-ink-500 font-medium">Data from last 14 days</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Views', val: '2.4k', icon: <Globe size={12} />, trend: '+12%', up: true },
            { label: 'Applicants', val: '342', icon: <Users size={12} />, trend: '+8%', up: true },
            { label: 'Conversion', val: '14.2%', icon: <Zap size={12} />, trend: '-2%', up: false },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-xl border border-black/[0.04] bg-[#FAFAF7]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-ink-400">{s.icon}</div>
                <span className={`text-[9px] font-bold ${s.up ? 'text-brand-primary' : 'text-red-500'}`}>{s.trend}</span>
              </div>
              <p className="text-[18px] font-serif text-ink-900 leading-none mb-1">{s.val}</p>
              <p className="text-[9px] font-bold text-ink-300 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] font-bold text-ink-300 uppercase tracking-widest">Sourcing Channels</p>
              <span className="text-[9px] font-bold text-ink-400">Total: 342</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Referrals', val: 45, color: 'bg-brand-primary' },
                { label: 'LinkedIn', val: 32, color: 'bg-blue-500' },
                { label: 'Direct', val: 23, color: 'bg-emerald-400' },
              ].map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-semibold text-ink-700">{c.label}</span>
                    <span className="text-[10px] font-bold text-ink-900">{c.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-ink-50 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={12} className="text-blue-500" />
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">AI Insight</p>
            </div>
            <p className="text-[10px] text-blue-800 font-medium">Referrals are 3x more likely to reach final round.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnalyticsMockup;
