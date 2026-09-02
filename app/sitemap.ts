import type { MetadataRoute } from 'next';

import { getProjects } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

/* Required by Next 16 for metadata routes under `output: 'export'` — there is no
   server to regenerate this, so it must be declared static at build time. */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/about'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = getProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
