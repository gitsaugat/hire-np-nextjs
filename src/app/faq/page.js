"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus } from 'lucide-react';

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
    <span className="w-3 h-px bg-brand-primary/50" />
    {children}
  </span>
);

export default function FAQ() {
  const [searchQuery, setSearchBar] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const faqData = [
    { category: "Pricing", q: "How does HireNP pricing work?", a: "HireNP uses a simple one-time payment model. You pay once and get 30 days of access. When your 30 days end, you pay again to continue. No automatic charges. No surprise renewals. You're always in control." },
    { category: "Pricing", q: "What plans are available?", a: "We have four plans: Free ($0) — 1 job, 20 candidates, basic AI; Pay Per Job ($29/job) — Full workflow for 1 role; Pro ($499/30 days) — 10 jobs, full AI suite; Business ($999/30 days) — Unlimited everything. Nepal companies get 50% lower NPR pricing." },
    { category: "Pricing", q: "Is there a discount for annual commitment?", a: "We don't do annual contracts. You pay 30 days at a time. This means no lock-in, no risk." },
    { category: "Pricing", q: "Can I switch plans?", a: "Yes. Upgrade or downgrade anytime from your settings. Changes apply on your next payment." },
    { category: "Pricing", q: "Do you offer refunds?", a: "Yes. Full refund within 48 hours of payment if you're not satisfied. No questions asked." },
    { category: "Trial", q: "What is included in the free trial?", a: "Your 15-day free trial gives you full access to your chosen plan. Every feature. No restrictions. See exactly what you're getting before paying." },
    { category: "Trial", q: "Do I need a credit card to start?", a: "No. Your 15-day trial starts the moment you sign up. No card required until you decide to upgrade." },
    { category: "Trial", q: "What happens when my trial ends?", a: "Your account pauses. Your data stays safe. You can upgrade anytime to continue — no re-setup required." },
    { category: "AI & Features", q: "How accurate is the AI scoring?", a: "Our AI matches candidates against your specific job requirements — not generic templates. Accuracy improves with detailed job descriptions and hiring policy settings. The AI shows its reasoning so you can verify every decision." },
    { category: "AI & Features", q: "Can the AI be biased?", a: "Any AI system can reflect biases in training data. We've designed HireNP with human-in-the-loop principles — AI recommends, humans decide. Full reasoning transparency means you can audit every decision. We also have bias detection as a feature on Business plan." },
    { category: "AI & Features", q: "Does the AI make final hiring decisions?", a: "Never. The AI scores, ranks, and recommends. Every final decision — advancing, rejecting, hiring — requires human approval. You are always in control." },
    { category: "AI & Features", q: "How does Emma AI work?", a: "Emma is your AI hiring assistant. She has full context of your pipeline — every job, every candidate, every score. Ask her anything in plain English. She responds with data from your actual hiring activity." },
    { category: "Data & Security", q: "Where is my data stored?", a: "All data is stored on secure cloud servers with encryption at rest and in transit." },
    { category: "Data & Security", q: "Do you share candidate data?", a: "Never. Candidate data is only visible to the company they applied to. We never sell or share candidate data with third parties." },
    { category: "Nepal", q: "Is HireNP available in Nepal?", a: "Yes. HireNP is available for companies in Nepal with NPR pricing, eSewa and Khalti payments, and Nepal labor law compliance features." },
    { category: "Nepal", q: "What is the Nepal pricing?", a: "Nepal companies get 50% lower pricing than USD: Pay Per Job: NPR 2,000; Pro: NPR 33,000/30 days; Business: NPR 66,000/30 days." },
    { category: "Technical", q: "What integrations does HireNP support?", a: "Current integrations: Google Meet (AI interview bot), Google Calendar (scheduling sync). More integrations coming: Slack, LinkedIn, major HRIS platforms." }
  ];

  const categories = ["All", "Pricing", "Trial", "AI & Features", "Data & Security", "Nepal", "Technical"];

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const [openIndex, setOpenIndex] = useState(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Eyebrow>Help center</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-3xl md:text-5xl font-serif text-ink-900 mb-4 leading-[1.05] tracking-[-0.025em] text-balance"
            >
              Frequently asked questions.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-ink-500 text-[15px] max-w-xl mx-auto leading-relaxed"
            >
              Everything you need to know about HireNP.
            </motion.p>
          </div>
        </section>

        {/* SEARCH */}
        <section className="px-5 lg:px-6 max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchBar(e.target.value)}
              className="input pl-10"
            />
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="px-5 lg:px-6 max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-3 py-1.5 rounded-full font-semibold text-[12px] transition-all ${
                  activeCategory === cat
                  ? 'bg-ink-900 text-white'
                  : 'bg-[#FAFAF7] text-ink-500 hover:text-ink-900 hover:bg-ink-50 border border-black/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ACCORDION */}
        <section className="px-5 lg:px-6 max-w-2xl mx-auto pb-20 lg:pb-24">
          <div className="space-y-2">
            {filteredFaqs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-black/[0.06] rounded-xl bg-white hover:border-black/[0.12] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-ink-900 pr-6 text-[14px]">{item.q}</span>
                  <div className="shrink-0 text-ink-400">
                    {openIndex === idx ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-ink-500 leading-relaxed text-[13px]">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-ink-500 font-medium text-[14px]">No questions found.</p>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
