"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, X, Shield, Globe, Zap, Cpu, Search, Monitor, BarChart3, ArrowRight } from 'lucide-react';
import InterviewMockup from '@/components/mockups/InterviewMockup';
import { MasterComparisonTable } from '@/components/blog/MasterComparisonTable';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function WhyHireNP() {
  const [hiresPerYear, setHiresPerYear] = useState(10);
  const [avgSalary, setAvgSalary] = useState(80000);
  const [useAgency, setUseAgency] = useState(true);
  
  const [activeCompetitor, setActiveCompetitor] = useState('linkedin');

  const competitors = [
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'indeed', label: 'Indeed' },
    { key: 'greenhouse', label: 'Greenhouse' },
    { key: 'lever', label: 'Lever' },
    { key: 'workable', label: 'Workable' },
    { key: 'ashby', label: 'Ashby' },
    { key: 'jazzhr', label: 'JazzHR' },
    { key: 'agency', label: 'Agency' },
  ];
  
  const [roi, setRoi] = useState({
    agencyCost: 0,
    hirenpCost: 1196, // 4 months hiring
    savings: 0,
    roiPercent: 0,
    timeSaved: 0,
    valueRecovered: 0
  });

  useEffect(() => {
    const agencyCost = hiresPerYear * avgSalary * 0.20;
    const hirenpCost = 1196; // Adjusted for "Pay when hiring" model (4 months)
    const timeSaved = hiresPerYear * 20;
    const valueRecovered = timeSaved * 50;

    if (useAgency) {
      const savings = agencyCost - hirenpCost;
      const roiPercent = (savings / hirenpCost) * 100;
      setRoi({ agencyCost, hirenpCost, savings, roiPercent, timeSaved, valueRecovered });
    } else {
      const toolCostEstimate = hiresPerYear * 500;
      const savings = (toolCostEstimate + valueRecovered) - hirenpCost;
      const roiPercent = (savings / hirenpCost) * 100;
      setRoi({ agencyCost: toolCostEstimate, hirenpCost, savings, roiPercent, timeSaved, valueRecovered });
    }
  }, [hiresPerYear, avgSalary, useAgency]);

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
            Why HireNP?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#6B7280] text-lg md:text-2xl font-medium max-w-3xl mx-auto"
          >
            There are dozens of hiring tools. Here's why teams choose HireNP.
          </motion.p>
        </section>

        {/* WINS STAT */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto text-center mb-32">
           <motion.div {...fadeInUp} className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-12 inline-block">
              <p className="text-emerald-600 font-bold uppercase tracking-[0.2em] mb-4 text-sm">THE SCOREBOARD</p>
              <h2 className="text-5xl md:text-7xl font-black text-emerald-500 mb-4">68+ out of 76</h2>
              <p className="text-[#065F46] text-xl font-bold">features where HireNP beats the competition.</p>
           </motion.div>
        </section>

        {/* TABBED COMPARISON */}
        <section id="comparison" className="px-6 lg:px-8 max-w-7xl mx-auto mb-48">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A0F1E] mb-6">Compare HireNP vs Everything Else</h2>
            <p className="text-[#6B7280] font-medium mb-12">Select a competitor to see how we stack up.</p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {competitors.map((comp) => (
                <button
                  key={comp.key}
                  onClick={() => setActiveCompetitor(comp.key)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    activeCompetitor === comp.key 
                    ? 'bg-[#00B67A] text-white shadow-lg shadow-[#00B67A]/20' 
                    : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
                  }`}
                >
                  {comp.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <MasterComparisonTable competitorKey={activeCompetitor} />
          </div>
        </section>

        {/* DIFFERENCES */}
        <section className="mb-48">
          <div className="px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A0F1E]">HireNP was built differently.</h2>
          </div>
          
          <div className="space-y-0">
            {[
              {
                id: "01",
                bg: "bg-[#0A0F1E]",
                text: "text-white",
                title: "AI-native, not AI-added",
                desc: "We didn't add AI to an existing ATS. We built AI first and designed the entire workflow around it. Every feature — screening, interviews, offers — is powered by AI from the ground up.",
                visual: <div className="w-full h-64 bg-[#00B67A]/10 rounded-2xl border border-[#00B67A]/20 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-[#00B67A] rounded-2xl flex items-center justify-center text-white font-bold text-2xl animate-pulse">AI</div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-[#00B67A]/30 rounded-full"></div>
                  </div>
                </div>
              },
              {
                id: "02",
                bg: "bg-white",
                text: "text-[#0A0F1E]",
                title: "Every decision explained",
                desc: "We believe hiring decisions should be transparent. Every candidate score comes with full reasoning — requirements met, requirements missing, red flags, strengths. You always know why.",
                visual: <InterviewMockup status="advance" />
              },
              {
                id: "03",
                bg: "bg-[#0A0F1E]",
                text: "text-white",
                title: "Humans stay in control",
                desc: "AI handles the volume. Humans make the calls. Every critical step — advancing a candidate, sending an offer, making a hire — requires human approval. AI augments your judgment, never replaces it.",
                visual: <div className="flex items-center justify-center gap-8">
                  <div className="text-center"><div className="w-16 h-16 bg-[#111827] rounded-full border border-[#1F2937] flex items-center justify-center text-2xl">🤖</div><p className="mt-2 text-xs font-bold text-slate-500">AI RECOMMENDS</p></div>
                  <ArrowRight className="text-[#00B67A]" />
                  <div className="text-center"><div className="w-16 h-16 bg-[#00B67A] rounded-full flex items-center justify-center text-2xl">👤</div><p className="mt-2 text-xs font-bold text-[#00B67A]">HUMAN DECIDES</p></div>
                </div>
              },
              {
                id: "04",
                bg: "bg-white",
                text: "text-[#0A0F1E]",
                title: "One system, not four",
                desc: "The average company uses 4-6 tools to make one hire. HireNP replaces all of them — job posting, ATS, interview tool, transcription, offer letters, onboarding. One login. One invoice. One source of truth.",
                visual: <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold line-through opacity-50 text-center">LEGACY ATS</div>
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold line-through opacity-50 text-center">SCHEDULER</div>
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold line-through opacity-50 text-center">TRANSCRIPTION</div>
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold line-through opacity-50 text-center">OFFER GEN</div>
                </div>
              }
            ].map((diff, i) => (
              <section key={i} className={`${diff.bg} py-32 px-6 lg:px-8`}>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                  <div className="lg:w-1/2">
                    <span className="text-5xl font-serif text-[#00B67A] opacity-20 block mb-8">{diff.id}</span>
                    <h3 className={`text-3xl md:text-5xl font-serif ${diff.text} mb-8 leading-tight`}>{diff.title}</h3>
                    <p className={`${diff.text === 'text-white' ? 'text-slate-400' : 'text-slate-500'} text-lg font-medium leading-relaxed`}>{diff.desc}</p>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    {diff.visual}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* ROI CALCULATOR */}
        <section className="px-6 lg:px-8 max-w-5xl mx-auto mb-48 bg-[#0A0F1E] rounded-[3rem] py-24 text-white">
          <div className="text-center mb-16 px-6">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Calculate your hiring ROI</h2>
            <p className="text-slate-400 font-medium">See how much you could save with HireNP.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 px-10">
            <div className="space-y-12">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-6">Hires per year: {hiresPerYear}</label>
                <input 
                  type="range" min="1" max="100" step="1" value={hiresPerYear} 
                  onChange={(e) => setHiresPerYear(parseInt(e.target.value))}
                  className="w-full accent-[#00B67A]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-6">Average salary per hire: ${avgSalary.toLocaleString()}</label>
                <input 
                  type="range" min="30000" max="300000" step="5000" value={avgSalary} 
                  onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                  className="w-full accent-[#00B67A]"
                />
              </div>
              <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-bold">Using a recruitment agency?</span>
                <button 
                  onClick={() => setUseAgency(!useAgency)}
                  className={`w-14 h-8 rounded-full transition-all relative ${useAgency ? 'bg-[#00B67A]' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${useAgency ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#00B67A]/10 border border-[#00B67A]/20 p-6 rounded-3xl">
                <p className="text-xs font-bold text-[#00B67A] uppercase mb-2 tracking-widest">
                  {useAgency ? 'Agency Cost' : 'Current Cost'}
                </p>
                <p className="text-2xl font-bold">${roi.agencyCost.toLocaleString()}</p>
              </div>
              <div className="bg-[#00B67A]/10 border border-[#00B67A]/20 p-6 rounded-3xl">
                <p className="text-xs font-bold text-[#00B67A] uppercase mb-2 tracking-widest">HireNP Cost</p>
                <p className="text-2xl font-bold">${roi.hirenpCost.toLocaleString()}</p>
              </div>
              <div className="col-span-2 bg-[#00B67A] p-8 rounded-3xl text-center">
                <p className="text-xs font-bold text-white/80 uppercase mb-2 tracking-widest">Annual Savings</p>
                <p className="text-5xl font-black text-white mb-2">${roi.savings.toLocaleString()}</p>
                <p className="text-sm font-bold text-white/60">{roi.roiPercent.toFixed(0)}% ROI</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="https://app.hire-np.com/auth/login"
              className="inline-block bg-white text-[#0A0F1E] px-10 py-5 rounded-full font-bold hover:bg-[#F9FAFB] transition-all shadow-xl"
            >
              Start Saving on Day One
            </Link>
          </div>
        </section>

        {/* TRUST */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-32">
          <h2 className="text-3xl md:text-5xl font-serif text-[#0A0F1E] text-center mb-20">Built with trust at the core.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="text-[#00B67A]" />, title: "Data Security", text: "All candidate and company data encrypted at rest and in transit. We never share your data with third parties." },
              { icon: <Check className="text-[#00B67A]" />, title: "Compliance Ready", text: "Built with GDPR principles. Nepal labor law compliance included. Full audit trail on every hiring decision." },
              { icon: <Cpu className="text-[#00B67A]" />, title: "Responsible AI", text: "Our AI is trained to surface reasoning, not hide it. Human review at every critical step. No fully automated hiring decisions." },
              { icon: <Globe className="text-[#00B67A]" />, title: "Two Markets", text: "Serving companies in the USA and Nepal. Local payment methods. Local pricing. Local support hours." }
            ].map((card, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl border border-[#E5E7EB]">
                <div className="mb-6">{card.icon}</div>
                <h3 className="text-xl font-bold text-[#0A0F1E] mb-4">{card.title}</h3>
                <p className="text-[#6B7280] font-medium text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
