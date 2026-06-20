import type { MetadataRoute } from 'next';

import { getSiteUrl, PUBLIC_ROUTES } from '@/lib/constants/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return PUBLIC_ROUTES.map(path => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
