import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SearchEntry {
  lang: string;
  type: 'hub' | 'theme' | 'page';
  title: string;
  description: string;
  image?: string;
  parentTheme?: string;
  ageGroup?: string;
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
  const difficulty = searchParams.get('difficulty');
  const age = searchParams.get('age');
  const theme = searchParams.get('theme');

  const index = getSearchIndex();

  let matched = index.filter(e => e.lang === lang);

  if (q) {
    const lowerQ = q.toLowerCase();
    matched = matched.filter(e =>
      e.title.toLowerCase().includes(lowerQ) ||
      (e.description && e.description.toLowerCase().includes(lowerQ)) ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes(lowerQ)))
    );
  }

  if (theme) {
    matched = matched.filter(e => e.parentTheme === theme || e.url.includes(`/${theme}/`));
  }

  if (age) {
    matched = matched.filter(e => e.ageGroup === age || (e.tags && e.tags.includes(age)));
  }

  if (difficulty) {
    // Map difficulty: easy -> kids/kinderen, medium -> teens/tieners, hard -> adults/volwassenen
    const diffMap: Record<string, string[]> = {
      easy: ['kids', 'kinderen', 'toddlers', 'peuters'],
      medium: ['teens', 'tieners'],
      hard: ['adults', 'volwassenen'],
    };
    const targetAges = diffMap[difficulty.toLowerCase()] || [difficulty.toLowerCase()];
    matched = matched.filter(e => e.ageGroup && targetAges.includes(e.ageGroup.toLowerCase()));
  }

  return NextResponse.json(matched.slice(0, 50));
}
