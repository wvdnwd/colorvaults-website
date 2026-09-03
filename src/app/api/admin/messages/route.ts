import { NextRequest, NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/adminAuth';
import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src', 'data', 'messages.json');

function readMessages() {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

function writeMessages(data: unknown) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(readMessages());
}

export async function PATCH(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, read } = await req.json();
  const messages = readMessages();
  const updated = messages.map((m: { id: string; read: boolean }) =>
    m.id === id ? { ...m, read: typeof read === 'boolean' ? read : !m.read } : m
  );
  writeMessages(updated);
  return NextResponse.json({ ok: true, messages: updated });
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  const messages = readMessages();
  const filtered = messages.filter((m: { id: string }) => m.id !== id);
  writeMessages(filtered);
  return NextResponse.json({ ok: true, messages: filtered });
}
