"use client";

import React from 'react';
import { Filter, Calendar, MessageSquare, Bell, FileText, PenTool } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function FeaturesGrid() {
  const { t } = useLanguage();

  const features = [
    { titleKey: "features.1.title", descKey: "features.1.desc", icon: Filter },
    { titleKey: "features.2.title", descKey: "features.2.desc", icon: Calendar },
    { titleKey: "features.3.title", descKey: "features.3.desc", icon: MessageSquare },
    { titleKey: "features.4.title", descKey: "features.4.desc", icon: Bell },
    { titleKey: "features.5.title", descKey: "features.5.desc", icon: FileText },
    { titleKey: "features.6.title", descKey: "features.6.desc", icon: PenTool },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-forest">{t('features.title')}</h2>
          <p className="text-text-muted">{t('features.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white border border-aqua-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group border-l-4 border-l-teal">
              <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-forest mb-3">{t(f.titleKey)}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
