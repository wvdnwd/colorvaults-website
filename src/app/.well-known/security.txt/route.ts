import { NextResponse } from 'next/server';

export async function GET() {
  const content = `Contact: mailto:info@colorvaults.com
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: nl, en
Canonical: https://colorvaults.com/.well-known/security.txt
Policy: https://colorvaults.com/en/privacy-policy
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
