"use client";

import React from 'react';
import { Send, Brain, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { num: "01", titleKey: "howItWorks.step1.title", descKey: "howItWorks.step1.desc", icon: Send },
    { num: "02", titleKey: "howItWorks.step2.title", descKey: "howItWorks.step2.desc", icon: Brain },
    { num: "03", titleKey: "howItWorks.step3.title", descKey: "howItWorks.step3.desc", icon: CheckCircle2 },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-aqua-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">{t('howItWorks.title')}</h2>
        <p className="text-text-muted mb-16">{t('howItWorks.subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-16 left-[17%] right-[17%] h-0.5 hero-gradient" />
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-32 h-32 rounded-full hero-gradient flex items-center justify-center text-white shadow-lg z-10">
                <step.icon className="w-12 h-12" />
              </div>
              <div className="text-sm font-bold text-teal tracking-widest">{step.num}</div>
              <h3 className="text-xl font-bold text-forest">{t(step.titleKey)}</h3>
              <p className="text-text-muted leading-relaxed">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
