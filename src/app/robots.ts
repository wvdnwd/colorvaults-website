export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { SITE_ORIGIN, VALID_LOCALES } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const languageSitemaps = VALID_LOCALES.map(lang => `${SITE_ORIGIN}/sitemap-pages/${lang}`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: [
      `${SITE_ORIGIN}/sitemap.xml`,
      ...languageSitemaps,
    ],
  };
}
