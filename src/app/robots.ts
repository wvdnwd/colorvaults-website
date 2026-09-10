export const dynamic ='force-static';
import type { MetadataRoute } from'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent:'*',
        allow:'/',
        disallow: ['/api/'],
      },
    ],
    sitemap: [
      'https://www.colorvaults.com/sitemap.xml',
      'https://www.colorvaults.com/sitemap-pages/en',
      'https://www.colorvaults.com/sitemap-pages/nl',
      'https://www.colorvaults.com/sitemap-pages/de',
      'https://www.colorvaults.com/sitemap-pages/fr',
    ],
  };
}
