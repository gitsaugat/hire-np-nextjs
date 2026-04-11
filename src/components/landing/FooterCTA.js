"use client";

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="hero-gradient py-24 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 mesh-overlay opacity-40" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white">{t('finalCta.headline')}</h2>
        <button className="bg-white text-forest px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-aqua-white shadow-lg hover:shadow-xl active:scale-[0.98]">
          {t('finalCta.cta')}
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a3d2e] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white">Hire<span className="text-aqua">NP</span></div>
            <p className="text-white/60 text-sm leading-relaxed">{t('footer.desc')}</p>
          </div>
          <div className="space-y-4">
            <div className="text-white uppercase tracking-widest text-xs font-bold">{t('footer.product')}</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#features" className="hover:text-aqua transition-colors">{t('nav.features')}</a></li>
              <li><a href="#how-it-works" className="hover:text-aqua transition-colors">{t('nav.howItWorks')}</a></li>
              <li><a href="#pricing" className="hover:text-aqua transition-colors">{t('nav.pricing')}</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-white uppercase tracking-widest text-xs font-bold">{t('footer.company')}</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-aqua transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-aqua transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <div>{t('footer.rights')}</div>
          <div className="font-medium">{t('footer.madeIn')}</div>
        </div>
      </div>
    </footer>
  );
}
