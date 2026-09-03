import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`newsletter-${ip}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    const { email, lang } = await req.json();
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'src', 'data');
    const subscribersFile = path.join(dataDir, 'subscribers.json');

    let subscribers = [];
    if (fs.existsSync(subscribersFile)) {
      try {
        subscribers = JSON.parse(fs.readFileSync(subscribersFile, 'utf-8'));
      } catch {
        subscribers = [];
      }
    }

    // Check duplicate
    if (!subscribers.some((s: any) => s.email.toLowerCase() === cleanEmail)) {
      subscribers.push({
        email: cleanEmail,
        lang: String(lang || 'en').slice(0, 10),
        createdAt: new Date().toISOString(),
      });
      fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error:'Internal server error'}, { status: 500 });
  }
}