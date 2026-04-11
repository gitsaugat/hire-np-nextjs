"use client";

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

function PricingCard({ tier, style, featureKeys }) {
  const { t } = useLanguage();
  const label = t(`pricing.${tier}.label`);
  const period = t(`pricing.${tier}.period`);

  const isEnterprise = style === 'enterprise';
  const isFeatured = style === 'featured';
  const isNeutral = style === 'neutral';

  const cardClass = isEnterprise
    ? "bg-[#0a3d2e] text-white"
    : isFeatured
      ? "bg-[#f0fdf8] border-2 border-teal shadow-xl md:scale-[1.03]"
      : isNeutral
        ? "bg-[#f9fafb] border border-gray-200"
        : "bg-white border border-gray-100 shadow-sm hover:shadow-md";

  const priceColor = isEnterprise ? "text-white" : "text-forest";
  const periodColor = isEnterprise ? "text-white/50" : "text-text-muted";
  const labelColor = isEnterprise ? "text-aqua/80" : isFeatured ? "text-teal" : "text-text-muted";
  const featureColor = isEnterprise ? "text-white/70" : "text-text-muted";
  const checkColor = isEnterprise ? "text-aqua" : isNeutral ? "text-gray-400" : "text-teal";

  const btnClass = isEnterprise
    ? "bg-white text-[#0a3d2e] hover:bg-aqua-white"
    : isFeatured
      ? "hero-gradient text-white shadow-md hover:shadow-lg"
      : isNeutral
        ? "bg-white border-2 border-gray-300 text-forest hover:bg-gray-50"
        : "bg-white border-2 border-teal text-teal hover:bg-teal hover:text-white";

  return (
    <div className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${cardClass}`}>
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 hero-gradient text-white text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap">
          {t(`pricing.${tier}.badge`)}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className={`text-sm font-semibold uppercase tracking-wide ${isEnterprise ? 'text-white/60' : 'text-text-muted'} mb-3`}>
          {t(`pricing.${tier}.name`)}
        </h3>
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className={`text-[28px] font-bold ${priceColor} leading-none`}>
            {t(`pricing.${tier}.price`)}
          </span>
          {period && <span className={`text-sm ${periodColor}`}>{period}</span>}
        </div>
        {label && <p className={`text-[11px] ${labelColor} mt-2.5 font-medium`}>{label}</p>}
      </div>

      {/* Divider */}
      <div className={`h-px mb-6 ${isEnterprise ? 'bg-white/10' : 'bg-gray-100'}`} />

      {/* Features */}
      <ul className="space-y-3.5 mb-8 flex-grow">
        {featureKeys.map((fk, j) => (
          <li key={j} className={`flex items-start gap-2.5 text-[13px] leading-snug ${featureColor}`}>
            <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${checkColor}`} strokeWidth={2.5} />
            <span>{t(fk)}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/auth" className={`block w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 text-center ${btnClass}`}>
        {t(`pricing.${tier}.cta`)}
      </Link>
    </div>
  );
}

export default function PricingSection() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-3">{t('pricing.title')}</h2>
          <p className="text-text-muted">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          <PricingCard
            tier="free"
            style="neutral"
            featureKeys={["pricing.free.f1","pricing.free.f2","pricing.free.f3","pricing.free.f4"]}
          />
          <PricingCard
            tier="perjob"
            style="teal"
            featureKeys={["pricing.perjob.f1","pricing.perjob.f2","pricing.perjob.f3","pricing.perjob.f4","pricing.perjob.f5","pricing.perjob.f6"]}
          />
          <PricingCard
            tier="monthly"
            style="featured"
            featureKeys={["pricing.monthly.f1","pricing.monthly.f2","pricing.monthly.f3","pricing.monthly.f4","pricing.monthly.f5","pricing.monthly.f6"]}
          />
          <PricingCard
            tier="enterprise"
            style="enterprise"
            featureKeys={["pricing.enterprise.f1","pricing.enterprise.f2","pricing.enterprise.f3","pricing.enterprise.f4","pricing.enterprise.f5","pricing.enterprise.f6","pricing.enterprise.f7"]}
          />
        </div>

        {/* Math callout */}
        <div className="mt-10 max-w-xl mx-auto bg-[#edfaf5] border-l-4 border-teal rounded-r-xl px-6 py-4">
          <p className="text-sm text-forest/80 italic leading-relaxed">{t('pricing.math')}</p>
        </div>

        {/* Fine print */}
        <div className="mt-8 space-y-0.5 text-center text-[11px] text-text-muted/70">
          <p>{t('pricing.fine1')}</p>
          <p>{t('pricing.fine2')}</p>
          <p>{t('pricing.fine3')}</p>
        </div>

        {/* Branding footnote */}
        <div className="mt-8 max-w-lg mx-auto text-center">
          <p className="text-[11px] text-text-muted/50 leading-relaxed">{t('pricing.branding')}</p>
        </div>
      </div>
    </section>
  );
}
