"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  validate,
  candidateSignup,
  candidateSignin,
  companySignup,
  companySignin,
} from "../../lib/auth";
import { fadeVariant } from "./AuthStyles";
import RoleToggle from "./RoleToggle";
import FormField from "./FormField";
import Navbar from "../Navbar";

export default function AuthPage() {
  const { user, isLoggedIn, isLoading, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      if (user?.role === 'company' || user?.role === 'company_admin') {
        router.push("/dashboard");
      } else {
        const jobId = searchParams.get("jobId");
        router.push(jobId ? `/?jobId=${jobId}` : "/");
      }
    }
  }, [user, isLoggedIn, isLoading, router, searchParams]);
  const [role, setRole] = useState("candidate"); // "candidate" | "company"
  const [mode, setMode] = useState("signin"); // "signup" | "signin"
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fields =
    role === "candidate"
      ? mode === "signup"
        ? candidateSignup
        : candidateSignin
      : mode === "signup"
        ? companySignup
        : companySignin;

  const switchRole = useCallback(
    (r) => {
      if (r === role) return;
      setRole(r);
      setValues({});
      setErrors({});
      setSubmitted(false);
    },
    [role]
  );

  const switchMode = useCallback(() => {
    setMode((m) => (m === "signup" ? "signin" : "signup"));
    setValues({});
    setErrors({});
    setSubmitted(false);
  }, []);

  const handleChange = useCallback(
    (name, type) => (e) => {
      const val = type === "checkbox" ? e.target.checked : e.target.value;
      setValues((prev) => ({ ...prev, [name]: val }));
      if (submitted) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [submitted]
  );

  const [isPending, setIsPending] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const errs = validate(fields, values);
    setErrors(errs);
    setSubmitted(true);

    if (Object.keys(errs).length === 0) {
      setIsPending(true);
      try {
        if (mode === "signup") {
          // 1. Sign up user with metadata for the DB trigger
          const dbRole = role === "company" ? "company_admin" : "candidate";

          const { data: authData, error: authErr } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
              data: {
                role: dbRole,
                full_name: values.fullName || values.name
              }
            }
          });

          if (authErr) throw authErr;
          if (!authData.user) throw new Error("User creation failed");

          const userId = authData.user.id;

          if (role === "candidate") {
            // 2a. Create candidate profile in normalized table
            const { error: profileErr } = await supabase
              .from('candidate_profiles')
              .insert([
                {
                  user_id: userId,
                  full_name: values.fullName,
                  skills: [],
                  experience: [],
                  education: [],
                  preferred_roles: [],
                  job_preferences: { location_type: "", job_type: "" }
                }
              ]);

            if (profileErr) throw profileErr;
          } else {
            // 2b. Create company and link member
            // First, create the company
            const { data: companyData, error: companyErr } = await supabase
              .from('companies')
              .insert([
                {
                  name: values.companyName,
                }
              ])
              .select()
              .single();

            if (companyErr) throw companyErr;

            // Then, link the user as a company member (admin)
            const { error: memberErr } = await supabase
              .from('company_members')
              .insert([
                {
                  company_id: companyData.id,
                  user_id: userId,
                  role: 'admin'
                }
              ]);

            if (memberErr) throw memberErr;
          }
        } else {
          // Sign in mode
          await login(values.email, values.password);
        }


        // 3. Post-auth redirection
        const jobId = searchParams.get("jobId");
        if (role === "company") {
          router.push("/dashboard");
        } else if (jobId) {
          router.push(`/?jobId=${jobId}`);
        } else {
          router.push("/");
        }
      } catch (err) {
        setAuthError(err.message || "An authentication error occurred");
        console.error('Auth error:', err);
      } finally {
        setIsPending(false);
      }
    }
  };

  const ctaLabel =
    role === "candidate"
      ? mode === "signup"
        ? "Create my profile"
        : "Sign in"
      : mode === "signup"
        ? "Create company account"
        : "Sign in to dashboard";

  const formKey = `${role}-${mode}`;

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* 1. Detached Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar showSearch={false} />
      </div>

      {/* 2. Enhanced Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 mesh-overlay opacity-30" />
        
        {/* Dynamic Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal/5 blur-[120px] rounded-full animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-forest/5 blur-[100px] rounded-full animate-float" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-aqua/5 blur-[80px] rounded-full animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0d4f3c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* 3. Centered Content Wrapper */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-12 px-4 shadow-sm">
        <div
          className={`w-full bg-white/80 backdrop-blur-xl rounded-[40px] px-10 py-12 max-[520px]:max-w-full max-[520px]:rounded-none max-[520px]:min-h-screen max-[520px]:px-6 max-[520px]:py-10 max-[520px]:flex max-[520px]:flex-col max-[520px]:justify-center transition-all duration-500 ease-out ${mode === "signup" ? "max-w-[680px]" : "max-w-[480px]"}`}
          style={{ 
            boxShadow: "0 40px 100px -20px rgba(13,79,60,0.15), 0 24px 48px -24px rgba(13,79,60,0.2), 0 0 1px 0 rgba(13,79,60,0.1)",
            border: "1px solid rgba(15,158,118,0.08)"
          }}
        >

        <RoleToggle role={role} setRole={switchRole} />

        <AnimatePresence mode="wait">
          <motion.form
            key={formKey}
            variants={fadeVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <h2 className="text-xl font-bold text-forest mb-1" id={`auth-heading-${formKey}`}>
              {mode === "signup"
                ? role === "candidate"
                  ? "Create your candidate profile"
                  : "Register your company"
                : role === "candidate"
                  ? "Welcome back"
                  : "Company sign in"}
            </h2>

            <div className={mode === "signup" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
              {fields.map((f) => (
                <div key={f.name} className={f.full ? "md:col-span-2" : ""}>
                  <FormField
                    field={f}
                    value={values[f.name] ?? (f.type === "checkbox" ? false : "")}
                    onChange={handleChange(f.name, f.type)}
                    error={errors[f.name]}
                  />
                </div>
              ))}
            </div>

            {mode === "signin" && (
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  className="text-sm text-teal hover:text-forest font-medium transition-colors"
                  id="auth-forgot-password"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={`w-full h-12 rounded-xl text-white text-base font-bold cursor-pointer transition-all duration-300 mt-2 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{
                background: "linear-gradient(135deg, #0d4f3c, #0f9e76)",
                boxShadow: "0 4px 14px rgba(13,79,60,0.25)",
              }}
              onMouseEnter={(e) => !isPending && (e.currentTarget.style.boxShadow = "0 6px 24px rgba(13,79,60,0.35)")}
              onMouseLeave={(e) => !isPending && (e.currentTarget.style.boxShadow = "0 4px 14px rgba(13,79,60,0.25)")}
              id="auth-submit"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : ctaLabel}
            </button>

            <p className="text-center text-sm text-text-muted pt-1">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="bg-transparent border-none text-teal font-semibold cursor-pointer text-sm underline underline-offset-2 hover:text-forest transition-colors"
                    id="auth-switch-signin"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="bg-transparent border-none text-teal font-semibold cursor-pointer text-sm underline underline-offset-2 hover:text-forest transition-colors"
                    id="auth-switch-signup"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </motion.form>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
