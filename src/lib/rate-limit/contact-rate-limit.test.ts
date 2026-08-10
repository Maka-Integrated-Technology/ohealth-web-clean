import { afterEach, describe, expect, it, vi } from 'vitest';

describe('assertContactRateLimit', () => {
  afterEach(() => {
    vi.resetModules();
    vi.useRealTimers();
  });

  async function loadRateLimit() {
    return import('@/lib/rate-limit/contact-rate-limit');
  }

  it('allows submissions up to the limit', async () => {
    const { assertContactRateLimit } = await loadRateLimit();
    const identifier = `under-limit-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      await expect(assertContactRateLimit(identifier)).resolves.toEqual({ ok: true });
    }
  });

  it('returns a user-facing error once the limit is exceeded', async () => {
    const { assertContactRateLimit } = await loadRateLimit();
    const identifier = `over-limit-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      await assertContactRateLimit(identifier);
    }

    await expect(assertContactRateLimit(identifier)).resolves.toEqual({
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    });
  });

  it('tracks identifiers independently', async () => {
    const { assertContactRateLimit } = await loadRateLimit();
    const blocked = `blocked-${Date.now()}`;
    const other = `other-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      await assertContactRateLimit(blocked);
    }

    await expect(assertContactRateLimit(blocked)).resolves.toEqual({
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    });
    await expect(assertContactRateLimit(other)).resolves.toEqual({ ok: true });
  });

  it('allows submissions again once the window has passed', async () => {
    vi.useFakeTimers();

    const { assertContactRateLimit } = await loadRateLimit();
    const identifier = 'window-reset';

    for (let i = 0; i < 5; i++) {
      await assertContactRateLimit(identifier);
    }

    await expect(assertContactRateLimit(identifier)).resolves.toEqual({
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    });

    vi.advanceTimersByTime(60 * 60 * 1000 + 1);

    await expect(assertContactRateLimit(identifier)).resolves.toEqual({ ok: true });
  });

  it('applies the same limiter in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const { assertContactRateLimit } = await loadRateLimit();
    const identifier = `prod-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      await expect(assertContactRateLimit(identifier)).resolves.toEqual({ ok: true });
    }

    await expect(assertContactRateLimit(identifier)).resolves.toEqual({
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    });

    vi.unstubAllEnvs();
  });
});
