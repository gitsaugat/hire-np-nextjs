"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function BlogList({ allPosts }) {
  const categories = ["All", "Hiring Tips", "AI in Hiring", "Startup Hiring", "HR Strategy", "Product Updates"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <>
      {/* FILTERS */}
      <section className="px-5 lg:px-6 max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-semibold text-[12px] transition-all ${
                activeCategory === cat
                ? 'bg-ink-900 text-white'
                : 'bg-[#FAFAF7] text-ink-500 hover:text-ink-900 hover:bg-ink-50 border border-black/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="px-5 lg:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="group card overflow-hidden flex flex-col"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full p-6">
                <span className="inline-flex self-start items-center px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-primary text-[9px] font-bold uppercase tracking-[0.14em] mb-4">
                  {post.category}
                </span>
                <h2 className="text-[15px] font-semibold text-ink-900 mb-2 leading-snug tracking-tight group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-ink-500 text-[13px] leading-relaxed mb-5 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-ink-400">
                    <span>{post.readTime} read</span>
                    <span className="w-1 h-1 rounded-full bg-ink-200" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <ArrowRight size={13} className="text-brand-primary transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-ink-500 text-[14px] font-medium">No posts found.</p>
          </div>
        )}
      </section>
    </>
  );
}
