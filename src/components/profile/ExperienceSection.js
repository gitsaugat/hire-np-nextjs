"use client";

import React from "react";
import { Plus, Trash2, Briefcase } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work Experience</h4>
        <button
          type="button"
          onClick={addExperience}
          className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1 hover:underline"
        >
          <Plus size={12} /> Add Experience
        </button>
      </div>

      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100 relative group transition-all">
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Position</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateExperience(index, "role", e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="e.g. Tech Corp"
                  className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateExperience(index, "duration", e.target.value)}
                placeholder="e.g. 2021 — Present"
                className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, "description", e.target.value)}
                placeholder="What did you achieve?"
                rows={2}
                className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 resize-none"
              />
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No experience added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
