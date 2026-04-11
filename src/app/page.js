"use client";

import React, { Suspense } from "react";
import JobBoard from "@/components/jobs/JobBoard";

export default function Home() {
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
