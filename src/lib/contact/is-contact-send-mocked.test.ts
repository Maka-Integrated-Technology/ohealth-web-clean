import { afterEach, describe, expect, it, vi } from 'vitest';

import { isContactSendMocked } from '@/lib/contact/is-contact-send-mocked';

describe('isContactSendMocked', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('never mocks in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('E2E', 'true');
    vi.stubEnv('CONTACT_MOCK_SEND', 'true');

    expect(isContactSendMocked()).toBe(false);
  });

  it('mocks when E2E is set outside production', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('E2E', 'true');
    delete process.env.CONTACT_MOCK_SEND;

    expect(isContactSendMocked()).toBe(true);
  });

  it('mocks when CONTACT_MOCK_SEND is set outside production', () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('CONTACT_MOCK_SEND', 'true');
    delete process.env.E2E;

    expect(isContactSendMocked()).toBe(true);
  });

  it('does not mock in non-production without flags', () => {
    vi.stubEnv('NODE_ENV', 'development');
    delete process.env.E2E;
    delete process.env.CONTACT_MOCK_SEND;

    expect(isContactSendMocked()).toBe(false);
  });
});
