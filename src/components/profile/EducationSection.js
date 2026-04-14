"use client";

import React from "react";
import { Plus, Trash2, GraduationCap, Calendar, School } from "lucide-react";

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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap size={18} className="text-[#0f9e76]" />
          <h4 className="text-sm font-black text-[#0d4f3c] uppercase tracking-wider">Education</h4>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 text-xs font-black text-[#0f9e76] hover:text-[#0d4f3c] transition-colors uppercase tracking-widest"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 relative group">
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Degree / Certification</label>
                <div className="relative">
                  <GraduationCap size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="e.g. Bachelor of Computer Science"
                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm font-bold text-[#0d4f3c] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f9e76]/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Year</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                    placeholder="e.g. 2018"
                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm font-bold text-[#0d4f3c] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f9e76]/10"
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-1.5 pt-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Institution</label>
                <div className="relative">
                  <School size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="e.g. Tribhuvan University"
                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm font-bold text-[#0d4f3c] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f9e76]/10"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-100 rounded-[28px] opacity-60">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No education details added</p>
          </div>
        )}
      </div>
    </div>
  );
}
