"use client";

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ProblemBar() {
  const { t } = useLanguage();
  const keys = ['problem.1', 'problem.2', 'problem.3'];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {keys.map((key, i) => (
          <div key={i} className="border-l-4 border-teal pl-6 py-4">
            <p className="text-lg font-semibold text-forest">{t(key)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
