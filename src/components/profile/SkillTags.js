"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";

export default function SkillTags({ skills, setSkills }) {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (e) => {
    e.preventDefault();
    if (inputValue && !skills.includes(inputValue)) {
      setSkills([...skills, inputValue]);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 min-h-[48px] p-2 bg-gray-50/50 rounded-xl">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-slate-700 transition-colors animate-in fade-in zoom-in-95 duration-200"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-slate-400 font-medium px-2 py-1">No skills added yet...</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill(e);
            }
          }}
          placeholder="Add a skill..."
          className="flex-1 bg-gray-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0f9e76]/10 transition-all font-medium"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2.5 bg-[#0d4f3c] text-white rounded-lg hover:bg-emerald-600 transition-all active:scale-95"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-black text-[#0f9e76] uppercase tracking-wider">
        <Sparkles size={10} /> Suggest skills with AI
      </div>
    </div>
  );
}
