import React from "react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-20 tracking-tight">
          HireNP does the work.<br/>You make the call.
        </h2>

        <div className="relative grid md:grid-cols-3 gap-16 md:gap-8">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-slate-200"></div>

          {/* Step 1 */}
          <div className="relative pt-2 md:pt-0">
            <span className="inline-block text-lg font-bold text-[#22c55e] pr-4 mb-4 relative z-10">Step 1</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">
              AI screens every applicant instantly
            </h3>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              No resume pile. AI scores, ranks, and rejects — with reasoning you can see.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative pt-2 md:pt-0">
            <span className="inline-block text-lg font-bold text-[#22c55e] pr-4 mb-4 relative z-10">Step 2</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">
              You review the top 10 with full reasoning
            </h3>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              See exactly why each candidate was shortlisted. Reject or invite in seconds.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative pt-2 md:pt-0">
            <span className="inline-block text-lg font-bold text-[#22c55e] pr-4 mb-4 relative z-10">Step 3</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">
              HR only shows up for the interview
            </h3>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              One click to send the invite. Candidate schedules themselves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
