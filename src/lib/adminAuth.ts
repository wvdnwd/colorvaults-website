import { cookies } from'next/headers';
import { redirect } from'next/navigation';
import crypto from 'crypto';

const ADMIN_COOKIE ='cv_admin_auth';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ||'kleurvel1023nwd';

export function getAdminAuthToken(): string {
  return crypto.createHash('sha256').update(ADMIN_PASSWORD + '_cv_salt_2026').digest('hex');
}

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export async function requireAdmin(lang ='en') {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const validToken = getAdminAuthToken();
  if (token !== validToken && token !== ADMIN_PASSWORD) {
    redirect('/admin');
  }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const validToken = getAdminAuthToken();
  return token === validToken || token === ADMIN_PASSWORD;
}

export { ADMIN_COOKIE };
