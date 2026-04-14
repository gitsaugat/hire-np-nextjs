"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, PlusCircle, Loader2, Sparkles, Wand2, AlertCircle, Mic, MicOff, Trash2, Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

export default function PostJobModal({ isOpen, onClose, onJobPosted }) {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const basePromptRef = useRef("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    location_type: "Remote",
    job_type: "full_time",
    experience_level: "Intermediate",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: [],
  });

  // Speech Recognition Setup
  useEffect(() => {
    let recognition = null;
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          let sessionTranscript = "";
          for (let i = 0; i < event.results.length; ++i) {
            sessionTranscript += event.results[i][0].transcript;
          }
          setAiPrompt(basePromptRef.current + (basePromptRef.current ? " " : "") + sessionTranscript);
        };

        recognition.onerror = (event) => {
          console.error("Speech Recognition Error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      }
    }

    if (isListening) {
      basePromptRef.current = aiPrompt;
      if (recognition) recognition.start();
    } else {
      if (recognition) recognition.stop();
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening]);

  if (!isOpen) return null;

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setError(null);

    const systemPrompt = `You are an expert HR recruitment specialist. Your task is to generate a detailed job posting in JSON format based on the user's prompt. 
    The JSON must follow this exact structure:
    {
      "title": "string",
      "location": "string",
      "location_type": "Remote" | "On-site" | "Hybrid",
      "job_type": "full_time" | "part_time" | "contract" | "freelance" | "internship",
      "experience_level": "Junior" | "Intermediate" | "Senior" | "Expert",
      "salary_min": number,
      "salary_max": number,
      "description": "string (multiline, focusing on company culture and role overview)",
      "requirements": ["string", "string", "string"] (minimum 3 key requirements/skills)
    }
    Only output the JSON. Do not include any other text.`;

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-oss:20b-cloud",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: aiPrompt }
          ],
          stream: false,
          format: "json"
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to local Ollama. Ensure it's running and OLLAMA_ORIGINS allows this site.");

      const data = await response.json();
      const content = JSON.parse(data.message.content);

      setFormData({
        title: content.title || "",
        location: content.location || "",
        location_type: content.location_type || "Remote",
        job_type: content.job_type || "full_time",
        experience_level: content.experience_level || "Intermediate",
        salary_min: content.salary_min || "",
        salary_max: content.salary_max || "",
        description: content.description || "",
        requirements: content.requirements || [],
      });

      setShowAI(false);
      setAiPrompt("");
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError(err.message === "Failed to fetch" ? "Ollama not found. Run: OLLAMA_ORIGINS=\"http://localhost:3000\" ollama serve" : err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRequirementChange = (index, value) => {
    const newReqs = [...formData.requirements];
    newReqs[index] = value;
    setFormData({ ...formData, requirements: newReqs });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""]
    });
  };

  const removeRequirement = (index) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked - Processing job post...");
    setIsPending(true);

    try {
      console.log("Current Context User:", user);

      if (!user?.company_id) {
        console.error("Missing company_id in context. User object:", user);
        throw new Error("No company associated with this account. Please ensure you are logged in as a company admin.");
      }

      // Build final description with requirements bullet points
      console.log("Formatting description with requirements...");
      let finalDescription = formData.description || "";
      if (formData.requirements?.length > 0) {
        finalDescription += "\n\nRequirements:\n" + formData.requirements.map(r => `• ${r}`).join("\n");
      }

      const payload = {
        company_id: user.company_id,
        title: formData.title.trim(),
        description: finalDescription,
        location: formData.location || "Remote",
        job_type: formData.job_type || "full_time",
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
        is_active: true
      };

      console.log("SENDING TO SUPABASE. Payload:", payload);

      // Simple, direct insertion
      const { data, error: insertError } = await supabase
        .from('jobs')
        .insert([payload])
        .select();

      if (insertError) {
        console.error("Supabase Insertion failed:", insertError);
        throw insertError;
      }

      console.log("Job posted successfully! Data returned:", data);

      // Call success callback and close modal
      if (onJobPosted) await onJobPosted();
      onClose();

      // Reset local form state
      setFormData({
        title: "",
        location: "",
        location_type: "Remote",
        job_type: "full_time",
        experience_level: "Intermediate",
        salary_min: "",
        salary_max: "",
        description: "",
        requirements: [],
      });

    } catch (err) {
      console.error('Fatal error during job posting:', err);
      alert(err.message || "An unexpected error occurred while posting the job.");
    } finally {
      console.log("Form submission process finished.");
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-forest/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-teal/5 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center text-teal">
              <PlusCircle size={24} />
            </div>
            <h2 className="text-xl font-black text-forest tracking-tight">Post a New Job</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAI(!showAI)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showAI ? 'bg-forest text-white' : 'bg-teal/10 text-teal hover:bg-teal/20'
                }`}
            >
              <Sparkles size={14} /> {showAI ? 'Hide AI' : 'Use AI Generator'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* AI Integration Section */}
        {showAI && (
          <div className="p-8 pb-0 bg-slate-50/50 border-b border-slate-100 space-y-4 animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2 text-teal">
              <Wand2 size={16} />
              <h3 className="text-xs font-black uppercase tracking-wider">AI Job Creator </h3>
            </div>
            <div className="relative">
              <textarea
                className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-teal/5 outline-none font-medium text-sm min-h-[100px] bg-white transition-all shadow-sm"
                placeholder="Briefly describe the role... e.g. 'Senior UI Designer for a fintech startup based in Kathmandu, focused on mobile apps.'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsListening(!isListening)}
                  className={`p-2 rounded-xl transition-all ${isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-teal/10 text-teal hover:bg-teal/20"
                    }`}
                  title={isListening ? "Stop Listening" : "Start Voice-to-Text"}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button
                  disabled={isGenerating || !aiPrompt.trim()}
                  onClick={generateWithAI}
                  className="bg-teal text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-teal/20 hover:bg-forest disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  {isGenerating ? "Generating..." : "Magic Generate"}
                </button>
              </div>
            </div>
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-xl text-red-500 text-[11px] font-bold">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Job Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 hover:border-slate-200 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-slate-50/30"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Location</label>
              <input
                required
                type="text"
                placeholder="e.g. Kathmandu, Nepal"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 hover:border-slate-200 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-slate-50/30"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Loc. Type</label>
              <select
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-white shadow-sm"
                value={formData.location_type}
                onChange={(e) => setFormData({ ...formData, location_type: e.target.value })}
              >
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Job Type</label>
              <select
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-white shadow-sm"
                value={formData.job_type}
                onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
              >
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Experience</label>
              <select
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-white shadow-sm"
                value={formData.experience_level}
                onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
              >
                <option>Junior</option>
                <option>Intermediate</option>
                <option>Senior</option>
                <option>Expert</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Min Salary</label>
              <input
                type="number"
                placeholder="e.g. 40000"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 hover:border-slate-200 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-slate-50/30"
                value={formData.salary_min}
                onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Max Salary</label>
              <input
                type="number"
                placeholder="e.g. 80000"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 hover:border-slate-200 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-slate-50/30"
                value={formData.salary_max}
                onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-forest uppercase tracking-wider">Description</label>
              <textarea
                required
                rows={4}
                placeholder="Describe the role..."
                className="w-full px-4 py-3.5 rounded-xl border border-slate-100 hover:border-slate-200 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-slate-50/30 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Requirements Section */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-forest uppercase tracking-wider">Requirements</label>
                <button
                  type="button"
                  onClick={addRequirement}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal/10 text-teal hover:bg-teal/20 transition-all text-[10px] font-black uppercase tracking-wider"
                >
                  <Plus size={14} />
                  Add Requirement
                </button>
              </div>

              <div className="space-y-3">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 animate-in slide-in-from-left-2 duration-200">
                    <input
                      type="text"
                      placeholder={`Requirement #${index + 1}`}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-100 hover:border-slate-200 focus:ring-4 focus:ring-teal/5 focus:border-teal outline-none transition-all font-semibold text-slate-700 bg-white shadow-sm text-sm"
                      value={req}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-3 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 transition-all flex items-center justify-center shrink-0 shadow-sm"
                      title="Remove Requirement"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                {formData.requirements.length === 0 && (
                  <div className="text-center py-8 px-4 border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-xs font-bold text-slate-400">No requirements added yet. Click "Add Requirement" or use AI to generate them.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-4 sticky bottom-0 bg-white/80 backdrop-blur-md">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-slate-100 text-slate-500 font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              type="submit"
              className="flex-1 py-4 rounded-2xl bg-[#0d4f3c] text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-forest/20 hover:bg-[#0f9e76] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <span>Post Job</span>
                  <PlusCircle size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
