import type { MetadataRoute } from 'next';
import { getMainHubs, getThemes, getAgePages, getFeaturedPages } from '@/lib/api';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ['en', 'nl', 'de', 'fr'] as const;
  const entries: MetadataRoute.Sitemap = [
    // Homepages
    {
      url: 'https://colorvaults.com/en',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://colorvaults.com/nl',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://colorvaults.com/de',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://colorvaults.com/fr',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  for (const lang of langs) {
    const hubs = getMainHubs(lang);
    const themes = getThemes(lang);
    const agePages = getAgePages(lang);
    const featuredPages = getFeaturedPages(lang, 50);

    // Hub pages
    for (const hub of hubs) {
      entries.push({
        url: `https://colorvaults.com/${lang}/${hub.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // Theme pages
    for (const theme of themes) {
      entries.push({
        url: `https://colorvaults.com/${lang}/${theme.parentHub}/${theme.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    // Age-group listing pages
    for (const agePage of agePages) {
      entries.push({
        url: `https://colorvaults.com/${lang}/${agePage.parentHub}/${agePage.parentTheme}/${agePage.ageGroup}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    // Featured coloring pages
    for (const page of featuredPages) {
      entries.push({
        url: `https://colorvaults.com/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
