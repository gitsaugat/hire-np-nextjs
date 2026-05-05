"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 }
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        
        {/* HERO */}
        <section className="bg-[#0A0F1E] pt-40 pb-24 lg:pt-56 lg:pb-40 px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-serif text-white mb-8"
            >
              We're fixing hiring.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#9CA3AF] text-lg md:text-2xl font-medium"
            >
              HireNP was built because hiring is broken — and everyone knows it.
            </motion.p>
          </div>
        </section>

        {/* STORY */}
        <section className="bg-white py-24 lg:py-32 px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeInUp} className="text-3xl font-serif text-[#0A0F1E] mb-12 text-center">Why we built this</motion.h2>
            <div className="space-y-8 text-[#4B5563] text-lg leading-relaxed font-medium">
              <motion.p {...fadeInUp}>
                The average company uses 4-6 separate tools to make one hire. None of them explain why a candidate was selected. None of them talk to each other.
              </motion.p>
              <motion.p {...fadeInUp}>
                We built HireNP to fix all of that.
              </motion.p>
              <motion.p {...fadeInUp}>
                One platform. Full AI reasoning on every decision. Human control at every step. A system that works for both the company hiring and the candidate applying.
              </motion.p>
              <motion.p {...fadeInUp}>
                We're headquartered in Buffalo, NY with roots in Nepal — building for both markets from day one.
              </motion.p>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="bg-[#0A0F1E] py-32 px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-[#00B67A]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.blockquote {...fadeInUp} className="text-3xl md:text-5xl font-serif text-white leading-tight">
              "Make hiring transparent, fast, and fair — for companies and candidates alike."
            </motion.blockquote>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-white py-24 lg:py-32 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparency",
                  desc: "AI should show its work. Every hiring decision should be explainable."
                },
                {
                  title: "Human Control",
                  desc: "AI handles the volume. Humans make the calls."
                },
                {
                  title: "Both Sides Matter",
                  desc: "Built for companies and candidates alike. Good hiring is good for everyone."
                }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB]"
                >
                  <h3 className="text-2xl font-bold text-[#0A0F1E] mb-6">{value.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed font-medium">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-[#F9FAFB] py-24 px-6 text-center border-t border-[#E5E7EB]">
          <motion.h2 {...fadeInUp} className="text-3xl font-serif text-[#0A0F1E] mb-10">Want to see it in action?</motion.h2>
          <motion.div {...fadeInUp}>
            <Link 
              href="https://app.hire-np.com/auth/login" 
              className="inline-block bg-[#00B67A] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#008F5E] transition-all shadow-xl shadow-[#00B67A]/20"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
