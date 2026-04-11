"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LandingHero() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden hero-gradient py-20 px-6">
      <div className="absolute inset-0 mesh-overlay opacity-60" />
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-aqua/10 blur-[100px] rounded-full animate-float" />
      <div className="absolute bottom-20 right-[-5%] w-72 h-72 bg-forest/20 blur-[80px] rounded-full animate-float" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.15]">
          {t('hero.headline.static')} <br />
          <div className="h-[1.2em] relative overflow-hidden inline-block w-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-aqua absolute inset-0 text-center"
              >
                {t(`hero.headline.swap.${index + 1}`)}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        <div className="h-16 md:h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
            >
              {t(`hero.subheadline.swap.${index + 1}`)}
            </motion.p>
          </AnimatePresence>
        </div>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Candidate CTA */}
          <Link 
            href="/auth?role=candidate" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-forest border-2 border-[#19c398] px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(25,195,152,0.3)] hover:-translate-y-1 active:scale-[0.98]"
          >
            <Briefcase size={20} className="shrink-0" />
            {t('hero.cta.candidate')}
          </Link>

          {/* Company CTA */}
          <Link 
            href="/auth?role=company" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_4px_14px_rgba(13,79,60,0.25)] hover:shadow-[0_8px_24px_rgba(13,79,60,0.35)] hover:-translate-y-1 active:scale-[0.98]"
            style={{ background: 'linear-gradient(to right, #0d4f3c, #0f9e76)' }}
          >
            <Plus size={20} className="shrink-0" />
            {t('hero.cta.company')}
          </Link>
        </div>

        <div className="pt-2 text-sm text-white/50 font-medium flex items-center justify-center gap-2">
          <span>{t('hero.socialProof.candidates')}</span>
          <span className="opacity-40 select-none">·</span>
          <span>{t('hero.socialProof.companies')}</span>
        </div>
      </div>
    </section>
  );
}
