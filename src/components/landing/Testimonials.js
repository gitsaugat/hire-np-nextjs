import React from "react";

export default function Testimonials() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-[#0d4f3c]/80 backdrop-blur-xl border-y border-white/10 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-3xl md:text-4xl font-bold leading-relaxed mb-8">
            "We used to spend the first three weeks of every hire just getting through applications. HireNP cut that to a single afternoon. Our HR team now actually enjoys hiring."
          </p>
          <div className="text-slate-300 font-medium text-lg">
            — Sarah K., Head of People, Series B SaaS company (180 employees)
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 rounded-2xl shadow-lg hover:bg-white/20 transition-colors">
            <p className="text-lg font-bold mb-6">
              "11 days from post to offer. Our previous record was 6 weeks."
            </p>
            <p className="text-emerald-200 font-medium">
              — Operations Director, fintech startup
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 rounded-2xl shadow-lg hover:bg-white/20 transition-colors">
            <p className="text-lg font-bold mb-6">
              "The AI reasoning is what sold us. It's not a black box — we can see exactly why."
            </p>
            <p className="text-emerald-200 font-medium">
              — HR Manager, e-commerce company
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 rounded-2xl shadow-lg hover:bg-white/20 transition-colors">
            <p className="text-lg font-bold mb-6">
              "Candidates love it. The scheduling page is slicker than anything we've built internally."
            </p>
            <p className="text-emerald-200 font-medium">
              — Talent Lead, logistics company
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
