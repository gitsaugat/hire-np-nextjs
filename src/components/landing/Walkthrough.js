import React from "react";
import { Check } from "lucide-react";

export default function Walkthrough() {
  const steps = [
    "AI scores their resume instantly",
    "Assessment sent automatically",
    "Top candidates surface in your queue",
    "You review, click Send Invite",
    "Candidate picks a slot themselves",
    "AI joins the interview, takes notes",
    "You get a full summary before deciding"
  ];

  return (
    <section className="py-32 px-6 lg:px-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-slate-400 font-bold uppercase tracking-widest text-sm mb-20">
          See it in action
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              From application to interview in under 24 hours.
            </h3>
            <p className="text-xl text-slate-500 font-medium mb-10">
              Here's what happens when a candidate applies to one of your open roles:
            </p>

            <ul className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-green-50 rounded-full p-1">
                    <Check size={16} className="text-[#22c55e] font-bold" />
                  </div>
                  <span className="text-lg font-medium text-slate-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: UI Mockup */}
          <div className="relative">
            {/* Background decor */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-3xl -mx-6 md:mx-0 transform translate-x-4 translate-y-4 z-0"></div>
            
            <div className="relative z-10 bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_32px_rgba(34,197,94,0.15)] overflow-hidden">
              <div className="bg-slate-900/80 backdrop-blur-md px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                <div className="ml-4 text-xs font-mono text-slate-400">hirenp.com/candidates/sarah-k</div>
              </div>
              <div className="p-6 bg-transparent">
                <div className="bg-white/50 border border-white/60 rounded-xl p-6 shadow-sm mb-4">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#22c55e]/10 text-[#22c55e] rounded-full flex items-center justify-center font-bold text-xl">SK</div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">Sarah Jenkins</h4>
                        <p className="text-slate-500 font-medium">Applied 2 hours ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-[#22c55e]">94</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">AI Match Score</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/40 rounded-lg p-4 mb-6 border border-white/50 shadow-sm">
                    <h5 className="font-bold text-slate-900 mb-2">Why this score?</h5>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Matches 5/5 mandatory requirements. Previous experience at a Series B startup scaling from 50 to 200 employees. Strong communication skills detected in cover letter phrasing.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#22c55e] text-white font-bold py-3 rounded-lg hover:bg-[#16a34a] transition-colors">
                      Send Invite
                    </button>
                    <button className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 rounded-lg hover:bg-slate-50 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
