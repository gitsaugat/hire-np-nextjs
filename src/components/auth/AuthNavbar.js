"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";

export default function AuthNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 px-4 md:px-8 py-3">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo textColor="text-forest" />
        </Link>

        {/* Action Group */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-forest text-sm font-bold rounded-2xl transition-all duration-300 hover:-translate-x-1"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Jobs</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
