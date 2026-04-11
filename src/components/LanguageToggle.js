"use client";

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLocale('en')}
        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
          locale === 'en'
            ? 'text-white border-transparent'
            : 'bg-transparent border border-white/50 text-white/70 hover:text-white hover:border-white'
        }`}
        style={
          locale === 'en'
            ? { background: 'linear-gradient(135deg, #0d4f3c, #0f9e76)' }
            : {}
        }
      >
        EN
      </button>
      <button
        onClick={() => setLocale('ne')}
        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
          locale === 'ne'
            ? 'text-white border-transparent'
            : 'bg-transparent border border-white/50 text-white/70 hover:text-white hover:border-white'
        }`}
        style={{
          fontFamily: 'var(--font-noto-devanagari)',
          ...(locale === 'ne'
            ? { background: 'linear-gradient(135deg, #0d4f3c, #0f9e76)' }
            : {})
        }}
      >
        नेपाली
      </button>
    </div>
  );
}
