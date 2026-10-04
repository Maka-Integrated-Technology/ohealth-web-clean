import { buildContentSecurityPolicy } from './csp';

interface SecurityHeader {
  key: string;
  value: string;
}

export function buildSecurityHeaders(isProduction: boolean): SecurityHeader[] {
  const headers: SecurityHeader[] = [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), payment=()',
    },
    {
      key: isProduction
        ? 'Content-Security-Policy'
        : 'Content-Security-Policy-Report-Only',
      value: buildContentSecurityPolicy(isProduction),
    },
  ];

  if (isProduction) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains; preload',
    });
  }

  return headers;
}
