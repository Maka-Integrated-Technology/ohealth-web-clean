import { CONTACT_FIELD_LIMITS } from '@/lib/contact/contact-limits';

export type ContactMessageInput = {
  fullName: string;
  email: string;
  profession: string;
  message: string;
};

const EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

function withinLimit(value: string, max: number, min: number = 1): boolean {
  return value.length >= min && value.length <= max;
}

export function isValidContactEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim()) && email.length <= CONTACT_FIELD_LIMITS.email;
}

const FULL_NAME_MIN_LENGTH = 2;

const SPACELESS_NAME_SCRIPT = /[\u4e00-\u9fff\u3040-\u30ff\u30a0-\u30ff\uac00-\ud7af]/u;

export function isValidContactFullName(fullName: string): boolean {
  const trimmed = fullName.trim();
  if (trimmed.length < FULL_NAME_MIN_LENGTH) return false;

  const parts = trimmed.split(/[\s-]+/).filter(part => part.length > 0);

  if (parts.length >= 2) {
    return parts.every(part => /\p{L}/u.test(part));
  }

  return SPACELESS_NAME_SCRIPT.test(trimmed) && /^\p{L}+$/u.test(trimmed);
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
    !withinLimit(
      trimmedMessage,
      CONTACT_FIELD_LIMITS.message,
      CONTACT_FIELD_LIMITS.messageMin,
    ) ||
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
