import React from 'react';
import { Users, DollarSign, Target, Zap } from 'lucide-react';

export function Metrics() {
  const stats = [
    { label: "Agency Costs Cut", value: "100%", icon: DollarSign },
    { label: "Matching Precision", value: "98%", icon: Target },
    { label: "Manual Work Reduced", value: "90%", icon: Zap },
  ];

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-background-soft p-8 rounded-2xl shadow-sm space-y-4 border border-background-soft transition-all duration-200 hover:shadow-glow">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-4xl font-bold text-text">{stat.value}</div>
              <div className="text-text-muted font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Problem() {
  const points = [
    {
      title: "Broken Filtering",
      desc: "Traditional job boards inundate you with applicants, leaving you to manually sift through hundreds of irrelevant resumes."
    },
    {
      title: "Manual Coordination",
      desc: "Even after finding a match, the manual work of scheduling, communicating, and basic evaluation takes up 90% of HR time."
    },
    {
      title: "Expensive Guesswork",
      desc: "Without intelligent ranking, hiring decisions often rely on gut feel rather than skill-based data, leading to costly mismatches."
    }
  ];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-primary font-bold tracking-widest uppercase text-sm">The Reality</h2>
        <p className="text-3xl md:text-4xl font-bold text-text">Applicants are everywhere. <br /> Intelligence is missing.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {points.map((point, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-xl font-bold text-text">{point.title}</h3>
            <p className="text-text-muted leading-relaxed">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
