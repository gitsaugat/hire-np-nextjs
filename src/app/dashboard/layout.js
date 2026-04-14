"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostJobModal from "@/components/dashboard/PostJobModal";
import ChatPopup from "@/components/jobs/ChatPopup";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const adminSupportJob = {
    title: "HireNP Admin Support",
    company_name: "HireNP",
    id: "admin-support-dummy"
  };

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("/auth");
      } else if (user?.role === 'candidate') {
        // Candidates are not allowed in the admin dashboard
        router.push("/");
      }
    }
  }, [user, isLoggedIn, isLoading, router]);

  if (isLoading || (isLoggedIn && user?.role === 'candidate')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar onPostJobClick={() => setIsPostJobModalOpen(true)} />
      <div className="pl-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <PostJobModal 
        isOpen={isPostJobModalOpen} 
        onClose={() => setIsPostJobModalOpen(false)}
        onJobPosted={() => {
          window.location.reload(); 
        }}
      />

      <ChatPopup 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        job={adminSupportJob} 
      />

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-[#0d4f3c] text-white rounded-2xl shadow-2xl hover:bg-[#0f9e76] transition-all group scale-100 hover:scale-105 active:scale-95 border border-white/10"
      >
        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
        <span className="font-bold text-sm">AI Support</span>
      </button>
    </div>
  );
}
