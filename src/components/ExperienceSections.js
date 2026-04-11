import React from 'react';
import { Search, Filter, Calendar, MessageSquare, FileText, CheckCircle2, UserCircle, LayoutDashboard, Sparkles } from 'lucide-react';

export function Solution() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto bg-background-soft rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm">The Solution</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-text leading-tight">
            One AI System. <br />
            <span className="text-primary">Fully Automated.</span>
          </h3>
          <p className="text-lg text-text-muted leading-relaxed">
            HireNP replaces manual screening and coordination with a single AI operating system. Candidates apply through our platform, and we handle the intelligence from there.
          </p>
          <ul className="space-y-4 pt-4">
            {[
              "Intelligent applicant matching & ranking",
              "Automated resume analysis & shortlisting",
              "Hands-free scheduling & coordination",
              "AI-assisted evaluation after application"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-text font-medium text-base">
                <div className="bg-primary rounded-full p-1"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10" />
          <div className="bg-background p-8 rounded-2xl shadow-glow border border-primary/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-text">Company Portal</div>
                <div className="text-sm text-text-muted">AI-powered hiring automation</div>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { label: "Applicant Matching", val: "94%", w: "w-full" },
                { label: "Screening Accuracy", val: "High", w: "w-[95%]" },
                { label: "Time-to-Hire Savings", val: "80%", w: "w-[80%]" }
              ].map((row, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-text-muted">{row.label}</span>
                    <span className="text-primary">{row.val}</span>
                  </div>
                  <div className="h-2 bg-background-soft rounded-full overflow-hidden">
                    <div className={row.w + " h-full bg-primary transition-all duration-1000"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { title: "Candidate Applies", desc: "Top talent applies to jobs directly through the HireNP platform.", icon: UserCircle },
    { title: "AI Ranking", desc: "AI analyzes resumes and rankings the best candidates for the role.", icon: Filter },
    { title: "Smart Shortlisting", desc: "System automatically shortlists candidates based on skills and fit.", icon: Sparkles },
    { title: "AI Coordination", desc: "AI handles all interview scheduling and automated communication.", icon: Calendar },
    { title: "Smart Hiring", desc: "AI assists evaluation and generates offers and onboarding flows.", icon: FileText }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">How it works.</h2>
      <p className="text-text-muted mb-16 max-w-2xl mx-auto">We help you hire from candidates—automatically, intelligently, and end-to-end.</p>
      
      <div className="relative">
        <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-background-soft -z-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="mb-6 w-24 h-24 mx-auto bg-background border-4 border-background-soft rounded-full flex items-center justify-center text-primary shadow-sm group-hover:border-primary/20 transition-all duration-300 bg-white z-10">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{step.title}</h3>
              <p className="text-sm text-text-muted px-4 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CandidateExperience() {
  const benefits = [
    { title: "Ranked Jobs", desc: "See clearly which jobs match your profile and skills best." },
    { title: "AI Optimization", desc: "AI helps you highlight relevant skills and optimize your profile." },
    { title: "Better Visibility", desc: "Get in front of relevant companies without manual searching." },
    { title: "No Paperwork", desc: "Relevant jobs come to you; apply seamlessly in one click." }
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto border-t border-background-soft">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="bg-background-soft p-10 rounded-3xl border border-background-soft">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <UserCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-text">Candidate Portal</div>
                <div className="text-sm text-text-muted">AI-powered job matching</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-background rounded-2xl shadow-sm border border-background-soft">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-text">Software Engineer</div>
                  <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">98% Match</div>
                </div>
                <div className="text-sm text-text-muted italic">Recommended based on your Node.js & React experience.</div>
              </div>
              <div className="p-6 bg-background/50 rounded-2xl border border-background-soft opacity-60">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-text underline decoration-background-soft">Product Designer</div>
                  <div className="bg-background-soft text-text-muted text-xs font-bold px-2 py-1 rounded">65% Match</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm">For Candidates</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-text leading-tight">Jobs that matter, <br />handled by AI.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
             {benefits.map((b, i) => (
               <div key={i} className="space-y-2">
                 <h4 className="font-bold text-text">{b.title}</h4>
                 <p className="text-sm text-text-muted leading-relaxed">{b.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductExperience() {
  const modules = [
    { icon: LayoutDashboard, title: "Company Portal", desc: "Complete hiring automation layer for your applicants." },
    { icon: UserCircle, title: "Candidate Portal", desc: "Intelligent job matching with zero manual search." },
    { icon: MessageSquare, title: "AI Coordination", desc: "Automated communication and evaluation after apply." },
    { icon: FileText, title: "Offer Automation", desc: "Instant offer generation and digital onboarding." }
  ];

  return (
    <section className="py-24 px-6 bg-text text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Portals</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Dual-Portal Intelligent System.</h3>
          <p className="text-white/60">Matching candidates to roles with zero friction through AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {modules.map((module, i) => (
            <div key={i} className="space-y-4 p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <module.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{module.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{module.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
