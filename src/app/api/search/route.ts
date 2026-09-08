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

const cachedIndices: Record<string, SearchEntry[]> = {};

function getSearchIndex(lang: string): SearchEntry[] {
  const targetLang = lang === 'nl' ? 'nl' : 'en';
  if (!cachedIndices[targetLang]) {
    try {
      const langPath = path.join(process.cwd(), 'public', `search-index-${targetLang}.json`);
      if (fs.existsSync(langPath)) {
        cachedIndices[targetLang] = JSON.parse(fs.readFileSync(langPath, 'utf8'));
      } else {
        const fullPath = path.join(process.cwd(), 'public', 'search-index.json');
        const all = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as SearchEntry[];
        cachedIndices[targetLang] = all.filter(e => e.lang === targetLang);
      }
    } catch (e) {
      console.error(`Failed to load search index for ${targetLang}`, e);
      return [];
    }
  }
  return cachedIndices[targetLang];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const lang = searchParams.get('lang') || 'en';
  const difficulty = searchParams.get('difficulty');
  const age = searchParams.get('age');
  const theme = searchParams.get('theme');

  const index = getSearchIndex(lang);

  let matched = index.filter(e => e.lang === lang);

  if (theme) {
    matched = matched.filter(e => e.parentTheme === theme || e.url.includes(`/${theme}/`));
  }

  if (age) {
    matched = matched.filter(e => e.ageGroup === age || (e.tags && e.tags.includes(age)));
  }

  if (difficulty) {
    const diffMap: Record<string, string[]> = {
      easy: ['kids', 'kinderen', 'toddlers', 'peuters'],
      medium: ['teens', 'tieners'],
      hard: ['adults', 'volwassenen'],
    };
    const targetAges = diffMap[difficulty.toLowerCase()] || [difficulty.toLowerCase()];
    matched = matched.filter(e => e.ageGroup && targetAges.includes(e.ageGroup.toLowerCase()));
  }

  if (q) {
    const lowerQ = q.toLowerCase().trim();
    
    // Calculate relevance score
    const scored = matched
      .map(entry => {
        const titleLower = entry.title.toLowerCase();
        let score = 0;

        if (titleLower === lowerQ) {
          score += 200;
        } else if (titleLower.startsWith(lowerQ)) {
          score += 100;
        } else if (titleLower.includes(lowerQ)) {
          score += 60;
        }

        if (entry.type === 'theme') {
          score += 40;
        } else if (entry.type === 'hub') {
          score += 30;
        }

        if (entry.tags && entry.tags.some(t => t.toLowerCase() === lowerQ)) {
          score += 35;
        } else if (entry.tags && entry.tags.some(t => t.toLowerCase().includes(lowerQ))) {
          score += 20;
        }

        if (entry.description && entry.description.toLowerCase().includes(lowerQ)) {
          score += 10;
        }

        return { entry, score };
      })
      .filter(item => item.score > 0);

    // Sort by highest score first
    scored.sort((a, b) => b.score - a.score);
    return NextResponse.json(scored.slice(0, 50).map(s => s.entry));
  }

  return NextResponse.json(matched.slice(0, 50));
}
