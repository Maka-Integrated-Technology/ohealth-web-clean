import type { NextConfig } from 'next';

const shouldValidateEnv =
  process.env.NODE_ENV === 'production' &&
  (process.env.CI === 'true' || process.env.VERCEL === '1');

if (shouldValidateEnv) {
  const required = [
    'RESEND_API_KEY',
    'CONTACT_FROM_EMAIL',
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
  ] as const;

  for (const key of required) {
    if (!process.env[key]?.trim()) {
      throw new Error(
        `\n\nMissing required environment variable: ${key}\n` +
          `Add it to your production environment and rebuild.\n`,
      );
    }
  }

  if (process.env.CONTACT_MOCK_SEND === 'true' || process.env.E2E === 'true') {
    throw new Error(
      '\n\nCONTACT_MOCK_SEND and E2E must not be enabled in production builds.\n',
    );
  }
}

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.ts',
  },
};

export default nextConfig;
