"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutionsLinks = [
    { name: 'For Startups', href: '/best-for#startups' },
    { name: 'For Growing Companies', href: '/best-for#growing' },
    { name: 'For HR Teams', href: '/best-for#hr-teams' },
    { name: 'For High Volume', href: '/best-for#high-volume' },
  ];

  const whyHireNPLinks = [
    { name: 'Why HireNP', href: '/why-hirenp' },
    { name: 'vs LinkedIn Recruiter', href: '/blog/hirenp-vs-linkedin-recruiter' },
    { name: 'vs Indeed', href: '/blog/hirenp-vs-indeed' },
    { name: 'vs Greenhouse', href: '/blog/hirenp-vs-greenhouse' },
    { name: 'vs Workable', href: '/blog/hirenp-vs-workable' },
    { name: 'vs Agencies', href: '/blog/hirenp-vs-traditional-recruiters' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('solutions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-bold text-[#6B7280] hover:text-[#00B67A] transition-colors py-2">
              Solutions <ChevronDown size={14} />
            </button>
            <div className={`absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-4 transition-all ${activeDropdown === 'solutions' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <div className="grid gap-2">
                {solutionsLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-sm font-medium text-[#6B7280] hover:text-[#00B67A] hover:bg-slate-50 p-2 rounded-lg transition-all">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('why')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-bold text-[#6B7280] hover:text-[#00B67A] transition-colors py-2">
              Why HireNP <ChevronDown size={14} />
            </button>
            <div className={`absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-4 transition-all ${activeDropdown === 'why' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <div className="grid gap-2">
                {whyHireNPLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-sm font-medium text-[#6B7280] hover:text-[#00B67A] hover:bg-slate-50 p-2 rounded-lg transition-all">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog" className="text-sm font-bold text-[#6B7280] hover:text-[#00B67A] transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="text-sm font-bold text-[#6B7280] hover:text-[#00B67A] transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-bold text-[#6B7280] hover:text-[#00B67A] transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="https://app.hire-np.com/auth/login" 
            className="text-sm font-bold text-black bg-white border border-[#E5E7EB] px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
          >
            For Candidates →
          </Link>
          <Link 
            href="https://app.hire-np.com/auth/login" 
            className="text-sm font-bold text-white bg-[#00B67A] px-5 py-2.5 rounded-full hover:bg-[#008F5E] transition-colors shadow-lg shadow-[#00B67A]/20"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-[#0A0F1E]" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 h-[calc(100vh-80px)] bg-white border-b border-[#E5E7EB] p-6 flex flex-col gap-6 shadow-xl overflow-y-auto">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Solutions</p>
            {solutionsLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block text-lg font-bold text-[#0A0F1E]" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Why HireNP</p>
            {whyHireNPLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block text-lg font-bold text-[#0A0F1E]" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </div>

          <Link href="/blog" className="text-lg font-bold text-[#0A0F1E]" onClick={() => setIsMobileMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/pricing" className="text-lg font-bold text-[#0A0F1E]" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/about" className="text-lg font-bold text-[#0A0F1E]" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          
          <div className="flex flex-col gap-4 pt-4 border-t border-[#E5E7EB]">
            <Link 
              href="https://app.hire-np.com/auth/login" 
              className="text-center font-bold text-black bg-white border border-[#E5E7EB] py-3 rounded-full"
            >
              For Candidates →
            </Link>
            <Link 
              href="https://app.hire-np.com/auth/login" 
              className="text-center font-bold text-white bg-[#00B67A] py-3 rounded-full shadow-lg shadow-[#00B67A]/20"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
