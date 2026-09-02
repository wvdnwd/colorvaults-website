import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { email, lang } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
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
    if (!subscribers.some((s: any) => s.email.toLowerCase() === email.toLowerCase())) {
      subscribers.push({
        email: email.trim().toLowerCase(),
        lang: lang || 'en',
        createdAt: new Date().toISOString(),
      });
      fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}