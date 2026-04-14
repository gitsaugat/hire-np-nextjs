"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: async (email, password) => { },
  logout: async () => { },
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // To avoid race conditions and redundant processing
  const lastSessionIdRef = useRef(null);
  const isInitializingRef = useRef(true);

  useEffect(() => {
    // Rely solely on onAuthStateChange for initial session AND changes.
    // This prevents the 'lock stolen' error caused by getSession() + onAuthStateChange overlapping.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth event: ${event}`);
      
      if (session) {
        // Only process if the session ID has changed (prevents redundant handleUserSession calls)
        if (lastSessionIdRef.current !== session.user.id || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          lastSessionIdRef.current = session.user.id;
          await handleUserSession(session);
        } else {
          setIsLoading(false);
        }
      } else {
        lastSessionIdRef.current = null;
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
      
      isInitializingRef.current = false;
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleUserSession = async (session) => {
    try {
      // 1. Fetch the unified user entry (which includes the role)
      const { data: dbUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError) {
        if (userError.code === 'PGRST116') {
          console.warn('User record not found in public.users yet (might be waiting for trigger).');
          // Fallback if the trigger hasn't finished yet
          const combinedUser = { 
            ...session.user, 
            role: session.user.user_metadata?.role || 'candidate' 
          };
          setUser(combinedUser);
          setIsLoggedIn(true);
          return;
        }
        throw userError;
      }

      let extraData = {};

      if (dbUser.role === 'candidate') {
        // 2a. Fetch profile for candidates from normalized table
        const { data: profile } = await supabase
          .from('candidate_profiles')
          .select('*')
          .eq('user_id', dbUser.id)
          .single();
        extraData = profile || {};
      } else if (dbUser.role === 'company_admin' || dbUser.role === 'company') {
        // 2b. Fetch company details for company admins
        const { data: membership } = await supabase
          .from('company_members')
          .select('*, companies(*)')
          .eq('user_id', dbUser.id)
          .single();
        
        if (membership?.companies) {
          extraData = {
            company: membership.companies,
            company_id: membership.companies.id
          };
        }

      }

      const combinedUser = {
        ...session.user,
        ...dbUser,
        ...extraData,
      };

      setUser(combinedUser);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Session handling error:', err);
    } finally {
      setIsLoading(false);
    }
  };


  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
