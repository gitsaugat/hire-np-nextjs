"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export default function Pricing() {
  const [currency, setCurrency] = useState("NPR");

  const plans = [
    {
      name: "Free",
      priceNPR: "Rs. 0",
      priceUSD: "$0",
      limit: "1 open role / 20 candidates",
      features: [
        "AI resume scoring",
        "Basic scheduling",
        "Google Meet integration"
      ],
      button: "Start Free",
      primary: false
    },
    {
      name: "Pay Per Job",
      priceNPR: "Rs. 2,500",
      priceUSD: "$20",
      limit: "1 role / Unlimited candidates",
      features: [
        "Everything in Free",
        "AI job builder",
        "Emma AI (Basic)",
        "Up to 5 offer letters"
      ],
      button: "Get Started",
      primary: false
    },
    {
      name: "Pro",
      priceNPR: "Rs. 8,000",
      priceUSD: "$60",
      period: "/month",
      limit: "Up to 10 open roles",
      badge: "Most Popular",
      features: [
        "Everything in Pay Per Job",
        "Fireflies.ai bot",
        "Digital signing",
        "Email tracking",
        "Unlimited offers"
      ],
      button: "Get Pro",
      primary: true
    },
    {
      name: "Business",
      priceNPR: "Rs. 25,000",
      priceUSD: "$190",
      period: "/month",
      limit: "Unlimited roles",
      features: [
        "Full AI suite unlock",
        "Bias detection",
        "Transcript analysis",
        "White label branding",
        "Priority support"
      ],
      button: "Talk to Sales",
      primary: false
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-8 tracking-tight">
          Pricing that scales with you
        </h2>
        
        {/* Currency Toggle */}
        <div className="flex justify-center mb-20">
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-1 rounded-full flex items-center shadow-sm">
            <button
              onClick={() => setCurrency("NPR")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                currency === "NPR"
                  ? "bg-[#22c55e] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              NPR (Rs.)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                currency === "USD"
                  ? "bg-[#22c55e] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex flex-col h-full border ${
                plan.primary ? "border-[#22c55e] shadow-[0_8px_32px_rgba(34,197,94,0.2)] scale-105 z-10" : "border-white/50 shadow-xl"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#22c55e] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {currency === "NPR" ? plan.priceNPR : plan.priceUSD}
                  </span>
                  {plan.period && <span className="text-sm font-medium text-slate-500">{plan.period}</span>}
                </div>
                <p className="text-slate-500 font-medium text-sm h-10">{plan.limit}</p>
              </div>

              <div className="flex-grow space-y-3 mb-8">
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium text-sm leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-3 text-sm font-bold rounded-xl transition-colors ${
                  plan.primary 
                    ? "bg-[#22c55e] text-white hover:bg-[#16a34a]" 
                    : "bg-slate-100/80 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
