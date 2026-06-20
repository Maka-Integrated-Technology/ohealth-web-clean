import { describe, expect, it } from 'vitest';

import {
  CONTACT_FIELD_LIMITS,
  CONTACT_HONEYPOT_FIELD,
} from '@/lib/contact/contact-limits';
import {
  isValidContactEmail,
  isValidContactFullName,
} from '@/lib/contact/contact-message';
import { validateContactForm } from '@/lib/contact/validate-contact-form';

function formData(entries: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    data.set(key, value);
  }
  return data;
}

describe('isValidContactEmail', () => {
  it('accepts a standard address', () => {
    expect(isValidContactEmail('user@example.com')).toBe(true);
  });

  it('rejects malformed addresses', () => {
    expect(isValidContactEmail('not-an-email')).toBe(false);
    expect(isValidContactEmail('a@b.c')).toBe(false);
  });
});

describe('isValidContactFullName', () => {
  it('accepts mononyms and multi-part names', () => {
    expect(isValidContactFullName('Madonna')).toBe(true);
    expect(isValidContactFullName('Jane Doe')).toBe(true);
    expect(isValidContactFullName('Mary Jane Watson')).toBe(true);
    expect(isValidContactFullName('Jean-Luc')).toBe(true);
    expect(isValidContactFullName('李明')).toBe(true);
  });

  it('rejects empty, too-short, or non-name values', () => {
    expect(isValidContactFullName('')).toBe(false);
    expect(isValidContactFullName('A')).toBe(false);
    expect(isValidContactFullName('12')).toBe(false);
    expect(isValidContactFullName('---')).toBe(false);
  });
});

describe('validateContactForm', () => {
  it('returns payload for valid input', () => {
    const result = validateContactForm(
      formData({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hello team',
      }),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.fullName).toBe('Jane Doe');
      expect(result.payload.email).toBe('jane@example.com');
    }
  });

  it('rejects honeypot submissions', () => {
    const result = validateContactForm(
      formData({
        fullName: 'Bot',
        email: 'bot@example.com',
        message: 'spam',
        [CONTACT_HONEYPOT_FIELD]: 'filled',
      }),
    );

    expect(result.ok).toBe(false);
  });

  it('accepts a mononym full name', () => {
    const result = validateContactForm(
      formData({
        fullName: 'Madonna',
        email: 'madonna@example.com',
        message: 'Hello team',
      }),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.fullName).toBe('Madonna');
    }
  });

  it('rejects a non-name full name', () => {
    const result = validateContactForm(
      formData({
        fullName: '12',
        email: 'jane@example.com',
        message: 'Hello team',
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.fullName).toBe('Please enter a valid full name.');
    }
  });

  it('rejects messages over the limit', () => {
    const result = validateContactForm(
      formData({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        message: 'x'.repeat(CONTACT_FIELD_LIMITS.message + 1),
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.message).toBeDefined();
    }
  });
});
