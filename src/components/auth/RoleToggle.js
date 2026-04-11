import React from "react";
import { User, Building2 } from "lucide-react";

export default function RoleToggle({ role, setRole }) {
  return (
    <div className="flex bg-background-soft p-1 rounded-2xl border border-[#e2f2ed] mb-8" id="auth-role-toggle">
      <button
        type="button"
        onClick={() => setRole("candidate")}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
          role === "candidate"
            ? "bg-gradient-to-br from-[#0d4f3c] to-[#0f9e76] text-white shadow-md shadow-teal/20"
            : "bg-transparent text-[#0d4f3c] hover:bg-teal/5"
        }`}
        id="auth-toggle-candidate"
      >
        <User size={18} />
        Looking for work
      </button>
      <button
        type="button"
        onClick={() => setRole("company")}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
          role === "company"
            ? "bg-gradient-to-br from-[#0d4f3c] to-[#0f9e76] text-white shadow-md shadow-teal/20"
            : "bg-transparent text-[#0d4f3c] hover:bg-teal/5"
        }`}
        id="auth-toggle-company"
      >
        <Building2 size={18} />
        I&apos;m hiring
      </button>
    </div>
  );
}
