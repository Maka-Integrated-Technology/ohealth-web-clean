export const CONTACT_FIELD_LIMITS = {
  fullName: 120,
  email: 254,
  profession: 120,
  message: 5000,
} as const;

/** Honeypot field — hidden from users; bots that fill it are rejected. */
export const CONTACT_HONEYPOT_FIELD = '_hp';
