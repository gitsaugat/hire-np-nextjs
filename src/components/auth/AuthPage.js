"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
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
import AuthNavbar from "./AuthNavbar";

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields, values);
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length === 0) {
      // Simulated login success
      login({ 
        name: values.fullName || (role === "candidate" ? "Candidate User" : "Company Admin"), 
        email: values.email, 
        role 
      });
      
      const jobId = searchParams.get("jobId");
      if (role === "company") {
        router.push("/dashboard");
      } else if (jobId) {
        router.push(`/?jobId=${jobId}`);
      } else {
        router.push("/");
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
    <div className="relative min-h-screen flex items-center justify-center bg-white pt-24 pb-8 px-4 overflow-hidden">
      <AuthNavbar />
      <div className="absolute inset-0 mesh-overlay opacity-20 pointer-events-none" />

      {/* Atmospheric Watermark Blobs */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-teal/5 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-20 right-[-5%] w-72 h-72 bg-forest/5 blur-[100px] rounded-full animate-float" />

      <div
        className={`relative z-10 w-full bg-white rounded-[32px] px-8 py-10 max-[520px]:max-w-full max-[520px]:rounded-none max-[520px]:min-h-screen max-[520px]:px-5 max-[520px]:py-8 max-[520px]:flex max-[520px]:flex-col max-[520px]:justify-center transition-all duration-300 ${mode === "signup" ? "max-w-[640px]" : "max-w-[480px]"}`}
        style={{ boxShadow: "0 30px 60px -12px rgba(13,79,60,0.12), 0 18px 36px -18px rgba(13,79,60,0.15)" }}
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

            <button
              type="submit"
              className="w-full h-12 rounded-xl text-white text-base font-bold cursor-pointer transition-all duration-300 mt-2 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, #0d4f3c, #0f9e76)",
                boxShadow: "0 4px 14px rgba(13,79,60,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(13,79,60,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 14px rgba(13,79,60,0.25)")}
              id="auth-submit"
            >
              {ctaLabel}
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
  );
}
