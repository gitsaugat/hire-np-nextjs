"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  Mail, 
  FileText, 
  Plus, 
  LogOut,
  ChevronRight,
  Settings,
  Circle
} from 'lucide-react';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Job Listings', icon: Briefcase, href: '/dashboard/jobs' },
  { name: 'Applicants', icon: Users, href: '/dashboard/applicants' },
  { name: 'Interviews', icon: Calendar, href: '/dashboard/interviews' },
  { name: 'Emails', icon: Mail, href: '/dashboard/emails' },
  { name: 'Offers', icon: FileText, href: '/dashboard/offers' },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-20">
        <div className="p-8">
          <Logo />
        </div>

        <nav className="flex-grow px-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <link.icon size={22} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500 transition-colors'} />
                  <span className="font-semibold">{link.name}</span>
                </div>
                {isActive && <Circle size={6} fill="white" className="text-white" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 pb-8 space-y-6">
          <button className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            <Plus size={20} />
            <span className="tracking-wide">POST JOB</span>
          </button>

          <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
                H
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-800 truncate">hirenp@yopmail.com</span>
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest">HR ADMIN</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-[2rem] relative overflow-hidden group cursor-pointer active:scale-95 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 p-0.5">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" alt="Emma AI" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white uppercase tracking-tight">EMMA AI</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border-2 border-[#0F172A]"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">READY TO HELP YOU!</span>
              </div>
            </div>
          </div>
          
          <div className="px-4">
            <button className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors font-bold uppercase tracking-widest text-[11px]">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 min-h-screen">
        {children}
      </main>
    </div>
  );
}
