import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const columns = {
    platform: {
      heading: 'Platform',
      links: [
        { name: 'How it works', href: '/#how-it-works' },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '/about' },
      ],
    },
    resources: {
      heading: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: "Who it's for", href: '/best-for' },
        { name: 'Why HireNP', href: '/why-hirenp' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    company: {
      heading: 'Company',
      links: [
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ],
    },
  };

  const social = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-white border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-5 lg:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <Image src="/logo.jpg" alt="HireNP" width={120} height={32} className="h-6 w-auto object-contain mix-blend-multiply" />
            </Link>
            <p className="text-ink-500 text-[13px] leading-relaxed max-w-xs">
              AI-native hiring intelligence. One platform that explains every decision — from job post to signed offer.
            </p>
          </div>

          {Object.values(columns).map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] font-semibold text-ink-400 uppercase tracking-[0.16em] mb-4">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[13px] text-ink-700 hover:text-brand-primary transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-ink-400 font-medium">
            © {new Date().getFullYear()} HireNP. Built for global hiring teams.
          </p>
          <div className="flex items-center gap-4">
            {social.map((link) => (
              <Link key={link.name} href={link.href} className="text-ink-400 hover:text-brand-primary transition-colors text-[11px] font-semibold uppercase tracking-[0.14em]">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
