"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-[60] w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-20">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.jpg" 
              alt="HireNP Logo" 
              width={150} 
              height={40} 
              className="h-8 w-auto object-contain mix-blend-multiply"
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              How it works
            </Link>
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            <Link href="#blog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Blog
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center">
          <Link 
            href="https://app.hire-np.com/auth/login" 
            className="px-5 py-2.5 bg-[#22c55e] text-white text-sm font-bold rounded-full hover:bg-[#16a34a] transition-all"
          >
            Get Early Access
          </Link>
        </div>

        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex flex-col gap-4 shadow-xl">
          <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600">
            How it works
          </Link>
          <Link href="#features" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600">
            Features
          </Link>
          <Link href="#pricing" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600">
            Pricing
          </Link>
          <Link href="#blog" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600">
            Blog
          </Link>
          <Link 
            href="https://app.hire-np.com/auth/login" 
            onClick={() => setIsOpen(false)} 
            className="w-full text-center mt-4 px-6 py-3 bg-[#22c55e] text-white text-sm font-bold rounded-full"
          >
            Get Early Access
          </Link>
        </div>
      )}
    </header>
  );
}
