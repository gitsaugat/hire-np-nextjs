import { User, Mail, Phone, Lock, Building2, Users } from "lucide-react";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^9[78]\d{8}$/;

export function validate(fields, values) {
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

export const companySizes = ["1–20 employees", "21–50 employees", "51–200 employees", "200+ employees"];

export const candidateSignup = [
  { name: "fullName", label: "Full name", type: "text", icon: User, required: true },
  { name: "email", label: "Email address", type: "email", icon: Mail, required: true },
  { name: "phone", label: "Phone number", type: "tel", icon: Phone, placeholder: "98XXXXXXXX", required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
  { name: "confirmPassword", label: "Confirm password", type: "password", icon: Lock, required: true },
  { name: "terms", label: "I agree to the Terms of Service", type: "checkbox", required: true, full: true },
];

export const candidateSignin = [
  { name: "email", label: "Email", type: "email", icon: Mail, required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
];

export const companySignup = [
  { name: "companyName", label: "Company name", type: "text", icon: Building2, required: true },
  { name: "contactName", label: "Your name (contact person)", type: "text", icon: User, required: true },
  { name: "email", label: "Work email", type: "email", icon: Mail, required: true },
  { name: "phone", label: "Phone number", type: "tel", icon: Phone, placeholder: "98XXXXXXXX", required: true },
  { name: "companySize", label: "Company size", type: "select", icon: Users, options: companySizes, required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
  { name: "confirmPassword", label: "Confirm password", type: "password", icon: Lock, required: true },
  { name: "terms", label: "I agree to the Terms of Service", type: "checkbox", required: true, full: true },
];

export const companySignin = [
  { name: "email", label: "Work email", type: "email", icon: Mail, required: true },
  { name: "password", label: "Password", type: "password", icon: Lock, required: true },
];
