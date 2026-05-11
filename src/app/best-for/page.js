"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import DashboardMockup from '@/components/mockups/DashboardMockup';
import ApplicantsMockup from '@/components/mockups/ApplicantsMockup';
import InterviewMockup from '@/components/mockups/InterviewMockup';
import EmmaMockup from '@/components/mockups/EmmaMockup';

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

export default function BestFor() {
  const segments = [
    {
      id: "startups",
      eyebrow: "For Startups",
      title: "Hire your first team without the agency fees.",
      painPoints: "You're a founder. Hiring takes 40% of your week. You're reading resumes at midnight. You're paying $15,000 per hire to agencies. And you still make gut decisions.",
      solutions: ["AI screens every resume instantly", "No agency fees — ever", "First hire in under 15 days", "Pay $499/mo instead of $15,000/hire", "Explain every decision to your co-founder"],
      pricing: "Startups pay $499/mo. Agencies charge $15,000+ per hire. Do the math.",
      cta: "Start free — no card required",
      visual: <DashboardMockup type="mini" />
    },
    {
      id: "growing",
      eyebrow: "For Growing Companies",
      title: "Scale your hiring without scaling your HR team.",
      painPoints: "You're hiring 20-50 people a year. Your HR team is drowning. You're using 5 different tools. Your time-to-hire is 45 days. And you still lose good candidates to faster competitors.",
      solutions: ["Handle 10 open roles simultaneously", "AI shortlists 200 resumes in minutes", "Interview intelligence across all roles", "One platform replaces your entire stack", "Hiring analytics show what's working"],
      pricing: "Growing teams use Pro at $499/mo. Less than one day of an agency recruiter.",
      cta: "See Pro plan",
      visual: <ApplicantsMockup />
    },
    {
      id: "hr-teams",
      eyebrow: "For HR Teams",
      title: "Give your HR team superpowers.",
      painPoints: "Your HR team spends 80% of their time on admin. Scheduling. Chasing hiring managers. Reading resumes. Writing offer letters. They have 20% left for actual people work.",
      solutions: ["AI handles all resume screening", "Scheduling runs itself", "Interview reports auto-generated", "Offer letters created in 2 minutes", "Full audit trail for compliance"],
      result: "HR spends 80% on people. 20% on admin. Not the other way around.",
      cta: "Start free trial",
      visual: <InterviewMockup />
    },
    {
      id: "high-volume",
      eyebrow: "For High-Volume Hiring",
      title: "100 candidates. Zero chaos.",
      painPoints: "You're hiring for multiple roles simultaneously. Hundreds of applications per job. Your team can't keep up. Candidates are waiting weeks to hear back. Good people are falling through the cracks.",
      solutions: ["Every application scored in seconds", "Emma AI manages the entire pipeline", "Bulk scheduling with zero conflicts", "Candidate pool for proactive sourcing", "Analytics show pipeline health in real time"],
      pricing: "Business plan: Unlimited jobs. Unlimited candidates. $999/mo flat.",
      cta: "See Business plan",
      visual: <EmmaMockup />
    }
  ];

  const comparisonData = [
    { feature: "Recommended plan", startup: "Free / PPJ", growing: "Pro", hr: "Pro", volume: "Business" },
    { feature: "Active jobs", startup: "1-5", growing: "Up to 10", hr: "Up to 10", volume: "Unlimited" },
    { feature: "AI screening", startup: "✓", growing: "✓", hr: "✓", volume: "✓" },
    { feature: "Interview intel", startup: "✓", growing: "✓", hr: "✓", volume: "✓" },
    { feature: "Pool access", startup: "—", growing: "Limited", hr: "Limited", volume: "Unlimited" },
    { feature: "Team members", startup: "1", growing: "3", hr: "3", volume: "Unlimited" },
    { feature: "Price", startup: "$0-29", growing: "$499/mo", hr: "$499/mo", volume: "$999/mo" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Eyebrow>Who it's for</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-3xl md:text-5xl font-serif text-ink-900 mb-4 leading-[1.05] tracking-[-0.025em] text-balance"
            >
              Built for teams who hire with intention.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-ink-500 text-[15px] max-w-xl mx-auto leading-relaxed"
            >
              Whether you're a founder making your first hire or an HR team scaling fast — HireNP works for you.
            </motion.p>
          </div>
        </section>

        {/* SEGMENTS */}
        <div className="space-y-24 lg:space-y-28 py-12">
          {segments.map((segment, i) => (
            <section key={segment.id} id={segment.id} className="px-5 lg:px-6 max-w-6xl mx-auto">
              <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div {...fade} className="lg:w-1/2">
                  <Eyebrow>{segment.eyebrow}</Eyebrow>
                  <h2 className="text-2xl md:text-3xl font-serif text-ink-900 mb-4 leading-[1.1] tracking-[-0.02em] text-balance">
                    {segment.title}
                  </h2>
                  <p className="text-ink-500 text-[14px] mb-6 leading-relaxed italic">"{segment.painPoints}"</p>
                  <ul className="space-y-2 mb-6">
                    {segment.solutions.map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-ink-700 text-[14px] font-medium">
                        <Check className="text-brand-primary shrink-0 mt-0.5" size={14} strokeWidth={2.5} />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                  {segment.pricing && (
                    <p className="text-[13px] font-semibold text-ink-900 mb-6 p-4 bg-emerald-50/60 rounded-xl border-l-2 border-brand-primary">
                      {segment.pricing}
                    </p>
                  )}
                  {segment.result && (
                    <p className="text-[13px] font-semibold text-brand-primary mb-6 p-4 bg-emerald-50/60 rounded-xl">
                      {segment.result}
                    </p>
                  )}
                  <Link href="https://app.hire-np.com/auth/login" className="btn-primary">
                    {segment.cta}
                    <ArrowRight size={13} />
                  </Link>
                </motion.div>
                <motion.div {...fade} className="lg:w-1/2 w-full">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-100/40 via-transparent to-transparent rounded-2xl blur-2xl pointer-events-none" />
                    <div className="relative">{segment.visual}</div>
                  </div>
                </motion.div>
              </div>
            </section>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <section className="px-5 lg:px-6 max-w-6xl mx-auto pt-12 pb-20">
          <motion.div {...fade} className="text-center mb-10 max-w-xl mx-auto">
            <Eyebrow>Compare</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em]">How HireNP compares across team sizes</h2>
          </motion.div>

          <motion.div {...fade} className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAF7]">
                  {["Feature","Startup","Growing","HR Team","High Volume"].map((h) => (
                    <th key={h} className="p-4 font-semibold text-ink-700 border-b border-black/[0.06] text-[11px] uppercase tracking-[0.1em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-[#FAFAF7]/60 transition-colors">
                    <td className="p-4 font-semibold text-ink-900 border-b border-black/[0.04] text-[13px]">{row.feature}</td>
                    <td className="p-4 text-ink-500 font-medium border-b border-black/[0.04] text-[13px]">{row.startup}</td>
                    <td className="p-4 text-ink-500 font-medium border-b border-black/[0.04] text-[13px]">{row.growing}</td>
                    <td className="p-4 text-ink-500 font-medium border-b border-black/[0.04] text-[13px]">{row.hr}</td>
                    <td className="p-4 text-ink-500 font-medium border-b border-black/[0.04] text-[13px]">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="text-center mt-8">
            <Link href="https://app.hire-np.com/auth/login" className="btn-primary">
              Start your free trial
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
