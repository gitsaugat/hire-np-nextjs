"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useJobs } from "@/contexts/JobContext";
import Logo from "@/components/Logo";
import {
  User,
  Settings,
  FileText,
  LogOut,
  Search,
  Sparkles
} from "lucide-react";

const UserDropdown = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-100 p-0.5 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center border border-slate-200"
      >
        <User size={20} className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] py-2 z-[100] animate-in fade-in zoom-in-95 duration-200">
          {!isLoggedIn ? (
            <div className="p-2">
              <button
                onClick={() => router.push("/auth")}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#0d4f3c] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#0f9e76]/10 flex items-center justify-center">
                  <User size={16} className="text-[#0f9e76]" />
                </div>
                Sign In
              </button>
            </div>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-slate-50 mb-1 text-left">
                <p className="text-sm font-bold text-[#0d4f3c]">{user?.full_name || user?.email || "Member"}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => { setIsOpen(false); router.push("/profile"); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={() => { setIsOpen(false); /* router.push("/applications"); */ }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <FileText size={16} /> My Applications
              </button>
              <button
                onClick={() => { setIsOpen(false); /* router.push("/settings"); */ }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Settings size={16} /> Settings
              </button>
              <div className="h-px bg-slate-50 my-1"></div>
              <button
                onClick={() => { setIsOpen(false); logout(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};



export default function Navbar({ showSearch = true }) {
  const { isLoggedIn, user } = useAuth();
  const { query, setQuery } = useJobs();
  const router = useRouter();

  const isCompany = user?.role === 'company' || user?.role === 'company_admin';

  return (
    <header className="sticky top-0 z-[60] w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 px-4 md:px-8 py-3">
      <div className="w-full mx-auto flex items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/">
          <Logo textColor="text-[#0d4f3c]" />
        </Link>

        {showSearch && (
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f9e76] transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs, roles, or skills..."
                className="w-full bg-[#f8fafc] rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-[#0f9e76]/5 transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-6 mr-2">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0f9e76] transition-colors">Find Jobs</Link>
            <Link href="#" className="text-sm font-semibold text-slate-600 hover:text-[#0f9e76] transition-colors">Companies</Link>
          </div>
          {isLoggedIn ? (
            <>
              {isCompany && (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d4f3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f9e76] transition-all shadow-md shadow-teal/10"
                >
                  Post Job
                </button>
              )}
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              <UserDropdown />
            </>
          ) : (
            <Link
              href="/auth"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 bg-[#0d4f3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f9e76] transition-all shadow-md shadow-teal/10"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
