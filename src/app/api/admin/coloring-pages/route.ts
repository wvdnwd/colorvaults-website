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
  [key: string]: unknown;
}

const dataDir = path.join(process.cwd(), 'src/data');
const enFile = path.join(dataDir, 'en/coloring-pages.json');
const nlFile = path.join(dataDir, 'nl/coloring-pages.json');
const dataPaths = [enFile, nlFile];

function readPages(filePath: string): ColoringPageItem[] {
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

function writePages(filePath: string, pages: ColoringPageItem[]) {
  fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), 'utf-8');
}

export async function GET(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'en';
  const filePath = lang === 'nl' ? nlFile : enFile;
  const pages = readPages(filePath);

  return NextResponse.json({ ok: true, pages });
}

export async function PATCH(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug, parentHub, parentTheme, ageGroup, title, titleNl, tags, reviewed } = await req.json();
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

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

