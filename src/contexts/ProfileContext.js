"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [notification, setNotification] = useState(null);

  // 🔔 Toast helper
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // 🧠 Normalize JSON fields safely
  const normalizeProfile = (data) => ({
    ...data,
    skills: data?.skills || [],
    experience: data?.experience || [],
    education: data?.education || [],
    preferred_roles: data?.preferred_roles || [],
    job_preferences: data?.job_preferences || {
      location_type: "",
      job_type: "",
    },
  });

  // 📥 Fetch profile
  const fetchProfile = async (force = false) => {
    if (!isLoggedIn || !user) {
      setLoading(false);
      return;
    }

    if (!force && profile && profile.user_id === user.user_id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      console.log(user)

      const { data, error } = await supabase
        .from("candidate_profiles")
        .select("*")
        .eq("user_id", user.user_id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // 🆕 Create default profile in DB immediately
        const defaultProfile = {
          user_id: user.user_id,
          full_name: user.user_metadata?.full_name || "",
          skills: [],
          experience: [],
          education: [],
          preferred_roles: [],
          job_preferences: { location_type: "", job_type: "" },
        };

        const { data: inserted, error: insertError } = await supabase
          .from("candidate_profiles")
          .insert(defaultProfile)
          .select()
          .single();

        if (insertError) throw insertError;

        setProfile(normalizeProfile(inserted));
      } else {
        setProfile(normalizeProfile(data));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      showToast("Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Load profile on auth ready
  useEffect(() => {
    if (!authLoading && isLoggedIn && user) {
      fetchProfile();
    }
  }, [authLoading, isLoggedIn, user?.user_id]);

  // 💾 Save profile (OPTIMISTIC UPDATE)
  const saveProfile = async (updatedProfile) => {
    if (!user) return false;

    setSaving(true);

    // ⚡ Optimistic UI update
    setProfile((prev) => ({ ...prev, ...updatedProfile }));

    try {
      const { data, error } = await supabase
        .from("candidate_profiles")
        .upsert(
          {
            ...updatedProfile,
            user_id: user.user_id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        )
        .select()
        .single();

      if (error) throw error;

      setProfile(normalizeProfile(data));

      showToast("Profile saved successfully!");
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast("Failed to save profile", "error");

      // rollback
      await fetchProfile(true);

      return false;
    } finally {
      setSaving(false);
    }
  };

  const value = {
    profile,
    setProfile,
    loading,
    saving,
    parsing,
    setParsing,
    notification,
    showToast,
    saveProfile,
    refreshProfile: fetchProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

// 🧠 Hook
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};