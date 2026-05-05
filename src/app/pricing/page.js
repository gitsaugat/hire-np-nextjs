"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Pricing() {
  const [currency, setCurrency] = useState('USD');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Kathmandu')) {
      setCurrency('NPR');
    }
  }, []);

  const plans = [
    {
      name: 'FREE',
      price: { USD: '0', NPR: '0' },
      features: [
        '1 active job',
        '20 candidates per job',
        'AI resume scoring',
        'Basic scheduling',
        'Google Meet integration'
      ],
      cta: 'Start Free',
      featured: false
    },
    {
      name: 'PAY PER JOB',
      price: { USD: '60', NPR: '4,000' },
      sub: 'per job posted',
      features: [
        '1 job full workflow',
        'Unlimited candidates',
        'AI job builder',
        'Emma AI Basic',
        'Up to 5 offer letters'
      ],
      cta: 'Get Started',
      featured: false
    },
    {
      name: 'PRO',
      badge: 'Most Popular',
      price: { USD: '299', NPR: '19,900' },
      sub: 'per 30 days',
      features: [
        'Up to 10 active jobs',
        'Unlimited candidates',
        'Full AI suite',
        'Interview intelligence',
        'Digital signing',
        'Email tracker',
        '3 team members'
      ],
      cta: 'Start 15-Day Free Trial',
      featured: true,
      note: 'No credit card required'
    },
    {
      name: 'BUSINESS',
      price: { USD: '400', NPR: '26,600' },
      sub: 'per 30 days',
      features: [
        'Unlimited jobs',
        'Unlimited candidates',
        'Full AI suite',
        'Candidate pool access',
        'Unlimited team members',
        'White label',
        'Priority support'
      ],
      cta: 'Start 15-Day Free Trial',
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
          <motion.h1 {...fadeInUp} className="text-4xl md:text-6xl font-serif text-[#0A0F1E] mb-6">
            Simple pricing. No surprises.
          </motion.h1>
          <motion.p {...fadeInUp} className="text-[#6B7280] text-lg md:text-xl font-medium mb-12">
            Pay once. Get 30 days access. Renew when you're ready. No lock-in.
          </motion.p>

          {/* Currency Toggle */}
          <motion.div {...fadeInUp} className="flex items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${currency === 'USD' ? 'bg-[#0A0F1E] text-white' : 'bg-[#F9FAFB] text-[#6B7280]'}`}
            >
              🇺🇸 USD
            </button>
            <button 
              onClick={() => setCurrency('NPR')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${currency === 'NPR' ? 'bg-[#0A0F1E] text-white' : 'bg-[#F9FAFB] text-[#6B7280]'}`}
            >
              🇳🇵 NPR
            </button>
          </motion.div>
        </section>

        {/* PRICING CARDS */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col p-8 rounded-3xl border ${plan.featured ? 'border-[#00B67A] shadow-2xl shadow-[#00B67A]/10 ring-1 ring-[#00B67A]' : 'border-[#E5E7EB]'}`}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00B67A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {plan.badge}
                  </div>
                )}
                
                <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-6">{plan.name}</h3>
                
                <div className="mb-2">
                  <span className="text-sm font-bold text-[#0A0F1E] align-top">{currency === 'USD' ? '$' : 'Rs. '}</span>
                  <span className="text-4xl font-bold text-[#0A0F1E]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currency}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {plan.price[currency]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
                
                {plan.sub && <p className="text-[#6B7280] text-xs font-bold mb-8">{plan.sub}</p>}
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#00B67A] shrink-0" size={16} />
                      <span className="text-sm text-[#4B5563] font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="https://app.hire-np.com/auth/login"
                  className={`block py-4 rounded-xl font-bold text-center transition-all ${plan.featured ? 'bg-[#00B67A] text-white hover:bg-[#008F5E]' : 'bg-[#0A0F1E] text-white hover:bg-black'}`}
                >
                  {plan.cta}
                </Link>
                {plan.note && <p className="text-center text-[10px] text-[#9CA3AF] mt-3 font-bold">{plan.note}</p>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* PAYMENT METHODS */}
        <section className="px-6 lg:px-8 max-w-4xl mx-auto text-center mb-32">
          <h2 className="text-2xl font-bold text-[#0A0F1E] mb-12">Trusted payment methods</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#F9FAFB] p-10 rounded-3xl text-left border border-[#E5E7EB]">
              <p className="text-xs font-bold text-[#9CA3AF] uppercase mb-4 tracking-widest">🇺🇸 USA</p>
              <p className="text-xl font-bold text-[#0A0F1E]">Visa, Mastercard via Stripe</p>
            </div>
            <div className="bg-[#F9FAFB] p-10 rounded-3xl text-left border border-[#E5E7EB]">
              <p className="text-xs font-bold text-[#9CA3AF] uppercase mb-4 tracking-widest">🇳🇵 NEPAL</p>
              <p className="text-xl font-bold text-[#0A0F1E]">eSewa, Khalti</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 lg:px-8 max-w-3xl mx-auto mb-32">
          <h2 className="text-3xl font-serif text-[#0A0F1E] text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F9FAFB] transition-all"
                >
                  <span className="font-bold text-[#0A0F1E]">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-[#9CA3AF]" /> : <ChevronDown size={20} className="text-[#9CA3AF]" />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-[#6B7280] font-medium leading-relaxed">
                        {faq.a}
                      </div>
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
