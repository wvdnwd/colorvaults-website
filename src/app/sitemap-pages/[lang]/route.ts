import { NextResponse } from 'next/server';
import { notFound } from 'next/navigation';
import { isValidLocale, VALID_LOCALES } from '@/lib/site';
import { generateSitemapUrlsForLocale, buildSitemapXml } from '@/lib/sitemapGenerator';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return VALID_LOCALES.map(lang => ({ lang }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const entries = generateSitemapUrlsForLocale(lang);
  const xml = buildSitemapXml(entries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
