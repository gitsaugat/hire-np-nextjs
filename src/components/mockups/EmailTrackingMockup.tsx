"use client";
import React from 'react';
import { Mail, MousePointer2, CheckCircle2, Clock, ArrowUpRight, BarChart3, Inbox } from 'lucide-react';

const EmailTrackingMockup = () => {
  const emails = [
    { subject: "Interview invitation: Nexus Tech", to: "alex@morgan.com", status: "opened", opens: 3, clicks: 1 },
    { subject: "Quick follow up on your application", to: "priya@sharma.dev", status: "sent", opens: 0, clicks: 0 },
    { subject: "Final round confirmation", to: "jordan@kim.io", status: "clicked", opens: 5, clicks: 2 },
  ];

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Email Tracking & Intelligence</span>
        <div className="w-12" />
      </div>

      <div className="p-4 bg-white h-[360px]">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Open Rate', val: '84%', icon: <Inbox size={12} />, color: 'text-brand-primary' },
            { label: 'Click Rate', val: '62%', icon: <MousePointer2 size={12} />, color: 'text-blue-500' },
            { label: 'Responses', val: '45%', icon: <CheckCircle2 size={12} />, color: 'text-emerald-500' },
          ].map((s) => (
            <div key={s.label} className="p-2.5 rounded-xl border border-black/[0.04] bg-[#FAFAF7]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className={s.color}>{s.icon}</span>
                <span className="text-[9px] font-bold text-ink-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-16 font-serif text-ink-900 leading-none">{s.val}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          <p className="text-[9px] font-bold text-ink-300 uppercase tracking-widest px-1">Tracking Activity</p>
          {emails.map((e, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.04] bg-white group hover:border-brand-primary/20 transition-all">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                e.status === 'opened' ? 'bg-blue-50 text-blue-500' : 
                e.status === 'clicked' ? 'bg-emerald-50 text-brand-primary' : 'bg-ink-50 text-ink-300'
              }`}>
                <Mail size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-ink-900 truncate leading-tight">{e.subject}</p>
                <p className="text-[10px] text-ink-500 font-medium mt-0.5">{e.to}</p>
              </div>
              <div className="flex items-center gap-3">
                {e.status !== 'sent' && (
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-ink-900 uppercase tracking-tight">{e.opens} opens</span>
                    <span className="text-[8px] font-medium text-ink-400 uppercase tracking-tight">{e.clicks} clicks</span>
                  </div>
                )}
                <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  e.status === 'opened' ? 'bg-blue-50 text-blue-500' : 
                  e.status === 'clicked' ? 'bg-emerald-50 text-brand-primary' : 'bg-ink-50 text-ink-400'
                }`}>
                  {e.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 rounded-xl border border-brand-primary/10 bg-brand-soft/30 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
            <Clock size={12} />
          </div>
          <p className="text-[10px] text-brand-deep font-semibold">AI Recommendation: Send follow-up to Marcus (unopened for 48h).</p>
        </div>
      </div>
    </div>
  );
};

export default EmailTrackingMockup;
