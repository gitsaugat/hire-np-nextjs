import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MasterComparisonTable } from '@/components/blog/MasterComparisonTable';
import { PricingComparison } from '@/components/blog/PricingComparison';
import { HireNPAdvantage } from '@/components/blog/HireNPAdvantage';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | HireNP Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  // Generate Table of Contents from H2s
  const toc = [];
  const h2Regex = /##\s+(.*)/g;
  let match;
  while ((match = h2Regex.exec(post.content)) !== null) {
    const title = match[1];
    const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    toc.push({ title, id });
  }

  // Simple component to handle H2 IDs for TOC linking
  const components = {
    h2: (props) => {
      const extractText = (node) => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node.props && node.props.children) return extractText(node.props.children);
        return '';
      };
      
      const text = extractText(props.children);
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return <h2 id={id} {...props} />;
    },
    ComparisonTable: MasterComparisonTable,
    MasterComparisonTable,
    PricingComparison,
    HireNPAdvantage,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <article className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* ARTICLE CONTENT */}
            <div className="lg:w-[70%]">
              <span className="inline-block px-3 py-1 rounded-full bg-[#00B67A]/10 text-[#00B67A] text-[10px] font-bold uppercase tracking-widest mb-6">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#0A0F1E] leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-[#6B7280] font-medium leading-relaxed mb-8">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm font-bold text-[#9CA3AF] mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center border border-[#E5E7EB] text-[#00B67A]">
                    H
                  </div>
                  <span>HireNP Team</span>
                </div>
                <span>{post.readTime} read</span>
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              
              <div className="h-px bg-[#E5E7EB] w-full mb-12"></div>
              
              <div className="prose prose-lg prose-emerald max-w-none prose-headings:font-serif prose-headings:text-[#0A0F1E] prose-p:text-[#4B5563] prose-p:font-medium prose-p:leading-relaxed prose-strong:text-[#0A0F1E] prose-li:text-[#4B5563] prose-li:font-medium">
                <MDXRemote source={post.content} components={components} />
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:w-[30%]">
              <div className="sticky top-32 space-y-12">
                {/* CTA CARD */}
                <div className="bg-[#00B67A] rounded-3xl p-8 text-white shadow-xl shadow-[#00B67A]/20">
                  <h3 className="text-2xl font-serif mb-4 text-white">Try HireNP free for 15 days</h3>
                  <p className="text-white/80 font-medium mb-8 leading-relaxed">
                    Stop wasting weeks on candidates who were never going to make it. Start your free trial today.
                  </p>
                  <Link 
                    href="https://app.hire-np.com/auth/login"
                    className="block w-full bg-[#0A0F1E] text-white py-4 rounded-full font-bold text-center hover:bg-black transition-all shadow-lg"
                  >
                    Start Free Trial
                  </Link>
                  <p className="text-center text-[10px] font-bold mt-4 text-white/60">
                    NO CREDIT CARD REQUIRED
                  </p>
                </div>

                {/* TABLE OF CONTENTS */}
                {toc.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-6">Table of Contents</h4>
                    <ul className="space-y-4">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a 
                            href={`#${item.id}`}
                            className="text-[#6B7280] hover:text-[#00B67A] font-medium text-sm transition-colors"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* RELATED POSTS */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-6">Related Posts</h4>
                    <div className="space-y-8">
                      {relatedPosts.map((p) => (
                        <div key={p.slug} className="group">
                          <Link href={`/blog/${p.slug}`}>
                            <span className="text-[10px] font-bold text-[#00B67A] uppercase tracking-widest mb-2 block">
                              {p.category}
                            </span>
                            <h5 className="font-bold text-[#0A0F1E] group-hover:text-[#00B67A] transition-colors leading-snug">
                              {p.title}
                            </h5>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
