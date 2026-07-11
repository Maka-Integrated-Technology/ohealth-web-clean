import { afterEach, describe, expect, it, vi } from 'vitest';

describe('getSiteUrl', () => {
  const envSnapshot = { ...process.env };

  afterEach(() => {
    process.env = { ...envSnapshot };
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  async function loadSeo() {
    return import('@/lib/constants/seo');
  }

  it('uses NEXT_PUBLIC_SITE_URL when present', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://ohealth.example.com/');
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;

    const { getSiteUrl } = await loadSeo();

    expect(getSiteUrl()).toBe('https://ohealth.example.com');
  });

  it('falls back to the production deployment URL before localhost', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'ohealth.vercel.app');
    delete process.env.VERCEL_URL;

    const { getSiteUrl } = await loadSeo();

    expect(getSiteUrl()).toBe('https://ohealth.vercel.app');
  });

  it('throws in production when metadata needs a public site origin but none is configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;

    const { buildRootMetadata } = await loadSeo();

    expect(() => buildRootMetadata()).toThrow(
      'Missing site origin for metadata. Set NEXT_PUBLIC_SITE_URL or provide a deployment URL environment variable.',
    );
  });
});
