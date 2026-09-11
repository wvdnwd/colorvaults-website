import { SITE_ORIGIN, escapeXml, ValidLocale } from '@/lib/site';
import { getMainHubs, getThemes, getAgePages, getColoringPages } from '@/lib/api';
import { blogPosts } from '@/data/blogs';
import { HOW_TO_DRAW_LESSONS } from '@/data/howToDrawData';

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export function generateSitemapUrlsForLocale(lang: ValidLocale): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];
  const buildDate = new Date().toISOString().split('T')[0];

  // Homepage
  entries.push({
    loc: `${SITE_ORIGIN}/${lang}`,
    lastmod: buildDate,
    changefreq: 'daily',
    priority: '1.0',
  });

  // Standalone core sections
  entries.push({
    loc: `${SITE_ORIGIN}/${lang}/calendars`,
    lastmod: buildDate,
    changefreq: 'weekly',
    priority: '0.8',
  });

  entries.push({
    loc: `${SITE_ORIGIN}/${lang}/school`,
    lastmod: buildDate,
    changefreq: 'weekly',
    priority: '0.8',
  });

  // Blog & How-to-Draw (currently published in EN and NL)
  if (lang === 'en' || lang === 'nl') {
    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/blog`,
      lastmod: buildDate,
      changefreq: 'weekly',
      priority: '0.7',
    });

    const posts = blogPosts[lang] || [];
    for (const post of posts) {
      entries.push({
        loc: `${SITE_ORIGIN}/${lang}/blog/${post.slug}`,
        lastmod: buildDate,
        changefreq: 'monthly',
        priority: '0.6',
      });
    }

    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/how-to-draw`,
      lastmod: buildDate,
      changefreq: 'weekly',
      priority: '0.7',
    });

    for (const lesson of HOW_TO_DRAW_LESSONS) {
      entries.push({
        loc: `${SITE_ORIGIN}/${lang}/how-to-draw/${lesson.slug}`,
        lastmod: buildDate,
        changefreq: 'monthly',
        priority: '0.6',
      });
    }
  }

  // Hubs
  const hubs = getMainHubs(lang);
  for (const hub of hubs) {
    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/${hub.slug}`,
      lastmod: buildDate,
      changefreq: 'weekly',
      priority: '0.9',
    });
  }

  // Themes
  const themes = getThemes(lang);
  for (const theme of themes) {
    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/${theme.parentHub}/${theme.slug}`,
      lastmod: buildDate,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  // Age pages
  const agePages = getAgePages(lang);
  for (const age of agePages) {
    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/${age.parentHub}/${age.parentTheme}/${age.ageGroup}`,
      lastmod: buildDate,
      changefreq: 'weekly',
      priority: '0.7',
    });
  }

  // Coloring pages (all published pages for this language)
  const coloringPages = getColoringPages(lang);
  for (const page of coloringPages) {
    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`,
      lastmod: buildDate,
      changefreq: 'monthly',
      priority: '0.6',
    });
  }

  return entries;
}

export function buildSitemapXml(entries: SitemapUrlEntry[]): string {
  const urlNodes = entries
    .map(entry => {
      const loc = escapeXml(entry.loc);
      const lastmodTag = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>`;
}

export function buildSitemapIndexXml(): string {
  const buildDate = new Date().toISOString().split('T')[0];
  const sitemaps = ['en', 'nl', 'de', 'fr'].map(lang => {
    const loc = `${SITE_ORIGIN}/sitemap-pages/${lang}`;
    return `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;
}

