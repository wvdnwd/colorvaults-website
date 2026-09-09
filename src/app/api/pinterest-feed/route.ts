import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function cleanTitle(title: string, theme: string, hub: string): string {
  if (!title) return 'Coloring Page';
  
  let cleaned = title.trim();
  
  // Fix known truncated titles like "A Mythical F", "A Clean Printa", etc.
  if (cleaned.toLowerCase().startsWith('a mythical f')) {
    cleaned = cleaned.replace(/A Mythical F\b/i, 'Mythical Fantasy Creature');
  }
  if (cleaned.toLowerCase().startsWith('a clean printa')) {
    cleaned = cleaned.replace(/A Clean Printa\b/i, 'Pixel Game World Scene');
  }
  
  // If title is super short (like "A" or "The"), use theme name
  if (cleaned.length <= 3) {
    const formattedTheme = theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    cleaned = `${formattedTheme} Illustration`;
  }
  
  return cleaned;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hubFilter = searchParams.get('hub')?.toLowerCase();
    const themeFilter = searchParams.get('theme')?.toLowerCase();

    const dataPath = path.join(process.cwd(), 'src', 'data', 'en', 'coloring-pages.json');
    if (!fs.existsSync(dataPath)) {
      return new NextResponse('Data not found', { status: 404 });
    }

    const allPages = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Filter valid pages with images
    let validPages = allPages.filter((p: any) => p.image && !p.image.includes('default.jpg'));
    
    if (hubFilter === 'anime-manga') {
      // Strictly popular anime & manga themes only!
      const animeThemes = [
        'dragonball', 'naruto', 'one-piece', 'demon-slayer', 'jujutsu-kaisen',
        'my-hero-academia', 'studio-ghibli-spirited-away', 'studio-ghibli-totoro',
        'studio-ghibli-howl-moving-castle', 'bleach', 'sailor-moon', 'spy-x-family',
        'hunter-x-hunter', 'fullmetal-alchemist'
      ];
      validPages = validPages.filter((p: any) => animeThemes.includes(p.parentTheme));
    } else if (hubFilter === 'halloween') {
      validPages = validPages.filter((p: any) => 
        (p.parentTheme || '').toLowerCase().includes('halloween') ||
        (p.title || '').toLowerCase().includes('halloween')
      );
    } else if (hubFilter) {
      validPages = validPages.filter((p: any) => (p.parentHub || '').toLowerCase() === hubFilter);
    } else if (themeFilter) {
      validPages = validPages.filter((p: any) => (p.parentTheme || '').toLowerCase().includes(themeFilter));
    }
    
    // Rotate items daily
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const batchSize = 50;
    const startIndex = (dayOfYear * 25) % Math.max(1, validPages.length - batchSize);
    const selectedPages = validPages.slice(startIndex, startIndex + batchSize);

    const escapeXml = (unsafe: string) => {
      if (!unsafe) return '';
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const itemsXml = selectedPages.map((page: any) => {
      const hub = page.parentHub || 'anime-manga';
      const theme = page.parentTheme || 'dragonball';
      const age = page.ageGroup || 'kids';
      const slug = page.slug;
      const rawTitle = page.title || 'Coloring Page';
      const title = cleanTitle(rawTitle, theme, hub);
      const imgUrl = page.image || page.downloadableFile;
      const pageUrl = `https://www.colorvaults.com/en/${hub}/${theme}/${age}/${slug}`;
      const description = `Download & print this free ${title} coloring page! High-resolution A4 & Letter PDF format ready to print at home or school. 100% free with no sign-up required on ColorVaults.com.`;

      return `
    <item>
      <title>${escapeXml(title)} - Free Printable Coloring Page</title>
      <link>${escapeXml(pageUrl)}</link>
      <guid isPermaLink="true">${escapeXml(pageUrl)}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[<p>${description}</p><img src="${imgUrl}" alt="${escapeXml(title)}" />]]></description>
      <enclosure url="${escapeXml(imgUrl)}" type="image/webp" length="102400" />
    </item>`;
    }).join('');

    const channelTitle = hubFilter === 'anime-manga'
      ? 'ColorVaults - Anime & Manga Coloring Pages'
      : hubFilter
      ? `ColorVaults - ${hubFilter} Coloring Pages`
      : 'ColorVaults - Free Printable Coloring Pages';

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>https://www.colorvaults.com</link>
    <description>Daily free high-resolution printable coloring pages for kids, toddlers, teens, and adults.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.colorvaults.com/api/pinterest-feed" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err: any) {
    return new NextResponse(`Error generating feed: ${err.message}`, { status: 500 });
  }
}
