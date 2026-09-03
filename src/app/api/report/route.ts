import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const REPORTS_FILE = path.join(process.cwd(), 'src', 'data', 'reports.json');

function loadReports() {
  if (!fs.existsSync(REPORTS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveReports(reports: unknown[]) {
  const dir = path.dirname(REPORTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), 'utf-8');
}

// POST — submit a new report (public)
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`report-${ip}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many reports. Please wait a minute.' }, { status: 429 });
    }

    const { imageUrl, category, reason, details, annotatedImage } = await req.json();

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'Missing imageUrl' }, { status: 400 });
    }

    if (annotatedImage && typeof annotatedImage === 'string' && annotatedImage.length > 3_000_000) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const reports = loadReports();
    reports.unshift({
      id: randomUUID(),
      imageUrl: String(imageUrl).slice(0, 500),
      annotatedImage: annotatedImage ? String(annotatedImage) : '',
      category: String(category || 'Unknown').slice(0, 100),
      reason: String(reason || 'Omcirkeld foutje').slice(0, 100),
      details: String(details || '').slice(0, 1000),
      date: new Date().toISOString(),
      status: 'open',
    });
    saveReports(reports);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
