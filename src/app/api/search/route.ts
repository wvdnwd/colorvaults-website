import { NextResponse } from 'next/server';
import { getSearchPage, searchCatalog } from '@/lib/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  if (searchParams.get('type') === 'page') {
    return NextResponse.json(getSearchPage(lang, searchParams));
  }
  // Preserve the shipped autocomplete array response.
  return NextResponse.json(searchCatalog(lang, searchParams).slice(0, 50));
}
