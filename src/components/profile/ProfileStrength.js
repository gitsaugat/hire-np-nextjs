"use client";

import React, { useMemo } from "react";
import { Zap } from "lucide-react";

export default function ProfileStrength({ profile }) {
  const strength = useMemo(() => {
    let score = 0;
    if (profile?.full_name) score += 10;
    if (profile?.bio) score += 10;
    if (profile?.location) score += 5;
    if (profile?.skills?.length > 0) score += 20;
    if (profile?.experience?.length > 0) score += 25;
    if (profile?.education?.length > 0) score += 10;
    if (profile?.preferred_roles?.length > 0) score += 10;
    if (profile?.salary_expectation) score += 10;
    return Math.min(score, 100);
  }, [profile]);

  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-amber-500" />
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-tight">Profile Strength</h3>
        </div>
        <span className="text-xs font-bold text-slate-900">{strength}%</span>
      </div>

      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
          style={{ width: `${strength}%` }}
        />
      </div>
    </div>
  );
}
