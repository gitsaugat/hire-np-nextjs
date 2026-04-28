import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl border-t border-white/40 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.jpg" 
            alt="HireNP Logo" 
            width={150} 
            height={40} 
            className="h-8 w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>

        <nav className="flex items-center gap-6">
          <Link href="#product" className="text-sm font-bold text-slate-600 hover:text-slate-900">Product</Link>
          <Link href="#company" className="text-sm font-bold text-slate-600 hover:text-slate-900">Company</Link>
          <Link href="#blog" className="text-sm font-bold text-slate-600 hover:text-slate-900">Blog</Link>
          <Link href="#privacy" className="text-sm font-bold text-slate-600 hover:text-slate-900">Privacy</Link>
          <Link href="#terms" className="text-sm font-bold text-slate-600 hover:text-slate-900">Terms</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm font-medium">
          © 2026 HireNP. Built for HR teams who have better things to do.
        </p>
      </div>
    </footer>
  );
}
