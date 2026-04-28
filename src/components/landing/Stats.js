import React from "react";

export default function Stats() {
  const stats = [
    { value: "11 days", label: "Average time-to-hire" },
    { value: "84%", label: "Reduction in resume review time" },
    { value: "3 clicks", label: "To send an interview invite" },
    { value: "100%", label: "Of interviews scheduled without HR touching a calendar" }
  ];

  return (
    <section className="py-24 bg-[#0d4f3c]/80 backdrop-blur-xl border-y border-white/10 px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-slate-400 font-bold uppercase tracking-widest text-sm mb-16">
          The numbers don't lie
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 text-center divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-[#22c55e] mb-4">
                {stat.value}
              </div>
              <div className="text-slate-300 font-medium text-sm md:text-base max-w-[200px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
