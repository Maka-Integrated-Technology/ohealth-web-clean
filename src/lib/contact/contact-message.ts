import { CONTACT_FIELD_LIMITS } from '@/lib/contact/contact-limits';

export type ContactMessageInput = {
  fullName: string;
  email: string;
  profession: string;
  message: string;
};

const EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

function withinLimit(value: string, max: number): boolean {
  return value.length > 0 && value.length <= max;
}

export function isValidContactEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim()) && email.length <= CONTACT_FIELD_LIMITS.email;
}

const FULL_NAME_MIN_LENGTH = 2;

/**
 * Accepts mononyms, multi-part names, and common name punctuation (hyphens, apostrophes).
 * Requires at least one letter (any script) per whitespace-separated part.
 */
export function isValidContactFullName(fullName: string): boolean {
  const trimmed = fullName.trim();
  if (trimmed.length < FULL_NAME_MIN_LENGTH) return false;

  const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
  if (parts.length === 0) return false;

  return parts.every(part => /\p{L}/u.test(part));
}

export function parseContactFormData(formData: FormData): ContactMessageInput | null {
  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const profession = formData.get('profession');
  const message = formData.get('message');

  if (
    typeof fullName !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return null;
  }

  const trimmedName = fullName.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const trimmedProfession = typeof profession === 'string' ? profession.trim() : '';

  if (
    !withinLimit(trimmedName, CONTACT_FIELD_LIMITS.fullName) ||
    !isValidContactFullName(trimmedName) ||
    !withinLimit(trimmedMessage, CONTACT_FIELD_LIMITS.message) ||
    trimmedProfession.length > CONTACT_FIELD_LIMITS.profession ||
    !isValidContactEmail(trimmedEmail)
  ) {
    return null;
  }

  return {
    fullName: trimmedName,
    email: trimmedEmail,
    profession: trimmedProfession,
    message: trimmedMessage,
  };
}
