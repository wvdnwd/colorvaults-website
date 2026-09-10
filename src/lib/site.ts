export const SITE_ORIGIN = 'https://www.colorvaults.com';

export const VALID_LOCALES = ['en', 'nl', 'de', 'fr'] as const;
export type ValidLocale = typeof VALID_LOCALES[number];

export function isValidLocale(locale: string): locale is ValidLocale {
  return (VALID_LOCALES as readonly string[]).includes(locale);
}

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${cleanPath}`;
}

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
