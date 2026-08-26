import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

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
    const { imageUrl, category, reason, details } = await req.json();

    if (!imageUrl || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const reports = loadReports();
    reports.unshift({
      id: randomUUID(),
      imageUrl,
      category: category || 'Unknown',
      reason,
      details: details || '',
      date: new Date().toISOString(),
      status: 'open',
    });
    saveReports(reports);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
