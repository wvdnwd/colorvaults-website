import { NextResponse } from 'next/server';
import { buildSitemapIndexXml } from '@/lib/sitemapGenerator';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const xml = buildSitemapIndexXml();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
