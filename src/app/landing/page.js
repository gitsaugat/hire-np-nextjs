"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/landing/LandingHero';
import ProblemBar from '@/components/landing/ProblemBar';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import WhoItsFor from '@/components/landing/WhoItsFor';
import PricingSection from '@/components/landing/PricingSection';
import TrustSection from '@/components/landing/TrustSection';
import { FinalCTA, Footer } from '@/components/landing/FooterCTA';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <LandingHero />
        <ProblemBar />
        <HowItWorks />
        <FeaturesGrid />
        <WhoItsFor />
        <PricingSection />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
