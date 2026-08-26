import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const MESSAGES_FILE = path.join(process.cwd(), 'src', 'data', 'messages.json');

function loadMessages() {
  if (!fs.existsSync(MESSAGES_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveMessages(messages: unknown[]) {
  const dir = path.dirname(MESSAGES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const messages = loadMessages();
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Anonymous';

    messages.unshift({
      id: randomUUID(),
      name: fullName,
      email,
      subject: subject || 'General Inquiry',
      message,
      date: new Date().toISOString(),
      read: false,
    });

    saveMessages(messages);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
