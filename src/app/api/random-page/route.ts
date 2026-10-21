import { NextResponse } from 'next/server';
import { getFeaturedPages, getThemes, getColoringPagesForTheme } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') === 'nl' ? 'nl' : 'en';

  // Try featured pool first
  const pool = getFeaturedPages(lang, 24);
  if (pool && pool.length > 0) {
    const randomPage = pool[Math.floor(Math.random() * pool.length)];
    return NextResponse.redirect(
      new URL(`/${lang}/${randomPage.parentHub}/${randomPage.parentTheme}/${randomPage.ageGroup}/${randomPage.slug}`, request.url),
      307
    );
  }

  // Fallback to random theme page
  const themes = getThemes(lang);
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const pages = getColoringPagesForTheme(lang, randomTheme.parentHub, randomTheme.slug);
  if (pages && pages.length > 0) {
    const randomPage = pages[Math.floor(Math.random() * pages.length)];
    return NextResponse.redirect(
      new URL(`/${lang}/${randomPage.parentHub}/${randomPage.parentTheme}/${randomPage.ageGroup}/${randomPage.slug}`, request.url),
      307
    );
  }

  return NextResponse.redirect(new URL(`/${lang}`, request.url), 307);
}
