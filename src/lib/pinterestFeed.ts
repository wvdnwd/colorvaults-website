import type { ColoringPage, MainHub, Theme } from './api';
import { getCanonicalUrl, escapeXml } from './site';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface PinterestFilters {
  hub?: string;
  theme?: string;
}

export type PinterestFilterResult =
  | { filters: PinterestFilters; error?: never }
  | { filters?: never; error: string };

export function escapeRssXml(value: string): string {
  const xmlSafe = Array.from(value, character => {
    const codePoint = character.codePointAt(0)!;
    const allowed = codePoint === 0x09
      || codePoint === 0x0a
      || codePoint === 0x0d
      || (codePoint >= 0x20 && codePoint <= 0xd7ff)
      || (codePoint >= 0xe000 && codePoint <= 0xfffd)
      || (codePoint >= 0x10000 && codePoint <= 0x10ffff);
    return allowed ? character : '';
  }).join('');
  return escapeXml(xmlSafe);
}

export function resolvePinterestFilters(
  hubValue: string | null,
  themeValue: string | null,
  hubs: readonly Pick<MainHub, 'slug'>[],
  themes: readonly Pick<Theme, 'slug' | 'parentHub'>[],
): PinterestFilterResult {
  if (hubValue === '' || themeValue === '') {
    return { error: 'Filters must be non-empty alphanumeric slugs separated by hyphens.' };
  }
  const hub = hubValue?.toLowerCase();
  const theme = themeValue?.toLowerCase();

  if ((hub && !SLUG_PATTERN.test(hub)) || (theme && !SLUG_PATTERN.test(theme))) {
    return { error: 'Filters must be non-empty alphanumeric slugs separated by hyphens.' };
  }
  if (hub && !hubs.some(candidate => candidate.slug === hub)) {
    return { error: `Unknown hub filter: ${hub}` };
  }

  const matchingThemes = theme
    ? themes.filter(candidate => candidate.slug === theme && (!hub || candidate.parentHub === hub))
    : [];
  if (theme && matchingThemes.length === 0) {
    return { error: hub ? `Theme ${theme} does not belong to hub ${hub}.` : `Unknown theme filter: ${theme}` };
  }

  return { filters: { ...(hub && { hub }), ...(theme && { theme }) } };
}

export function getImageMimeType(imageUrl: string): 'image/webp' | 'image/jpeg' | 'image/png' | null {
  try {
    const url = new URL(imageUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    const extension = url.pathname.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1];
    if (extension === 'webp') return 'image/webp';
    if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
    if (extension === 'png') return 'image/png';
    return null;
  } catch {
    return null;
  }
}

export function filterPinterestPages(pages: readonly ColoringPage[], filters: PinterestFilters): ColoringPage[] {
  return pages.filter(page =>
    (!filters.hub || page.parentHub === filters.hub)
    && (!filters.theme || page.parentTheme === filters.theme)
    && Boolean(page.title?.trim())
    && Boolean(page.slug)
    && Boolean(page.ageGroup)
    && getImageMimeType(page.image) !== null,
  );
}

export function getPinterestPageUrl(page: Pick<ColoringPage, 'parentHub' | 'parentTheme' | 'ageGroup' | 'slug'>): string {
  const segments = ['en', page.parentHub, page.parentTheme, page.ageGroup, page.slug].map(encodeURIComponent);
  return getCanonicalUrl(`/${segments.join('/')}`);
}

export function selectDailyPinterestPages<T>(pages: readonly T[], now: Date, count = 50): T[] {
  if (pages.length <= count) return [...pages];
  const dayNumber = Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86_400_000);
  const start = (dayNumber * 25) % pages.length;
  return Array.from({ length: count }, (_, index) => pages[(start + index) % pages.length]);
}

export function renderPinterestRssItem(page: ColoringPage, publicationDate: string): string {
  const title = page.title.trim();
  const imageUrl = page.image;
  const mimeType = getImageMimeType(imageUrl);
  if (!mimeType) throw new Error(`Unsupported Pinterest image URL: ${imageUrl}`);

  const pageUrl = getPinterestPageUrl(page);
  const description = `Download and print this free ${title} coloring page. High-resolution A4 and Letter formats are available with no sign-up required.`;

  return `    <item>
      <title>${escapeRssXml(`${title} - Free Printable Coloring Page`)}</title>
      <link>${escapeRssXml(pageUrl)}</link>
      <guid isPermaLink="true">${escapeRssXml(pageUrl)}</guid>
      <pubDate>${escapeRssXml(publicationDate)}</pubDate>
      <description>${escapeRssXml(description)}</description>
      <enclosure url="${escapeRssXml(imageUrl)}" type="${mimeType}" length="0" />
      <media:content url="${escapeRssXml(imageUrl)}" medium="image" type="${mimeType}">
        <media:title>${escapeRssXml(title)}</media:title>
        <media:description>${escapeRssXml(description)}</media:description>
      </media:content>
    </item>`;
}
