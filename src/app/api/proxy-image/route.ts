import { NextResponse } from 'next/server';

const ALLOWED_HOSTNAMES = new Set([
  'colorvaults.ams3.cdn.digitaloceanspaces.com',
  'colorvaults.ams3.digitaloceanspaces.com'
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch (e) {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  if (!ALLOWED_HOSTNAMES.has(parsedUrl.hostname)) {
    return new NextResponse('URL not allowed', { status: 403 });
  }

  if (parsedUrl.protocol !== 'https:') {
    return new NextResponse('URL not allowed', { status: 403 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();
    
    const basename = parsedUrl.pathname.split('/').pop() || '';
    const sanitizedFilename = basename.replace(/[^a-zA-Z0-9.-]/g, '') || 'colorvaults-page.jpg';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${sanitizedFilename}"`,
        'Access-Control-Allow-Origin': 'https://colorvaults.com',
        'Vary': 'Origin',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error: any) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      return new NextResponse('Gateway Timeout', { status: 504 });
    }
    console.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
