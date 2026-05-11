"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#how-it-works", label: "Product" },
    { href: "/#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/why-hirenp", label: "Why HireNP" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header
      className={`fixed top-0 z-[60] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-black/[0.06]"
          : "bg-white/0"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 lg:px-6 h-14">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.jpg"
              alt="HireNP"
              width={120}
              height={32}
              className="h-6 w-auto object-contain mix-blend-multiply"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-[13px] font-medium text-ink-500 hover:text-ink-900 transition-colors rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Link
            href="https://app.hire-np.com/auth/login"
            className="px-3 py-1.5 text-[13px] font-medium text-ink-500 hover:text-ink-900 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="https://app.hire-np.com/auth/login"
            className="btn-primary"
          >
            Start free
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-1.5 -mr-1.5 text-ink-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-black/[0.06] px-5 py-4 flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[14px] font-medium text-ink-900 py-2.5 border-b border-black/[0.04] last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://app.hire-np.com/auth/login"
            onClick={() => setIsOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            Start free
          </Link>
        </div>
      )}
    </header>
  );
}
