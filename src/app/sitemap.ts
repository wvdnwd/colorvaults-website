import type { MetadataRoute } from 'next';
import { SITE_ORIGIN, VALID_LOCALES } from '@/lib/site';
import { getMainHubs, getThemes, getAgePages, getFeaturedPages } from '@/lib/api';
import { blogPosts } from '@/data/blogs';
import { HOW_TO_DRAW_LESSONS } from '@/data/howToDrawData';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const buildDate = new Date();

  for (const lang of VALID_LOCALES) {
    // Homepage
    entries.push({
      url: `${SITE_ORIGIN}/${lang}`,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 1.0,
    });

    // Calendars & School
    entries.push({
      url: `${SITE_ORIGIN}/${lang}/calendars`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    entries.push({
      url: `${SITE_ORIGIN}/${lang}/school`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Blog & How to Draw for languages that offer them
    if (lang === 'en' || lang === 'nl') {
      entries.push({
        url: `${SITE_ORIGIN}/${lang}/blog`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      const posts = blogPosts[lang] || [];
      for (const post of posts) {
        entries.push({
          url: `${SITE_ORIGIN}/${lang}/blog/${post.slug}`,
          lastModified: buildDate,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }

      entries.push({
        url: `${SITE_ORIGIN}/${lang}/how-to-draw`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      for (const lesson of HOW_TO_DRAW_LESSONS) {
        entries.push({
          url: `${SITE_ORIGIN}/${lang}/how-to-draw/${lesson.slug}`,
          lastModified: buildDate,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }

    // Hub pages
    const hubs = getMainHubs(lang);
    for (const hub of hubs) {
      entries.push({
        url: `${SITE_ORIGIN}/${lang}/${hub.slug}`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // Theme pages
    const themes = getThemes(lang);
    for (const theme of themes) {
      entries.push({
        url: `${SITE_ORIGIN}/${lang}/${theme.parentHub}/${theme.slug}`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    // Age-group listing pages
    const agePages = getAgePages(lang);
    for (const agePage of agePages) {
      entries.push({
        url: `${SITE_ORIGIN}/${lang}/${agePage.parentHub}/${agePage.parentTheme}/${agePage.ageGroup}`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    // Featured coloring pages
    const featuredPages = getFeaturedPages(lang, 50);
    for (const page of featuredPages) {
      entries.push({
        url: `${SITE_ORIGIN}/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`,
        lastModified: buildDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
