"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { analyzeResume } from "@/lib/resumeAnalyzer";

export default function ResumeUploadCard({ onDataExtracted }) {
  const { user } = useAuth();
  const { isParsing, setParsing: setIsParsing } = useProfile();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file for accurate AI parsing.");
        return;
      }
      setError(null);
      performRealUpload(selectedFile);
    }
  };

  const performRealUpload = async (selectedFile) => {
    if (!user) {
      setError("Please log in to upload resumes.");
      return;
    }

    setFile(selectedFile);
    setUploadProgress(0);
    setIsParsing(true);

    try {
      setUploadProgress(20);

      const fileExt = selectedFile.name.split('.').pop();
      console.log(user, "resume");
      // Corrected format: user_id/timestamp-filename
      const filePath = `${user.user_id}/${Date.now()}-${selectedFile.name}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      setUploadProgress(60);

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      setUploadProgress(80);

      // 3. Extract Text from PDF
      const text = await extractTextFromPDF(selectedFile);

      // 4. Analyze using shared utility
      const extractedData = analyzeResume(selectedFile.name, text);

      // 5. Add URL
      const finalData = { ...extractedData, resume_url: publicUrl };

      setUploadProgress(100);

      setTimeout(() => {
        onDataExtracted(finalData);
        setIsParsing(false);
      }, 1000);

    } catch (err) {
      console.error("Upload/Parse error:", err);
      setError(err.message || "Failed to process resume. Please try again.");
      setIsParsing(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 overflow-hidden relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#0f9e76]/10 flex items-center justify-center">
          <FileText className="text-[#0f9e76]" size={20} />
        </div>
        <h3 className="font-black text-[#0d4f3c] tracking-tight">Resume & AI Parsing</h3>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {!file ? (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-[24px] cursor-pointer hover:bg-slate-50 hover:border-[#0f9e76]/30 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="text-slate-400 group-hover:text-[#0f9e76]" size={24} />
              </div>
              <p className="mb-1 text-sm text-[#0d4f3c] font-bold">Upload your resume</p>
              <p className="text-xs text-slate-500 font-medium tracking-tight">PDF or DOCX (Max 5MB)</p>
            </div>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <FileText size={16} className="text-[#0d4f3c]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#0d4f3c] truncate max-w-[150px]">{file.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              {uploadProgress === 100 && !isParsing && (
                <CheckCircle2 size={18} className="text-emerald-500" />
              )}
            </div>

            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                className="h-full bg-gradient-to-r from-[#0d4f3c] to-[#0f9e76]"
              />
            </div>
          </div>
        )}

        <AnimatePresence>
          {isParsing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-teal/5 border border-teal/10 flex flex-col items-center text-center space-y-3"
            >
              <Loader2 className="animate-spin text-teal" size={24} />
              <div>
                <p className="text-sm font-black text-[#0d4f3c] flex items-center gap-2 justify-center">
                  <Sparkles size={14} /> AI is Analyzing...
                </p>
                <p className="text-[11px] text-[#0f9e76] font-bold">Extracting skills and experience</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {uploadProgress === 100 && !isParsing && (
          <div className="flex items-center gap-2 text-[10px] font-black text-[#0f9e76] uppercase tracking-wider bg-emerald-50 py-1 px-3 rounded-full w-fit mx-auto">
            <Sparkles size={10} /> Auto-filled by AI
          </div>
        )}
      </div>
    </div>
  );
}
