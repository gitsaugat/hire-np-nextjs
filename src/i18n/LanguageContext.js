"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '@/i18n/en.json';
import ne from '@/i18n/ne.json';

const translations = { en, ne };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('hirenp-lang');
    if (saved && translations[saved]) {
      setLocaleState(saved);
    } else if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || navigator.languages?.[0] || '';
      if (browserLang.startsWith('ne')) {
        setLocaleState('ne');
      }
    }
  }, []);

  const setLocale = useCallback((lang) => {
    setLocaleState(lang);
    localStorage.setItem('hirenp-lang', lang);
  }, []);

  const t = useCallback((key) => {
    const val = translations[locale]?.[key];
    if (val != null) return val;
    const fallback = translations.en[key];
    if (fallback != null) return fallback;
    return key;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      <div className={locale === 'ne' ? 'font-nepali leading-[1.8]' : 'leading-relaxed'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
