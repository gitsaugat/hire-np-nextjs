"use client";

import React from "react";
import { Check, Save, Loader2, User } from "lucide-react";

export default function ProfileHeader({ profile, isSaving }) {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#0d4f3c] to-[#0f9e76] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-teal/10">
          {profile?.full_name?.[0]?.toUpperCase() || <User size={32} />}
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#0d4f3c] tracking-tight mb-1">
            {profile?.full_name || "New Candidate"}
          </h1>
          <div className="flex items-center gap-3">
             <span className="text-[11px] font-black uppercase tracking-wider text-[#0f9e76] bg-[#0f9e76]/10 px-3 py-1 rounded-full">
              {profile?.experience_level ? profile.experience_level.charAt(0).toUpperCase() + profile.experience_level.slice(1) : "Junior"} Level
            </span>
            <span className="text-sm font-bold text-slate-400">
              {profile?.location || "Location not set"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Last Sync</p>
          <p className="text-xs font-bold text-slate-400">Just now</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isSaving ? "bg-slate-50 border-slate-200" : "bg-emerald-50 border-emerald-100"} transition-all duration-300`}>
          {isSaving ? (
            <>
              <Loader2 size={14} className="animate-spin text-slate-400" />
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Saving...</span>
            </>
          ) : (
            <>
              <Check size={14} className="text-[#0f9e76]" />
              <span className="text-xs font-black text-[#0f9e76] uppercase tracking-wider">Synced</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
