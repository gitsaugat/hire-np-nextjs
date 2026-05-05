import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/blog/utils';
import BlogList from './BlogList';

export const metadata = {
  title: "HireNP Blog — Hiring Intelligence & AI Hiring Guides",
  description: "Practical guides on AI hiring, startup recruiting, HR strategy, and how to hire faster with less effort.",
};

export default function BlogIndex() {
  const allPosts = getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#0A0F1E] mb-6">
            The HireNP Blog
          </h1>
          <p className="text-[#6B7280] text-lg md:text-xl font-medium max-w-3xl mx-auto">
            Hiring intelligence, AI trends, and practical guides for modern teams.
          </p>
        </section>

        <BlogList allPosts={allPosts} />

      </main>
      <Footer />
    </div>
  );
}
