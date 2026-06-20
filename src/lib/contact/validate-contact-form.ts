import type { ContactFormState } from '@/lib/contact/contact-form-state';
import {
  CONTACT_FIELD_LIMITS,
  CONTACT_HONEYPOT_FIELD,
} from '@/lib/contact/contact-limits';
import {
  isValidContactEmail,
  isValidContactFullName,
  parseContactFormData,
  type ContactMessageInput,
} from '@/lib/contact/contact-message';

export type ValidateContactResult =
  | { ok: true; payload: ContactMessageInput }
  | { ok: false; error: string; fieldErrors: ContactFormState['fieldErrors'] };

function isHoneypotTripped(formData: FormData): boolean {
  const value = formData.get(CONTACT_HONEYPOT_FIELD);
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateContactForm(formData: FormData): ValidateContactResult {
  if (isHoneypotTripped(formData)) {
    return {
      ok: false,
      error: 'Unable to send your message. Please try again.',
      fieldErrors: {},
    };
  }

  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const message = formData.get('message');

  const fieldErrors: ContactFormState['fieldErrors'] = {};

  if (typeof fullName !== 'string' || fullName.trim().length === 0) {
    fieldErrors.fullName = 'Full name is required.';
  } else if (fullName.trim().length > CONTACT_FIELD_LIMITS.fullName) {
    fieldErrors.fullName = `Full name must be ${CONTACT_FIELD_LIMITS.fullName} characters or fewer.`;
  } else if (!isValidContactFullName(fullName)) {
    fieldErrors.fullName = 'Please enter a valid full name.';
  }

  if (typeof email !== 'string' || email.trim().length === 0) {
    fieldErrors.email = 'Email address is required.';
  } else if (!isValidContactEmail(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  if (typeof message !== 'string' || message.trim().length === 0) {
    fieldErrors.message = 'Message is required.';
  } else if (message.trim().length > CONTACT_FIELD_LIMITS.message) {
    fieldErrors.message = `Message must be ${CONTACT_FIELD_LIMITS.message} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: 'Please fix the errors below.',
      fieldErrors,
    };
  }

  const payload = parseContactFormData(formData);

  if (!payload) {
    return {
      ok: false,
      error: 'Something went wrong. Please try again.',
      fieldErrors: {},
    };
  }

  return { ok: true, payload };
}
