"use client";

import React from "react";
import { Plus, Trash2, Briefcase, Calendar, Building2 } from "lucide-react";

export default function ExperienceSection({ experience, setExperience }) {
  const addExperience = () => {
    setExperience([
      ...experience,
      { role: "", company: "", duration: "", description: "" }
    ]);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...experience];
    newExp[index][field] = value;
    setExperience(newExp);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-[#0f9e76]" />
          <h4 className="text-sm font-black text-[#0d4f3c] uppercase tracking-wider">Work Experience</h4>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 text-xs font-black text-[#0f9e76] hover:text-[#0d4f3c] transition-colors uppercase tracking-widest"
        >
          <Plus size={14} /> Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 relative group">
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Role / Position</label>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(index, "role", e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm font-bold text-[#0d4f3c] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f9e76]/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Company</label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm font-bold text-[#0d4f3c] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f9e76]/10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Duration</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, "duration", e.target.value)}
                    placeholder="e.g. June 2021 - Present"
                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm font-bold text-[#0d4f3c] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f9e76]/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your key achievements and responsibilities..."
                  rows={3}
                  className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#0d4f3c] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f9e76]/10 resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-10 bg-slate-50 border-2 border-dashed border-slate-100 rounded-[28px]">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">No experience listed yet</p>
            <p className="text-[10px] text-slate-300 uppercase tracking-widest">Add your previous roles manually or use AI to extract from resume</p>
          </div>
        )}
      </div>
    </div>
  );
}
