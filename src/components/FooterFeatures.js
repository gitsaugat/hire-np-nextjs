import React from 'react';
import { Search, Brain, MessageSquare, CheckCircle2, Zap, X, Check, Target } from 'lucide-react';

export function Features() {
  const groups = [
    {
      title: "AI Matching & Ranking",
      items: ["Skill-based job matching", "Automated applicant ranking", "JD vs Resume analysis"],
      icon: Target
    },
    {
      title: "AI Screening & Ranking",
      items: ["Deep profile analytics", "Automated shortlisting", "Bias-free evaluation"],
      icon: Brain
    },
    {
      title: "AI Communication",
      items: ["Automated applicant updates", "Interview scheduling", "Conflict handling"],
      icon: MessageSquare
    },
    {
      title: "Offer & Onboarding",
      items: ["Offer letter generation", "Onboarding automation", "Direct hiring control"],
      icon: CheckCircle2
    }
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Capabilities</h2>
        <p className="text-3xl md:text-4xl font-bold text-text">Intelligent hiring automation.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groups.map((group, i) => (
          <div key={i} className="bg-background border border-background-soft p-10 rounded-3xl shadow-sm hover:shadow-glow transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <group.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-text">{group.title}</h3>
            </div>
            <ul className="space-y-4">
              {group.items.map((item, j) => (
                <li key={j} className="flex items-center gap-3 text-text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Differentiation() {
  const comparisons = [
    { label: "Operation", old: "Traditional Job Boards", new: "AI Operating System" },
    { label: "Filtering", old: "Manual Resume Sifting", new: "AI Ranking & Matching" },
    { label: "Coordination", old: "Manual HR Headaches", new: "Automated Workflows" },
    { label: "Process", old: "Fragmented Searching", new: "Direct Unified Hiring" }
  ];

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="bg-text text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 md:p-12 text-center border-b border-white/10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold">More than a Job Board.</h2>
          <p className="text-white/40">Not just manual filtering—we use AI to automate the entire process after they apply.</p>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="px-8 py-6 font-bold uppercase text-xs tracking-widest text-white/40">The Change</th>
                <th className="px-8 py-6 font-bold uppercase text-xs tracking-widest text-white/40">Old Way</th>
                <th className="px-8 py-6 font-bold uppercase text-xs tracking-widest text-primary">HireNP Way</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisons.map((c, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6 font-medium text-white/80">{c.label}</td>
                  <td className="px-8 py-6 text-white/40 flex items-center gap-2 italic"><X className="w-4 h-4" /> {c.old}</td>
                  <td className="px-8 py-6 text-primary font-bold flex items-center gap-2"><Check className="w-4 h-4" /> {c.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section id="waitlist" className="py-24 px-6 text-center max-w-4xl mx-auto space-y-10">
      <div className="bg-primary/5 p-12 md:p-20 rounded-3xl border-2 border-primary/10 space-y-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-text">Stop Sifting. <br /> <span className="text-primary italic">Start Hiring.</span></h2>
          <p className="text-lg md:text-xl text-text-muted">We help you hire from candidates—automatically, intelligently, and end-to-end.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-200 shadow-sm hover:shadow-glow active:scale-[0.98]">
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-background-soft mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="text-2xl font-bold text-text">Hire<span className="text-primary">NP</span></div>
            <p className="text-text-muted max-w-sm">
              AI-powered hiring OS built for modern teams. We automate the entire hiring workflow after candidates apply.
            </p>
          </div>
          <div className="space-y-4 text-sm font-medium">
            <div className="text-text uppercase tracking-widest text-xs font-bold">Product</div>
            <ul className="space-y-2 text-text-muted">
              <li><a href="#features" className="hover:text-primary transition-colors">Matching</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Automation</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div className="space-y-4 text-sm font-medium">
            <div className="text-text uppercase tracking-widest text-xs font-bold">Connect</div>
            <ul className="space-y-2 text-text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-background-soft flex justify-between items-center text-sm text-text-muted">
          <div>© 2026 HireNP. Hiring made intelligent.</div>
          <div className="flex items-center gap-4">
             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-tight">AI Hiring OS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
