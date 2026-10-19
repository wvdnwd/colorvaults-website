export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const languageSitemaps = ['en', 'nl'].map(lang => `${SITE_ORIGIN}/sitemap-pages/${lang}`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: [
      `${SITE_ORIGIN}/sitemap-index.xml`,
      ...languageSitemaps,
    ],
  };
}

