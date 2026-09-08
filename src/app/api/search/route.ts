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

async function getSearchIndex(lang: string): Promise<{ entries: SearchEntry[]; activeLang: string }> {
  const langPath = path.join(process.cwd(), 'public', `search-index-${lang}.json`);
  let targetLang = lang;

  if (fs.existsSync(langPath)) {
    targetLang = lang;
  } else {
    targetLang = 'en';
  }

  if (!cachedIndices[targetLang]) {
    try {
      const filePath = path.join(process.cwd(), 'public', `search-index-${targetLang}.json`);
      if (fs.existsSync(filePath)) {
        const data = await fs.promises.readFile(filePath, 'utf8');
        cachedIndices[targetLang] = JSON.parse(data);
      } else {
        const fullPath = path.join(process.cwd(), 'public', 'search-index.json');
        if (fs.existsSync(fullPath)) {
          const allData = await fs.promises.readFile(fullPath, 'utf8');
          const all = JSON.parse(allData) as SearchEntry[];
          cachedIndices[targetLang] = all.filter(e => e.lang === targetLang);
        } else {
          cachedIndices[targetLang] = [];
        }
      }
    } catch (e) {
      console.error(`Failed to load search index for ${targetLang}`, e);
      return { entries: [], activeLang: targetLang };
    }
  }
  return { entries: cachedIndices[targetLang], activeLang: targetLang };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const lang = searchParams.get('lang') || 'en';
  const difficulty = searchParams.get('difficulty');
  const age = searchParams.get('age');
  const theme = searchParams.get('theme');

  const { entries: index, activeLang } = await getSearchIndex(lang);

  let matched = index.filter(e => e.lang === lang || e.lang === activeLang);

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
