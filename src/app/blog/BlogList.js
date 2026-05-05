"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogList({ allPosts }) {
  const categories = ["All", "Hiring Tips", "AI in Hiring", "Startup Hiring", "HR Strategy", "Product Updates"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <>
      {/* FILTERS */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat 
                ? 'bg-[#00B67A] text-white' 
                : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden flex flex-col hover:shadow-xl transition-all group"
            >
              <div className="p-8 flex-grow">
                <span className="inline-block px-3 py-1 rounded-full bg-[#00B67A]/10 text-[#00B67A] text-[10px] font-bold uppercase tracking-widest mb-4">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-[#0A0F1E] mb-4 group-hover:text-[#00B67A] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-[#9CA3AF]">
                  <span>{post.readTime} read</span>
                  <span className="w-1 h-1 rounded-full bg-[#E5E7EB]"></span>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="px-8 pb-8">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-[#00B67A] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read More <span>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#6B7280] font-medium">No posts found in this category.</p>
          </div>
        )}
      </section>
    </>
  );
}
