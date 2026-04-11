import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { inputBase, inputError, iconClasses } from "./AuthStyles";

function PasswordInput({ field, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      {field.icon && <field.icon size={18} className={iconClasses} />}
      <input
        type={show ? "text" : "password"}
        name={field.name}
        placeholder={field.placeholder || field.label}
        value={value}
        onChange={onChange}
        className={`${inputBase} ${error ? inputError : ""}`}
        id={`auth-input-${field.name}`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-teal transition-colors p-1"
        tabIndex="-1"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function SelectInput({ field, value, onChange, error }) {
  return (
    <div className="relative">
      {field.icon && <field.icon size={18} className={iconClasses} />}
      <select
        name={field.name}
        value={value}
        onChange={onChange}
        className={`${inputBase} appearance-none pr-10 ${error ? inputError : ""}`}
        id={`auth-input-${field.name}`}
      >
        <option value="" disabled>
          {field.label}
        </option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
    </div>
  );
}

export default function FormField({ field, value, onChange, error }) {
  if (field.type === "password") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.85rem] font-semibold text-forest/80 ml-1">
          {field.label}
        </label>
        <PasswordInput field={field} value={value} onChange={onChange} error={error} />
        {error && <span className="text-[0.75rem] text-red-500 font-medium ml-1">{error}</span>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.85rem] font-semibold text-forest/80 ml-1">
          {field.label}
        </label>
        <SelectInput field={field} value={value} onChange={onChange} error={error} />
        {error && <span className="text-[0.75rem] text-red-500 font-medium ml-1">{error}</span>}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5 cursor-pointer group py-1">
          <div className="relative flex items-center mt-0.5">
            <input
              type="checkbox"
              name={field.name}
              checked={value}
              onChange={onChange}
              className="peer h-4 w-4 rounded border-[#d1e8e0] text-teal focus:ring-teal cursor-pointer transition-all"
              id={`auth-input-${field.name}`}
            />
          </div>
          <span className="text-[0.85rem] text-text-muted group-hover:text-forest transition-colors leading-tight">
            {field.label}
          </span>
        </label>
        {error && <span className="text-[0.75rem] text-red-500 font-medium ml-1">{error}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.85rem] font-semibold text-forest/80 ml-1">
        {field.label}
      </label>
      <div className="relative">
        {field.icon && <field.icon size={18} className={iconClasses} />}
        <input
          type={field.type}
          name={field.name}
          placeholder={field.placeholder || field.label}
          value={value}
          onChange={onChange}
          className={`${inputBase} ${error ? inputError : ""}`}
          id={`auth-input-${field.name}`}
        />
      </div>
      {error && <span className="text-[0.75rem] text-red-500 font-medium ml-1">{error}</span>}
    </div>
  );
}
