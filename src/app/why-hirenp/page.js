"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Shield, Globe, Cpu, ArrowRight, Trophy } from 'lucide-react';
import InterviewMockup from '@/components/mockups/InterviewMockup';
import { MasterComparisonTable } from '@/components/blog/MasterComparisonTable';

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

export default function WhyHireNP() {
  const [hiresPerYear, setHiresPerYear] = useState(10);
  const [avgSalary, setAvgSalary] = useState(80000);
  const [useAgency, setUseAgency] = useState(true);
  const [activeCompetitor, setActiveCompetitor] = useState('linkedin');

  const competitors = [
    { key: 'linkedin', label: 'LinkedIn' }, { key: 'indeed', label: 'Indeed' },
    { key: 'greenhouse', label: 'Greenhouse' }, { key: 'lever', label: 'Lever' },
    { key: 'workable', label: 'Workable' }, { key: 'ashby', label: 'Ashby' },
    { key: 'jazzhr', label: 'JazzHR' }, { key: 'agency', label: 'Agency' },
  ];

  const [roi, setRoi] = useState({ agencyCost: 0, hirenpCost: 1196, savings: 0, roiPercent: 0 });

  useEffect(() => {
    const agencyCost = hiresPerYear * avgSalary * 0.20;
    const hirenpCost = 1196;
    const timeSaved = hiresPerYear * 20;
    const valueRecovered = timeSaved * 50;

    if (useAgency) {
      const savings = agencyCost - hirenpCost;
      const roiPercent = (savings / hirenpCost) * 100;
      setRoi({ agencyCost, hirenpCost, savings, roiPercent });
    } else {
      const toolCostEstimate = hiresPerYear * 500;
      const savings = (toolCostEstimate + valueRecovered) - hirenpCost;
      const roiPercent = (savings / hirenpCost) * 100;
      setRoi({ agencyCost: toolCostEstimate, hirenpCost, savings, roiPercent });
    }
  }, [hiresPerYear, avgSalary, useAgency]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Eyebrow>Why HireNP</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-3xl md:text-5xl font-serif text-ink-900 mb-4 leading-[1.05] tracking-[-0.025em] text-balance"
            >
              There are dozens of hiring tools. Here's why teams choose us.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-ink-500 text-[15px] max-w-xl mx-auto leading-relaxed"
            >
              We didn't add AI to an ATS. We built AI first — and designed the workflow around it.
            </motion.p>
          </div>
        </section>

        {/* SCOREBOARD */}
        <section className="px-5 lg:px-6 max-w-3xl mx-auto pb-16">
          <motion.div {...fade} className="card p-8 text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <Trophy size={11} className="text-brand-primary" />
              <span className="text-[10px] font-semibold text-brand-deep uppercase tracking-[0.14em]">Scoreboard</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-gradient mb-2 tracking-[-0.025em] leading-none">68+ / 76</h2>
            <p className="text-ink-500 text-[14px]">features where HireNP beats the competition.</p>
          </motion.div>
        </section>

        {/* COMPARISON */}
        <section id="comparison" className="bg-[#FAFAF7] border-y border-black/[0.06] py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Eyebrow>Head to head</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-serif text-ink-900 mb-2 leading-tight tracking-[-0.02em]">Compare HireNP vs everything else</h2>
              <p className="text-ink-500 text-[14px] mb-7">Select a competitor to see how we stack up.</p>

              <div className="flex flex-wrap justify-center gap-1.5">
                {competitors.map((comp) => (
                  <button
                    key={comp.key}
                    onClick={() => setActiveCompetitor(comp.key)}
                    className={`px-3 py-1.5 rounded-full font-semibold text-[12px] transition-all ${
                      activeCompetitor === comp.key
                      ? 'bg-brand-primary text-white'
                      : 'bg-white text-ink-500 hover:text-ink-900 border border-black/[0.06]'
                    }`}
                  >
                    {comp.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-5xl mx-auto mt-10">
              <MasterComparisonTable competitorKey={activeCompetitor} />
            </div>
          </div>
        </section>

        {/* DIFFERENCES */}
        <section className="py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Eyebrow>Built differently</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-serif text-ink-900 leading-tight tracking-[-0.02em]">HireNP was built differently.</h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-20 lg:space-y-24">
            {[
              {
                id: "01",
                title: "AI-native, not AI-added",
                desc: "We didn't add AI to an existing ATS. We built AI first and designed the entire workflow around it. Every feature — screening, interviews, offers — is powered by AI from the ground up.",
                visual: (
                  <div className="relative w-full h-56 rounded-2xl border border-black/[0.06] bg-[#FAFAF7] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-dots opacity-50" />
                    <div className="relative">
                      <div className="w-16 h-16 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-brand animate-soft-pulse">AI</div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-dashed border-emerald-200 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-dashed border-emerald-100 rounded-full"></div>
                    </div>
                  </div>
                )
              },
              {
                id: "02",
                title: "Every decision explained",
                desc: "We believe hiring decisions should be transparent. Every candidate score comes with full reasoning — requirements met, requirements missing, red flags, strengths. You always know why.",
                visual: <InterviewMockup status="advance" />
              },
              {
                id: "03",
                title: "Humans stay in control",
                desc: "AI handles the volume. Humans make the calls. Every critical step — advancing a candidate, sending an offer, making a hire — requires human approval. AI augments your judgment, never replaces it.",
                visual: (
                  <div className="flex items-center justify-center gap-5 lg:gap-8 h-56 rounded-2xl border border-black/[0.06] bg-[#FAFAF7]">
                    <div className="text-center">
                      <div className="w-14 h-14 bg-white border border-black/[0.08] rounded-xl flex items-center justify-center text-xl shadow-xs">🤖</div>
                      <p className="mt-2 text-[10px] font-semibold text-ink-400 uppercase tracking-[0.14em]">AI recommends</p>
                    </div>
                    <ArrowRight className="text-brand-primary" size={20} />
                    <div className="text-center">
                      <div className="w-14 h-14 bg-brand-primary rounded-xl flex items-center justify-center text-xl shadow-brand">👤</div>
                      <p className="mt-2 text-[10px] font-semibold text-brand-primary uppercase tracking-[0.14em]">Human decides</p>
                    </div>
                  </div>
                )
              },
              {
                id: "04",
                title: "One system, not four",
                desc: "The average company uses 4-6 tools to make one hire. HireNP replaces all of them — job posting, ATS, interview tool, transcription, offer letters, onboarding. One login. One invoice. One source of truth.",
                visual: (
                  <div className="grid grid-cols-2 gap-2.5">
                    {['Legacy ATS', 'Scheduler', 'Transcription', 'Offer gen'].map((t) => (
                      <div key={t} className="p-5 bg-[#FAFAF7] border border-black/[0.06] rounded-xl text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-300 line-through text-center">
                        {t}
                      </div>
                    ))}
                  </div>
                )
              }
            ].map((diff, i) => (
              <div key={i} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
                <motion.div {...fade}>
                  <span className="text-[10px] font-semibold text-ink-300 tracking-[0.18em] mb-3 block">STEP {diff.id}</span>
                  <h3 className="text-xl md:text-2xl font-serif text-ink-900 mb-3 leading-tight tracking-[-0.02em] text-balance">{diff.title}</h3>
                  <p className="text-ink-500 text-[14px] leading-relaxed max-w-md">{diff.desc}</p>
                </motion.div>
                <motion.div {...fade} transition={{ delay: 0.1 }} className="w-full">
                  {diff.visual}
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* ROI CALCULATOR */}
        <section className="bg-[#FAFAF7] border-y border-black/[0.06] py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Eyebrow>Calculator</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-serif text-ink-900 mb-2 leading-tight tracking-[-0.02em]">Calculate your hiring ROI</h2>
              <p className="text-ink-500 text-[14px]">See how much you could save with HireNP.</p>
            </div>

            <div className="card p-7 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-7">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500 mb-3">
                      Hires per year · <span className="text-brand-primary">{hiresPerYear}</span>
                    </label>
                    <input type="range" min="1" max="100" step="1" value={hiresPerYear}
                      onChange={(e) => setHiresPerYear(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500 mb-3">
                      Avg salary · <span className="text-brand-primary">${avgSalary.toLocaleString()}</span>
                    </label>
                    <input type="range" min="30000" max="300000" step="5000" value={avgSalary}
                      onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAFAF7] border border-black/[0.06]">
                    <span className="font-semibold text-[13px] text-ink-900">Using a recruitment agency?</span>
                    <button
                      onClick={() => setUseAgency(!useAgency)}
                      className={`w-10 h-6 rounded-full transition-all relative ${useAgency ? 'bg-brand-primary' : 'bg-ink-200'}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${useAgency ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FAFAF7] border border-black/[0.06] p-5 rounded-xl">
                    <p className="text-[10px] font-semibold text-ink-400 uppercase mb-1.5 tracking-[0.16em]">
                      {useAgency ? 'Agency cost' : 'Current cost'}
                    </p>
                    <p className="text-2xl font-serif text-ink-900 tracking-tight">${roi.agencyCost.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#FAFAF7] border border-black/[0.06] p-5 rounded-xl">
                    <p className="text-[10px] font-semibold text-ink-400 uppercase mb-1.5 tracking-[0.16em]">HireNP cost</p>
                    <p className="text-2xl font-serif text-ink-900 tracking-tight">${roi.hirenpCost.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2 bg-brand-primary p-6 rounded-xl text-center text-white shadow-brand">
                    <p className="text-[10px] font-semibold text-white/80 uppercase mb-1 tracking-[0.16em]">Annual savings</p>
                    <p className="text-4xl font-serif mb-1 tracking-[-0.02em]">${roi.savings.toLocaleString()}</p>
                    <p className="text-[12px] font-semibold text-white/80">{roi.roiPercent.toFixed(0)}% ROI</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link href="https://app.hire-np.com/auth/login" className="btn-primary">
                  Start saving on day one
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-10 max-w-xl mx-auto">
              <Eyebrow>Trust</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-serif text-ink-900 leading-tight tracking-[-0.02em]">Built with trust at the core.</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: <Shield size={16} />, title: "Data Security", text: "All candidate and company data encrypted at rest and in transit." },
                { icon: <Check size={16} />, title: "Compliance Ready", text: "GDPR principles. Nepal labor law compliance. Full audit trail." },
                { icon: <Cpu size={16} />, title: "Responsible AI", text: "AI surfaces reasoning. Human review at every critical step." },
                { icon: <Globe size={16} />, title: "Global, local rails", text: "Hire globally. Multi-currency billing. Stripe + eSewa + Khalti. New regions added on request." }
              ].map((card, i) => (
                <motion.div key={i} {...fade} transition={{ delay: i * 0.04 }} className="card p-6">
                  <div className="mb-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-brand-primary">
                    {card.icon}
                  </div>
                  <h3 className="text-[14px] font-semibold text-ink-900 mb-1.5 tracking-tight">{card.title}</h3>
                  <p className="text-ink-500 text-[13px] leading-relaxed">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
