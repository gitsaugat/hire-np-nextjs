"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostJobModal from "@/components/dashboard/PostJobModal";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

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
    </div>
  );
}
