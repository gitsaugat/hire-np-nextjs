"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { 
    profile, 
    loading: profileLoading, 
    saving: isSaving, 
    saveProfile: handleSave 
  } = useProfile();
  
  const router = useRouter();

  // Handle Protected Route
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/auth?redirect=/profile");
    }
  }, [isLoggedIn, authLoading, router]);

  if (authLoading || profileLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse text-sm">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-12">
        <ProfileHeader profile={profile} isSaving={isSaving} />
        
        <ProfileForm 
          profile={profile} 
          onSave={handleSave} 
          isSaving={isSaving} 
        />
      </div>
    </div>
  );
}
