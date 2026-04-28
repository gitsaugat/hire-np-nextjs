import React from "react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-[#0d4f3c]/90 backdrop-blur-xl border-t border-white/10 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-8">
          Your competitors are already moving faster than you.
        </h2>
        <p className="text-xl md:text-2xl text-slate-300 font-medium mb-12">
          Start hiring in days, not weeks.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link 
            href="https://app.hire-np.com/auth/login" 
            className="px-8 py-4 bg-[#22c55e] text-white text-lg font-bold rounded-full hover:bg-[#16a34a] transition-all w-full sm:w-auto"
          >
            Get Early Access
          </Link>
          <Link 
            href="#book-demo" 
            className="px-8 py-4 bg-transparent text-white border-2 border-slate-700 text-lg font-bold rounded-full hover:border-slate-500 hover:bg-slate-800 transition-all w-full sm:w-auto"
          >
            Book a Demo
          </Link>
        </div>

        <p className="text-sm font-medium text-slate-400">
          No credit card required · Set up in under 10 minutes · Cancel anytime
        </p>
      </div>
    </section>
  );
}
