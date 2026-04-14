"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Bell, User } from "lucide-react";

export default function DashboardHeader() {
  const { user } = useAuth();
  const companyName = user?.company_name || "Company";

  return (
    <header className="h-20 bg-white border-b border-[#f1f5f9] flex items-center justify-between px-8 sticky top-0 z-30 w-full">
      <div className="flex items-center gap-4 bg-[#f8fafc] px-4 py-2 rounded-xl border border-[#f1f5f9] w-96 transition-all duration-300 focus-within:ring-2 focus-within:ring-teal/20 focus-within:border-teal">
        <Search size={18} className="text-text-muted" />
        <input 
          type="text" 
          placeholder="Search applicants, jobs..." 
          className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-text-muted/60"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 bg-[#f8fafc] rounded-xl hover:bg-teal/5 transition-colors group">
          <Bell size={20} className="text-text-muted group-hover:text-teal" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-[#f1f5f9]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-forest">{companyName}</p>
            <p className="text-[10px] text-teal font-semibold uppercase tracking-wider">Company Admin</p>
          </div>
          <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center text-teal border border-teal/20 overflow-hidden font-bold">
            {companyName[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
