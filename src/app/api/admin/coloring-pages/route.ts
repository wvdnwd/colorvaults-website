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

export async function PATCH(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug, parentHub, parentTheme, ageGroup, title, tags } = await req.json();
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  for (const filePath of dataPaths) {
    if (!fs.existsSync(filePath)) continue;
    const pages = readPages(filePath);
    const updated = pages.map(p => {
      if (p.slug === slug && p.parentHub === parentHub && p.parentTheme === parentTheme) {
        return {
          ...p,
          title: title || p.title,
          ageGroup: ageGroup || p.ageGroup,
          tags: Array.isArray(tags) ? tags : p.tags,
        };
      }
      return p;
    });
    writePages(filePath, updated);
  }

  return NextResponse.json({ ok: true, message: 'Coloring page updated successfully' });
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
