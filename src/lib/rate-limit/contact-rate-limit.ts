const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

/** Best-effort per server instance — not shared across serverless instances or regions. */
const memoryHits = new Map<string, number[]>();
const PRUNE_THRESHOLD = 1000;

function pruneExpired(now: number): void {
  for (const [key, hits] of memoryHits) {
    if (hits.every(t => now - t >= CONTACT_WINDOW_MS)) {
      memoryHits.delete(key);
    }
  }
}

function checkMemoryLimit(identifier: string): boolean {
  const now = Date.now();

  if (memoryHits.size >= PRUNE_THRESHOLD) {
    pruneExpired(now);
  }

  const recent = (memoryHits.get(identifier) ?? []).filter(
    t => now - t < CONTACT_WINDOW_MS,
  );

  if (recent.length >= CONTACT_LIMIT) {
    memoryHits.set(identifier, recent);
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
  if (!checkMemoryLimit(identifier)) {
    return {
      ok: false,
      error: 'Too many messages sent. Please wait an hour and try again.',
    };
  }

  return { ok: true };
}
