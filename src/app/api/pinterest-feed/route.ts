import { NextResponse } from 'next/server';
import { getColoringPagesForTheme, getMainHubs, getThemes } from '@/lib/api';
import {
  filterPinterestPages,
  escapeRssXml,
  renderPinterestRssItem,
  resolvePinterestFilters,
  selectDailyPinterestPages,
} from '@/lib/pinterestFeed';
import { getCanonicalUrl } from '@/lib/site';

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.getAll('hub').length > 1 || searchParams.getAll('theme').length > 1) {
      return new NextResponse('Duplicate filters are not allowed.', { status: 400 });
    }

    const hubs = getMainHubs('en');
    const themes = getThemes('en');
    const resolved = resolvePinterestFilters(searchParams.get('hub'), searchParams.get('theme'), hubs, themes);
    if ('error' in resolved) return new NextResponse(resolved.error, { status: 400 });

    const catalogThemes = themes.filter(theme =>
      (!resolved.filters.hub || theme.parentHub === resolved.filters.hub)
      && (!resolved.filters.theme || theme.slug === resolved.filters.theme),
    );
    const shardPages = catalogThemes.flatMap(theme => getColoringPagesForTheme('en', theme.parentHub, theme.slug));
    const validPages = filterPinterestPages(shardPages, resolved.filters);

    const now = new Date();
    const publicationDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toUTCString();
    const selectedPages = selectDailyPinterestPages(validPages, now);
    const itemsXml = selectedPages.map(page => renderPinterestRssItem(page, publicationDate)).join('\n');

    const selectedHub = resolved.filters.hub && hubs.find(hub => hub.slug === resolved.filters.hub);
    const selectedTheme = resolved.filters.theme && themes.find(theme =>
      theme.slug === resolved.filters.theme && (!resolved.filters.hub || theme.parentHub === resolved.filters.hub),
    );
    const channelTitle = selectedTheme
      ? `ColorVaults - ${selectedTheme.title} Coloring Pages`
      : selectedHub
        ? `ColorVaults - ${selectedHub.title} Coloring Pages`
      : 'ColorVaults - Free Printable Coloring Pages';
    const selfParams = new URLSearchParams();
    if (resolved.filters.hub) selfParams.set('hub', resolved.filters.hub);
    if (resolved.filters.theme) selfParams.set('theme', resolved.filters.theme);
    const selfUrl = getCanonicalUrl(`/api/pinterest-feed${selfParams.size ? `?${selfParams}` : ''}`);

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeRssXml(channelTitle)}</title>
    <link>${getCanonicalUrl('/')}</link>
    <description>Daily free high-resolution printable coloring pages for kids, toddlers, teens, and adults.</description>
    <language>en-us</language>
    <lastBuildDate>${publicationDate}</lastBuildDate>
    <atom:link href="${escapeRssXml(selfUrl)}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=3600',
      },
    });
  } catch (error: unknown) {
    console.error('[ColorVaults] Failed to generate Pinterest feed:', error);
    return new NextResponse('Error generating feed.', { status: 500 });
  }
}
