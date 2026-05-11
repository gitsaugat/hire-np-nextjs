"use client";
import React from 'react';
import { FileSignature, Send, Eye, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const OfferTrackingMockup = () => {
  const offers = [
    { name: "Alex Morgan", status: "Signed", color: "bg-emerald-50 text-brand-primary", date: "2h ago", icon: <CheckCircle size={12} /> },
    { name: "Priya Sharma", status: "Viewed", color: "bg-blue-50 text-blue-500", date: "15m ago", icon: <Eye size={12} /> },
    { name: "Jordan Kim", status: "Sent", color: "bg-ink-50 text-ink-400", date: "1d ago", icon: <Send size={12} /> },
  ];

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Offer Management</span>
        <div className="w-12" />
      </div>

      <div className="p-5 bg-white">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10">
            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">Acceptance Rate</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-serif text-ink-900 leading-none">92%</span>
              <span className="text-[10px] text-brand-primary font-bold mb-0.5">+4% this month</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-ink-50/50 border border-black/[0.04]">
            <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-1">Avg. Time to Sign</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-serif text-ink-900 leading-none">18h</span>
              <span className="text-[10px] text-ink-400 font-bold mb-0.5">Top 5% of industry</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-ink-300 uppercase tracking-widest">Active Offers</p>
            <button className="text-[10px] font-bold text-brand-primary flex items-center gap-1">View all <ArrowRight size={10} /></button>
          </div>
          
          {offers.map((o, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-black/[0.04] bg-white hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${o.color}`}>
                  <FileSignature size={14} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-ink-900 leading-tight">{o.name}</p>
                  <p className="text-[10px] text-ink-500 font-medium">Senior Product Designer</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px] font-black uppercase tracking-wider ${o.color}`}>
                  {o.icon}
                  {o.status}
                </div>
                <span className="text-[9px] font-medium text-ink-300 italic">{o.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferTrackingMockup;
