import { headers } from 'next/headers';

/**
 * Best-effort client IP for rate limiting.
 * On Vercel, platform headers are trusted. Locally, uses a stable dev bucket.
 */
export async function getRequestIp(): Promise<string> {
  const headerList = await headers();

  if (process.env.VERCEL === '1') {
    const vercelIp =
      headerList.get('x-real-ip')?.trim() ||
      headerList.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (vercelIp) return vercelIp;
  }

  if (process.env.NODE_ENV === 'development') {
    return 'dev-local';
  }

  return 'unknown';
}
