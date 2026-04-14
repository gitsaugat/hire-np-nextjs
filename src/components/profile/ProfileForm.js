"use client";

import React, { useState, useEffect } from "react";
import { User, MapPin, AlignLeft, BarChart, HardHat, DollarSign, Globe, Briefcase, Save, Loader2, Sparkles, Building2 } from "lucide-react";
import SkillTags from "./SkillTags";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";

export default function ProfileForm({ profile: initialProfile, onSave, isSaving }) {
  const [formData, setFormData] = useState(initialProfile);

  useEffect(() => {
    setFormData(initialProfile);
  }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeepChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleUpdateList = (field, newList) => {
    setFormData((prev) => ({ ...prev, [field]: newList }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      {/* Basic Info Section */}
      <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-black text-[#0d4f3c] tracking-tight mb-8">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                type="text" name="full_name" value={formData?.full_name || ""} onChange={handleChange}
                placeholder="e.g. Alex Thompson"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-[#0d4f3c] focus:outline-none focus:ring-4 focus:ring-[#0f9e76]/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                type="text" name="location" value={formData?.location || ""} onChange={handleChange}
                placeholder="e.g. Kathmandu, Nepal"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-[#0d4f3c] focus:outline-none focus:ring-4 focus:ring-[#0f9e76]/5 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5 mb-8">
          <div className="flex items-center justify-between pl-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Bio</label>
            <button type="button" className="text-[10px] font-black tracking-wider text-[#0f9e76] uppercase hover:underline flex items-center gap-1 group">
              <Sparkles size={10} className="group-hover:rotate-12 transition-transform" /> Enhance with AI
            </button>
          </div>
          <div className="relative">
            <AlignLeft size={16} className="absolute left-4 top-4 text-slate-300" />
            <textarea 
              name="bio" value={formData?.bio || ""} onChange={handleChange}
              placeholder="Tell your professional story..."
              rows={4}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-[#0d4f3c] focus:outline-none focus:ring-4 focus:ring-[#0f9e76]/5 transition-all resize-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Experience Level</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "junior", label: "Junior" },
              { id: "mid", label: "Intermediate" },
              { id: "senior", label: "Senior" }
            ].map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => handleChange({ target: { name: "experience_level", value: level.id } })}
                className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                  formData?.experience_level === level.id 
                    ? "bg-[#0d4f3c] text-white border-[#0d4f3c] shadow-lg shadow-teal/20" 
                    : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-black text-[#0d4f3c] tracking-tight mb-8">Skills & Expertise</h3>
        <SkillTags 
          skills={formData?.skills || []} 
          setSkills={(newList) => handleUpdateList("skills", newList)} 
        />
      </section>

      {/* Work Experience */}
      <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-black text-[#0d4f3c] tracking-tight mb-8">Work History</h3>
        <ExperienceSection 
          experience={formData?.experience || []} 
          setExperience={(newList) => handleUpdateList("experience", newList)} 
        />
      </section>

      {/* Education */}
      <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-black text-[#0d4f3c] tracking-tight mb-8">Education</h3>
        <EducationSection 
          education={formData?.education || []} 
          setEducation={(newList) => handleUpdateList("education", newList)} 
        />
      </section>

      {/* Job Preferences */}
      <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-black text-[#0d4f3c] tracking-tight mb-8">Job Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Salary Expectation (Monthly)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" name="salary_expectation" value={formData?.salary_expectation || ""} onChange={handleChange}
                  placeholder="e.g. $2000 - $3500"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-[#0d4f3c] focus:outline-none focus:ring-4 focus:ring-[#0f9e76]/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Location Type</label>
              <div className="flex gap-2">
                {["Remote", "Onsite", "Hybrid"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleDeepChange("job_preferences", "location_type", type)}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                      formData?.job_preferences?.location_type === type 
                        ? "bg-[#0f9e76]/10 text-[#0f9e76] border-[#0f9e76]" 
                        : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Employment Type</label>
              <div className="flex gap-2">
                {["Full-time", "Contract", "Freelance"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleDeepChange("job_preferences", "job_type", type)}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                      formData?.job_preferences?.job_type === type 
                        ? "bg-[#0f9e76]/10 text-[#0f9e76] border-[#0f9e76]" 
                        : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4">
        <button
          type="submit"
          disabled={isSaving}
          className="w-full h-14 bg-[#0d4f3c] text-white rounded-[20px] font-black uppercase tracking-[2px] text-sm shadow-[0_20px_40px_-12px_rgba(13,79,60,0.4)] hover:bg-[#0f9e76] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          )}
          {isSaving ? "Saving Progress..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
