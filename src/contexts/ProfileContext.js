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

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProfile = async () => {
    if (!isLoggedIn || !user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("candidate_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      
      if (!data) {
        // Initial empty profile
        setProfile({
          user_id: user.id,
          full_name: user.full_name || "",
          skills: [],
          experience: [],
          education: [],
          preferred_roles: [],
          job_preferences: { location_type: "", job_type: "" }
        });
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchProfile();
    }
  }, [authLoading, isLoggedIn, user]);

  const saveProfile = async (updatedProfile) => {
    setSaving(true);
    try {
      // Safety Check: Ensure user exists in the public schema table to avoid FK violations
      const { data: userRecord } = await supabase.from('users').select('id').eq('id', user.id).single();
      if (!userRecord) {
        await new Promise(r => setTimeout(r, 1000));
        const { data: retryRecord } = await supabase.from('users').select('id').eq('id', user.id).single();
        if (!retryRecord) throw new Error("Database sync delay. Please try again in a moment.");
      }

      const { error } = await supabase
        .from("candidate_profiles")
        .upsert({
          ...updatedProfile,
          user_id: user.id,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setProfile(updatedProfile);
      showToast("Profile saved successfully!");
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast(error.message || "Failed to save profile.", "error");
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
    refreshProfile: fetchProfile
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
