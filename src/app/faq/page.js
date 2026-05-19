"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus } from 'lucide-react';
import { faqData, faqCategories } from '@/lib/faq';
import { FAQSchema } from '@/components/schema/FAQSchema';

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
    <span className="w-3 h-px bg-brand-primary/50" />
    {children}
  </span>
);

export default function FAQ() {
  const [searchQuery, setSearchBar] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = faqCategories;

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <FAQSchema />
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
