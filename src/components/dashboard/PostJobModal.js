"use client";

import React, { useState } from "react";
import { X, PlusCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

export default function PostJobModal({ isOpen, onClose, onJobPosted }) {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    location_type: "Remote",
    job_type: "Full-time",
    experience_level: "Intermediate",
    salary_range: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const { error } = await supabase
        .from('jobs')
        .insert([
          {
            ...formData,
            company_id: user.id,
            company_name: user.company_name || "Company"
          }
        ]);

      if (error) throw error;
      
      if (onJobPosted) onJobPosted();
      onClose();
      // Reset form
      setFormData({
        title: "",
        location: "",
        location_type: "Remote",
        job_type: "Full-time",
        experience_level: "Intermediate",
        salary_range: "",
        description: "",
      });
    } catch (err) {
      console.error('Error posting job:', err);
      alert("Error posting job: " + err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-forest/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-[#f1f5f9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center text-teal">
              <PlusCircle size={24} />
            </div>
            <h2 className="text-xl font-bold text-forest">Post a New Job</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-xl text-text-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-forest">Job Title</label>
              <input 
                required
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="w-full px-4 py-3 rounded-xl border border-[#f1f5f9] focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all font-medium"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-forest">Location</label>
              <input 
                required
                type="text"
                placeholder="e.g. Kathmandu, Nepal"
                className="w-full px-4 py-3 rounded-xl border border-[#f1f5f9] focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all font-medium"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-forest">Location Type</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-[#f1f5f9] focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all font-medium bg-white"
                value={formData.location_type}
                onChange={(e) => setFormData({...formData, location_type: e.target.value})}
              >
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-forest">Job Type</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-[#f1f5f9] focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all font-medium bg-white"
                value={formData.job_type}
                onChange={(e) => setFormData({...formData, job_type: e.target.value})}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Freelance</option>
                <option>Internship</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-forest">Experience Level</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-[#f1f5f9] focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all font-medium bg-white"
                value={formData.experience_level}
                onChange={(e) => setFormData({...formData, experience_level: e.target.value})}
              >
                <option>Junior</option>
                <option>Intermediate</option>
                <option>Senior</option>
                <option>Expert</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-forest">Salary Range</label>
              <input 
                type="text"
                placeholder="e.g. $40k - $60k or Rs. 50,000 - 80,000"
                className="w-full px-4 py-3 rounded-xl border border-[#f1f5f9] focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all font-medium"
                value={formData.salary_range}
                onChange={(e) => setFormData({...formData, salary_range: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-forest">Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full px-4 py-3 rounded-xl border border-[#f1f5f9] focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all font-medium resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-xl border border-[#f1f5f9] text-forest font-bold hover:bg-[#f8fafc] transition-all"
            >
              Cancel
            </button>
            <button 
              disabled={isPending}
              type="submit"
              className="flex-1 py-4 rounded-xl bg-teal text-white font-bold shadow-lg shadow-teal/20 hover:bg-forest transition-all flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
