"use client";
import React, { useEffect, useState } from 'react';
import { Sparkles, MapPin, Briefcase, DollarSign, Users, FileText, Check } from 'lucide-react';

const AIJobArchitectMockup = () => {
  const [typed, setTyped] = useState('');
  const [filled, setFilled] = useState(false);
  const prompt = 'Senior Product Designer for a fast-growing SaaS startup. Remote. Global team.';

  useEffect(() => {
    setTyped('');
    setFilled(false);
    let i = 0;
    const typing = setInterval(() => {
      i++;
      setTyped(prompt.slice(0, i));
      if (i >= prompt.length) {
        clearInterval(typing);
        setTimeout(() => setFilled(true), 400);
      }
    }, 28);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-semibold text-ink-400 tracking-tight">Post a new role</span>
        <span className="w-12" />
      </div>

      {/* AI ARCHITECT — top */}
      <div className="px-4 pt-4">
        <div className="relative rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-3 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle,rgba(0,182,122,0.18),transparent_70%)] pointer-events-none" />
          <div className="flex items-center justify-between mb-2 relative">
            <div className="inline-flex items-center gap-1.5 text-[9px] font-bold text-brand-primary tracking-[0.16em] uppercase">
              <Sparkles size={10} /> AI Job Architect
            </div>
            <span className="text-[9px] font-semibold text-ink-400">⌘K</span>
          </div>
          <div className="relative bg-white border border-black/[0.06] rounded-lg px-2.5 py-2 min-h-[44px] flex items-start">
            <p className="text-[11px] text-ink-700 leading-relaxed font-medium pr-16">
              {typed}<span className="inline-block w-[2px] h-3 bg-brand-primary ml-0.5 animate-soft-pulse align-middle" />
            </p>
            <button className="absolute top-1.5 right-1.5 px-2 py-1 rounded-md bg-brand-primary text-white text-[9px] font-bold tracking-tight inline-flex items-center gap-1 shadow-brand">
              <Sparkles size={9} /> Build
            </button>
          </div>
          {filled && (
            <p className="mt-1.5 text-[9px] font-semibold text-brand-primary flex items-center gap-1 animate-fadeInUp">
              <Check size={10} strokeWidth={3} /> Fields auto-filled below
            </p>
          )}
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="px-4 py-3.5 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <Field label="Job title" icon={<Briefcase size={10} />} value="Senior Product Designer" filled={filled} />
          <Field label="Department" icon={<Users size={10} />} value="Design" filled={filled} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Location" icon={<MapPin size={10} />} value="Remote · Global" filled={filled} />
          <Field label="Employment" icon={<Briefcase size={10} />} value="Full-time" filled={filled} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Experience" icon={<Users size={10} />} value="5-7 years" filled={filled} />
          <Field label="Salary range" icon={<DollarSign size={10} />} value="$120k – $160k" filled={filled} />
        </div>

        {/* Required skills */}
        <div>
          <p className="text-[9px] font-bold text-ink-400 uppercase tracking-[0.14em] mb-1">Required skills</p>
          <div className="flex flex-wrap gap-1">
            {['Figma', 'Design Systems', 'User Research', 'Prototyping', '+ 3 more'].map((s, i) => (
              <span
                key={s}
                className={`px-1.5 py-0.5 rounded-md text-[9px] font-semibold transition-all ${
                  filled
                    ? i === 4
                      ? 'bg-white border border-black/[0.08] text-ink-400'
                      : 'bg-emerald-50 border border-emerald-100 text-brand-primary'
                    : 'bg-ink-50 border border-black/[0.04] text-ink-300'
                }`}
                style={{ animation: filled ? `fadeInUp 0.35s ease-out ${i * 50}ms both` : 'none' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Description preview */}
        <div className="rounded-lg border border-black/[0.06] bg-[#FAFAF7] px-2.5 py-2">
          <p className="text-[9px] font-bold text-ink-400 uppercase tracking-[0.14em] mb-1 flex items-center gap-1">
            <FileText size={9} /> Description preview
          </p>
          <div className="space-y-1">
            <div className={`h-1.5 rounded-full ${filled ? 'bg-ink-200' : 'bg-ink-100'} w-full transition-colors duration-500`} />
            <div className={`h-1.5 rounded-full ${filled ? 'bg-ink-200' : 'bg-ink-100'} w-[88%] transition-colors duration-500`} />
            <div className={`h-1.5 rounded-full ${filled ? 'bg-ink-200' : 'bg-ink-100'} w-[72%] transition-colors duration-500`} />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[9px] font-semibold text-ink-400 flex items-center gap-1">
            <span className={`w-1 h-1 rounded-full ${filled ? 'bg-brand-primary animate-soft-pulse' : 'bg-ink-200'}`} />
            {filled ? 'Ready to publish' : 'Waiting for input'}
          </span>
          <div className="flex items-center gap-1.5">
            <button className="px-2 py-1 rounded-md text-[9px] font-semibold text-ink-500 border border-black/[0.08]">Save draft</button>
            <button className={`px-2 py-1 rounded-md text-[9px] font-bold text-white inline-flex items-center gap-1 ${filled ? 'bg-brand-primary shadow-brand' : 'bg-ink-200'}`}>
              Publish role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, icon, value, filled }: { label: string; icon: React.ReactNode; value: string; filled: boolean }) => (
  <div>
    <p className="text-[9px] font-bold text-ink-400 uppercase tracking-[0.14em] mb-1 flex items-center gap-1">
      <span className="text-ink-300">{icon}</span> {label}
    </p>
    <div className={`relative rounded-md border px-2 py-1.5 transition-all duration-300 ${
      filled ? 'border-black/[0.08] bg-white' : 'border-black/[0.04] bg-ink-50'
    }`}>
      <p className={`text-[11px] font-semibold tracking-tight transition-colors duration-300 ${
        filled ? 'text-ink-900' : 'text-ink-300'
      }`}>
        {filled ? value : <span className="inline-block h-2.5 w-16 rounded bg-ink-100" />}
      </p>
      {filled && (
        <span className="absolute top-1 right-1.5 inline-flex items-center justify-center w-3 h-3 rounded-full bg-brand-primary text-white">
          <Check size={7} strokeWidth={3.5} />
        </span>
      )}
    </div>
  </div>
);

export default AIJobArchitectMockup;
