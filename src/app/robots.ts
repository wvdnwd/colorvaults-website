export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: [
      'https://colorvaults.com/sitemap.xml',
      'https://colorvaults.com/sitemap-pages/en',
      'https://colorvaults.com/sitemap-pages/nl',
    ],
  };
}
