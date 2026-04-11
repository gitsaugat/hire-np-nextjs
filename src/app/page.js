"use client";

import React from "react";
import JobBoard from "@/components/jobs/JobBoard";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <JobBoard />
    </main>
  );
}
