import { NextResponse } from'next/server';
import { getColoringPages, getMainHubs, getThemes, getAgePages } from'@/lib/api';

export const dynamic ='force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const pages = getColoringPages(lang);
  const hubs = getMainHubs(lang);
  const themes = getThemes(lang);
  const agePages = getAgePages(lang);

  // Use build time as lastmod for static data
  const buildDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const urls: { loc: string; priority: string; changefreq: string }[] = [
    ...hubs.map(h => ({ loc:`https://colorvaults.com/${lang}/${h.slug}`, priority:'0.9', changefreq:'weekly'})),
    ...themes.map(t => ({ loc:`https://colorvaults.com/${lang}/${t.parentHub}/${t.slug}`, priority:'0.8', changefreq:'weekly'})),
    ...agePages.map(a => ({ loc:`https://colorvaults.com/${lang}/${a.parentHub}/${a.parentTheme}/${a.ageGroup}`, priority:'0.7', changefreq:'weekly'})),
    ...pages.map(p => ({ loc:`https://colorvaults.com/${lang}/${p.parentHub}/${p.parentTheme}/${p.ageGroup}/${p.slug}`, priority:'0.6', changefreq:'monthly'})),
  ];

  const xml =`<?xml version="1.0"encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(({ loc, priority, changefreq }) =>`<url>
    <loc>${loc}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {'Content-Type':'application/xml','Cache-Control':'public, max-age=86400, s-maxage=86400',
    },
  });
}
