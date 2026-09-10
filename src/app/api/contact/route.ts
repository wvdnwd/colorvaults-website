import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

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
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`contact-${ip}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many messages. Please wait a minute.' }, { status: 429 });
    }

    const { firstName, lastName, email, subject, message } = await req.json();

    if (!email || !message || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message exceeds 5000 characters limit' }, { status: 400 });
    }

    const cleanEmail = email.trim().slice(0, 200);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
    }
    const cleanSubject = String(subject || 'General Inquiry').slice(0, 200);
    const cleanMessage = message.trim().slice(0, 5000);
    const cleanName = `${String(firstName || '')} ${String(lastName || '')}`.trim().slice(0, 100) || 'Anonymous';

    const messages = loadMessages();
    messages.unshift({
      id: randomUUID(),
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      date: new Date().toISOString(),
      read: false,
    });

    saveMessages(messages);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
