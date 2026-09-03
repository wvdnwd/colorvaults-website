import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPassword, getAdminAuthToken, ADMIN_COOKIE } from '@/lib/adminAuth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`login-${ip}`, 5, 5 * 60 * 1000); // 5 attempts per 5 min

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Te veel inlogpogingen. Probeer het over 5 minuten opnieuw.' },
      { status: 429 }
    );
  }

  const { password } = await req.json();

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, getAdminAuthToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV ==='production',
    sameSite:'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path:'/',
  });
  return res;
}
