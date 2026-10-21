import { SITE_ORIGIN, escapeXml, ValidLocale } from '@/lib/site';
import { getMainHubs, getThemes, getColoringPagesForTheme } from '@/lib/api';
import { isOriginalHub } from '@/lib/seo';
import { blogPosts } from '@/data/blogs';
import { HOW_TO_DRAW_LESSONS } from '@/data/howToDrawData';

export interface SitemapImageEntry {
  loc: string;
  title: string;
  caption?: string;
}

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: SitemapImageEntry[];
}

export function generateSitemapUrlsForLocale(lang: ValidLocale): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];
  const buildDate = new Date().toISOString().split('T')[0];
  const isNl = lang === 'nl';

  // Homepage
  entries.push({
    loc: `${SITE_ORIGIN}/${lang}`,
    lastmod: buildDate,
    changefreq: 'daily',
    priority: '1.0',
  });

  // Standalone core & editorial sections
  const corePages: Array<{ path: string; changefreq: SitemapUrlEntry['changefreq']; priority: string }> = [
    { path: 'name-coloring-page', changefreq: 'weekly', priority: '0.9' },
    { path: 'calendars', changefreq: 'weekly', priority: '0.8' },
    { path: 'school', changefreq: 'weekly', priority: '0.8' },
    { path: 'how-to-draw', changefreq: 'weekly', priority: '0.8' },
    { path: 'blog', changefreq: 'weekly', priority: '0.8' },
    { path: 'about', changefreq: 'monthly', priority: '0.6' },
    { path: 'contact', changefreq: 'monthly', priority: '0.5' },
    { path: 'licensing', changefreq: 'monthly', priority: '0.5' },
    { path: 'privacy-policy', changefreq: 'monthly', priority: '0.4' },
    { path: 'terms-of-service', changefreq: 'monthly', priority: '0.4' },
    { path: 'ip-policy', changefreq: 'monthly', priority: '0.4' },
  ];

  for (const page of corePages) {
    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/${page.path}`,
      lastmod: buildDate,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  // Blog articles & How-to-Draw tutorials (published in EN and NL)
  if (lang === 'en' || lang === 'nl') {
    const posts = blogPosts[lang] || [];
    for (const post of posts) {
      entries.push({
        loc: `${SITE_ORIGIN}/${lang}/blog/${post.slug}`,
        lastmod: buildDate,
        changefreq: 'monthly',
        priority: '0.7',
      });
    }

    for (const lesson of HOW_TO_DRAW_LESSONS) {
      entries.push({
        loc: `${SITE_ORIGIN}/${lang}/how-to-draw/${lesson.slug}`,
        lastmod: buildDate,
        changefreq: 'monthly',
        priority: '0.7',
      });
    }
  }

  // Hubs (curated original category landing pages with rich SEO guides)
  const hubs = getMainHubs(lang).filter(h => isOriginalHub(h.slug));
  for (const hub of hubs) {
    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/${hub.slug}`,
      lastmod: buildDate,
      changefreq: 'weekly',
      priority: '0.9',
    });
  }

  // Themes (curated original theme albums with Google Image Sitemap entries for top clean pages)
  const themes = getThemes(lang).filter(t => isOriginalHub(t.parentHub));
  for (const theme of themes) {
    const topPages = getColoringPagesForTheme(lang, theme.parentHub, theme.slug).slice(0, 12);
    const images: SitemapImageEntry[] = topPages
      .filter(p => p.image && p.image.startsWith('http'))
      .map(p => ({
        loc: p.image,
        title: isNl ? `${p.title} Kleurplaat` : `${p.title} Coloring Page`,
        caption: isNl
          ? `Gratis printbare ${p.title} kleurplaat uit de ${theme.title} collectie (A4 PDF)`
          : `Free printable ${p.title} coloring page from the ${theme.title} collection (A4 PDF)`,
      }));

    entries.push({
      loc: `${SITE_ORIGIN}/${lang}/${theme.parentHub}/${theme.slug}`,
      lastmod: buildDate,
      changefreq: 'weekly',
      priority: '0.8',
      images,
    });
  }

  return entries;
}

export function buildSitemapXml(entries: SitemapUrlEntry[]): string {
  const urlNodes = entries
    .map(entry => {
      const loc = escapeXml(entry.loc);
      const lastmodTag = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
      const imageNodes = (entry.images || [])
        .map(
          img =>
            `\n    <image:image>\n      <image:loc>${escapeXml(img.loc)}</image:loc>\n      <image:title>${escapeXml(img.title)}</image:title>${
              img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : ''
            }\n    </image:image>`
        )
        .join('');
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>${imageNodes}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlNodes}\n</urlset>`;
}

export function buildSitemapIndexXml(): string {
  const buildDate = new Date().toISOString().split('T')[0];
  const sitemaps = ['en', 'nl'].map(lang => {
    const loc = `${SITE_ORIGIN}/sitemap-pages/${lang}`;
    return `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;
}
