import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import crypto from 'crypto';

const ADMIN_COOKIE = 'cv_admin_auth';

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'kleurvel1023nwd';
}

export function getAdminAuthToken(): string {
  return crypto.createHash('sha256').update(getAdminPassword() + '_cv_salt_2026').digest('hex');
}

export function checkAdminPassword(password: string): boolean {
  return password === getAdminPassword();
}

export async function requireAdmin(_lang = 'en') {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const validToken = getAdminAuthToken();
  if (token !== validToken) {
    notFound();
  }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const validToken = getAdminAuthToken();
  return token === validToken;
}

export { ADMIN_COOKIE };
