"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/profile/Sidebar";
import { useProfile } from "@/contexts/ProfileContext";
import { User, FileText, Briefcase } from "lucide-react";

export default function ProfileLayout({ children }) {
  const { notification } = useProfile();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar showSearch={false} />
      
      {/* Custom Toast Notification */}
      {notification && (
        <div className={`fixed top-24 right-8 z-[200] px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-right-10 duration-300 font-bold text-sm ${
          notification.type === "success" ? "bg-[#0d4f3c] text-white" : "bg-red-500 text-white"
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row max-w-[1440px] mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Mobile Navigation (Bottom) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 z-[100] flex justify-around">
          <Link href="/profile" className="flex flex-col items-center gap-1 text-[#0d4f3c]">
            <div className="p-1 rounded-lg bg-emerald-50"><User size={20} /></div>
            <span className="text-[10px] font-black uppercase">Profile</span>
          </Link>
          <Link href="/profile/resumes" className="flex flex-col items-center gap-1 text-slate-400">
            <FileText size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Resumes</span>
          </Link>
          <Link href="/profile/applications" className="flex flex-col items-center gap-1 text-slate-400">
            <Briefcase size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Apps</span>
          </Link>
        </div>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-4 md:p-8 pt-24 md:pt-24 min-h-screen pb-24 md:pb-8">
          <div className="max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
