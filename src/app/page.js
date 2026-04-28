"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import ProblemSection from '@/components/landing/ProblemSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import Stats from '@/components/landing/Stats';
import Walkthrough from '@/components/landing/Walkthrough';
import Pricing from '@/components/landing/Pricing';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50/50">
      {/* Ambient glassmorphism orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-200/40 mix-blend-multiply blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] rounded-full bg-emerald-200/30 mix-blend-multiply blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-teal-100/40 mix-blend-multiply blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <Stats />
        <Walkthrough />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
      </div>
    </div>
  );
}
