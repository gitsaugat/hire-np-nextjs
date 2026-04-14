"use client";

import React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ProfileHeader({ profile, isSaving }) {
  return (
    <div className="space-y-2 border-b border-slate-100 pb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {profile?.full_name || "Account Profile"}
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your professional identity and application settings.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {isSaving ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 transition-all">
              <Loader2 size={10} className="animate-spin" />
              Saving
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 transition-all">
              <CheckCircle2 size={10} />
              Synced
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
