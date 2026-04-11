"use client";

import React from "react";
import { Zap } from "lucide-react";

export default function Logo({ className = "", showText = true, textColor = "text-white", iconSize = 22 }) {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Actual Logo Image provided by User */}
      <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-teal/20 transition-transform group-hover:scale-105 border border-white/10">
        <img 
          src="/logo.jpg" 
          alt="HireNP Logo" 
          className="w-full h-full object-cover"
        />
        
        {/* Subtle Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {showText && (
        <span className={`text-xl font-black tracking-tight ${textColor}`}>
          Hire<span className="text-[#0f9e76]">NP</span>
        </span>
      )}
    </div>
  );
}
