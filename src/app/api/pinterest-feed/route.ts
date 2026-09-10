import path from 'node:path';
import { NextResponse } from 'next/server';
import coloringPages from '../../../data/en/coloring-pages.json';
import mainHubs from '../../../data/en/main-hubs.json';
import themes from '../../../data/en/themes.json';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SITE_ORIGIN = 'https://www.colorvaults.com';
const FEED_PATH = '/pinterest-feed.xml';
const BATCH_SIZE = 50;
const MAX_METADATA_CANDIDATES = 200;
const METADATA_CONCURRENCY = 10;
const METADATA_TIMEOUT_MS = 2_500;
const METADATA_CACHE_MAX_ENTRIES = 1_000;
const METADATA_SUCCESS_TTL_MS = 24 * 60 * 60 * 1000;
const METADATA_FAILURE_TTL_MS = 5 * 60 * 1000;
const DAILY_ROTATION = 25;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const ALLOWED_IMAGE_HOSTS = new Set(['colorvaults.ams3.cdn.digitaloceanspaces.com']);

export type ColoringPage = {
  title?: unknown;
  slug?: unknown;
  parentHub?: unknown;
  parentTheme?: unknown;
  ageGroup?: unknown;
  image?: unknown;
};

export type MediaMetadata = {
  byteLength: number;
  mimeType: string;
};

export type VerifiedPage<T> = {
  page: T;
  media: MediaMetadata;
};

type Hub = {
  slug?: unknown;
  title?: unknown;
};

type Theme = {
  slug?: unknown;
  title?: unknown;
  parentHub?: unknown;
};

type FeedData = {
  pages: ColoringPage[];
  hubs: Map<string, string>;
  themes: Map<string, { title: string; parentHub: string }>;
};

export type FeedFilters = {
  hub?: string;
  theme?: string;
};

type MetadataCacheEntry = {
  expiresAt: number;
  promise: Promise<MediaMetadata | undefined>;
};

let feedData: FeedData | undefined;
const metadataCache = new Map<string, MetadataCacheEntry>();

function asNonEmptyString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function loadFeedData(): FeedData {
  if (!feedData) {
    const hubs = new Map<string, string>();
    const themeMap = new Map<string, { title: string; parentHub: string }>();

    for (const rawHub of mainHubs as Hub[]) {
      const slug = asNonEmptyString(rawHub.slug);
      if (slug) hubs.set(slug, asNonEmptyString(rawHub.title) ?? slug);
    }

    for (const rawTheme of themes as Theme[]) {
      const slug = asNonEmptyString(rawTheme.slug);
      const parentHub = asNonEmptyString(rawTheme.parentHub);
      if (slug && parentHub && hubs.has(parentHub)) {
        themeMap.set(slug, {
          title: asNonEmptyString(rawTheme.title) ?? slug,
          parentHub,
        });
      }
    }

    feedData = { pages: coloringPages as ColoringPage[], hubs, themes: themeMap };
  }

  return feedData;
}

function cleanTitle(title: string | undefined, theme: string): string {
  if (!title) {
    const formattedTheme = theme.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    return `${formattedTheme} Coloring Sheet`;
  }

  let cleaned = title.trim();
  if (/^a\s+mythical\s+[a-z]?\s*(\(|$)/i.test(cleaned)) {
    cleaned = cleaned.replace(/^a\s+mythical\s+[a-z]?\b/i, 'Mythical Fantasy Beast');
  }
  if (/^a\s+clean\s+printa?\b/i.test(cleaned)) {
    cleaned = cleaned.replace(/^a\s+clean\s+printa?\b/i, 'Pixel Game World Scene');
  }

  if (cleaned.length <= 4) {
    const formattedTheme = theme.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    return `${formattedTheme} Printable`;
  }

  return cleaned;
}

function sanitizeXml10(value: string): string {
  return value.replace(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu, '');
}

export function escapeXml(value: string): string {
  return sanitizeXml10(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function wrapCdata(value: string): string {
  return `<![CDATA[${sanitizeXml10(value).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export function getImageMimeType(rawUrl: string): string | undefined {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'https:') return undefined;

    const extension = path.posix.extname(url.pathname).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.avif': 'image/avif',
      '.gif': 'image/gif',
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
    };
    return mimeTypes[extension];
  } catch {
    return undefined;
  }
}

export function selectDailyPages<T>(pages: T[], now: Date, limit = BATCH_SIZE): T[] {
  if (pages.length === 0 || limit <= 0) return [];

  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const dayNumber = Math.floor(utcMidnight / DAY_IN_MS);
  const count = Math.min(limit, pages.length);
  const startIndex = (dayNumber * DAILY_ROTATION) % pages.length;

  return Array.from({ length: count }, (_, index) => pages[(startIndex + index) % pages.length]);
}

export function buildCanonicalFeedUrl(filters: FeedFilters): string {
  const url = new URL(FEED_PATH, SITE_ORIGIN);
  const hub = filters.hub?.trim().toLowerCase();
  const theme = filters.theme?.trim().toLowerCase();
  if (hub) url.searchParams.set('hub', hub);
  if (theme) url.searchParams.set('theme', theme);
  return url.toString();
}

function isAllowedImageUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    return Boolean(
      url.protocol === 'https:' &&
        !url.port &&
        !url.username &&
        !url.password &&
        ALLOWED_IMAGE_HOSTS.has(url.hostname.toLowerCase()) &&
        getImageMimeType(rawUrl),
    );
  } catch {
    return false;
  }
}

export function parseHeadMetadata(
  rawUrl: string,
  status: number,
  contentType: string | null,
  contentLength: string | null,
): MediaMetadata | undefined {
  if (
    !isAllowedImageUrl(rawUrl) ||
    status < 200 ||
    status >= 300 ||
    !contentLength ||
    !/^[1-9]\d*$/.test(contentLength)
  ) {
    return undefined;
  }

  const byteLength = Number(contentLength);
  const mimeType = contentType?.split(';', 1)[0].trim().toLowerCase();
  const pathMimeType = getImageMimeType(rawUrl);
  if (!Number.isSafeInteger(byteLength) || !mimeType || mimeType !== pathMimeType) return undefined;

  return { byteLength, mimeType };
}

async function fetchMediaMetadata(rawUrl: string): Promise<MediaMetadata | undefined> {
  if (!isAllowedImageUrl(rawUrl)) return undefined;

  const response = await fetch(rawUrl, {
    method: 'HEAD',
    redirect: 'manual',
    cache: 'no-store',
    signal: AbortSignal.timeout(METADATA_TIMEOUT_MS),
  });

  return parseHeadMetadata(
    rawUrl,
    response.status,
    response.headers.get('content-type'),
    response.headers.get('content-length'),
  );
}

function resolveMediaMetadata(rawUrl: string): Promise<MediaMetadata | undefined> {
  const now = Date.now();
  const cached = metadataCache.get(rawUrl);
  if (cached && cached.expiresAt > now) return cached.promise;
  if (cached) metadataCache.delete(rawUrl);

  if (metadataCache.size >= METADATA_CACHE_MAX_ENTRIES) {
    metadataCache.delete(metadataCache.keys().next().value!);
  }

  const promise = fetchMediaMetadata(rawUrl).catch(() => undefined);
  const entry = { expiresAt: now + METADATA_FAILURE_TTL_MS, promise };
  metadataCache.set(rawUrl, entry);
  void promise.then(metadata => {
    if (metadataCache.get(rawUrl) === entry) {
      entry.expiresAt = Date.now() + (metadata ? METADATA_SUCCESS_TTL_MS : METADATA_FAILURE_TTL_MS);
    }
  });
  return promise;
}

export async function selectVerifiedPages<T extends { image?: unknown }>(
  candidates: T[],
  resolveMetadata: (url: string) => Promise<MediaMetadata | undefined>,
  limit = BATCH_SIZE,
  concurrency = METADATA_CONCURRENCY,
): Promise<Array<VerifiedPage<T>>> {
  if (limit <= 0 || concurrency <= 0) return [];

  const verified: Array<VerifiedPage<T>> = [];
  for (let offset = 0; offset < candidates.length && verified.length < limit; offset += concurrency) {
    const batch = candidates.slice(offset, offset + concurrency);
    const metadata = await Promise.all(
      batch.map(page => {
        const image = asNonEmptyString(page.image);
        return image ? resolveMetadata(image) : Promise.resolve(undefined);
      }),
    );

    for (let index = 0; index < batch.length && verified.length < limit; index += 1) {
      if (metadata[index]) verified.push({ page: batch[index], media: metadata[index] });
    }
  }

  return verified;
}

function parseFilter(searchParams: URLSearchParams, name: keyof FeedFilters): string | undefined | null {
  const values = searchParams.getAll(name);
  if (values.length === 0) return undefined;
  if (values.length !== 1 || !values[0].trim()) return null;
  return values[0].trim().toLowerCase();
}

function isValidPage(page: ColoringPage): boolean {
  const image = asNonEmptyString(page.image);
  const slug = asNonEmptyString(page.slug);
  const hub = asNonEmptyString(page.parentHub);
  const theme = asNonEmptyString(page.parentTheme);
  const age = asNonEmptyString(page.ageGroup);

  return Boolean(
    image &&
      slug &&
      hub &&
      theme &&
      age &&
      getImageMimeType(image) &&
      !new URL(image).pathname.toLowerCase().endsWith('/default.jpg'),
  );
}

function filterPages(pages: ColoringPage[], filters: FeedFilters): ColoringPage[] {
  return pages.filter(page => {
    if (!isValidPage(page)) return false;
    if (filters.hub && page.parentHub !== filters.hub) return false;
    if (filters.theme && page.parentTheme !== filters.theme) return false;
    return true;
  });
}

function dailyDate(now: Date): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function secondsUntilNextUtcDay(now: Date): number {
  const nextDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(1, Math.floor((nextDay - now.getTime()) / 1000));
}

export function renderItem(
  page: ColoringPage,
  media: MediaMetadata,
  publicationDate: string,
): string {
  const hub = asNonEmptyString(page.parentHub)!;
  const theme = asNonEmptyString(page.parentTheme)!;
  const age = asNonEmptyString(page.ageGroup)!;
  const slug = asNonEmptyString(page.slug)!;
  const imageUrl = asNonEmptyString(page.image)!;
  const title = cleanTitle(asNonEmptyString(page.title), theme);
  const pageUrl = `${SITE_ORIGIN}/en/${[hub, theme, age, slug].map(encodeURIComponent).join('/')}`;
  const description = `Download & print this free ${title} coloring page! High-resolution A4 & Letter format ready to print at home or school. 100% free with no sign-up required on ColorVaults.com.`;
  const htmlDescription = `<p>${escapeXml(description)}</p><img src="${escapeXml(imageUrl)}" alt="${escapeXml(title)}" />`;

  return `
    <item>
      <title>${escapeXml(title)} - Free Printable Coloring Page</title>
      <link>${escapeXml(pageUrl)}</link>
      <guid isPermaLink="true">${escapeXml(pageUrl)}</guid>
      <pubDate>${publicationDate}</pubDate>
      <description>${wrapCdata(htmlDescription)}</description>
      <enclosure url="${escapeXml(imageUrl)}" type="${media.mimeType}" length="${media.byteLength}" />
      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${media.mimeType}">
        <media:title>${escapeXml(title)}</media:title>
        <media:description>${escapeXml(description)}</media:description>
      </media:content>
    </item>`;
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const hub = parseFilter(requestUrl.searchParams, 'hub');
    const theme = parseFilter(requestUrl.searchParams, 'theme');

    if (hub === null || theme === null) {
      return new NextResponse('hub and theme must each be a single non-empty slug', { status: 400 });
    }

    const data = loadFeedData();
    if (hub && !data.hubs.has(hub)) {
      return new NextResponse('Unknown hub filter', { status: 400 });
    }
    if (theme && !data.themes.has(theme)) {
      return new NextResponse('Unknown theme filter', { status: 400 });
    }
    if (hub && theme && data.themes.get(theme)?.parentHub !== hub) {
      return new NextResponse('Theme does not belong to the selected hub', { status: 400 });
    }

    const filters: FeedFilters = {
      ...(hub ? { hub } : {}),
      ...(theme ? { theme } : {}),
    };
    const matchingPages = filterPages(data.pages, filters);
    const now = new Date();
    const publicationDate = dailyDate(now).toUTCString();
    const candidates = selectDailyPages(matchingPages, now, MAX_METADATA_CANDIDATES);
    const selectedPages = await selectVerifiedPages(candidates, resolveMediaMetadata);
    const selfUrl = buildCanonicalFeedUrl(filters);
    const filterTitle = theme
      ? data.themes.get(theme)!.title
      : hub
        ? data.hubs.get(hub)!
        : 'Free Printable';
    const itemsXml = selectedPages
      .map(({ page, media }) => renderItem(page, media, publicationDate))
      .join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(`ColorVaults - ${filterTitle} Coloring Pages`)}</title>
    <link>${SITE_ORIGIN}</link>
    <description>Daily free high-resolution printable coloring pages for kids, toddlers, teens, and adults.</description>
    <language>en-us</language>
    <lastBuildDate>${publicationDate}</lastBuildDate>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />${itemsXml}
  </channel>
</rss>`;

    const maxAge = secondsUntilNextUtcDay(now);
    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
      },
    });
  } catch (error) {
    console.error('Error generating Pinterest feed', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}
