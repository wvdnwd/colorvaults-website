import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPassword, ADMIN_COOKIE } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
  return res;
}
