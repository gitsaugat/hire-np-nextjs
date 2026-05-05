import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  const links = {
    platform: [
      { name: 'How it works', href: '/#how-it-works' },
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'About', href: '/about' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Who It\'s For', href: '/best-for' },
      { name: 'Why HireNP', href: '/why-hirenp' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Compare', href: '/why-hirenp#comparison' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      { name: 'LinkedIn', href: 'https://linkedin.com' },
      { name: 'Twitter', href: 'https://twitter.com' },
    ]
  };

  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs font-medium">
              AI-native hiring intelligence platform serving companies in the USA and Nepal.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0A0F1E] mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4">
              {links.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#6B7280] hover:text-[#00B67A] transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0A0F1E] mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#6B7280] hover:text-[#00B67A] transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0A0F1E] mb-6 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#6B7280] hover:text-[#00B67A] transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} HireNP. All rights reserved. Built for USA & Nepal.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {links.social.map((link) => (
                <Link key={link.name} href={link.href} className="text-[#9CA3AF] hover:text-[#00B67A] transition-colors">
                  <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                </Link>
              ))}
            </div>
            <span className="text-xs text-[#9CA3AF] flex items-center gap-1.5 font-bold uppercase tracking-widest">
              🇺🇸 USA · 🇳🇵 Nepal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
