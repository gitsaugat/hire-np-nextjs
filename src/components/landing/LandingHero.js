"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LandingHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden hero-gradient py-20 px-6">
      <div className="absolute inset-0 mesh-overlay opacity-60" />
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-aqua/10 blur-[100px] rounded-full animate-float" />
      <div className="absolute bottom-20 right-[-5%] w-72 h-72 bg-forest/20 blur-[80px] rounded-full animate-float" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          {t('hero.headline.line1')} <br />
          <span className="text-aqua">{t('hero.headline.line2')}</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
          {t('hero.subheadline')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <Link href="/auth" className="w-full sm:w-auto bg-aqua hover:bg-teal text-forest px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(45,212,176,0.2)] hover:shadow-[0_0_30px_rgba(45,212,176,0.4)] active:scale-[0.98] text-center">
            {t('hero.cta.primary')}
          </Link>
          <Link href="/auth" className="w-full sm:w-auto border-2 border-white/30 hover:border-white/60 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm text-center">
            {t('hero.cta.secondary')}
          </Link>
        </div>
        <p className="pt-4 text-sm text-white/60 font-medium">
          {t('hero.tagline.prefix')} <span className="text-aqua">{t('hero.tagline.highlight')}</span>
        </p>
      </div>
    </section>
  );
}
