"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  LogOut,
  BarChart3,
  PlusCircle,
  KanbanSquare,
  CalendarDays,
  MessageSquare,
  FileBadge
} from "lucide-react";
import Logo from "../Logo";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Applicants", href: "/dashboard/applicants", icon: Users },
  { name: "Pipeline", href: "/dashboard/pipeline", icon: KanbanSquare },
  { name: "Interviews", href: "/dashboard/interviews", icon: CalendarDays },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Offers", href: "/dashboard/offers", icon: FileBadge },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];


export default function Sidebar({ onPostJobClick }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#f1f5f9] flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-[#f1f5f9]">
        <Link href="/">
          <Logo textColor="text-forest" />
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-teal/5 text-teal"
                  : "text-text-muted hover:bg-[#f8fafc] hover:text-forest"
                }`}
            >
              <item.icon
                size={20}
                className={isActive ? "text-teal" : "text-text-muted group-hover:text-forest"}
              />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-8 px-4">
          <button
            onClick={onPostJobClick}
            className="w-full flex items-center gap-3 px-4 py-3 bg-teal text-white rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:bg-forest transition-all duration-200"
          >
            <PlusCircle size={18} />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-[#f1f5f9]">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-[#f8fafc] hover:text-forest transition-all duration-200 ${pathname === "/dashboard/settings" ? "bg-teal/5 text-teal" : ""
            }`}
        >
          <Settings size={20} />
          <span className="font-semibold text-sm">Settings</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 mt-1"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
