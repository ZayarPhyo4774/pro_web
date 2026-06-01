import type { MetadataRoute } from 'next';
import { getCollections, getProducts } from '../lib/data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/collections',
    '/about',
    '/contact',
    '/inquiry',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
