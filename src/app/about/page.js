"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Users2, Globe2 } from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
    <span className="w-3 h-px bg-brand-primary/50" />
    {children}
  </span>
);

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(0,182,122,0.08),transparent_60%)] pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Eyebrow>About HireNP</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-3xl md:text-5xl font-serif text-ink-900 mb-4 leading-[1.05] tracking-[-0.025em] text-balance"
            >
              We're fixing hiring.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-ink-500 text-[15px] max-w-xl mx-auto leading-relaxed"
            >
              HireNP was built because hiring is broken — and everyone knows it.
            </motion.p>
          </div>
        </section>

        {/* STORY */}
        <section className="py-16 lg:py-20 px-5 lg:px-6 bg-[#FAFAF7] border-y border-black/[0.06]">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fade} className="text-center mb-10">
              <Eyebrow>Our story</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em]">Why we built this</h2>
            </motion.div>
            <div className="space-y-5 text-ink-700 text-[15px] leading-relaxed">
              <motion.p {...fade}>
                The average company uses 4-6 separate tools to make one hire. None of them explain why a candidate was selected. None of them talk to each other.
              </motion.p>
              <motion.p {...fade} className="text-lg md:text-xl font-serif text-ink-900 leading-snug tracking-tight !my-7">
                We built HireNP to fix all of that.
              </motion.p>
              <motion.p {...fade}>
                One platform. Full AI reasoning on every decision. Human control at every step. A system that works for both the company hiring and the candidate applying.
              </motion.p>
              <motion.p {...fade}>
                We're headquartered in Buffalo, NY with roots in Nepal — building for both markets from day one.
              </motion.p>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fade}>
              <Eyebrow>Our mission</Eyebrow>
            </motion.div>
            <motion.blockquote {...fade} className="text-2xl md:text-4xl font-serif text-ink-900 leading-[1.1] tracking-[-0.025em] text-balance">
              Make hiring transparent, fast, and fair — for companies and candidates alike.
            </motion.blockquote>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-[#FAFAF7] border-y border-black/[0.06] py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-10 max-w-xl mx-auto">
              <Eyebrow>What we believe</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em]">Our values</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { icon: <Eye size={16} />, title: "Transparency", desc: "AI should show its work. Every hiring decision should be explainable." },
                { icon: <Users2 size={16} />, title: "Human Control", desc: "AI handles the volume. Humans make the calls." },
                { icon: <Globe2 size={16} />, title: "Both Sides Matter", desc: "Built for companies and candidates alike. Good hiring is good for everyone." }
              ].map((v, i) => (
                <motion.div
                  key={i} {...fade}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="card p-6"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-brand-primary">
                    {v.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-ink-900 mb-1.5 tracking-tight">{v.title}</h3>
                  <p className="text-[13px] text-ink-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 px-5 lg:px-6 text-center">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-serif text-ink-900 mb-6 leading-tight tracking-[-0.02em]">
            Want to see it in action?
          </motion.h2>
          <motion.div {...fade}>
            <Link href="https://app.hire-np.com/auth/login" className="btn-primary">
              Start free trial
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
