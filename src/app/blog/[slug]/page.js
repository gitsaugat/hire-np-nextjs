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
import { BlogPostSchema } from '@/components/schema/BlogPostSchema';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const url = `https://hire-np.com/blog/${slug}`;
  const keywords = [
    ...(post.keywords || []),
    'HireNP',
    'hiring software Nepal',
    'AI recruitment Nepal',
  ];

  return {
    title: `${post.title} | HireNP Blog`,
    description: post.excerpt,
    keywords,
    authors: [{ name: 'HireNP Team' }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url,
      tags: post.keywords || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
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
    <div className="flex flex-col min-h-screen bg-white">
      <BlogPostSchema
        title={post.title}
        excerpt={post.excerpt}
        date={post.date}
        slug={slug}
        readTime={post.readTime}
      />
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <article className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ARTICLE CONTENT */}
            <div className="lg:w-[68%]">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-500 hover:text-ink-900 mb-6 transition-colors">
                ← Back to blog
              </Link>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-primary text-[9px] font-bold uppercase tracking-[0.14em] mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-ink-900 leading-[1.1] tracking-[-0.02em] mb-5 text-balance">
                {post.title}
              </h1>
              <p className="text-[16px] text-ink-500 leading-relaxed mb-7">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-[12px] font-medium text-ink-400 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center font-bold text-white text-[11px]">
                    H
                  </div>
                  <span className="text-ink-900 font-semibold text-[13px]">HireNP Team</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-ink-200" />
                <span>{post.readTime} read</span>
                <span className="w-1 h-1 rounded-full bg-ink-200" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>

              <div className="h-px bg-black/[0.06] w-full mb-8"></div>

              <div className="prose prose-base max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-ink-900 prose-p:text-ink-700 prose-p:leading-relaxed prose-strong:text-ink-900 prose-li:text-ink-700 prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline">
                <MDXRemote source={post.content} components={components} />
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:w-[32%]">
              <div className="sticky top-24 space-y-7">
                {/* CTA CARD */}
                <div className="card p-6 bg-[#FAFAF7]">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
                    <span className="w-3 h-px bg-brand-primary/50" /> Free trial
                  </span>
                  <h3 className="text-lg font-serif text-ink-900 mb-2 leading-tight tracking-tight">Try HireNP free for 15 days</h3>
                  <p className="text-ink-500 mb-4 leading-relaxed text-[13px]">
                    Stop wasting weeks on candidates who were never going to make it.
                  </p>
                  <Link
                    href="https://app.hire-np.com/auth/login"
                    className="btn-primary w-full"
                  >
                    Start free trial
                  </Link>
                  <p className="text-center text-[10px] font-medium mt-2 text-ink-400 uppercase tracking-[0.14em]">
                    No credit card required
                  </p>
                </div>

                {/* TABLE OF CONTENTS */}
                {toc.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-semibold text-ink-400 uppercase tracking-[0.16em] mb-3">On this page</h4>
                    <ul className="space-y-2 border-l border-black/[0.06] pl-4">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-ink-500 hover:text-brand-primary font-medium text-[13px] transition-colors block leading-snug"
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
                    <h4 className="text-[10px] font-semibold text-ink-400 uppercase tracking-[0.16em] mb-3">Related</h4>
                    <div className="space-y-4">
                      {relatedPosts.map((p) => (
                        <div key={p.slug} className="group">
                          <Link href={`/blog/${p.slug}`}>
                            <span className="text-[9px] font-bold text-brand-primary uppercase tracking-[0.14em] mb-1 block">
                              {p.category}
                            </span>
                            <h5 className="font-semibold text-ink-900 group-hover:text-brand-primary transition-colors leading-snug text-[13px]">
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
