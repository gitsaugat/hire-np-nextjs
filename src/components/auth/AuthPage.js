"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Building2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  Users,
  ChevronDown,
} from "lucide-react";

/* ────────────────────── helpers ────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^9[78]\d{8}$/;

function validate(fields, values) {
  const errors = {};
  fields.forEach((f) => {
    const v = (values[f.name] ?? "").toString().trim();
    if (f.required && !v) {
      errors[f.name] = `${f.label} is required`;
    } else if (f.type === "email" && v && !EMAIL_RE.test(v)) {
      errors[f.name] = "Enter a valid email address";
    } else if (f.name === "phone" && v && !PHONE_RE.test(v)) {
      errors[f.name] = "Enter a valid Nepal phone number";
    } else if (f.type === "password" && v && v.length < 8) {
      errors[f.name] = "Password must be at least 8 characters";
    } else if (
      f.name === "confirmPassword" &&
      v &&
      v !== values.password
    ) {
      errors[f.name] = "Passwords do not match";
    } else if (f.name === "terms" && !values.terms) {
      errors[f.name] = "You must agree to the Terms of Service";
    }
  });
  return errors;
}

/* ────────────────────── field definitions ────────────────────── */

const candidateSignup = [
  { name: "fullName", label: "Full name", type: "text", icon: User, required: true },
  { name: "email", label: "Email address", type: "email", icon: Mail, required: true },
  { name: "phone", label: "Phone number", type: "tel", icon: Phone, placeholder: "98XXXXXXXX", required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
  { name: "confirmPassword", label: "Confirm password", type: "password", icon: Lock, required: true },
  { name: "terms", label: "I agree to the Terms of Service", type: "checkbox", required: true, full: true },
];

const candidateSignin = [
  { name: "email", label: "Email", type: "email", icon: Mail, required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
];

const companySizes = ["1–20 employees", "21–50 employees", "51–200 employees", "200+ employees"];

const companySignup = [
  { name: "companyName", label: "Company name", type: "text", icon: Building2, required: true },
  { name: "contactName", label: "Your name (contact person)", type: "text", icon: User, required: true },
  { name: "email", label: "Work email", type: "email", icon: Mail, required: true },
  { name: "phone", label: "Phone number", type: "tel", icon: Phone, placeholder: "98XXXXXXXX", required: true },
  { name: "companySize", label: "Company size", type: "select", icon: Users, options: companySizes, required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
  { name: "confirmPassword", label: "Confirm password", type: "password", icon: Lock, required: true },
  { name: "terms", label: "I agree to the Terms of Service", type: "checkbox", required: true, full: true },
];

const companySignin = [
  { name: "email", label: "Work email", type: "email", icon: Mail, required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
];

/* ────────────────────── animation variants ────────────────────── */

const fadeVariant = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

/* ────────────────────── input styles ────────────────────── */

const inputBase =
  "w-full h-[44px] pl-11 pr-3.5 rounded-[10px] border border-[#d1e8e0] bg-background-soft text-[0.9rem] text-forest outline-none transition-all duration-200 placeholder:text-text-muted/50 focus:border-teal focus:ring-[3px] focus:ring-teal/10";

const inputError =
  "!border-red-500 !ring-[3px] !ring-red-500/8";

const iconClasses =
  "absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none";

/* ────────────────────── sub-components ────────────────────── */

function PasswordInput({ field, value, onChange, error, id }) {
  const [show, setShow] = useState(false);
  const Icon = field.icon;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[0.825rem] font-semibold text-forest">
        {field.label}
      </label>
      <div className="relative">
        <Icon className={iconClasses} size={18} />
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
          className={`${inputBase} !pr-10 ${error ? inputError : ""}`}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest transition-colors"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-[0.775rem] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function SelectInput({ field, value, onChange, error, id }) {
  const Icon = field.icon;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[0.825rem] font-semibold text-forest">
        {field.label}
      </label>
      <div className="relative">
        <Icon className={iconClasses} size={18} />
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`${inputBase} appearance-none !pr-10 ${!value ? "text-text-muted/50" : ""} ${error ? inputError : ""}`}
        >
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
      </div>
      {error && <p className="text-[0.775rem] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function FormField({ field, value, onChange, error }) {
  const id = `auth-${field.name}`;
  const Icon = field.icon;

  if (field.type === "password") {
    return <PasswordInput field={field} value={value} onChange={onChange} error={error} id={id} />;
  }

  if (field.type === "select") {
    return <SelectInput field={field} value={value} onChange={onChange} error={error} id={id} />;
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none group">
          <input
            id={id}
            type="checkbox"
            checked={!!value}
            onChange={onChange}
            className="w-[18px] h-[18px] rounded-[5px] border-[1.5px] border-teal cursor-pointer accent-teal shrink-0 mt-0.5"
          />
          <span className="text-sm text-text-muted group-hover:text-forest transition-colors leading-snug">
            {field.label}
          </span>
        </label>
        {error && <p className="text-[0.775rem] text-red-500 font-medium">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[0.825rem] font-semibold text-forest">
        {field.label}
      </label>
      <div className="relative">
        <Icon className={iconClasses} size={18} />
        <input
          id={id}
          type={field.type}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
          className={`${inputBase} ${error ? inputError : ""}`}
        />
      </div>
      {error && <p className="text-[0.775rem] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/* ────────────────────── main component ────────────────────── */

export default function AuthPage() {
  const [role, setRole] = useState("candidate"); // "candidate" | "company"
  const [mode, setMode] = useState("signup"); // "signup" | "signin"
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
      // TODO: wire up actual auth
      console.log("Submit:", { role, mode, values });
    }
  };

  /* CTA labels */
  const ctaLabel =
    role === "candidate"
      ? mode === "signup"
        ? "Create my profile"
        : "Sign in"
      : mode === "signup"
        ? "Create company account"
        : "Sign in to dashboard";

  /* Unique key for AnimatePresence */
  const formKey = `${role}-${mode}`;

  return (
    <div className="relative min-h-screen flex items-center justify-center hero-gradient py-8 px-4 overflow-hidden">
      {/* Mesh overlay for depth */}
      <div className="absolute inset-0 mesh-overlay opacity-60 pointer-events-none" />

      {/* Ambient floating blobs */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-aqua/10 blur-[100px] rounded-full animate-float" />
      <div className="absolute bottom-20 right-[-5%] w-72 h-72 bg-forest/20 blur-[80px] rounded-full animate-float" />

      {/* Card */}
      <div
        className={`relative z-10 w-full bg-white rounded-[20px] px-8 py-10 max-[520px]:max-w-full max-[520px]:rounded-none max-[520px]:min-h-screen max-[520px]:px-5 max-[520px]:py-8 max-[520px]:flex max-[520px]:flex-col max-[520px]:justify-center transition-all duration-300 ${mode === "signup" ? "max-w-[640px]" : "max-w-[480px]"}`}
        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.08)" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="block text-center text-[1.75rem] font-extrabold text-forest tracking-tight no-underline hover:opacity-80 transition-opacity mb-4"
          id="auth-logo"
        >
          Hire<span className="text-teal">NP</span>
        </Link>

        {/* Role Toggle */}
        <div
          className="flex gap-[3px] rounded-[14px] p-[3px] mb-5"
          style={{ background: "#f0fdf9" }}
          id="auth-role-toggle"
        >
          <button
            type="button"
            onClick={() => switchRole("candidate")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[11px] text-[0.9rem] font-semibold cursor-pointer transition-all duration-300 border-[1.5px] whitespace-nowrap ${
              role === "candidate"
                ? "text-white border-transparent"
                : "bg-white text-forest border-teal hover:bg-background-soft hover:border-forest"
            }`}
            style={
              role === "candidate"
                ? {
                    background: "linear-gradient(135deg, #0d4f3c, #0f9e76)",
                    boxShadow: "0 4px 14px rgba(13,79,60,0.3)",
                  }
                : {}
            }
            id="auth-toggle-candidate"
          >
            <User size={18} />
            Looking for work
          </button>
          <button
            type="button"
            onClick={() => switchRole("company")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[11px] text-[0.9rem] font-semibold cursor-pointer transition-all duration-300 border-[1.5px] whitespace-nowrap ${
              role === "company"
                ? "text-white border-transparent"
                : "bg-white text-forest border-teal hover:bg-background-soft hover:border-forest"
            }`}
            style={
              role === "company"
                ? {
                    background: "linear-gradient(135deg, #0d4f3c, #0f9e76)",
                    boxShadow: "0 4px 14px rgba(13,79,60,0.3)",
                  }
                : {}
            }
            id="auth-toggle-company"
          >
            <Building2 size={18} />
            I&apos;m hiring
          </button>
        </div>

        {/* Form */}
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

            {/* Forgot password — sign-in only */}
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

            {/* Submit */}
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

            {/* Toggle sign-in / sign-up */}
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
