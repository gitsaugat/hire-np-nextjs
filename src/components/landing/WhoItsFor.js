"use client";

import React from 'react';
import { Code2, Landmark, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function WhoItsFor() {
  const { t } = useLanguage();

  const segments = [
    { titleKey: "whoItsFor.1.title", descKey: "whoItsFor.1.desc", icon: Code2 },
    { titleKey: "whoItsFor.2.title", descKey: "whoItsFor.2.desc", icon: Landmark },
    { titleKey: "whoItsFor.3.title", descKey: "whoItsFor.3.desc", icon: Globe },
  ];

  return (
    <section className="py-24 px-6 bg-[#edfaf5]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">{t('whoItsFor.title')}</h2>
        <p className="text-text-muted mb-16">{t('whoItsFor.subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {segments.map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-center space-y-6">
              <div className="w-16 h-16 mx-auto hero-gradient rounded-2xl flex items-center justify-center text-white">
                <s.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-forest">{t(s.titleKey)}</h3>
              <p className="text-text-muted leading-relaxed">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
