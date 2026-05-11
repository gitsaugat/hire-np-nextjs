"use client";
import React from 'react';
import { UserPlus, Shield, Activity, Check, MoreVertical, Plus } from 'lucide-react';

const TeamManagementMockup = () => {
  const members = [
    { name: "Sarah Jenkins", role: "Admin", action: "Scheduled 5 interviews", time: "2m ago", img: "SJ" },
    { name: "Mike Ross", role: "Recruiter", action: "Advanced 12 candidates", time: "15m ago", img: "MR" },
    { name: "Jessica Pearson", role: "Hiring Manager", action: "Reviewed technical task", time: "1h ago", img: "JP" },
  ];

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Team Management</span>
        <div className="w-12" />
      </div>

      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-[13px] font-bold text-ink-900 leading-tight">Your Recruitment Team</h4>
            <p className="text-[10px] text-ink-500 font-medium">8 active collaborators</p>
          </div>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-primary text-white shadow-brand transition-all hover:bg-brand-deep">
            <UserPlus size={12} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Invite</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2.5">
            <p className="text-[9px] font-bold text-ink-300 uppercase tracking-widest px-1">Recent Activity</p>
            {members.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-black/[0.04] bg-[#FAFAF7]">
                <div className="w-7 h-7 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-[10px] font-bold text-brand-primary">
                  {m.img}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-bold text-ink-900">{m.name}</p>
                    <span className="px-1 py-0.5 rounded-md bg-white border border-black/[0.04] text-[8px] font-bold text-ink-400 uppercase tracking-tight">{m.role}</span>
                  </div>
                  <p className="text-[10px] text-ink-500 font-medium truncate">{m.action}</p>
                </div>
                <div className="text-[9px] font-bold text-ink-300">{m.time}</div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl border border-dashed border-black/[0.1] bg-[#FAFAF7] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-primary/30 transition-all">
            <div className="w-6 h-6 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-ink-300">
              <Plus size={12} />
            </div>
            <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider">Add recruiter seat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamManagementMockup;
