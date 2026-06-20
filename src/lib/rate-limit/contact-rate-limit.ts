import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const CONTACT_LIMIT = 5;
const CONTACT_WINDOW = '1 h';

let upstashRatelimit: Ratelimit | null = null;

function getUpstashRatelimit(): Ratelimit | null {
  if (upstashRatelimit) return upstashRatelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  upstashRatelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(CONTACT_LIMIT, CONTACT_WINDOW),
    prefix: 'ohealth-contact',
  });

  return upstashRatelimit;
}

/** In-memory fallback — best-effort per server instance (not for multi-region serverless). */
const memoryHits = new Map<string, number[]>();
const MEMORY_WINDOW_MS = 60 * 60 * 1000;

function checkMemoryLimit(identifier: string): boolean {
  const now = Date.now();
  const recent = (memoryHits.get(identifier) ?? []).filter(
    t => now - t < MEMORY_WINDOW_MS,
  );

  if (recent.length >= CONTACT_LIMIT) {
    return false;
  }

  recent.push(now);
  memoryHits.set(identifier, recent);
  return true;
}

export type ContactRateLimitResult = { ok: true } | { ok: false; error: string };

export async function assertContactRateLimit(
  identifier: string,
): Promise<ContactRateLimitResult> {
  const ratelimit = getUpstashRatelimit();

  if (ratelimit) {
    const { success } = await ratelimit.limit(identifier);
    if (!success) {
      return {
        ok: false,
        error: 'Too many messages sent. Please wait an hour and try again.',
      };
    }
    return { ok: true };
  }

  if (process.env.NODE_ENV === 'production') {
    console.error(
      'Contact rate limiting is misconfigured: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required in production.',
    );
    return {
      ok: false,
      error: 'Unable to send your message right now. Please try again later.',
    };
  }

  if (!checkMemoryLimit(identifier)) {
    return {
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    };
  }

  return { ok: true };
}
