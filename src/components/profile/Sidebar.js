"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  FileText, 
  Briefcase, 
  ChevronRight,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  { 
    label: "Profile", 
    href: "/profile", 
    icon: User,
    description: "Personal details & skills"
  },
  { 
    label: "Resumes", 
    href: "/profile/resumes", 
    icon: FileText,
    description: "Manage multiple resumes"
  },
  { 
    label: "Applications", 
    href: "/profile/applications", 
    icon: Briefcase,
    description: "Track your applied jobs"
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 border-r border-slate-100 bg-white h-screen sticky top-0 flex-col pt-24 pb-8">
      <div className="px-4 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 mb-4">
          Candidate OS
        </h2>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-[#0f9e76]/5 text-[#0f9e76]" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  isActive ? "bg-[#0f9e76] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
                }`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold tracking-tight">{item.label}</p>
                </div>
                {isActive && (
                  <ChevronRight size={14} className="opacity-50" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold text-sm"
        >
          <div className="p-2 rounded-xl bg-red-100">
            <LogOut size={18} />
          </div>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
