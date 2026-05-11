"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, ChevronDown, ChevronUp, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
    <span className="w-3 h-px bg-brand-primary/50" />
    {children}
  </span>
);

export default function Pricing() {
  const [currency, setCurrency] = useState('USD');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Kathmandu')) setCurrency('NPR');
  }, []);

  const plans = [
    {
      name: 'Free',
      price: { USD: '0', NPR: '0' },
      sub: 'forever',
      features: ['1 active job', '20 candidates per job', 'AI resume scoring', 'Basic scheduling', 'Google Meet integration'],
      cta: 'Start free',
      featured: false
    },
    {
      name: 'Pay per job',
      price: { USD: '60', NPR: '4,000' },
      sub: 'per job',
      features: ['1 job full workflow', 'Unlimited candidates', 'AI job builder', 'Emma AI Basic', 'Up to 5 offer letters'],
      cta: 'Get started',
      featured: false
    },
    {
      name: 'Pro',
      badge: 'Popular',
      price: { USD: '299', NPR: '19,900' },
      sub: 'per 30 days',
      features: ['Up to 10 active jobs', 'Unlimited candidates', 'Full AI suite', 'Interview intelligence', 'Digital signing', 'Email tracker', '3 team members'],
      cta: 'Start free trial',
      featured: true,
      note: 'No credit card required'
    },
    {
      name: 'Business',
      price: { USD: '400', NPR: '26,600' },
      sub: 'per 30 days',
      features: ['Unlimited jobs', 'Unlimited candidates', 'Full AI suite', 'Candidate pool access', 'Unlimited team', 'White label', 'Priority support'],
      cta: 'Start free trial',
      featured: false
    }
  ];

  const faqs = [
    { q: "Is there really no credit card required?", a: "Your 15-day trial starts the moment you sign up. No card needed until you upgrade." },
    { q: "What happens after 30 days?", a: "Your access pauses. Data stays safe. Pay again anytime to continue." },
    { q: "Can I switch plans?", a: "Yes. Upgrade or downgrade anytime from settings." },
    { q: "Do you offer refunds?", a: "Full refund within 48 hours of payment." },
    { q: "Is my data secure?", a: "All data encrypted at rest and in transit." },
    { q: "Can Nepal companies pay in USD?", a: "Yes. Choose Stripe at checkout." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div {...fade}><Eyebrow>Pricing</Eyebrow></motion.div>
            <motion.h1 {...fade} className="text-3xl md:text-5xl font-serif text-ink-900 mb-4 leading-[1.05] tracking-[-0.025em] text-balance">
              Simple pricing. No surprises.
            </motion.h1>
            <motion.p {...fade} className="text-ink-500 text-[15px] mb-8 max-w-xl mx-auto leading-relaxed">
              Pay once. Get 30 days access. Renew when you're ready. No lock-in. No auto-charges.
            </motion.p>

            <motion.div {...fade} className="inline-flex items-center gap-1 p-1 rounded-lg bg-ink-50 border border-black/[0.06]">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3.5 py-1.5 rounded-md font-semibold text-[12px] transition-all ${currency === 'USD' ? 'bg-white text-ink-900 shadow-xs' : 'text-ink-500 hover:text-ink-900'}`}
              >
                🇺🇸 USD
              </button>
              <button
                onClick={() => setCurrency('NPR')}
                className={`px-3.5 py-1.5 rounded-md font-semibold text-[12px] transition-all ${currency === 'NPR' ? 'bg-white text-ink-900 shadow-xs' : 'text-ink-500 hover:text-ink-900'}`}
              >
                🇳🇵 NPR
              </button>
            </motion.div>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="px-5 lg:px-6 max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {plans.map((plan, i) => (
              <motion.div
                key={i} {...fade}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`relative flex flex-col p-6 rounded-2xl bg-white ${
                  plan.featured
                    ? 'border border-brand-primary/40 shadow-[0_1px_0_rgba(0,182,122,0.06),0_16px_40px_-16px_rgba(0,182,122,0.25)]'
                    : 'border border-black/[0.06] shadow-xs'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] text-white bg-brand-primary">
                    <Sparkles size={9} /> {plan.badge}
                  </div>
                )}

                <h3 className="text-[11px] font-semibold text-ink-400 uppercase tracking-[0.16em] mb-3">{plan.name}</h3>

                <div className="mb-1">
                  <span className="text-sm font-semibold text-ink-900 align-top">{currency === 'USD' ? '$' : 'Rs. '}</span>
                  <span className="text-4xl font-serif text-ink-900 tracking-[-0.02em]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currency}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                      >
                        {plan.price[currency]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>

                {plan.sub && <p className="text-ink-400 text-[11px] font-semibold mb-6">{plan.sub}</p>}

                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-brand-primary shrink-0 mt-0.5" size={13} strokeWidth={2.5} />
                      <span className="text-[13px] text-ink-700 font-medium leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://app.hire-np.com/auth/login"
                  className={plan.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}
                >
                  {plan.cta}
                  <ArrowRight size={13} />
                </Link>
                {plan.note && <p className="text-center text-[10px] text-ink-400 mt-2 font-medium">{plan.note}</p>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* PAYMENT METHODS */}
        <section className="bg-[#FAFAF7] border-y border-black/[0.06] py-16 lg:py-20 px-5 lg:px-6 mb-0">
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow>Payment</Eyebrow>
            <h2 className="text-xl md:text-2xl font-serif text-ink-900 mb-8 tracking-tight">Trusted payment methods</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="card p-6 text-left">
                <p className="text-[10px] font-semibold text-ink-400 uppercase mb-2 tracking-[0.16em]">🇺🇸 USA</p>
                <p className="text-[14px] font-semibold text-ink-900">Visa · Mastercard via Stripe</p>
              </div>
              <div className="card p-6 text-left">
                <p className="text-[10px] font-semibold text-ink-400 uppercase mb-2 tracking-[0.16em]">🇳🇵 Nepal</p>
                <p className="text-[14px] font-semibold text-ink-900">eSewa · Khalti</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 lg:px-6 max-w-2xl mx-auto py-20 lg:py-24">
          <motion.div {...fade} className="text-center mb-8">
            <Eyebrow>Questions?</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-serif text-ink-900 tracking-[-0.02em]">Frequently asked</h2>
          </motion.div>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-black/[0.06] rounded-xl bg-white hover:border-black/[0.12] transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-ink-900 pr-6 text-[14px]">{faq.q}</span>
                  <div className="shrink-0 text-ink-400">
                    {openFaq === idx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-ink-500 leading-relaxed text-[13px]">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
