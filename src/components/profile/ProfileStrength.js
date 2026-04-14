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
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-amber-500 fill-amber-500" />
          <h3 className="font-black text-[#0d4f3c] tracking-tight">Profile Strength</h3>
        </div>
        <span className="text-xl font-black text-[#0d4f3c]">{strength}%</span>
      </div>

      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-[#0f9e76] transition-all duration-1000 ease-out"
          style={{ width: `${strength}%` }}
        />
      </div>

      <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
        {strength < 50 
          ? "Complete your profile to increase your visibility to top companies by up to 3x." 
          : strength < 90 
          ? "Almost there! Adding more experience or education will make your profile stand out." 
          : "Excellent profile! You're in the top 10% of candidates on HireNP."}
      </p>
    </div>
  );
}
