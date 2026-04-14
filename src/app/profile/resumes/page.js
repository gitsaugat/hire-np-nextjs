"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle, 
  Clock, 
  HardDrive,
  Plus,
  AlertCircle,
  Loader2,
  Sparkles
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumesPage() {
  const { user } = useAuth();
  const { profile, saveProfile, showToast: globalToast } = useProfile();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fetchResumes = async () => {
    if (!user) return;
    try {
      setLoading(true);
      
      // 1. List files in the user's folder within the storage bucket
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from("resumes")
        .list(user.user_id, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'desc' }
        });

      if (storageError) throw storageError;

      if (!storageFiles) {
        setResumes([]);
        return;
      }

      // 2. Map storage files to resume objects with public URLs
      const mappedResumes = storageFiles
        .filter(f => f.name !== '.emptyFolderPlaceholder') // Filter out any empty folder indicators
        .map(file => {
          const filePath = `${user.user_id}/${file.name}`;
          const { data: { publicUrl } } = supabase.storage
            .from("resumes")
            .getPublicUrl(filePath);

          // Heuristic name: strip timestamp prefix if possible, or just use name
          const displayName = file.name.split('-').slice(1).join('-') || file.name;

          return {
            id: file.id || file.name,
            file_name: displayName,
            file_url: publicUrl,
            file_size: file.metadata?.size || 0,
            created_at: file.created_at,
            is_default: profile?.resume_url === publicUrl,
            storage_path: filePath
          };
        });

      setResumes(mappedResumes);
    } catch (error) {
      console.error("Error listing storage resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  const handleUpload = async (e) => {
    const file = e.target?.files?.[0] || e.dataTransfer?.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("File size must be less than 5MB", "error");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${user.user_id}/${fileName}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      // 3. Update Profile if it's the first resume
      if (!profile?.resume_url) {
        await saveProfile({ resume_url: publicUrl });
      }

      globalToast("Resume uploaded to bucket successfully!");
      fetchResumes();
    } catch (error) {
      console.error("Upload error:", error);
      globalToast(error.message || "Failed to upload to bucket.", "error");
    } finally {
      setUploading(false);
    }
  };

  const setDefault = async (url) => {
    try {
      const success = await saveProfile({ resume_url: url });
      if (success) {
        globalToast("Primary resume updated!");
        fetchResumes();
      }
    } catch (error) {
      globalToast("Failed to update primary resume.", "error");
    }
  };

  const deleteResume = async (resume) => {
    if (!confirm("Are you sure you want to remove this resume from storage?")) return;
    
    try {
      // 1. Delete from storage
      const { error } = await supabase.storage
        .from("resumes")
        .remove([resume.storage_path]);

      if (error) throw error;

      // 2. If it was the default, clear it from profile
      if (resume.is_default) {
        await saveProfile({ resume_url: null });
      }

      globalToast("Resume removed from storage.");
      fetchResumes();
    } catch (error) {
      globalToast("Failed to remove resume.", "error");
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Resumes</h1>
        <p className="text-slate-500 font-medium mt-1">Select your primary resume for AI job matching.</p>
      </div>

      {/* Upload Area */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); handleUpload(e); }}
        className={`relative group border-2 border-dashed rounded-xl p-12 transition-all duration-300 flex flex-col items-center justify-center ${
          dragActive ? "border-[#0f9e76] bg-emerald-50/50" : "border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200"
        }`}
      >
        <input 
          type="file" 
          id="resume-upload" 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          accept=".pdf,.doc,.docx"
          onChange={handleUpload}
          disabled={uploading}
        />
        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {uploading ? (
            <Loader2 className="animate-spin text-slate-400" size={24} />
          ) : (
            <Upload className="text-slate-400 group-hover:text-[#0f9e76]" size={24} />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-900">
            {uploading ? "Analyzing resume..." : "Upload new resume"}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            PDF or Word • Max 5MB
          </p>
        </div>
      </div>

      {/* List Area */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <HardDrive size={14} /> Saved Documents
          </h3>
          <span className="text-[10px] font-bold text-slate-400 py-1 rounded-full">
            {resumes.length} {resumes.length === 1 ? 'file' : 'files'}
          </span>
        </div>

        {loading ? (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-slate-200" size={32} />
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Fetching files...</p>
          </div>
        ) : resumes.length > 0 ? (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div 
                key={resume.id}
                className={`border-b border-gray-100 last:border-0 pb-6 last:pb-0 flex items-center group transition-all`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-5 ${
                  resume.is_default ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-gray-50 text-slate-400 border border-gray-100"
                }`}>
                  <FileText size={18} />
                </div>
                
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-slate-900 truncate tracking-tight">{resume.file_name}</p>
                    {resume.is_default && (
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md tracking-wider border border-emerald-100">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <HardDrive size={12} /> {formatSize(resume.file_size)}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <Clock size={12} /> {new Date(resume.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!resume.is_default && (
                    <button 
                      onClick={() => setDefault(resume.file_url)}
                      className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-slate-500 hover:bg-gray-50 transition-all border border-gray-100"
                    >
                      Use as Primary
                    </button>
                  )}
                  <button 
                    onClick={() => deleteResume(resume)}
                    className="p-2 rounded-md text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
              <Plus size={24} />
            </div>
            <h4 className="text-slate-900 font-bold">No resumes yet</h4>
            <p className="text-slate-500 font-medium text-sm mt-1 max-w-xs">
              Upload your resume to enable one-click applications.
            </p>
          </div>
        )}
      </div>

      <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100 relative overflow-hidden">
        <Sparkles className="absolute -top-2 -right-2 text-emerald-200/50" size={64} />
        <div className="relative z-10">
          <h4 className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={14} /> AI Matching Insight
          </h4>
          <p className="text-emerald-800 mt-2 text-xs font-medium leading-relaxed max-w-2xl">
            Having multiple resumes? Set your most relevant one as default. Our AI uses your default resume to automatically rank you against new job openings.
          </p>
        </div>
      </div>
    </div>
  );
}
