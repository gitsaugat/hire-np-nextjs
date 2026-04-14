"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, Upload, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import SkillTags from "./SkillTags";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { analyzeResume } from "@/lib/resumeAnalyzer";
import { useProfile } from "@/contexts/ProfileContext";

export default function ProfileForm({ profile: initialProfile, onSave, isSaving }) {
  const { parsing: isParsing, setParsing: setIsParsing, showToast } = useProfile();
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

  const handleAIFill = async () => {
    if (!formData?.resume_url) {
      showToast("Please link a resume first", "error");
      return;
    }

    try {
      setIsParsing(true);

      // 1. Fetch file from URL
      const response = await fetch(formData.resume_url);
      const blob = await response.blob();

      // 2. Extract Text
      const text = await extractTextFromPDF(blob);

      // 3. Analyze
      const fileName = formData.resume_url.split('/').pop() || "resume.pdf";
      const AIProfile = analyzeResume(fileName, text);

      // 4. Optimistic Update (keeping current identifier fields)
      setFormData(prev => ({
        ...prev,
        ...AIProfile,
      }));

      showToast("Profile auto-filled successfully!");
    } catch (error) {
      console.error("AI Fill error:", error);
      showToast("Failed to parse resume. Try manually uploading or refreshing.", "error");
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 1. Basic Information */}
      <div className="space-y-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Basic Information</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData?.full_name || ""}
              onChange={handleChange}
              placeholder="e.g. Alex Thompson"
              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData?.location || ""}
              onChange={handleChange}
              placeholder="e.g. Kathmandu, Nepal"
              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Professional Bio</label>
          <textarea
            name="bio"
            value={formData?.bio || ""}
            onChange={handleChange}
            placeholder="Introduce yourself..."
            rows={4}
            className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Experience Level</label>
          <div className="flex gap-2">
            {["junior", "mid", "senior"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleChange({ target: { name: "experience_level", value: level } })}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${formData?.experience_level === level
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* 2. Skills */}
      <div className="space-y-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills & Expertise</h4>
        <SkillTags
          skills={formData?.skills || []}
          setSkills={(newList) => handleUpdateList("skills", newList)}
        />
      </div>

      <div className="h-px bg-slate-100" />

      {/* 3. Work & Education */}
      <div className="grid grid-cols-1 gap-10">
        <ExperienceSection
          experience={formData?.experience || []}
          setExperience={(newList) => handleUpdateList("experience", newList)}
        />

        <div className="h-px bg-slate-100" />

        <EducationSection
          education={formData?.education || []}
          setEducation={(newList) => handleUpdateList("education", newList)}
        />
      </div>

      <div className="h-px bg-slate-100" />

      {/* 4. Active Resume */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Resume</h4>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${formData?.resume_url ? "bg-emerald-50 text-emerald-600" : "bg-white text-slate-400 border border-slate-100"}`}>
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold text-slate-700 block truncate">
                {formData?.resume_url ? "Primary Resume linked" : "No resume uploaded"}
              </span>
              <Link
                href="/profile/resumes"
                className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Manage Resumes
              </Link>
            </div>
          </div>

          {formData?.resume_url && (
            <button
              type="button"
              disabled={isParsing}
              onClick={handleAIFill}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 shadow-sm rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isParsing ? <Loader2 className="animate-spin" size={14} /> : <Sparkles className="text-emerald-500" size={14} />}
              {isParsing ? "Analyzing..." : "Fill with AI"}
            </button>
          )}
        </div>
      </div>

      {/* 5. Save Button */}
      <div className="pt-8 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
