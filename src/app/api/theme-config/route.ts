import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { resolveHolidayTheme, HolidayThemeId, HOLIDAY_THEMES } from '@/data/holidayThemes';

export const dynamic = 'force-dynamic';

const CONFIG_PATH = path.join(process.cwd(), 'src', 'data', 'theme-config.json');

export async function GET() {
  try {
    let config = {
      activeTheme: 'auto' as HolidayThemeId,
      effectsEnabled: true,
      bannerEnabled: true,
      lastUpdated: new Date().toISOString()
    };

    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
      config = { ...config, ...JSON.parse(raw) };
    }

    const resolved = resolveHolidayTheme(config.activeTheme);

    return NextResponse.json({
      config,
      resolvedTheme: resolved,
      availableThemes: Object.values(HOLIDAY_THEMES).map(t => ({
        id: t.id,
        nameEn: t.nameEn,
        nameNl: t.nameNl,
        emoji: t.emoji,
        badge: t.badge,
        primaryColor: t.primaryColor,
        secondaryColor: t.secondaryColor
      }))
    });
  } catch (error) {
    console.error('[Theme Config API Error]', error);
    return NextResponse.json({ error: 'Failed to fetch theme config' }, { status: 500 });
  }
}
