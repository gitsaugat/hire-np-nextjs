import { getBlogPosts } from '@/lib/blog/utils';

const baseUrl = 'https://hire-np.com';

const ROUTE_META = {
  '': { priority: 1.0, changeFrequency: 'daily' },
  '/pricing': { priority: 0.9, changeFrequency: 'weekly' },
  '/why-hirenp': { priority: 0.9, changeFrequency: 'weekly' },
  '/best-for': { priority: 0.8, changeFrequency: 'weekly' },
  '/faq': { priority: 0.8, changeFrequency: 'weekly' },
  '/blog': { priority: 0.8, changeFrequency: 'daily' },
  '/about': { priority: 0.7, changeFrequency: 'monthly' },
  '/contact': { priority: 0.7, changeFrequency: 'monthly' },
  '/privacy': { priority: 0.3, changeFrequency: 'yearly' },
  '/terms': { priority: 0.3, changeFrequency: 'yearly' },
};

export default async function sitemap() {
  const now = new Date().toISOString();

  const routes = Object.entries(ROUTE_META).map(([route, meta]) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: meta.changeFrequency,
    priority: meta.priority,
  }));

  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...posts];
}
