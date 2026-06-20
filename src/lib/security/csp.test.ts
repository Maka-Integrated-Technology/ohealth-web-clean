import { describe, expect, it } from 'vitest';

import { buildContentSecurityPolicy } from '@/lib/security/csp';

describe('buildContentSecurityPolicy', () => {
  it('omits unsafe-eval when enforcing', () => {
    const csp = buildContentSecurityPolicy(true);
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).not.toContain('unsafe-eval');
    expect(csp).toContain("img-src 'self' data: blob: https://res.cloudinary.com");
  });

  it('allows unsafe-eval in report-only mode', () => {
    const csp = buildContentSecurityPolicy(false);
    expect(csp).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
  });
});
