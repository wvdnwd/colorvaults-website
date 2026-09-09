import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hubFilter = searchParams.get('hub');

    const dataPath = path.join(process.cwd(), 'src', 'data', 'en', 'coloring-pages.json');
    if (!fs.existsSync(dataPath)) {
      return new NextResponse('Data not found', { status: 404 });
    }

    const allPages = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Filter by hub if specified, or all valid pages
    let validPages = allPages.filter((p: any) => p.image && !p.image.includes('default.jpg'));
    if (hubFilter) {
      const filtered = validPages.filter((p: any) => p.parentHub === hubFilter);
      if (filtered.length > 0) {
        validPages = filtered;
      }
    }
    
    // Rotate items daily based on day of the year
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
      const hub = page.parentHub || 'disney-pixar';
      const theme = page.parentTheme || 'frozen';
      const age = page.ageGroup || 'kids';
      const slug = page.slug;
      const title = page.title || 'Free Coloring Page';
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

    const channelTitle = hubFilter 
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
