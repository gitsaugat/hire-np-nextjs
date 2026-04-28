import React from "react";
import { Zap, Calendar, Brain, Mic, Lock, CheckCircle2 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap size={24} className="text-[#22c55e]" />,
      title: "Instant AI Screening",
      desc: "Every application scored and ranked the moment it arrives. No waiting. No pile."
    },
    {
      icon: <Calendar size={24} className="text-[#22c55e]" />,
      title: "Set Availability Once",
      desc: "Type your schedule in plain English. Candidates book themselves. You never touch a calendar."
    },
    {
      icon: <Brain size={24} className="text-[#22c55e]" />,
      title: "AI Reasoning You Can Trust",
      desc: "Don't just get a score. See exactly why the AI ranked each candidate — strengths, flags, fit."
    },
    {
      icon: <Mic size={24} className="text-[#22c55e]" />,
      title: "Interview Notetaker",
      desc: "AI joins every Google Meet. Full transcript, competency scores, and summary ready in minutes."
    },
    {
      icon: <Lock size={24} className="text-[#22c55e]" />,
      title: "Smart Slot Locking",
      desc: "Multiple candidates. Zero double bookings. First to confirm wins. Automatic."
    },
    {
      icon: <CheckCircle2 size={24} className="text-[#22c55e]" />,
      title: "One Decision Per Candidate",
      desc: "Review. Invite. Hire. HR makes exactly three decisions. Everything else is handled."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-20 tracking-tight">
          Everything you hate about hiring.<br className="hidden md:block"/> Automated.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:border-white/80 hover:bg-white/80 transition-all">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
