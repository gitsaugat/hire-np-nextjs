"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function FAQ() {
  const [searchQuery, setSearchBar] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const faqData = [
    {
      category: "Pricing",
      q: "How does HireNP pricing work?",
      a: "HireNP uses a simple one-time payment model. You pay once and get 30 days of access. When your 30 days end, you pay again to continue. No automatic charges. No surprise renewals. You're always in control."
    },
    {
      category: "Pricing",
      q: "What plans are available?",
      a: "We have four plans: Free ($0) — 1 job, 20 candidates, basic AI; Pay Per Job ($29/job) — Full workflow for 1 role; Pro ($499/30 days) — 10 jobs, full AI suite; Business ($999/30 days) — Unlimited everything. Nepal companies get 50% lower NPR pricing."
    },
    {
      category: "Pricing",
      q: "Is there a discount for annual commitment?",
      a: "We don't do annual contracts. You pay 30 days at a time. This means no lock-in, no risk."
    },
    {
      category: "Pricing",
      q: "Can I switch plans?",
      a: "Yes. Upgrade or downgrade anytime from your settings. Changes apply on your next payment."
    },
    {
      category: "Pricing",
      q: "Do you offer refunds?",
      a: "Yes. Full refund within 48 hours of payment if you're not satisfied. No questions asked."
    },
    {
      category: "Trial",
      q: "What is included in the free trial?",
      a: "Your 15-day free trial gives you full access to your chosen plan. Every feature. No restrictions. See exactly what you're getting before paying."
    },
    {
      category: "Trial",
      q: "Do I need a credit card to start?",
      a: "No. Your 15-day trial starts the moment you sign up. No card required until you decide to upgrade."
    },
    {
      category: "Trial",
      q: "What happens when my trial ends?",
      a: "Your account pauses. Your data stays safe. You can upgrade anytime to continue — no re-setup required."
    },
    {
      category: "AI & Features",
      q: "How accurate is the AI scoring?",
      a: "Our AI matches candidates against your specific job requirements — not generic templates. Accuracy improves with detailed job descriptions and hiring policy settings. The AI shows its reasoning so you can verify every decision."
    },
    {
      category: "AI & Features",
      q: "Can the AI be biased?",
      a: "Any AI system can reflect biases in training data. We've designed HireNP with human-in-the-loop principles — AI recommends, humans decide. Full reasoning transparency means you can audit every decision. We also have bias detection as a feature on Business plan."
    },
    {
      category: "AI & Features",
      q: "Does the AI make final hiring decisions?",
      a: "Never. The AI scores, ranks, and recommends. Every final decision — advancing, rejecting, hiring — requires human approval. You are always in control."
    },
    {
      category: "AI & Features",
      q: "How does Emma AI work?",
      a: "Emma is your AI hiring assistant. She has full context of your pipeline — every job, every candidate, every score. Ask her anything in plain English. She responds with data from your actual hiring activity."
    },
    {
      category: "Data & Security",
      q: "Where is my data stored?",
      a: "All data is stored on secure cloud servers with encryption at rest and in transit."
    },
    {
      category: "Data & Security",
      q: "Do you share candidate data?",
      a: "Never. Candidate data is only visible to the company they applied to. We never sell or share candidate data with third parties."
    },
    {
      category: "Nepal",
      q: "Is HireNP available in Nepal?",
      a: "Yes. HireNP is available for companies in Nepal with NPR pricing, eSewa and Khalti payments, and Nepal labor law compliance features."
    },
    {
      category: "Nepal",
      q: "What is the Nepal pricing?",
      a: "Nepal companies get 50% lower pricing than USD: Pay Per Job: NPR 2,000; Pro: NPR 33,000/30 days; Business: NPR 66,000/30 days."
    },
    {
      category: "Technical",
      q: "What integrations does HireNP support?",
      a: "Current integrations: Google Meet (AI interview bot), Google Calendar (scheduling sync). More integrations coming: Slack, LinkedIn, major HRIS platforms."
    }
  ];

  const categories = ["All", "Pricing", "Trial", "AI & Features", "Data & Security", "Nepal", "Technical"];

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-[#0A0F1E] mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#6B7280] text-lg md:text-xl font-medium"
          >
            Everything you need to know about HireNP.
          </motion.p>
        </section>

        {/* SEARCH */}
        <section className="px-6 lg:px-8 max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={20} />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchBar(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-[#E5E7EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00B67A]/20 focus:border-[#00B67A] transition-all font-medium text-[#0A0F1E]"
            />
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  activeCategory === cat 
                  ? 'bg-[#0A0F1E] text-white' 
                  : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#E5E7EB] rounded-2xl overflow-hidden bg-white hover:border-[#00B67A]/30 transition-all"
              >
                <button 
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-[#0A0F1E] pr-8">{item.q}</span>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center text-[#9CA3AF]">
                    {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-[#6B7280] font-medium leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            
            {filteredFaqs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#6B7280] font-medium">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
