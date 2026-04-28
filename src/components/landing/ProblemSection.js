import React from "react";
import { FileText, Calendar, HelpCircle } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="py-24 bg-transparent px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-16 tracking-tight">
          The way hiring works right now is embarrassing
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 text-slate-900">
            <FileText size={32} className="text-[#22c55e] mb-6" />
            <h3 className="text-2xl font-bold mb-4 leading-tight">
              You read 200 resumes to find 10 worth talking to.
            </h3>
            <p className="text-slate-600 font-medium text-lg">
              That's 190 wasted hours.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 text-slate-900">
            <Calendar size={32} className="text-[#22c55e] mb-6" />
            <h3 className="text-2xl font-bold mb-4 leading-tight">
              Scheduling takes forever.
            </h3>
            <p className="text-slate-600 font-medium text-lg">
              Emails. Back and forth. Missed candidates. Ghosting.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 text-slate-900">
            <HelpCircle size={32} className="text-[#22c55e] mb-6" />
            <h3 className="text-2xl font-bold mb-4 leading-tight">
              You still make gut decisions.
            </h3>
            <p className="text-slate-600 font-medium text-lg">
              No real signal on who to hire. Just vibes and hope.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-[#22c55e]">
            There's a better way.
          </p>
        </div>
      </div>
    </section>
  );
}
