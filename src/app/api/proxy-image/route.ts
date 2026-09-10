import { NextResponse } from 'next/server';

const ALLOWED_HOSTNAMES = new Set([
  'colorvaults.ams3.cdn.digitaloceanspaces.com',
  'colorvaults.ams3.digitaloceanspaces.com',
  'www.colorvaults.com',
  'colorvaults.com',
]);

const ALLOWED_ORIGINS = new Set([
  'https://www.colorvaults.com',
  'https://colorvaults.com',
]);

function isPrivateOrLoopback(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
    return true;
  }
  // Check private IPv4 ranges: 10.x, 172.16-31.x, 192.168.x, 169.254.x
  if (/^127\./.test(hostname)) return true;
  if (/^10\./.test(hostname)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)) return true;
  if (/^192\.168\./.test(hostname)) return true;
  if (/^169\.254\./.test(hostname)) return true;
  if (/^0\./.test(hostname)) return true;
  return false;
}

function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get('origin');
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    return origin;
  }
  return 'https://www.colorvaults.com';
}

export async function OPTIONS(request: Request) {
  const origin = getAllowedOrigin(request);
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get('url');

  if (!rawUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  // Enforce HTTPS
  if (targetUrl.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
    return new NextResponse('Only HTTPS URLs are allowed', { status: 400 });
  }

  const hostname = targetUrl.hostname.toLowerCase();

  // SSRF prevention: forbid localhost & private IP ranges
  if (isPrivateOrLoopback(hostname) && process.env.NODE_ENV === 'production') {
    return new NextResponse('Access to private/loopback addresses is forbidden', { status: 403 });
  }

  // Enforce domain whitelist
  if (!ALLOWED_HOSTNAMES.has(hostname)) {
    // In local development only, allow localhost
    if (process.env.NODE_ENV !== 'production' && (hostname === 'localhost' || hostname === '127.0.0.1')) {
      // allow for local dev
    } else {
      return new NextResponse('Host not allowed', { status: 403 });
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8-second timeout

  try {
    const response = await fetch(targetUrl.toString(), {
      signal: controller.signal,
      redirect: 'error', // Forbid unvalidated redirect chains
      headers: {
        'User-Agent': 'ColorVaults-Proxy/1.0',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return new NextResponse(`Remote server returned ${response.status}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return new NextResponse('Remote resource is not a valid image', { status: 415 });
    }

    // Check content-length header if present (max 15 MB)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 15 * 1024 * 1024) {
      return new NextResponse('Image size exceeds 15 MB limit', { status: 413 });
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > 15 * 1024 * 1024) {
      return new NextResponse('Image size exceeds 15 MB limit', { status: 413 });
    }

    const basename = targetUrl.pathname.split('/').pop() || '';
    const sanitizedFilename = basename.replace(/[^a-zA-Z0-9._-]/g, '') || 'colorvaults-page.jpg';
    const origin = getAllowedOrigin(request);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${sanitizedFilename}"`,
        'Access-Control-Allow-Origin': origin,
        'Vary': 'Origin',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    });
  } catch (error: unknown) {
    clearTimeout(timeout);
    if (error instanceof Error && error.name === 'AbortError') {
      return new NextResponse('Gateway Timeout', { status: 504 });
    }
    console.error('Proxy error:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}
