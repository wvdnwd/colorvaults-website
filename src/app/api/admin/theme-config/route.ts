import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { resolveHolidayTheme, HolidayThemeId } from '@/data/holidayThemes';

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

    return NextResponse.json({ config, resolvedTheme: resolved });
  } catch (error) {
    console.error('[Admin Theme Config GET Error]', error);
    return NextResponse.json({ error: 'Failed to read theme config' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { activeTheme, effectsEnabled, bannerEnabled } = body;

    const currentConfig = fs.existsSync(CONFIG_PATH)
      ? JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
      : {};

    const updatedConfig = {
      ...currentConfig,
      activeTheme: activeTheme ?? currentConfig.activeTheme ?? 'auto',
      effectsEnabled: effectsEnabled !== undefined ? Boolean(effectsEnabled) : (currentConfig.effectsEnabled ?? true),
      bannerEnabled: bannerEnabled !== undefined ? Boolean(bannerEnabled) : (currentConfig.bannerEnabled ?? true),
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig, null, 2), 'utf8');

    const resolved = resolveHolidayTheme(updatedConfig.activeTheme);

    return NextResponse.json({
      success: true,
      config: updatedConfig,
      resolvedTheme: resolved
    });
  } catch (error) {
    console.error('[Admin Theme Config POST Error]', error);
    return NextResponse.json({ error: 'Failed to update theme config' }, { status: 500 });
  }
}
