"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold text-white">
            Hire<span className="text-aqua">NP</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.features')}</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.howItWorks')}</Link>
            <Link href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.pricing')}</Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link href="/signin" className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden sm:block">{t('nav.signIn')}</Link>
            <Link href="#waitlist" className="bg-aqua hover:bg-teal text-forest px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200">
              {t('nav.joinWaitlist')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
