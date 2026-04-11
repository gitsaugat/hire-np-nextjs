"use client";

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-forest">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="text-5xl">🇳🇵</div>
        <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium italic">
          &ldquo;{t('trust.quote')}&rdquo;
        </blockquote>
        <div className="w-16 h-0.5 mx-auto bg-aqua rounded-full" />
        <p className="text-aqua font-semibold">{t('trust.attribution')}</p>
      </div>
    </section>
  );
}
