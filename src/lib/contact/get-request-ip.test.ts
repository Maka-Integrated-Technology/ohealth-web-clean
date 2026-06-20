import { afterEach, describe, expect, it, vi } from 'vitest';

const headersMock = vi.fn();

vi.mock('next/headers', () => ({
  headers: () => headersMock(),
}));

describe('getRequestIp', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    headersMock.mockReset();
  });

  it('uses Vercel x-real-ip when present', async () => {
    vi.stubEnv('VERCEL', '1');
    headersMock.mockResolvedValue(
      new Headers({
        'x-real-ip': '203.0.113.10',
      }),
    );

    const { getRequestIp } = await import('@/lib/contact/get-request-ip');
    await expect(getRequestIp()).resolves.toBe('203.0.113.10');
  });

  it('falls back to first x-forwarded-for hop on Vercel', async () => {
    vi.stubEnv('VERCEL', '1');
    headersMock.mockResolvedValue(
      new Headers({
        'x-forwarded-for': '198.51.100.1, 10.0.0.1',
      }),
    );

    const { getRequestIp } = await import('@/lib/contact/get-request-ip');
    await expect(getRequestIp()).resolves.toBe('198.51.100.1');
  });

  it('returns dev-local in development without Vercel headers', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    delete process.env.VERCEL;
    headersMock.mockResolvedValue(new Headers());

    const { getRequestIp } = await import('@/lib/contact/get-request-ip');
    await expect(getRequestIp()).resolves.toBe('dev-local');
  });

  it('returns unknown outside development when IP cannot be resolved', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    delete process.env.VERCEL;
    headersMock.mockResolvedValue(new Headers());

    const { getRequestIp } = await import('@/lib/contact/get-request-ip');
    await expect(getRequestIp()).resolves.toBe('unknown');
  });
});
