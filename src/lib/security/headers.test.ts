import { describe, expect, it } from 'vitest';

import { buildContentSecurityPolicy } from './csp';
import { buildSecurityHeaders } from './headers';

function toHeaderMap(isProduction: boolean) {
  return new Map(
    buildSecurityHeaders(isProduction).map(({ key, value }) => [key, value]),
  );
}

describe('buildSecurityHeaders', () => {
  it('uses report-only CSP and excludes HSTS outside production', () => {
    const headers = toHeaderMap(false);

    expect(headers.get('X-Frame-Options')).toBe('DENY');
    expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headers.get('Permissions-Policy')).toBe(
      'camera=(), microphone=(), geolocation=(), payment=()',
    );
    expect(headers.get('Content-Security-Policy-Report-Only')).toBe(
      buildContentSecurityPolicy(false),
    );
    expect(headers.has('Content-Security-Policy')).toBe(false);
    expect(headers.has('Strict-Transport-Security')).toBe(false);
  });

  it('enforces CSP and HSTS in production', () => {
    const headers = toHeaderMap(true);

    expect(headers.get('Content-Security-Policy')).toBe(buildContentSecurityPolicy(true));
    expect(headers.has('Content-Security-Policy-Report-Only')).toBe(false);
    expect(headers.get('Strict-Transport-Security')).toBe(
      'max-age=31536000; includeSubDomains; preload',
    );
  });
});
