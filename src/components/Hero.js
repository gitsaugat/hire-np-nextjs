import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] -z-10 rounded-full" />
      
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text leading-[1.1]">
          End-to-End Hiring. <br />
          <span className="text-primary">Run by AI.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl mx-auto">
          We help you hire from applicants—automatically, intelligently, and end-to-end. Candidates apply through HireNP, and AI ranks and matches them based on skills, experience, and job fit.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-sm hover:shadow-glow active:scale-[0.98]">
            Join Waitlist
          </button>
          <button className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200">
            Request Demo
          </button>
        </div>
        
        <p className="text-sm text-text-muted italic">
          "No recruiters. No agencies. No manual work."
        </p>

        {/* Product Mockup Container */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-background-soft bg-background-soft p-4 shadow-sm overflow-hidden">
          <div className="aspect-video bg-background rounded-xl overflow-hidden border border-background-soft">
            <img 
              src="/images/dashboard-mockup.png" 
              alt="HireNP AI Hiring OS Dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
