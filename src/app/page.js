"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InterviewMockup from '@/components/mockups/InterviewMockup';
import DashboardMockup from '@/components/mockups/DashboardMockup';
import ApplicantsMockup from '@/components/mockups/ApplicantsMockup';
import OfferMockup from '@/components/mockups/OfferMockup';
import EmmaMockup from '@/components/mockups/EmmaMockup';
import CandidateMockup from '@/components/mockups/CandidateMockup';
import AIJobArchitectMockup from '@/components/mockups/AIJobArchitectMockup';
import InterviewHubMockup from '@/components/mockups/InterviewHubMockup';
import { Check, Zap, Calendar, Brain, Mic, Lock, ArrowRight, Star, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function useCountUp(end, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setTimeout(() => {
            setHasStarted(true);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(eased * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

const StatItem = ({ end, suffix, unit, label, delay }) => {
  const { count, ref } = useCountUp(end, 2000, delay);
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </p>
      <div className="flex flex-col">
        {unit && <span className="text-white/90 font-bold text-lg uppercase tracking-tight">{unit}</span>}
        <span className="text-white/70 font-medium text-sm">{label}</span>
      </div>
    </div>
  );
};

const InterviewSection = () => {
  const features = [
    {
      icon: <Mic className="text-[#00B67A]" size={24} />,
      title: "AI joins every interview",
      text: "HireNP's AI bot automatically joins your Google Meet. Records, transcribes, and analyzes in real time."
    },
    {
      icon: <LayersIcon className="text-[#00B67A]" size={24} />,
      title: "Multi-step interview workflows",
      text: "Create custom interview stages — screening, technical, culture, final. Each stage scored independently. Full picture before you decide."
    },
    {
      icon: <Brain className="text-[#00B67A]" size={24} />,
      title: "Transcription + deep analysis",
      text: "Every word transcribed. Communication, technical ability, and culture fit scored automatically. Red flags surfaced instantly."
    },
    {
      icon: <Sparkles className="text-[#00B67A]" size={24} />,
      title: "AI summary before you decide",
      text: "Get a full candidate report before the debrief. Strengths, gaps, red flags, suggested salary — all ready."
    }
  ];

  return (
    <section className="bg-[#F9FAFB] py-24 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeInUp}>
            <span className="text-[#00B67A] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
              INTERVIEW INTELLIGENCE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A0F1E] leading-tight mb-8">
              Multi-step interviews. Fully analyzed. Every time.
            </h2>
            <p className="text-[#6B7280] text-lg mb-12 font-medium">
              HireNP handles your entire interview process — from scheduling to transcription to AI scoring. Connect your favourite tools and never miss a signal.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-16">
              {features.map((f, i) => (
                <div key={i}>
                  <div className="mb-4">{f.icon}</div>
                  <h4 className="font-bold text-[#0A0F1E] mb-2">{f.title}</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed font-medium">{f.text}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold text-[#9CA3AF] uppercase mb-6 tracking-widest">Connect your favourite apps</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Google Meet", icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="white"/>
                      <path d="M18 7.5L22 4V20L18 16.5V20H4V4H18V7.5Z" fill="#00B67A"/>
                    </svg>
                  )},
                  { name: "Google Calendar", icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#4285F4"/>
                      <text x="12" y="16" fontFamily="sans-serif" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">31</text>
                    </svg>
                  )},
                  { name: "Slack", sub: "Coming soon", icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="9" height="9" rx="2" fill="#36C5F0"/><rect x="13" y="2" width="9" height="9" rx="2" fill="#2EB67D"/>
                      <rect x="2" y="13" width="9" height="9" rx="2" fill="#E01E5A"/><rect x="13" y="13" width="9" height="9" rx="2" fill="#ECB22E"/>
                    </svg>
                  )},
                  { name: "+ More", sub: "Integrations", icon: <div className="w-5 h-5 bg-[#00B67A] rounded-full flex items-center justify-center text-white font-bold text-[10px]">+</div> }
                ].map((app, i) => (
                  <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    {app.icon}
                    <div>
                      <p className="text-sm font-bold text-[#0A0F1E] leading-none">{app.name}</p>
                      {app.sub && <p className="text-[10px] text-[#9CA3AF] font-bold mt-1 leading-none">{app.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative">
            <InterviewHubMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple Layers icon replacement if not available in lucide
const LayersIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        
        {/* SECTION 1 — HERO */}
        <section className="bg-[#0A0F1E] pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <span className="text-[#00B67A] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                AI-NATIVE HIRING INTELLIGENCE
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
                You're spending weeks on candidates who were never going to make it.
              </h1>
              <p className="text-[#9CA3AF] text-lg md:text-xl mb-10 max-w-xl">
                HireNP is the only hiring platform that explains every AI decision — from job post to signed offer in one system. No 4-tool stack. No black box AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link 
                  href="https://app.hire-np.com/auth/login" 
                  className="bg-[#00B67A] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[#008F5E] transition-all shadow-xl shadow-[#00B67A]/20"
                >
                  Start Free — 15 Days, No Card Required
                </Link>
              </div>
              <div className="text-[#6B7280] text-sm flex flex-wrap gap-x-6 gap-y-2 font-bold">
                <span>🇺🇸 Available in USA</span>
                <span>🇳🇵 Available in Nepal</span>
                <span>Setup in under 10 minutes</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative lg:scale-125 lg:ml-12"
            >
              <div className="absolute -inset-20 bg-[#00B67A]/20 rounded-full blur-[120px] pointer-events-none shadow-[0_0_80px_rgba(0,182,122,0.25),0_0_160px_rgba(0,182,122,0.1)]" />
              <div className="relative z-10 animate-[float_4s_ease-in-out_infinite]">
                <div className="absolute top-4 -left-4 z-20 bg-[#EF4444] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  AI explains every decision
                </div>
                <InterviewMockup status="reject" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — SOCIAL PROOF BAR */}
        <section className="bg-[#F9FAFB] py-8 border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-[#6B7280] text-sm font-bold flex items-center justify-center gap-2">
              Currently onboarding pilot companies in USA and Nepal
              <Link href="/contact" className="text-[#00B67A] hover:underline flex items-center gap-1">
                → Become a pilot partner
              </Link>
            </p>
          </div>
        </section>

        {/* SECTION 3 — PROBLEM */}
        <section className="bg-white py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl md:text-5xl font-serif text-[#0A0F1E] text-center mb-20"
            >
              The way hiring works right now is embarrassing.
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "You read 200 resumes to find 10.",
                  text: "That's 190 hours wasted on candidates who were never going to make it.",
                  icon: <Zap className="text-[#9CA3AF]" size={32} />
                },
                {
                  title: "Scheduling takes forever.",
                  text: "Emails. Back and forth. Missed candidates. Ghosting. Every single hire.",
                  icon: <Calendar className="text-[#9CA3AF]" size={32} />
                },
                {
                  title: "You still decide on gut feel.",
                  text: "No real signal. Just vibes, hope, and an ATS that tracks but never thinks.",
                  icon: <Star className="text-[#9CA3AF]" size={32} />
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#F9FAFB] p-10 rounded-3xl"
                >
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#0A0F1E] mb-4">{item.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#0A0F1E] flex flex-col items-center gap-4">
                There's a better way.
                <ArrowRight className="rotate-90 text-[#00B67A]" size={32} />
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — HOW IT WORKS */}
        <section id="how-it-works" className="bg-[#F9FAFB] py-24 px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl md:text-5xl font-serif text-[#0A0F1E] text-center mb-32"
            >
              HireNP does the work. You make the call.
            </motion.h2>

            <div className="space-y-40">
              {/* Step 1 */}
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                <motion.div {...fadeInUp}>
                  <span className="text-5xl md:text-7xl font-serif text-[#00B67A] mb-8 block opacity-20">01</span>
                  <h3 className="text-3xl font-bold text-[#0A0F1E] mb-6">Post a job in 2 minutes</h3>
                  <p className="text-[#6B7280] text-lg leading-relaxed mb-8 font-medium">
                    Describe the role in plain English. AI builds the full job description, requirements, and scoring criteria automatically.
                  </p>
                </motion.div>
                <motion.div {...fadeInUp} className="relative min-w-[480px]">
                  <div className="absolute top-4 right-4 z-20 bg-[#00B67A] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    AI builds the job for you
                  </div>
                  <AIJobArchitectMockup />
                </motion.div>
              </div>

              {/* Step 2 */}
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                <motion.div {...fadeInUp} className="order-2 lg:order-1 relative min-w-[480px]">
                  <div className="absolute top-4 left-4 z-20 bg-[#00B67A] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    Every applicant scored instantly
                  </div>
                  <ApplicantsMockup />
                </motion.div>
                <motion.div {...fadeInUp} className="order-1 lg:order-2">
                  <span className="text-5xl md:text-7xl font-serif text-[#00B67A] mb-8 block opacity-20">02</span>
                  <h3 className="text-3xl font-bold text-[#0A0F1E] mb-6">AI screens every applicant instantly</h3>
                  <p className="text-[#6B7280] text-lg leading-relaxed mb-8 font-medium">
                    Every resume scored and ranked the moment it arrives. Full reasoning on every decision. No pile. No guessing.
                  </p>
                </motion.div>
              </div>

              {/* Step 3 */}
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                <motion.div {...fadeInUp}>
                  <span className="text-5xl md:text-7xl font-serif text-[#00B67A] mb-8 block opacity-20">03</span>
                  <h3 className="text-3xl font-bold text-[#0A0F1E] mb-6">Interview intelligence — not just notes</h3>
                  <p className="text-[#6B7280] text-lg leading-relaxed mb-8 font-medium">
                    AI joins every interview. Scores communication, technical ability, and culture fit. Flags red flags. Suggests the next step.
                  </p>
                </motion.div>
                <motion.div {...fadeInUp} className="relative min-w-[480px] shadow-[0_25px_60px_rgba(0,0,0,0.4)] rounded-xl">
                  <div className="absolute top-4 right-4 z-20 bg-[#00B67A] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    Scores + reasoning on every interview
                  </div>
                  <InterviewMockup status="advance" />
                </motion.div>
              </div>

              {/* Step 4 */}
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                <motion.div {...fadeInUp} className="order-2 lg:order-1 relative min-w-[500px]">
                  <div className="absolute top-4 left-4 z-20 bg-[#00B67A] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    Live offer letter generation
                  </div>
                  <OfferMockup />
                </motion.div>
                <motion.div {...fadeInUp} className="order-1 lg:order-2">
                  <span className="text-5xl md:text-7xl font-serif text-[#00B67A] mb-8 block opacity-20">04</span>
                  <h3 className="text-3xl font-bold text-[#0A0F1E] mb-6">Offer to onboard in one click</h3>
                  <p className="text-[#6B7280] text-lg leading-relaxed mb-8 font-medium">
                    Generate offer letter with live preview. Candidate signs digitally. Done. No separate tools needed.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4.5 — INTERVIEW INTELLIGENCE */}
        <InterviewSection />

        {/* SECTION 5 — EMMA AI FEATURE */}
        <section className="bg-[#0A0F1E] py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <span className="text-[#00B67A] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                MEET EMMA AI
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
                Your AI hiring intelligence assistant.
              </h2>
              <p className="text-[#9CA3AF] text-lg mb-12 leading-relaxed">
                Emma knows your entire hiring pipeline. Ask her anything — candidate summaries, hiring metrics, top candidates, next steps. Available 24/7 inside your dashboard.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Candidate deep-dive summaries",
                  "Daily hiring briefings",
                  "Real-time pipeline metrics",
                  "Natural language commands",
                  "Voice mode coming soon"
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-white">
                    <div className="w-5 h-5 rounded-full bg-[#00B67A]/20 flex items-center justify-center">
                      <Check className="text-[#00B67A]" size={14} strokeWidth={3} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-20 bg-[#00B67A]/10 rounded-full blur-[100px] pointer-events-none" />
              <EmmaMockup />
            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — FEATURES GRID */}
        <section id="features" className="bg-white py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-serif text-[#0A0F1E] mb-6">
                Everything you hate about hiring. Automated.
              </motion.h2>
              <motion.p {...fadeInUp} className="text-[#6B7280] text-lg font-medium">
                One platform replaces your entire hiring stack.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Reasoning Transparency",
                  desc: "Don't just get a score. See exactly why every candidate was ranked — strengths, gaps, red flags. Every decision explained.",
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 10C18.4772 10 14 14.4772 14 20C14 23.5185 15.8158 26.6111 18.5714 28.3889C19.4678 28.9669 20 29.9456 20 31V34C20 35.1046 20.8954 36 22 34V38C22 39.1046 22.8954 40 24 40C25.1046 40 26 39.1046 26 38V34C26.1046 36 27 35.1046 28 34V31C28 29.9456 28.5322 28.9669 29.4286 28.3889C32.1842 26.6111 34 23.5185 34 20C34 14.4772 29.5228 10 24 10Z" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="21" cy="18" r="1" fill="#00B67A"/><circle cx="27" cy="18" r="1" fill="#00B67A"/><circle cx="24" cy="24" r="1" fill="#00B67A"/>
                    </svg>
                  )
                },
                {
                  title: "Human In The Loop",
                  desc: "AI recommends. You decide. Every critical step has a human checkpoint. You're always in control.",
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 24C27.3137 24 30 21.3137 30 18C30 14.6863 27.3137 12 24 12C20.6863 12 18 14.6863 18 18C18 21.3137 20.6863 24 24 24Z" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M24 28C18 28 14 31 14 36V38H34V36C34 31 30 28 24 28Z" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M36 12L38 14L42 10" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Interview Intelligence",
                  desc: "Resume + Interview = Combined score. Communication, technical, culture fit — all measured automatically.",
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 36V28M20 36V18M28 36V24M36 36V12" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M38 14L42 10M42 10H38M42 10V14" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "End-to-End In One System",
                  desc: "Job post → Screening → Interview → Offer → Onboard. One platform. No 4-tool stack. No broken data.",
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="24" r="4" stroke="#00B67A" strokeWidth="2"/><circle cx="24" cy="14" r="4" stroke="#00B67A" strokeWidth="2"/><circle cx="24" cy="34" r="4" stroke="#00B67A" strokeWidth="2"/><circle cx="36" cy="24" r="4" stroke="#00B67A" strokeWidth="2"/>
                      <path d="M16 24H20M28 14H32M28 34H32" stroke="#00B67A" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  title: "Natural Language Scheduling",
                  desc: "Type 'Weekdays 2-5pm' and you're done. Candidates book themselves. Zero back and forth.",
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="12" width="28" height="26" rx="4" stroke="#00B67A" strokeWidth="2"/><path d="M10 18H38M16 10V14M32 10V14" stroke="#00B67A" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M24 24L22 28H26L24 32" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "AI Offer Engine",
                  desc: "Generate professional offer letters with live preview. Candidate signs digitally. Suggested salary included.",
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 10H30L34 14V38H14V10Z" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 30L24 34L32 26" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="34" cy="14" r="3" fill="#00B67A"/>
                    </svg>
                  )
                }
              ].map((f, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.05 }}
                  className="p-10 rounded-3xl border border-[#E5E7EB] hover:border-[#00B67A]/30 transition-all hover:shadow-xl hover:shadow-[#00B67A]/5"
                >
                  <div className="mb-8">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0F1E] mb-4">{f.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed font-medium">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 — TWO SIDED PLATFORM */}
        <section className="bg-[#0A0F1E] py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-serif text-white text-center mb-24">
              Built for both sides of hiring.
            </motion.h2>
            
            <div className="grid lg:grid-cols-2 gap-10">
              <motion.div {...fadeInUp} className="bg-[#111827] rounded-3xl border-t-4 border-[#00B67A] p-10 flex flex-col min-h-[480px]">
                <h3 className="text-2xl font-bold text-[#00B67A] mb-10 flex items-center gap-3">
                  🏢 For Companies
                </h3>
                <ul className="space-y-4 mb-12 flex-grow">
                  {[
                    "AI shortlisting with full reasoning",
                    "Interview transcription and scoring",
                    "Natural language scheduling",
                    "Offer letter generation + digital signing",
                    "Candidate pool access",
                    "Hiring analytics and ROI tracking"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/80">
                      <Check className="text-[#00B67A]" size={16} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-10 opacity-80 overflow-x-auto">
                  <DashboardMockup type="mini" />
                </div>
                <Link href="https://app.hire-np.com/auth/login" className="bg-[#00B67A] text-white py-4 rounded-full font-bold text-center hover:bg-[#008F5E] transition-all">
                  Start Free Trial →
                </Link>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-[#111827] rounded-3xl border-t-4 border-[#00B67A] p-10 flex flex-col min-h-[480px]">
                <h3 className="text-2xl font-bold text-[#00B67A] mb-10 flex items-center gap-3">
                  👤 For Candidates
                </h3>
                <ul className="space-y-4 mb-12 flex-grow">
                  {[
                    "Track all applications in one place",
                    "AI career growth advisor (Emma)",
                    "Get found by companies hiring now",
                    "Know exactly where you stand",
                    "Resume vault and AI profile insights",
                    "Interview preparation tools"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/80">
                      <Check className="text-[#00B67A]" size={16} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-10 opacity-80 overflow-x-auto">
                  <CandidateMockup type="mini" />
                </div>
                <Link href="https://app.hire-np.com/auth/login" className="bg-[#00B67A] text-white py-4 rounded-full font-bold text-center hover:bg-[#008F5E] transition-all">
                  Find Jobs →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — TWO MARKETS */}
        <section className="bg-white py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-serif text-[#0A0F1E] mb-6">
                Built for two markets.
              </motion.h2>
              <motion.p {...fadeInUp} className="text-[#6B7280] text-lg font-medium">
                Same platform. Local pricing. Local payments.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div {...fadeInUp} className="p-12 rounded-3xl border border-[#E5E7EB]">
                <div className="text-4xl mb-8">🇺🇸</div>
                <h3 className="text-2xl font-bold text-[#0A0F1E] mb-2">HireNP for US Companies</h3>
                <p className="text-[#00B67A] text-sm font-bold mb-6">Headquartered in Buffalo, NY</p>
                <p className="text-[#6B7280] mb-8 font-medium">Built for startups and growing companies across the United States.</p>
                <div className="space-y-3 mb-12">
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0A0F1E]">
                    <span>💳 Stripe payments (USD)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0A0F1E]">
                    <span>💰 USD pricing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0A0F1E]">
                    <span>🕐 US timezone support</span>
                  </div>
                </div>
                <div className="mb-10">
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase mb-2">PRICING PREVIEW</p>
                  <p className="font-bold text-[#0A0F1E]">Pro: $499/30 days</p>
                  <p className="font-bold text-[#0A0F1E]">Business: $999/30 days</p>
                </div>
                <Link href="https://app.hire-np.com/auth/login" className="inline-block bg-[#0A0F1E] text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all">
                  Start Free Trial
                </Link>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="p-12 rounded-3xl border border-[#E5E7EB]">
                <div className="text-4xl mb-8">🇳🇵</div>
                <h3 className="text-2xl font-bold text-[#0A0F1E] mb-2">HireNP for Nepal Companies</h3>
                <p className="text-[#00B67A] text-sm font-bold mb-6">Serving companies across Nepal</p>
                <p className="text-[#6B7280] mb-8 font-medium">Nepal's most advanced AI hiring platform with local pricing and payment methods.</p>
                <div className="space-y-3 mb-12">
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0A0F1E]">
                    <span>💳 eSewa + Khalti payments (NPR)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0A0F1E]">
                    <span>💰 50% lower NPR pricing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0A0F1E]">
                    <span>🕐 Nepal timezone support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0A0F1E]">
                    <span>🏛️ Nepal labor law compliance</span>
                  </div>
                </div>
                <div className="mb-10">
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase mb-2">PRICING PREVIEW</p>
                  <p className="font-bold text-[#0A0F1E]">Pro: Rs. 33,000/30 days</p>
                  <p className="font-bold text-[#0A0F1E]">Business: Rs. 66,000/30 days</p>
                </div>
                <Link href="https://app.hire-np.com/auth/login" className="inline-block bg-[#0A0F1E] text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all">
                  Start Free Trial
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 9 — STATS BAR */}
        <section className="bg-[#00B67A] py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { end: 11, label: "Average time-to-hire", unit: "days", suffix: "" },
              { end: 84, label: "Reduction in resume review", unit: "", suffix: "%" },
              { end: 1, label: "Replaces 4-6 hiring tools", unit: "system", suffix: "" },
              { end: 15, label: "Free trial. No card needed.", unit: "days", suffix: "" }
            ].map((stat, i) => (
              <StatItem key={i} {...stat} delay={i * 200} />
            ))}
          </div>
        </section>

        {/* SECTION 10 — FINAL CTA */}
        <section className="bg-[#0A0F1E] py-40 px-6 lg:px-8 overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#00B67A]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 {...fadeInUp} className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight">
              Your competitors are already moving faster than you.
            </motion.h2>
            <motion.p {...fadeInUp} className="text-[#9CA3AF] text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Start your free 15-day trial today. No credit card required. Setup in under 10 minutes.
            </motion.p>
            <motion.div {...fadeInUp}>
              <Link 
                href="https://app.hire-np.com/auth/login" 
                className="inline-block bg-[#00B67A] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#008F5E] transition-all shadow-2xl shadow-[#00B67A]/30 mb-10"
              >
                Start Free — 15 Days No Card Required
              </Link>
            </motion.div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-[#6B7280] text-sm font-bold uppercase tracking-widest font-bold">
              <span>🔒 Secure · No credit card · Cancel anytime</span>
              <span>🇺🇸 USA · 🇳🇵 Nepal</span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
