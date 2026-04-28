import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          You're spending weeks on candidates who were never going to make it.
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
          HireNP cuts your time-to-hire by automating everything before the interview. HR only meets candidates worth meeting.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="https://app.hire-np.com/auth/login" 
            className="px-8 py-4 bg-[#22c55e] text-white text-lg font-bold rounded-full hover:bg-[#16a34a] transition-all w-full sm:w-auto"
          >
            Get Early Access
          </Link>
          <Link 
            href="#how-it-works" 
            className="px-8 py-4 bg-transparent text-slate-900 border-2 border-slate-200 text-lg font-bold rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all w-full sm:w-auto"
          >
            See how it works →
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mb-20">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Trusted by HR teams hiring 50–500 people a year
          </p>
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <div className="flex text-[#22c55e]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span>"We went from 6 weeks to 11 days per hire."</span>
          </div>
        </div>
      </div>

      {/* Product UI Mockup */}
      <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(34,197,94,0.15)] bg-white/60 backdrop-blur-xl overflow-hidden text-left">
        <div className="border-b border-white/40 bg-white/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="text-sm font-medium text-slate-400">HireNP / Senior Frontend Engineer Queue</div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Top Candidates</h3>
              <p className="text-slate-500">241 applications • 8 shortlisted by AI</p>
            </div>
          </div>
          
          {/* Mock Candidate Row 1 */}
          <div className="p-6 border border-white/50 rounded-xl mb-4 bg-white/40 flex flex-col md:flex-row justify-between gap-6 hover:border-[#22c55e]/50 transition-colors">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg">AJ</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Alex Johnson</h4>
                <p className="text-sm text-slate-500 mb-2">Lead Developer @ TechCorp • 8 YOE</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-green-50 text-[#16a34a] text-xs font-bold rounded">React Expert</span>
                  <span className="px-2 py-1 bg-green-50 text-[#16a34a] text-xs font-bold rounded">System Design</span>
                </div>
              </div>
            </div>
            <div className="bg-white/30 p-4 rounded-lg flex-1 border border-white/40 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Reasoning</span>
                <span className="text-sm font-bold text-[#22c55e]">98/100 Fit</span>
              </div>
              <p className="text-sm text-slate-600 font-medium">Exceptional match. Has built identical micro-frontends at scale. Strong leadership signals in recent roles.</p>
            </div>
            <div className="flex items-center justify-center">
              <button className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 w-full md:w-auto">
                Invite to Interview
              </button>
            </div>
          </div>

          {/* Mock Candidate Row 2 */}
          <div className="p-6 border border-white/50 rounded-xl bg-white/40 flex flex-col md:flex-row justify-between gap-6 opacity-75">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg">MK</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Maria K.</h4>
                <p className="text-sm text-slate-500 mb-2">Senior Frontend @ StartupX • 5 YOE</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">Vue.js</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">Tailwind</span>
                </div>
              </div>
            </div>
            <div className="bg-white/30 p-4 rounded-lg flex-1 border border-white/40 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Reasoning</span>
                <span className="text-sm font-bold text-amber-500">82/100 Fit</span>
              </div>
              <p className="text-sm text-slate-600 font-medium">Strong product sense, but primary experience is Vue. Will need ramp-up time for our React stack.</p>
            </div>
            <div className="flex items-center justify-center">
              <button className="px-6 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 w-full md:w-auto">
                Review Details
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
