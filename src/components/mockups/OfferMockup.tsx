"use client";
import React, { useEffect, useState } from 'react';
import { Send, User, Briefcase, DollarSign, Calendar, MessageSquare, MapPin, ClipboardList, Sparkles } from 'lucide-react';

const OfferMockup = () => {
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSalary, setTypedSalary] = useState('');
  const [typedDate, setTypedDate] = useState('');
  const [typedType, setTypedType] = useState('');
  const [typedLocation, setTypedLocation] = useState('');
  const [typedResponsibilities, setTypedResponsibilities] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [typedLetter, setTypedLetter] = useState('');
  
  const targetTitle = "Senior Product Designer";
  const targetSalary = "$125,000";
  const targetDate = "June 15, 2026";
  const targetType = "Full-time / Permanent";
  const targetLocation = "Remote (US/Europe)";
  const targetResponsibilities = "Lead Design Systems · Direct B2B Strategy · Mentor Junior Staff";
  const targetMessage = "Your experience with Nexus Pro's core challenges stood out.";
  const targetLetter = "We are thrilled to offer you the role of Senior Product Designer. As a Full-time member of our remote team, you will drive our design system evolution and lead strategic B2B initiatives. Your expertise in scalable architecture and accessibility is exactly what we need for our 2026 roadmap.";

  useEffect(() => {
    let i = 0;
    const animateField = (target, setter, next) => {
      let charIdx = 0;
      const interval = setInterval(() => {
        setter(target.slice(0, charIdx));
        charIdx++;
        if (charIdx > target.length) {
          clearInterval(interval);
          if (next) setTimeout(next, 200);
        }
      }, 30);
    };

    animateField(targetTitle, setTypedTitle, () => {
      animateField(targetSalary, setTypedSalary, () => {
        animateField(targetDate, setTypedDate, () => {
          animateField(targetType, setTypedType, () => {
            animateField(targetLocation, setTypedLocation, () => {
              animateField(targetResponsibilities, setTypedResponsibilities, () => {
                animateField(targetMessage, setTypedMessage, () => {
                  animateField(targetLetter, setTypedLetter, null);
                });
              });
            });
          });
        });
      });
    });
  }, []);

  return (
    <div className="w-full rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,15,30,0.04),0_24px_60px_-24px_rgba(10,15,30,0.18)] overflow-hidden flex flex-col h-[480px]">
      {/* Chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] bg-[#FAFAF7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[10px] font-bold text-ink-400 tracking-tight uppercase">AI Offer Generation · Live Preview</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Form Panel */}
        <div className="w-[42%] border-r border-black/[0.04] p-4 space-y-3 bg-[#FAFAF7]/50">
          <p className="text-[9px] font-bold text-ink-300 uppercase tracking-widest mb-1">Offer Configuration</p>
          
          <div className="space-y-2">
            <FormField icon={<Briefcase size={12} />} label="Position" value={typedTitle} isTyping={typedTitle && !typedSalary} />
            <FormField icon={<DollarSign size={12} />} label="Salary" value={typedSalary} isTyping={typedSalary && !typedDate} />
            <FormField icon={<Calendar size={12} />} label="Start Date" value={typedDate} isTyping={typedDate && !typedType} />
            <FormField icon={<ClipboardList size={12} />} label="Type" value={typedType} isTyping={typedType && !typedLocation} />
            <FormField icon={<MapPin size={12} />} label="Location" value={typedLocation} isTyping={typedLocation && !typedResponsibilities} />
            <FormField icon={<Sparkles size={12} />} label="Responsibilities" value={typedResponsibilities} isTyping={typedResponsibilities && !typedMessage} />
            <FormField icon={<MessageSquare size={12} />} label="Personal Note" value={typedMessage} isTyping={typedMessage && !typedLetter} />
          </div>

          <div className="pt-3">
            <button className="w-full py-2.5 rounded-lg bg-brand-primary text-white text-[10px] font-black uppercase tracking-wider shadow-brand flex items-center justify-center gap-2">
              <Send size={14} />
              Publish & Sign
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 bg-white p-4 relative flex flex-col overflow-hidden">
          <div className="border border-black/[0.08] rounded-md shadow-sm p-5 flex-1 bg-white flex flex-col gap-3 scale-[0.98] origin-top">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-brand-primary flex items-center justify-center text-white font-bold text-[9px]">NP</div>
                <p className="text-[10px] font-black text-ink-900 uppercase">Nexus Pro Offer</p>
              </div>
              <span className="text-[8px] font-black text-brand-primary uppercase px-2 py-1 bg-brand-soft rounded border border-brand-primary/10">Draft Preview</span>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-black text-ink-900 leading-tight">Employment Agreement for Alex Morgan</p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-[8px] font-bold text-ink-300 uppercase mb-1">Role & Personal Message</p>
                  <p className="text-[11px] font-black text-brand-primary mb-1">{typedTitle}</p>
                  <p className="text-[9px] text-ink-400 italic mb-2 leading-relaxed">"{typedMessage}"</p>
                  <p className="text-[9px] text-ink-700 leading-relaxed font-medium">
                    {typedLetter}<span className="inline-block w-0.5 h-3 bg-brand-primary ml-0.5 animate-soft-pulse align-middle" />
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-black/[0.04]">
                  <Detail label="Compensation" value={typedSalary} />
                  <Detail label="Employment Type" value={typedType} />
                  <Detail label="Start Date" value={typedDate} />
                  <Detail label="Location" value={typedLocation} />
                </div>

                <div className="pt-3 border-t border-black/[0.04]">
                  <p className="text-[8px] font-bold text-ink-300 uppercase mb-1.5">Key Responsibilities</p>
                  <p className="text-[10px] font-bold text-ink-700 leading-tight">{typedResponsibilities}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ icon, label, value, isTyping }) => (
  <div className="bg-white border border-black/[0.06] rounded-md p-1.5 flex items-center gap-2">
    <div className="text-brand-primary shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[6px] font-bold text-ink-300 uppercase tracking-tighter leading-none mb-0.5">{label}</p>
      <p className="text-[9px] font-bold text-ink-900 leading-tight truncate">
        {value}{isTyping && <span className="inline-block w-0.5 h-2 bg-brand-primary ml-0.5 animate-soft-pulse" />}
      </p>
    </div>
  </div>
);

const Detail = ({ label, value }) => (
  <div>
    <p className="text-[6px] font-bold text-ink-300 uppercase leading-none mb-0.5">{label}</p>
    <p className="text-[8px] font-bold text-ink-900 leading-tight">{value}</p>
  </div>
);

export default OfferMockup;