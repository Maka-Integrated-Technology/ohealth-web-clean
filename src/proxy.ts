import { NextResponse } from 'next/server';

import { buildContentSecurityPolicy } from '@/lib/security/csp';

export function proxy() {
  const response = NextResponse.next();
  const isProd = process.env.NODE_ENV === 'production';

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()',
  );

  const cspHeader = isProd
    ? 'Content-Security-Policy'
    : 'Content-Security-Policy-Report-Only';

  response.headers.set(cspHeader, buildContentSecurityPolicy(isProd));

  if (isProd) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
