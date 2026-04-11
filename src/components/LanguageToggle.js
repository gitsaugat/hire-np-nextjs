"use client";

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-forest/10 rounded-full p-0.5">
      <button
        onClick={() => setLocale('en')}
        className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 min-w-[40px] ${
          locale === 'en'
            ? 'hero-gradient text-white shadow-sm'
            : 'text-teal hover:text-forest'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('ne')}
        className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 min-w-[40px] ${
          locale === 'ne'
            ? 'hero-gradient text-white shadow-sm'
            : 'text-teal hover:text-forest'
        }`}
      >
        नेपाली
      </button>
    </div>
  );
}
