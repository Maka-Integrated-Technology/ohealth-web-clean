import { resolve4, resolve6, resolveMx } from 'node:dns/promises';
import { isIP } from 'node:net';
import { domainToASCII } from 'node:url';

const DNS_TIMEOUT_MS = 3_000;

const DOMAIN_LABEL_REGEX = /^(?!-)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

const DISPOSABLE_DOMAINS = new Set([
  'hidingmail.net',
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  'throwaway.email',
  'yopmail.com',
  'sharklasers.com',
  'trashmail.com',
  'dispostable.com',
  'maildrop.cc',
]);

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('DNS timeout')), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

export async function hasValidEmailDomain(email: string): Promise<boolean> {
  const normalizedEmail = email.trim();

  if (normalizedEmail.length === 0 || normalizedEmail.length > 254) {
    return false;
  }

  const atIndex = normalizedEmail.lastIndexOf('@');

  if (atIndex <= 0 || atIndex !== normalizedEmail.indexOf('@')) {
    return false;
  }

  const localPart = normalizedEmail.slice(0, atIndex);
  const rawDomain = normalizedEmail.slice(atIndex + 1);

  if (localPart.length > 64 || rawDomain.length === 0) {
    return false;
  }

  const domain = domainToASCII(rawDomain).toLowerCase().replace(/\.$/, '');

  if (!domain || domain.length > 253 || !domain.includes('.') || isIP(domain) !== 0) {
    return false;
  }

  const labels = domain.split('.');

  if (
    labels.some(
      label => label.length === 0 || label.length > 63 || !DOMAIN_LABEL_REGEX.test(label),
    )
  ) {
    return false;
  }

  // Reject known disposable email providers before hitting DNS
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return false;
  }

  try {
    const mxEntries = await withTimeout(resolveMx(domain), DNS_TIMEOUT_MS);

    if (mxEntries.length > 0) {
      return true;
    }
  } catch {
    // Some valid email domains do not publish MX records.
  }

  // SMTP permits delivery through an A or AAAA record when no MX exists.
  try {
    const addresses = await Promise.allSettled([
      withTimeout(resolve4(domain), DNS_TIMEOUT_MS),
      withTimeout(resolve6(domain), DNS_TIMEOUT_MS),
    ]);

    return addresses.some(
      result => result.status === 'fulfilled' && result.value.length > 0,
    );
  } catch {
    return false;
  }
}
