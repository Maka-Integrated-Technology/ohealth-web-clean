import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildContentSecurityPolicy } from '@/lib/security/csp';
import { proxy } from '@/proxy';

describe('proxy', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('sets baseline security headers in development', () => {
    vi.stubEnv('NODE_ENV', 'development');

    const response = proxy();

    expect(response.headers.get('X-Frame-Options')).toBe('DENY');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(response.headers.get('Referrer-Policy')).toBe(
      'strict-origin-when-cross-origin',
    );
    expect(response.headers.get('Content-Security-Policy-Report-Only')).toBe(
      buildContentSecurityPolicy(false),
    );
    expect(response.headers.get('Strict-Transport-Security')).toBeNull();
  });

  it('enforces CSP and HSTS in production', () => {
    vi.stubEnv('NODE_ENV', 'production');

    const response = proxy();

    expect(response.headers.get('Content-Security-Policy')).toBe(
      buildContentSecurityPolicy(true),
    );
    expect(response.headers.get('Strict-Transport-Security')).toBe(
      'max-age=31536000; includeSubDomains; preload',
    );
  });
});
