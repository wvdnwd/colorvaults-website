import { NextRequest, NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/adminAuth';
import fs from 'fs';
import path from 'path';

interface ColoringPageItem {
  slug: string;
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  title: string;
  shortDescription?: string;
  image: string;
  tags?: string[];
  reviewed?: boolean;
  [key: string]: unknown;
}

const dataDir = path.join(process.cwd(), 'src', 'data');
const enFile = path.join(dataDir, 'en', 'coloring-pages.json');
const nlFile = path.join(dataDir, 'nl', 'coloring-pages.json');
const dataPaths = [enFile, nlFile];

function readThemeJson(lang: string, themeSlug: string): ColoringPageItem[] {
  const filePath = path.join(dataDir, lang, 'themes-data', `${themeSlug}.json`);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

function writeThemeJson(lang: string, themeSlug: string, pages: ColoringPageItem[]) {
  const filePath = path.join(dataDir, lang, 'themes-data', `${themeSlug}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing theme JSON at ${filePath}:`, err);
  }
}

function readPages(filePath: string): ColoringPageItem[] {
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

function writePages(filePath: string, pages: ColoringPageItem[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing pages file at ${filePath}:`, err);
  }
}

export async function GET(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'en';
  const theme = searchParams.get('theme');
  const withNl = searchParams.get('withNl') === 'true';

  if (theme && theme !== 'all') {
    const pagesEn = readThemeJson('en', theme);
    if (!withNl) {
      const pages = lang === 'nl' ? readThemeJson('nl', theme) : pagesEn;
      return NextResponse.json({ ok: true, pages });
    }

    const pagesNl = readThemeJson('nl', theme);
    const nlMap = new Map<string, string>();
    pagesNl.forEach(p => nlMap.set(p.slug, p.title));

    const combined = pagesEn.map(p => ({
      ...p,
      titleNl: nlMap.get(p.slug) || p.title,
    }));
    return NextResponse.json({ ok: true, pages: combined });
  }

  // If all themes requested
  const enThemesDir = path.join(dataDir, 'en', 'themes-data');
  if (fs.existsSync(enThemesDir)) {
    const files = fs.readdirSync(enThemesDir).filter(f => f.endsWith('.json'));
    const allEn: ColoringPageItem[] = [];
    for (const f of files) {
      allEn.push(...readThemeJson('en', f.replace('.json', '')));
    }

    if (!withNl) {
      return NextResponse.json({ ok: true, pages: allEn });
    }

    const allNlMap = new Map<string, string>();
    const nlThemesDir = path.join(dataDir, 'nl', 'themes-data');
    if (fs.existsSync(nlThemesDir)) {
      const nlFiles = fs.readdirSync(nlThemesDir).filter(f => f.endsWith('.json'));
      for (const f of nlFiles) {
        const nlPages = readThemeJson('nl', f.replace('.json', ''));
        nlPages.forEach(p => allNlMap.set(`${p.parentTheme}/${p.slug}`, p.title));
      }
    }

    const combined = allEn.map(p => ({
      ...p,
      titleNl: allNlMap.get(`${p.parentTheme}/${p.slug}`) || p.title,
    }));
    return NextResponse.json({ ok: true, pages: combined });
  }

  const filePath = lang === 'nl' ? nlFile : enFile;
  const pages = readPages(filePath);
  return NextResponse.json({ ok: true, pages });
}

export async function PATCH(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug, parentHub, parentTheme, ageGroup, title, titleNl, tags, reviewed } = await req.json();
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  // Update theme partitioned files
  for (const lang of ['en', 'nl']) {
    const isNl = lang === 'nl';
    const pages = readThemeJson(lang, parentTheme);
    if (pages.length > 0) {
      const updated = pages.map(p => {
        if (p.slug === slug && p.parentHub === parentHub) {
          const assignedTitle = isNl && titleNl ? titleNl : (title || p.title);
          return {
            ...p,
            title: assignedTitle,
            ageGroup: ageGroup || p.ageGroup,
            tags: Array.isArray(tags) ? tags : p.tags,
            reviewed: reviewed !== undefined ? reviewed : p.reviewed,
          };
        }
        return p;
      });
      writeThemeJson(lang, parentTheme, updated);
    }
  }

  // Also update master files if they exist
  for (const filePath of dataPaths) {
    if (!fs.existsSync(filePath)) continue;
    const isNl = filePath.includes('nl');
    const pages = readPages(filePath);
    const updated = pages.map(p => {
      if (p.slug === slug && p.parentHub === parentHub && p.parentTheme === parentTheme) {
        const assignedTitle = isNl && titleNl ? titleNl : (title || p.title);
        return {
          ...p,
          title: assignedTitle,
          ageGroup: ageGroup || p.ageGroup,
          tags: Array.isArray(tags) ? tags : p.tags,
          reviewed: reviewed !== undefined ? reviewed : p.reviewed,
        };
      }
      return p;
    });
    writePages(filePath, updated);
  }

  return NextResponse.json({ ok: true, message: 'Coloring page updated successfully' });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { action, slug, parentHub, parentTheme, targetHub, targetTheme, targetAgeGroup, title, titleNl } = body;

  if (action === 'move') {
    if (!slug || !targetHub || !targetTheme) {
      return NextResponse.json({ error: 'Missing target parameters for move' }, { status: 400 });
    }

    // Move in partitioned theme files
    for (const lang of ['en', 'nl']) {
      const isNl = lang === 'nl';
      const sourcePages = readThemeJson(lang, parentTheme);
      const targetPages = readThemeJson(lang, targetTheme);

      const movingItem = sourcePages.find(p => p.slug === slug && p.parentHub === parentHub);
      if (movingItem) {
        const remainingSource = sourcePages.filter(p => !(p.slug === slug && p.parentHub === parentHub));
        writeThemeJson(lang, parentTheme, remainingSource);

        const assignedTitle = isNl && titleNl ? titleNl : (title || movingItem.title);
        const updatedItem: ColoringPageItem = {
          ...movingItem,
          parentHub: targetHub,
          parentTheme: targetTheme,
          ageGroup: targetAgeGroup || movingItem.ageGroup,
          title: assignedTitle,
          reviewed: true,
        };
        targetPages.push(updatedItem);
        writeThemeJson(lang, targetTheme, targetPages);
      }
    }

    // Also update master files if they exist
    for (const filePath of dataPaths) {
      if (!fs.existsSync(filePath)) continue;
      const isNl = filePath.includes('nl');
      const pages = readPages(filePath);
      const updated = pages.map(p => {
        if (p.slug === slug && p.parentHub === parentHub && p.parentTheme === parentTheme) {
          const assignedTitle = isNl && titleNl ? titleNl : (title || p.title);
          return {
            ...p,
            parentHub: targetHub,
            parentTheme: targetTheme,
            ageGroup: targetAgeGroup || p.ageGroup,
            title: assignedTitle,
            reviewed: true,
          };
        }
        return p;
      });
      writePages(filePath, updated);
    }

    return NextResponse.json({ ok: true, message: 'Coloring page moved successfully' });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug, parentHub, parentTheme } = await req.json();
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  // Delete from partitioned theme files
  for (const lang of ['en', 'nl']) {
    const pages = readThemeJson(lang, parentTheme);
    if (pages.length > 0) {
      const filtered = pages.filter(p => !(p.slug === slug && p.parentHub === parentHub));
      writeThemeJson(lang, parentTheme, filtered);
    }
  }

  // Also delete from master files
  for (const filePath of dataPaths) {
    if (!fs.existsSync(filePath)) continue;
    const pages = readPages(filePath);
    const filtered = pages.filter(
      p => !(p.slug === slug && p.parentHub === parentHub && p.parentTheme === parentTheme)
    );
    writePages(filePath, filtered);
  }

  return NextResponse.json({ ok: true, message: 'Coloring page deleted successfully' });
}

