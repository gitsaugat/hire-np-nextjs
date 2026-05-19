import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/blog/utils';
import BlogList from './BlogList';

export const metadata = {
  title: 'HireNP Blog — AI Hiring Nepal, Recruitment Tips & HR Strategy 2026',
  description:
    'Practical guides on AI hiring in Nepal, startup recruitment, replacing agencies with software, and building better hiring processes. Updated 2026.',
  keywords: [
    'hiring tips Nepal',
    'AI recruitment Nepal blog',
    'HR strategy Nepal',
    'recruitment guide Nepal 2026',
    'how to hire Nepal',
    'startup hiring tips',
  ],
  alternates: { canonical: 'https://hire-np.com/blog' },
  openGraph: {
    title: 'HireNP Blog — AI Hiring Nepal & HR Strategy 2026',
    description:
      'Guides on AI hiring in Nepal, startup recruitment, replacing agencies, and modern hiring processes.',
    url: 'https://hire-np.com/blog',
  },
};

export default function BlogIndex() {
  const allPosts = getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
              <span className="w-3 h-px bg-brand-primary/50" /> Blog
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-ink-900 mb-3 leading-[1.05] tracking-[-0.025em] text-balance">
              The HireNP blog.
            </h1>
            <p className="text-ink-500 text-[15px] max-w-xl mx-auto leading-relaxed">
              Hiring intelligence, AI trends, and practical guides for modern teams.
            </p>
          </div>
        </section>

        <div className="py-10 lg:py-12 pb-20">
          <BlogList allPosts={allPosts} />
        </div>

      </main>
      <Footer />
    </div>
  );
}
