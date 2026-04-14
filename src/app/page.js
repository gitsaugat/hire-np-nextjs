"use client";

import React, { Suspense, useEffect } from "react";
import JobBoard from "@/components/jobs/JobBoard";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn && (user?.role === 'company' || user?.role === 'company_admin')) {
      router.push("/dashboard");
    }
  }, [user, isLoggedIn, isLoading, router]);

  if (isLoading || (isLoggedIn && (user?.role === 'company' || user?.role === 'company_admin'))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d4f3c]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d4f3c]"></div>
        </div>
      }>
        <JobBoard />
      </Suspense>
    </main>
  );
}
