import type { Metadata } from 'next';
import { SITE_ORIGIN, VALID_LOCALES, ValidLocale, isValidLocale } from '@/lib/site';

export interface SeoOptions {
  lang: string;
  path: string; // e.g. "/en/animals-wildlife" or "/nl"
  title: string;
  description: string;
  page?: number;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
  alternateLangs?: ValidLocale[]; // if omitted, defaults to VALID_LOCALES
}

export function buildCanonicalUrl(pathWithoutLang: string, lang: string, page?: number): string {
  const cleanPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
  const base = `${SITE_ORIGIN}/${lang}${cleanPath === '/' ? '' : cleanPath}`;
  if (page && page > 1) {
    return `${base}?page=${page}`;
  }
  return base;
}

export function buildHreflangAlternates(
  pathWithoutLang: string,
  supportedLangs: readonly ValidLocale[] = VALID_LOCALES
): Record<string, string> {
  const cleanPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
  const pathPart = cleanPath === '/' ? '' : cleanPath;
  const alternates: Record<string, string> = {};

  for (const l of supportedLangs) {
    alternates[l] = `${SITE_ORIGIN}/${l}${pathPart}`;
  }
  // x-default points to en
  alternates['x-default'] = `${SITE_ORIGIN}/en${pathPart}`;

  return alternates;
}

export function createMetadata({
  lang,
  path, // can be relative to lang or absolute path starting with /
  title,
  description,
  page,
  image = `${SITE_ORIGIN}/images/banner.jpg`,
  noindex = false,
  nofollow = false,
  alternateLangs = VALID_LOCALES as unknown as ValidLocale[],
}: SeoOptions): Metadata {
  const cleanLang = isValidLocale(lang) ? lang : 'en';

  // Normalize path relative to lang
  let relPath = path;
  if (relPath.startsWith(`/${cleanLang}`)) {
    relPath = relPath.substring(`/${cleanLang}`.length);
  }
  if (!relPath.startsWith('/')) {
    relPath = `/${relPath}`;
  }

  const canonical = buildCanonicalUrl(relPath, cleanLang, page);
  const alternates = buildHreflangAlternates(relPath, alternateLangs);

  const meta: Metadata = {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'ColorVaults',
      locale: cleanLang === 'en' ? 'en_US' : cleanLang === 'nl' ? 'nl_NL' : cleanLang === 'de' ? 'de_DE' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_ORIGIN}${image.startsWith('/') ? image : `/${image}`}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${SITE_ORIGIN}${image.startsWith('/') ? image : `/${image}`}`],
    },
  };

  if (noindex || nofollow) {
    meta.robots = {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
      },
    };
  }

  return meta;
}
