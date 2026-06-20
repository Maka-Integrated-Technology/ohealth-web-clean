import { afterEach, describe, expect, it, vi } from 'vitest';

const limitMock = vi.fn();

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: Object.assign(
    vi.fn().mockImplementation(() => ({
      limit: limitMock,
    })),
    { slidingWindow: vi.fn() },
  ),
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(),
}));

describe('assertContactRateLimit', () => {
  const envSnapshot = { ...process.env };

  afterEach(() => {
    process.env = { ...envSnapshot };
    limitMock.mockReset();
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  async function loadRateLimit() {
    return import('@/lib/rate-limit/contact-rate-limit');
  }

  it('fails closed in production when Upstash is not configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const { assertContactRateLimit } = await loadRateLimit();
    const result = await assertContactRateLimit('prod-missing-upstash');

    expect(result).toEqual({
      ok: false,
      error: 'Unable to send your message right now. Please try again later.',
    });
  });

  it('uses Upstash when credentials are present', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'token';
    limitMock.mockResolvedValue({ success: true });

    const { assertContactRateLimit } = await loadRateLimit();
    const result = await assertContactRateLimit('upstash-ok');

    expect(result).toEqual({ ok: true });
    expect(limitMock).toHaveBeenCalledWith('upstash-ok');
  });

  it('returns a user-facing error when Upstash denies the request', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'token';
    limitMock.mockResolvedValue({ success: false });

    const { assertContactRateLimit } = await loadRateLimit();
    const result = await assertContactRateLimit('upstash-denied');

    expect(result).toEqual({
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    });
  });

  it('falls back to in-memory limiting in non-production without Upstash', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const { assertContactRateLimit } = await loadRateLimit();
    const identifier = `memory-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      await expect(assertContactRateLimit(identifier)).resolves.toEqual({ ok: true });
    }

    await expect(assertContactRateLimit(identifier)).resolves.toEqual({
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    });
  });
});
