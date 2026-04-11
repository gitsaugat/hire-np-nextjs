"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthBanner({ isAuthenticated }) {
  if (isAuthenticated) return null;

  return (
    <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-white rounded-[24px] p-6 shadow-[0_20px_40px_-12px_rgba(13,79,60,0.12)] hover:shadow-[0_30px_60px_-12px_rgba(13,79,60,0.15)] transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#0f9e76] drop-shadow-[0_0_8px_rgba(15,158,118,0.3)]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#0d4f3c]">
                Let AI find the right jobs for you
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                Sign in to see jobs ranked based on your skills, experience, and profile.
              </p>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <Link
              href="/auth"
              className="group flex items-center gap-2 text-sm font-bold text-[#0d4f3c] hover:text-[#0f9e76] transition-all px-4 py-2 rounded-lg hover:bg-slate-50"
            >
              <Sparkles className="w-5 h-5 text-[#0f9e76] drop-shadow-[0_0_8px_rgba(15,158,118,0.3)]" />

              Unlock AI Matches
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
