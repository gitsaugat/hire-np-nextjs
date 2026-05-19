import { getBlogPosts } from '@/lib/blog/utils';

export default async function sitemap() {
  const baseUrl = 'https://hire-np.com';

  // Core pages
  const routes = [
    '',
    '/about',
    '/best-for',
    '/blog',
    '/contact',
    '/faq',
    '/pricing',
    '/privacy',
    '/terms',
    '/why-hirenp',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts
  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
