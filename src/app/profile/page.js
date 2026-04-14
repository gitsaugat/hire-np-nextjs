"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ResumeUploadCard from "@/components/profile/ResumeUploadCard";
import ProfileStrength from "@/components/profile/ProfileStrength";

export default function ProfilePage() {
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const { 
    profile, 
    setProfile, 
    loading: profileLoading, 
    saving: isSaving, 
    parsing: isParsing, 
    setParsing: setIsParsing,
    notification, 
    showToast,
    saveProfile: handleSave 
  } = useProfile();
  
  const router = useRouter();

  // Handle Protected Route
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/auth?redirect=/profile");
    }
  }, [isLoggedIn, authLoading, router]);

  const handleAiFill = (aiData) => {
    const newProfile = {
      ...profile,
      full_name: aiData.full_name || profile?.full_name,
      location: aiData.location || profile?.location,
      bio: aiData.bio || profile?.bio,
      skills: aiData.skills || profile?.skills || [],
      experience: aiData.experience || profile?.experience || [],
      education: aiData.education || profile?.education || [],
      experience_level: aiData.experience_level?.toLowerCase() || profile?.experience_level,
      preferred_roles: aiData.preferred_roles || profile?.preferred_roles || [],
      salary_expectation: aiData.salary_expectation || profile?.salary_expectation,
      job_preferences: aiData.job_preferences || profile?.job_preferences || { location_type: "", job_type: "" },
      ai_generated: true
    };
    setProfile(newProfile);
    showToast("Profile auto-filled by AI!");
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0f9e76] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      {/* Custom Toast Notification */}
      {notification && (
        <div className={`fixed top-24 right-8 z-[200] px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-right-10 duration-300 font-bold text-sm ${
          notification.type === "success" ? "bg-[#0d4f3c] text-white" : "bg-red-500 text-white"
        }`}>
          {notification.message}
        </div>
      )}
      
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Upload & Progress */}
          <div className="space-y-6">
            <ResumeUploadCard 
              onDataExtracted={handleAiFill} 
              isParsing={isParsing} 
              setIsParsing={setIsParsing} 
            />
            <ProfileStrength profile={profile} />
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader profile={profile} isSaving={isSaving} />
            <ProfileForm 
              profile={profile} 
              onSave={handleSave} 
              isSaving={isSaving} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
