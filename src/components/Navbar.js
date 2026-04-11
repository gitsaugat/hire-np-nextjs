"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Logo from '@/components/Logo';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <Logo textColor="text-white" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/landing#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.features')}</Link>
            <Link href="/landing#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.howItWorks')}</Link>
            <Link href="/landing#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.pricing')}</Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link href="/auth" className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden sm:block">{t('nav.signIn')}</Link>
            <Link href="/auth" className="btn-find-jobs flex items-center justify-center text-forest px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
