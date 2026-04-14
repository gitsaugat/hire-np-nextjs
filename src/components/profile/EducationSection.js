"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function EducationSection({ education, setEducation }) {
  const addEducation = () => {
    setEducation([
      ...education,
      { degree: "", institution: "", year: "" }
    ]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    setEducation(newEdu);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education</h4>
        <button
          type="button"
          onClick={addEducation}
          className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1 hover:underline"
        >
          <Plus size={12} /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="space-y-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100 relative group transition-all">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Degree / Major</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder="e.g. BS in Computer Science"
                  className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="e.g. Tribhuvan University"
                  className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Year of Graduation</label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => updateEducation(index, "year", e.target.value)}
                placeholder="e.g. 2023"
                className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No education history added</p>
          </div>
        )}
      </div>
    </div>
  );
}
