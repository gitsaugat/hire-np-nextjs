export function BlogPostSchema({ title, excerpt, date, slug, readTime }) {
  const minutes = readTime ? String(readTime).match(/\d+/)?.[0] : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt,
    "datePublished": date,
    "dateModified": date,
    "author": {
      "@type": "Organization",
      "name": "HireNP",
      "url": "https://hire-np.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "HireNP",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hire-np.com/logo.jpg",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hire-np.com/blog/${slug}`,
    },
    ...(minutes ? { "timeRequired": `PT${minutes}M` } : {}),
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": "AI Hiring Software Nepal",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
