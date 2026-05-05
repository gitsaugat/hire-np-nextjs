"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Zap, Users, Brain, LayoutDashboard, UserCheck } from 'lucide-react';
import DashboardMockup from '@/components/mockups/DashboardMockup';
import ApplicantsMockup from '@/components/mockups/ApplicantsMockup';
import InterviewMockup from '@/components/mockups/InterviewMockup';
import EmmaMockup from '@/components/mockups/EmmaMockup';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function BestFor() {
  const segments = [
    {
      id: "startups",
      eyebrow: "FOR STARTUPS",
      title: "Hire your first team without the agency fees.",
      painPoints: "You're a founder. Hiring takes 40% of your week. You're reading resumes at midnight. You're paying $15,000 per hire to agencies. And you still make gut decisions.",
      solutions: [
        "AI screens every resume instantly",
        "No agency fees — ever",
        "First hire in under 15 days",
        "Pay $499/mo instead of $15,000/hire",
        "Explain every decision to your co-founder"
      ],
      pricing: "Startups pay $499/mo. Agencies charge $15,000+ per hire. Do the math.",
      cta: "Start Free — No Card Required",
      visual: <DashboardMockup type="mini" />
    },
    {
      id: "growing",
      eyebrow: "FOR GROWING COMPANIES",
      title: "Scale your hiring without scaling your HR team.",
      painPoints: "You're hiring 20-50 people a year. Your HR team is drowning. You're using 5 different tools. Your time-to-hire is 45 days. And you still lose good candidates to faster competitors.",
      solutions: [
        "Handle 10 open roles simultaneously",
        "AI shortlists 200 resumes in minutes",
        "Interview intelligence across all roles",
        "One platform replaces your entire stack",
        "Hiring analytics show what's working"
      ],
      pricing: "Growing teams use Pro at $499/mo. That's less than one day of an agency recruiter.",
      cta: "See Pro Plan",
      visual: <ApplicantsMockup />
    },
    {
      id: "hr-teams",
      eyebrow: "FOR HR TEAMS",
      title: "Give your HR team superpowers.",
      painPoints: "Your HR team spends 80% of their time on admin. Scheduling. Chasing hiring managers. Reading resumes. Writing offer letters. They have 20% left for actual people work.",
      solutions: [
        "AI handles all resume screening",
        "Scheduling runs itself",
        "Interview reports auto-generated",
        "Offer letters created in 2 minutes",
        "Full audit trail for compliance"
      ],
      result: "HR spends 80% on people. 20% on admin. Not the other way around.",
      cta: "Start Free Trial",
      visual: <InterviewMockup />
    },
    {
      id: "high-volume",
      eyebrow: "FOR HIGH-VOLUME HIRING",
      title: "100 candidates. Zero chaos.",
      painPoints: "You're hiring for multiple roles simultaneously. Hundreds of applications per job. Your team can't keep up. Candidates are waiting weeks to hear back. Good people are falling through the cracks.",
      solutions: [
        "Every application scored in seconds",
        "Emma AI manages the entire pipeline",
        "Bulk scheduling with zero conflicts",
        "Candidate pool for proactive sourcing",
        "Analytics show pipeline health in real time"
      ],
      pricing: "Business plan: Unlimited jobs. Unlimited candidates. $999/mo flat.",
      cta: "See Business Plan",
      visual: <EmmaMockup />
    }
  ];

  const comparisonData = [
    { feature: "Recommended plan", startup: "Free/PPJ", growing: "Pro", hr: "Pro", volume: "Business" },
    { feature: "Active jobs", startup: "1-5", growing: "Up to 10", hr: "Up to 10", volume: "Unlimited" },
    { feature: "AI screening", startup: "✓", growing: "✓", hr: "✓", volume: "✓" },
    { feature: "Interview intel", startup: "✓", growing: "✓", hr: "✓", volume: "✓" },
    { feature: "Pool access", startup: "-", growing: "Limited", hr: "Limited", volume: "Unlimited" },
    { feature: "Team members", startup: "1", growing: "3", hr: "3", volume: "Unlimited" },
    { feature: "Price", startup: "$0-29", growing: "$499/mo", hr: "$499/mo", volume: "$999/mo" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto text-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-serif text-[#0A0F1E] mb-8 leading-tight"
          >
            Built for teams who hire with intention.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#6B7280] text-lg md:text-2xl font-medium max-w-3xl mx-auto"
          >
            Whether you're a founder making your first hire or an HR team scaling fast — HireNP works for you.
          </motion.p>
        </section>

        {/* SEGMENTS */}
        <div className="space-y-48 mb-48">
          {segments.map((segment, i) => (
            <section key={segment.id} id={segment.id} className="px-6 lg:px-8 max-w-7xl mx-auto">
              <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div {...fadeInUp} className="lg:w-1/2">
                  <span className="text-[#00B67A] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                    {segment.eyebrow}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif text-[#0A0F1E] mb-8 leading-tight">
                    {segment.title}
                  </h2>
                  <p className="text-[#6B7280] text-lg mb-10 font-medium leading-relaxed">
                    "{segment.painPoints}"
                  </p>
                  <ul className="space-y-4 mb-10">
                    {segment.solutions.map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#4B5563] font-medium">
                        <Check className="text-[#00B67A] shrink-0 mt-1" size={18} />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                  {segment.pricing && (
                    <p className="text-sm font-bold text-[#0A0F1E] mb-10 p-4 bg-[#F9FAFB] rounded-xl border-l-4 border-[#00B67A]">
                      {segment.pricing}
                    </p>
                  )}
                  {segment.result && (
                    <p className="text-sm font-bold text-[#00B67A] mb-10 p-4 bg-[#00B67A]/5 rounded-xl">
                      {segment.result}
                    </p>
                  )}
                  <Link 
                    href="https://app.hire-np.com/auth/login"
                    className="inline-block bg-[#00B67A] text-white px-8 py-4 rounded-full font-bold hover:bg-[#008F5E] transition-all shadow-xl shadow-[#00B67A]/20"
                  >
                    {segment.cta}
                  </Link>
                </motion.div>
                <motion.div {...fadeInUp} className="lg:w-1/2 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-[#00B67A]/10 rounded-[2rem] blur-2xl group-hover:bg-[#00B67A]/20 transition-all"></div>
                    <div className="relative">
                      {segment.visual}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-32">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A0F1E] mb-6">How HireNP compares across team sizes</h2>
          </motion.div>
          
          <motion.div {...fadeInUp} className="overflow-x-auto rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB]">
                  <th className="p-6 font-bold text-[#0A0F1E] border-b border-[#E5E7EB]">Feature</th>
                  <th className="p-6 font-bold text-[#0A0F1E] border-b border-[#E5E7EB]">Startup</th>
                  <th className="p-6 font-bold text-[#0A0F1E] border-b border-[#E5E7EB]">Growing</th>
                  <th className="p-6 font-bold text-[#0A0F1E] border-b border-[#E5E7EB]">HR Team</th>
                  <th className="p-6 font-bold text-[#0A0F1E] border-b border-[#E5E7EB]">High Volume</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-[#0A0F1E] border-b border-[#E5E7EB]">{row.feature}</td>
                    <td className="p-6 text-[#6B7280] font-medium border-b border-[#E5E7EB]">{row.startup}</td>
                    <td className="p-6 text-[#6B7280] font-medium border-b border-[#E5E7EB]">{row.growing}</td>
                    <td className="p-6 text-[#6B7280] font-medium border-b border-[#E5E7EB]">{row.hr}</td>
                    <td className="p-6 text-[#6B7280] font-medium border-b border-[#E5E7EB]">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          
          <div className="text-center mt-12">
            <Link 
              href="https://app.hire-np.com/auth/login"
              className="inline-block bg-[#0A0F1E] text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
