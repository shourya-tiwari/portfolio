import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/* Required by Next 16 for metadata routes under `output: 'export'` — there is no
   server to regenerate this, so it must be declared static at build time. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
