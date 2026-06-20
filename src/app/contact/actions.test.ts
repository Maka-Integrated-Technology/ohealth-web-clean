import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ContactFormState } from '@/lib/contact/contact-form-state';

const getRequestIpMock = vi.fn();
const assertContactRateLimitMock = vi.fn();
const sendContactMessageMock = vi.fn();

vi.mock('@/lib/contact/get-request-ip', () => ({
  getRequestIp: () => getRequestIpMock(),
}));

vi.mock('@/lib/rate-limit/contact-rate-limit', () => ({
  assertContactRateLimit: (identifier: string) => assertContactRateLimitMock(identifier),
}));

vi.mock('@/lib/contact/send-contact-message', () => ({
  sendContactMessage: (input: unknown) => sendContactMessageMock(input),
}));

import { submitContactForm } from '@/app/contact/actions';

function formData(entries: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    data.set(key, value);
  }
  return data;
}

const initialState: ContactFormState = {
  success: false,
  successAt: null,
  error: null,
  fieldErrors: {},
};

describe('submitContactForm', () => {
  beforeEach(() => {
    getRequestIpMock.mockReset();
    assertContactRateLimitMock.mockReset();
    sendContactMessageMock.mockReset();
    getRequestIpMock.mockResolvedValue('203.0.113.9');
    assertContactRateLimitMock.mockResolvedValue({ ok: true });
    sendContactMessageMock.mockResolvedValue({ ok: true, data: { id: 'email_123' } });
  });

  it('returns field errors for invalid input', async () => {
    const result = await submitContactForm(initialState, formData({}));

    expect(result.success).toBe(false);
    expect(result.fieldErrors.fullName).toBe('Full name is required.');
    expect(assertContactRateLimitMock).not.toHaveBeenCalled();
    expect(sendContactMessageMock).not.toHaveBeenCalled();
  });

  it('returns rate-limit errors without calling Resend', async () => {
    assertContactRateLimitMock.mockResolvedValue({
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    });

    const result = await submitContactForm(
      initialState,
      formData({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hello',
      }),
    );

    expect(result).toEqual({
      success: false,
      successAt: null,
      error: 'Too many messages sent. Please wait an hour and try again.',
      fieldErrors: {},
    });
    expect(getRequestIpMock).toHaveBeenCalled();
    expect(sendContactMessageMock).not.toHaveBeenCalled();
  });

  it('returns send errors from Resend', async () => {
    sendContactMessageMock.mockResolvedValue({
      ok: false,
      error: 'Unable to send your message. Please try again.',
    });

    const result = await submitContactForm(
      initialState,
      formData({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hello',
      }),
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('Unable to send your message. Please try again.');
  });

  it('returns success when validation, rate limit, and send succeed', async () => {
    const result = await submitContactForm(
      initialState,
      formData({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hello team',
      }),
    );

    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
    expect(result.successAt).toEqual(expect.any(Number));
    expect(sendContactMessageMock).toHaveBeenCalledWith({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      profession: '',
      message: 'Hello team',
    });
  });
});
