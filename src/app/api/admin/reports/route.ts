import { NextRequest, NextResponse } from'next/server';
import { isAdminLoggedIn } from'@/lib/adminAuth';
import fs from'fs';
import path from'path';

const REPORTS_FILE = path.join(process.cwd(),'src','data','reports.json');

function loadReports() {
  if (!fs.existsSync(REPORTS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(REPORTS_FILE,'utf-8'));
  } catch {
    return [];
  }
}

function saveReports(reports: unknown[]) {
  const dir = path.dirname(REPORTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2),'utf-8');
}

// GET — list all reports (admin only)
export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error:'Unauthorized'}, { status: 401 });
  }
  return NextResponse.json(loadReports());
}

// DELETE — dismiss or delete a report (admin only)
export async function DELETE(req: NextRequest) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error:'Unauthorized'}, { status: 401 });
  }
  const { id } = await req.json();
  const reports = loadReports().filter((r: { id: string }) => r.id !== id);
  saveReports(reports);
  return NextResponse.json({ ok: true });
}
