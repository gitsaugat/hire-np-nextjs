"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InterviewIntelligenceMockup from '@/components/mockups/InterviewIntelligenceMockup';
import InterviewCallMockup from '@/components/mockups/InterviewCallMockup';
import DashboardMockup from '@/components/mockups/DashboardMockup';
import ApplicantsMockup from '@/components/mockups/ApplicantsMockup';
import OfferMockup from '@/components/mockups/OfferMockup';
import CandidateMockup from '@/components/mockups/CandidateMockup';
import AIJobArchitectMockup from '@/components/mockups/AIJobArchitectMockup';
import InterviewHubMockup from '@/components/mockups/InterviewHubMockup';
import SchedulingBlocksMockup from '@/components/mockups/SchedulingBlocksMockup';
import CandidateSchedulingMockup from '@/components/mockups/CandidateSchedulingMockup';
import CandidatePoolMockup from '@/components/mockups/CandidatePoolMockup';
import TeamManagementMockup from '@/components/mockups/TeamManagementMockup';
import EmailTrackingMockup from '@/components/mockups/EmailTrackingMockup';
import OnboardingIntegrationsMockup from '@/components/mockups/OnboardingIntegrationsMockup';
import {
  Check, Zap, Calendar, Brain, Mic, ArrowRight, ArrowUpRight,
  Sparkles, Eye, Users2, Workflow, MessageSquareText, FileSignature,
  Building2, UserRound, ShieldCheck, Globe2, Clock, Send, Video,
  Archive, BarChart3, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function useCountUp(end, duration = 1600, delay = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setTimeout(() => setHasStarted(true), delay);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
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
      const eased = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(eased * end));
      if (percentage < 1) animationFrame = requestAnimationFrame(animate);
      else setCount(end);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

const StatItem = ({ end, suffix, label, delay }) => {
  const { count, ref } = useCountUp(end, 1600, delay);
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <p className="text-3xl md:text-4xl font-serif text-ink-900 leading-none tracking-[-0.02em]">
        {count}<span className="text-brand-primary">{suffix}</span>
      </p>
      <span className="text-ink-500 text-[13px] font-medium">{label}</span>
    </div>
  );
};

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

const MockupFrame = ({ children, badge, badgePosition = 'top-right' }) => (
  <div className="relative">
    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-100/40 via-transparent to-transparent rounded-2xl blur-2xl pointer-events-none" />
    <div className="relative">
      {badge && (
        <div className={`absolute z-20 ${badgePosition === 'top-right' ? 'top-3 right-3' : 'top-3 left-3'} bg-white border border-black/[0.06] px-2 py-1 rounded-full flex items-center gap-1.5 shadow-sm`}>
          <span className="w-1 h-1 rounded-full bg-brand-primary animate-soft-pulse" />
          <span className="text-[9px] font-semibold text-ink-700 tracking-wide">{badge}</span>
        </div>
      )}
      {children}
    </div>
  </div>
);

const HOW_STEPS = [
  {
    num: "01",
    short: "Post job",
    title: "Post a job in 2 minutes",
    text: "Describe the role in plain English. AI builds the description, requirements, and scoring criteria automatically.",
    badge: "AI builds the job",
    mockup: <AIJobArchitectMockup />,
  },
  {
    num: "02",
    short: "Schedule",
    title: "Type to manage your calendar",
    text: "Connect Google Calendar and type in plain English. AI creates interview blocks, handles conflicts, and syncs instantly.",
    badge: "AI block scheduling",
    mockup: <SchedulingBlocksMockup />,
    bullets: [
      { icon: <Calendar size={12} />, label: "Google Calendar sync" },
      { icon: <MessageSquareText size={12} />, label: "Natural language blocks" },
      { icon: <Clock size={12} />, label: "Conflict resolution" },
      { icon: <Zap size={12} />, label: "Instant team update" },
    ],
  },
  {
    num: "03",
    short: "AI screen",
    title: "AI screens every applicant",
    text: "Every resume scored and ranked the moment it arrives. Full reasoning on every decision. No pile. No guessing.",
    badge: "Scored instantly",
    mockup: <ApplicantsMockup />,
  },
  {
    num: "04",
    short: "Candidate",
    title: "Top 5 picks for every candidate",
    text: "Candidates select from matched slots or chat with AI to reschedule. A frictionless experience that wins top talent.",
    badge: "Candidate selection",
    mockup: <CandidateSchedulingMockup />,
    bullets: [
      { icon: <Sparkles size={12} />, label: "Top 5 AI matches" },
      { icon: <Video size={12} />, label: "One-click confirmation" },
      { icon: <Users2 size={12} />, label: "AI rescheduling chat" },
      { icon: <Check size={12} />, label: "Auto-calendar invites" },
    ],
  },
  {
    num: "05",
    short: "Interviews",
    title: "Multi-step interviews, end to end",
    text: "Screening, technical, culture, final — schedule and run every round in one place. Each stage scored independently.",
    badge: "Multi-stage pipeline",
    mockup: <InterviewHubMockup />,
  },
  {
    num: "06",
    short: "Live Call",
    title: "AI joins your Google Meet or Zoom",
    text: "Never take notes again. HireNP joins every call automatically to transcribe, score, and flag key moments.",
    badge: "AI Live Listener",
    mockup: <InterviewCallMockup />,
    bullets: [
      { icon: <Video size={12} />, label: "Auto-joins Meet/Zoom" },
      { icon: <Brain size={12} />, label: "Real-time signals" },
      { icon: <Sparkles size={12} />, label: "Live transcription" },
      { icon: <Mic size={12} />, label: "Audio-native capture" },
    ],
  },
  {
    num: "07",
    short: "Intelligence",
    title: "Deep analysis on every candidate",
    text: "Auto-transcribed. Communication, technical, and culture fit scored. Red flags surfaced. Full summary before the debrief.",
    badge: "Post Interview Analysis",
    mockup: <InterviewIntelligenceMockup />,
    bullets: [
      { icon: <Mic size={12} />, label: "Voice mode analysis" },
      { icon: <Brain size={12} />, label: "Soft skill scoring" },
      { icon: <Eye size={12} />, label: "Red flag detection" },
      { icon: <Sparkles size={12} />, label: "Post-call summary" },
    ],
  },
  {
    num: "08",
    short: "Sign offer",
    title: "Offer to onboard in one click",
    text: "Generate offer letter with live preview. Candidate signs digitally. Done. No separate tools needed.",
    badge: "Live offer letter",
    mockup: <OfferMockup />,
  },
];

const HowItWorksCard = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const DURATION = 8000; // ms per step

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) {
        clearInterval(interval);
        setActive((prev) => (prev + 1) % HOW_STEPS.length);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [active, paused]);

  const handleClick = (i) => {
    setActive(i);
    setProgress(0);
  };

  const step = HOW_STEPS[active];

  return (
    <motion.div
      {...fade}
      className="card relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Step tabs */}
      <div className="flex flex-nowrap overflow-x-auto no-scrollbar border-b border-black/[0.06]">
        {HOW_STEPS.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`group relative flex-1 min-w-[110px] sm:min-w-[130px] lg:min-w-0 px-2.5 py-3 text-left transition-colors ${
                isActive ? 'bg-[#FAFAF7]' : 'bg-white hover:bg-[#FAFAF7]/50'
              } ${i < HOW_STEPS.length - 1 ? 'border-r border-black/[0.06]' : ''}`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold tracking-tight transition-all ${
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'bg-ink-50 text-ink-400 group-hover:bg-emerald-50 group-hover:text-brand-primary'
                }`}>
                  {s.num}
                </span>
                <div className="min-w-0">
                  <p className={`text-[10px] font-semibold tracking-tight truncate transition-colors ${isActive ? 'text-ink-900' : 'text-ink-500'}`}>
                    {s.short}
                  </p>
                </div>
              </div>
              {/* Progress bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/[0.04] overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-primary"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10 p-6 lg:p-10 min-h-[580px] relative">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`text-${active}`}
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, x: -40, y: -20, filter: "blur(12px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center relative z-10"
          >
            <span className="text-[10px] font-semibold text-ink-300 tracking-[0.18em] mb-3">STEP {step.num} OF {HOW_STEPS.length.toString().padStart(2,'0')}</span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-ink-900 mb-3 leading-tight tracking-[-0.02em]">{step.title}</h3>
            <p className="text-[14px] text-ink-500 leading-relaxed mb-5 max-w-md">{step.text}</p>

            {step.bullets && (
              <div className="grid grid-cols-2 gap-1.5 mb-6 max-w-md">
                {step.bullets.map((b) => (
                  <div key={b.label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-black/[0.06]">
                    <span className="text-brand-primary shrink-0">{b.icon}</span>
                    <span className="text-[11px] font-semibold text-ink-700 truncate">{b.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Dot navigation */}
            <div className="flex items-center gap-1.5">
              {HOW_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? 'w-6 bg-brand-primary' : 'w-1.5 bg-ink-200 hover:bg-ink-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10">
          <MockupFrame badge={step.badge}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`mockup-${active}`}
                initial={{ opacity: 0, x: 40, filter: "blur(12px)", scale: 0.98 }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, y: -30, filter: "blur(20px)", scale: 1.05 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
              >
                {step.mockup}
              </motion.div>
            </AnimatePresence>
          </MockupFrame>
        </div>
      </div>
    </motion.div>
  );
};

const EMMA_QUERIES = [
  { q: "Show me top candidates for Senior Designer", a: "Found 3 candidates scoring above 85%. Top match: Maya Chen — 92% fit." },
  { q: "Why was Alex rejected?", a: "Missing 2 required skills (Python, AWS) and 4 years short on experience." },
  { q: "Who should I interview next?", a: "Priya Sharma (94% match) — applied 2 days ago. Available this week." },
  { q: "Summarize today's pipeline", a: "12 new applicants · 4 interviews scheduled · 2 offers awaiting acceptance." },
];

const EmmaChatDemo = () => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setTyped("");
    setShowAnswer(false);
    const query = EMMA_QUERIES[idx].q;
    let i = 0;
    const typing = setInterval(() => {
      i++;
      setTyped(query.slice(0, i));
      if (i >= query.length) {
        clearInterval(typing);
        setTimeout(() => setShowAnswer(true), 350);
        setTimeout(() => setIdx((p) => (p + 1) % EMMA_QUERIES.length), 4200);
      }
    }, 35);
    return () => clearInterval(typing);
  }, [idx, isOpen]);

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-emerald-100/40 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />
      
      {/* Emma "Chick" Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="absolute bottom-4 right-4 z-[70] w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-bright shadow-lg shadow-emerald-200 flex items-center justify-center text-white text-2xl font-black cursor-pointer group"
          >
            <span className="group-hover:scale-110 transition-transform">E</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-white rounded-full" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -inset-1 rounded-full border border-brand-primary/30" 
            />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div 
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : '60px',
          opacity: isOpen ? 1 : 0.6,
          scale: isOpen ? 1 : 0.95,
        }}
        className="relative rounded-2xl border border-black/[0.06] bg-white shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-4 py-3 border-b border-black/[0.06] bg-[#FAFAF7] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-primary to-brand-bright flex items-center justify-center text-white font-bold text-[11px]">E</div>
            <div>
              <p className="text-[12px] font-semibold text-ink-900 leading-tight">Emma AI</p>
              <p className="text-[10px] text-ink-400 leading-tight flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-brand-primary animate-soft-pulse" /> Online · ready
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-brand-primary" />
            <ChevronRight size={14} className={`text-ink-300 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {/* Chat body */}
              <div className="p-4 space-y-3 min-h-[260px] relative">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`q-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-br-sm bg-brand-primary text-white text-[13px] font-medium leading-relaxed">
                      {typed}<span className="inline-block w-[2px] h-3.5 bg-white/80 ml-0.5 animate-soft-pulse align-middle" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-2 relative z-10"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-primary to-brand-bright flex items-center justify-center text-white font-bold text-[10px] shrink-0 mt-0.5">E</div>
                    <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-bl-sm bg-[#FAFAF7] border border-black/[0.04] text-[13px] text-ink-700 font-medium leading-relaxed">
                      {EMMA_QUERIES[idx].a}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input area */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-black/[0.06] bg-[#FAFAF7]">
                  <input
                    readOnly
                    placeholder="Ask Emma about your pipeline..."
                    className="flex-1 bg-transparent text-[12px] text-ink-500 outline-none font-medium placeholder:text-ink-300"
                  />
                  <button className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center text-white shadow-brand">
                    <ArrowRight size={12} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {EMMA_QUERIES.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                        i === idx
                          ? 'bg-emerald-50 border border-emerald-100 text-brand-primary'
                          : 'bg-white border border-black/[0.06] text-ink-400 hover:text-ink-700'
                      }`}
                    >
                      Suggestion {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const HeroShowcase = () => {
  const [active, setActive] = useState(0);
  const showcaseSteps = [
    { id: 'emma-chat', name: "Emma AI", component: <EmmaChatDemo />, badge: "AI Assistant" },
    { id: 'intelligence', name: "Post Interview Analysis", component: <InterviewIntelligenceMockup />, badge: "Post Interview Analysis" },
    { id: 'ai-architect', name: "AI Job Architect", component: <AIJobArchitectMockup />, badge: "AI Generation" },
    { id: 'applicants', name: "AI Screening", component: <ApplicantsMockup />, badge: "AI Scoring" },
    { id: 'scheduling', name: "Natural Language Scheduling", component: <SchedulingBlocksMockup />, badge: "AI Scheduling" },
    { id: 'interview-call', name: "Live Interview", component: <InterviewCallMockup />, badge: "AI Live Listener" },
    { id: 'candidate-scheduling', name: "Candidate Experience", component: <CandidateSchedulingMockup />, badge: "Candidate Selection" },
    { id: 'interview-hub', name: "Interview Hub", component: <InterviewHubMockup />, badge: "Pipeline Management" },
    { id: 'offer', name: "Offer Engine", component: <OfferMockup />, badge: "Offer Generation" },
    { id: 'email', name: "Email Tracking", component: <EmailTrackingMockup />, badge: "Email Intelligence" },
    { id: 'pool', name: "Candidate Pool", component: <CandidatePoolMockup />, badge: "Talent Rediscovery" },
    { id: 'team', name: "HR Management", component: <TeamManagementMockup />, badge: "Team Collaboration" },
    { id: 'integrations', name: "Tools Integration", component: <OnboardingIntegrationsMockup />, badge: "Auto-Onboarding" },
  ];

  useEffect(() => {
    if (active >= showcaseSteps.length) {
      setActive(0);
    }
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % showcaseSteps.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [showcaseSteps.length, active]);

  const activeStep = showcaseSteps[active] || showcaseSteps[0];

  if (!activeStep) return null;

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="absolute -inset-8 bg-gradient-to-br from-emerald-100/60 via-emerald-50/40 to-transparent rounded-3xl blur-2xl pointer-events-none" />
      
      <div className="relative transform transition-all duration-1000 hover:scale-[1.01]">
        <MockupFrame badge={activeStep.badge}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40, filter: "blur(12px)", scale: 0.98 }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1, y: 0 }}
              exit={{ opacity: 0, x: -50, y: -30, filter: "blur(20px)", scale: 1.05 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full overflow-hidden"
            >
              {activeStep.component}
            </motion.div>
          </AnimatePresence>
        </MockupFrame>
      </div>

      {/* Manual Controls on Hover */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        {showcaseSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${active === i ? 'bg-brand-primary w-6' : 'bg-ink-200'}`}
          />
        ))}
      </div>
    </div>
  );
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* SECTION 1 — HERO */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(0,182,122,0.08),transparent_60%)] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-primary animate-ping opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary" />
                </span>
                <span className="text-[10px] font-semibold text-brand-deep tracking-[0.14em] uppercase">AI-Native Hiring</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif text-ink-900 leading-[1.05] mb-5 tracking-[-0.025em] text-balance">
                Stop spending weeks on candidates who were never going to make it.
              </h1>
              <p className="text-ink-500 text-[15px] md:text-base mb-7 max-w-lg leading-relaxed">
                The only hiring platform that explains every AI decision — from job post to signed offer in one system. No 4-tool stack. No black box AI.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                <Link href="https://app.hire-np.com/auth/login" className="btn-primary">
                  Start free trial
                  <ArrowRight size={14} />
                </Link>
                <Link href="/why-hirenp" className="btn-secondary">
                  See how it works
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-ink-400 font-medium">
                <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-ink-300" /> 15-day trial</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-ink-300" /> No credit card</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-ink-300" /> Setup in 10 min</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <HeroShowcase />
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — TRUST STRIP */}
        <section className="border-y border-black/[0.06] bg-[#FAFAF7] py-3 px-5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <span className="text-ink-500 text-[12px] font-medium">
              Onboarding pilot teams worldwide — <span className="text-ink-900 font-semibold">global hiring, local payments</span>
            </span>
            <Link href="/contact" className="text-brand-primary hover:text-brand-deep text-[12px] font-semibold flex items-center gap-1 transition-colors">
              Become a pilot partner <ArrowRight size={11} />
            </Link>
          </div>
        </section>

        {/* SECTION 3 — PROBLEM */}
        <section className="py-20 lg:py-24 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-12 max-w-2xl mx-auto">
              <Eyebrow>The problem</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em] text-balance">
                The way hiring works right now is <span className="italic text-ink-400">embarrassing.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { num: "01", title: "200 resumes to find 10.", text: "190 hours wasted on candidates who were never going to make it.", icon: <Zap size={16} /> },
                { num: "02", title: "Scheduling takes forever.", text: "Emails. Back and forth. Missed candidates. Ghosting. Every hire.", icon: <Calendar size={16} /> },
                { num: "03", title: "You still decide on gut feel.", text: "No real signal. Just vibes, hope, and an ATS that tracks but never thinks.", icon: <Eye size={16} /> }
              ].map((item, i) => (
                <motion.div
                  key={i} {...fade}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-brand-primary">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-semibold text-ink-300 tracking-[0.16em]">{item.num}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-ink-900 mb-1.5 tracking-tight">{item.title}</h3>
                  <p className="text-[13px] text-ink-500 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fade} className="text-center">
              <div className="inline-flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-ink-500">There's a better way</span>
                <ArrowRight className="rotate-90 text-brand-primary" size={14} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — HOW IT WORKS */}
        <section id="how-it-works" className="bg-[#FAFAF7] border-y border-black/[0.06] py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-10 max-w-2xl mx-auto">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em] text-balance">
                HireNP does the work. You make the call.
              </h2>
            </motion.div>
            <HowItWorksCard />
          </div>
        </section>

        {/* SECTION 5 — EMMA AI */}
        <section className="bg-[#FAFAF7] border-y border-black/[0.06] py-20 lg:py-24 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
            <motion.div {...fade}>
              <Eyebrow>Meet Emma</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-serif text-ink-900 mb-4 leading-[1.1] tracking-[-0.02em] text-balance">
                Your AI hiring partner — <span className="text-gradient">always one question away.</span>
              </h2>
              <p className="text-ink-500 text-[15px] mb-7 leading-relaxed max-w-lg">
                Emma reads your entire pipeline so you don't have to. Ask in plain English — get answers backed by your real candidate data. No dashboards. No digging.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-7">
                {[
                  { icon: <Brain size={14} />, label: "Deep candidate dives" },
                  { icon: <Sparkles size={14} />, label: "Daily briefings" },
                  { icon: <Workflow size={14} />, label: "Pipeline health checks" },
                  { icon: <Mic size={14} />, label: "Voice mode (soon)" }
                ].map((cap) => (
                  <div key={cap.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-black/[0.06]">
                    <span className="text-brand-primary shrink-0">{cap.icon}</span>
                    <span className="text-[12px] font-semibold text-ink-700">{cap.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href="https://app.hire-np.com/auth/login" className="btn-primary">
                  Try Emma free <ArrowRight size={13} />
                </Link>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-ink-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-soft-pulse" />
                  Available 24/7 in your dashboard
                </span>
              </div>
            </motion.div>
            <motion.div {...fade} transition={{ delay: 0.1, duration: 0.5 }}>
              <EmmaChatDemo />
            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — FEATURES GRID */}
        <section id="features" className="bg-[#FAFAF7] border-y border-black/[0.06] py-20 lg:py-24 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-12 max-w-2xl mx-auto">
              <Eyebrow>Features</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-serif text-ink-900 mb-3 leading-[1.1] tracking-[-0.02em] text-balance">
                Everything you hate about hiring. Automated.
              </h2>
              <p className="text-ink-500 text-[14px]">One platform replaces your entire hiring stack.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: "AI Reasoning Transparency", desc: "See exactly why every candidate was ranked — strengths, gaps, red flags. Every decision explained.", icon: <Eye size={16} /> },
                { title: "Human In The Loop", desc: "AI recommends. You decide. Every critical step has a human checkpoint. You're in control.", icon: <Users2 size={16} /> },
                { title: "Interview Intelligence", desc: "Resume + Interview = Combined score. Communication, technical, culture fit — all measured.", icon: <MessageSquareText size={16} /> },
                { title: "End-to-End In One System", desc: "Post → Screen → Interview → Offer → Onboard. One platform. No 4-tool stack.", icon: <Workflow size={16} /> },
                { title: "Natural Language Scheduling", desc: "Type 'Weekdays 2-5pm' and you're done. Candidates book themselves.", icon: <Calendar size={16} /> },
                { title: "AI Offer Engine", desc: "Generate offer letters with live preview. Candidate signs digitally. Salary suggestions included.", icon: <FileSignature size={16} /> }
              ].map((f, i) => (
                <motion.div
                  key={i} {...fade}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  className="card p-6"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-brand-primary">
                    {f.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-ink-900 mb-1.5 tracking-tight">{f.title}</h3>
                  <p className="text-[13px] text-ink-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 — TWO SIDED */}
        <section className="py-20 lg:py-24 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-12 max-w-2xl mx-auto">
              <Eyebrow>Two sides, one platform</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em]">
                Built for both sides of hiring.
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-4">
              {[
                {
                  icon: <Building2 size={16} />,
                  label: "For Companies",
                  features: ["AI shortlisting with full reasoning", "Interview transcription and scoring", "Natural language scheduling", "Offer letter generation + digital signing", "Candidate pool access", "Hiring analytics and ROI tracking"],
                  mockup: <DashboardMockup type="mini" />,
                  cta: "Start free trial"
                },
                {
                  icon: <UserRound size={16} />,
                  label: "For Candidates",
                  features: ["Track all applications in one place", "AI career growth advisor (Emma)", "Get found by companies hiring now", "Know exactly where you stand", "Resume vault and AI profile insights", "Interview preparation tools"],
                  mockup: <CandidateMockup type="mini" />,
                  cta: "Find jobs"
                }
              ].map((side, i) => (
                <motion.div
                  key={i} {...fade}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="card p-6 lg:p-8 flex flex-col"
                >
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-brand-primary">
                      {side.icon}
                    </div>
                    <h3 className="text-[15px] font-semibold text-ink-900 tracking-tight">{side.label}</h3>
                  </div>
                  <ul className="space-y-2 mb-7 flex-grow">
                    {side.features.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-ink-700">
                        <Check className="text-brand-primary shrink-0 mt-0.5" size={13} strokeWidth={2.5} />
                        <span className="text-[13px] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6 rounded-xl overflow-hidden border border-black/[0.04]">
                    {side.mockup}
                  </div>
                  <Link href="https://app.hire-np.com/auth/login" className="btn-primary self-start">
                    {side.cta}
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — TWO MARKETS */}
        <section className="bg-[#FAFAF7] border-y border-black/[0.06] py-20 lg:py-24 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-12 max-w-2xl mx-auto">
              <Eyebrow>Global hiring platform</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-serif text-ink-900 mb-3 leading-[1.1] tracking-[-0.02em]">
                Built for teams hiring anywhere.
              </h2>
              <p className="text-ink-500 text-[14px]">One platform. Multi-currency billing. Local payment methods where you are.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-3 mb-10">
              {[
                { icon: <Globe2 size={16} />, title: "Hire in any country", desc: "Run roles in the US, Europe, Asia, and beyond. Currency-aware salary suggestions and offer letters." },
                { icon: <Workflow size={16} />, title: "Local payment rails", desc: "Stripe (USD, EUR, GBP, AUD, INR, more). eSewa + Khalti for Nepal. New rails added on request." },
                { icon: <ShieldCheck size={16} />, title: "Compliance-aware", desc: "GDPR-aligned, audit trails on every decision, and labor-law guidance for the regions we serve." }
              ].map((m, i) => (
                <motion.div
                  key={i} {...fade}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="card p-6"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-brand-primary">
                    {m.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-ink-900 mb-1.5 tracking-tight">{m.title}</h3>
                  <p className="text-[13px] text-ink-500 leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fade} className="card p-6 lg:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold text-ink-400 uppercase mb-1.5 tracking-[0.16em]">Currently live in</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-semibold text-ink-900">
                  <span>🇺🇸 USA</span>
                  <span className="w-1 h-1 rounded-full bg-ink-200" />
                  <span>🇳🇵 Nepal</span>
                  <span className="w-1 h-1 rounded-full bg-ink-200" />
                  <span className="text-ink-500 font-medium">+ teams using HireNP from 12+ other countries</span>
                </div>
              </div>
              <Link href="/contact" className="btn-secondary shrink-0">
                Request a region <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9 — STATS */}
        <section className="py-16 lg:py-20 px-5 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-10 max-w-xl mx-auto">
              <Eyebrow>By the numbers</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em]">
                Hiring at the pace of your next great hire.
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {[
                { end: 11, label: "Days from application to offer", suffix: "" },
                { end: 84, label: "Less time on resume review", suffix: "%" },
                { end: 1, label: "Platform replaces 4-6 tools", suffix: "" },
                { end: 15, label: "Days free. No card required.", suffix: "" }
              ].map((stat, i) => (
                <StatItem key={i} {...stat} delay={i * 150} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10 — FINAL CTA */}
        <section className="bg-[#FAFAF7] border-t border-black/[0.06] py-20 lg:py-24 px-5 lg:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fade}>
              <Eyebrow>Get started</Eyebrow>
            </motion.div>
            <motion.h2 {...fade} className="text-3xl md:text-5xl font-serif text-ink-900 mb-4 leading-[1.05] tracking-[-0.025em] text-balance">
              Your competitors are already moving faster.
            </motion.h2>
            <motion.p {...fade} className="text-ink-500 text-[15px] mb-7 max-w-xl mx-auto leading-relaxed">
              Start your free 15-day trial today. No credit card required. Setup in under 10 minutes.
            </motion.p>
            <motion.div {...fade} className="flex flex-wrap gap-2 justify-center mb-7">
              <Link href="https://app.hire-np.com/auth/login" className="btn-primary">
                Start free trial <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn-secondary">Talk to us</Link>
            </motion.div>
            <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-ink-400 text-[12px] font-medium">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} /> Secure · No credit card · Cancel anytime</span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-ink-200" />
              <span className="inline-flex items-center gap-1.5"><Globe2 size={12} /> Available worldwide</span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
