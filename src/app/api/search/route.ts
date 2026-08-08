import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SearchEntry {
  lang: string;
  type: 'hub' | 'theme' | 'page';
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

let cachedIndex: SearchEntry[] | null = null;

function getSearchIndex(): SearchEntry[] {
  if (!cachedIndex) {
    try {
      const filePath = path.join(process.cwd(), 'public', 'search-index.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      cachedIndex = JSON.parse(fileContents);
    } catch (e) {
      console.error('Failed to load search index', e);
      return [];
    }
  }
  return cachedIndex!;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const lang = searchParams.get('lang') || 'en';

  if (!q) {
    return NextResponse.json([]);
  }

  const lowerQ = q.toLowerCase();
  const index = getSearchIndex();

  const matched = index
    .filter(e => e.lang === lang)
    .filter(e =>
      e.title.toLowerCase().includes(lowerQ) ||
      (e.description && e.description.toLowerCase().includes(lowerQ)) ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes(lowerQ)))
    )
    .slice(0, 30);

  return NextResponse.json(matched);
}
