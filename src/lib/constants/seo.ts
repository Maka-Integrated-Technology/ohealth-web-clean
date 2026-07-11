import type { Metadata } from 'next';

/** Public site origin for canonical URLs, Open Graph, and sitemap. */
export function getSiteUrl(): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

  if (siteUrl) {
    return siteUrl.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing site origin for metadata. Set NEXT_PUBLIC_SITE_URL or provide a deployment URL environment variable.',
    );
  }

  return 'http://localhost:3000';
}

export const brandName = 'OHealth+';
export const altBrandName = 'OHealth';
export const companyName = 'MAKA Integrated Technology LTD';
export const copyrightYear = 2026;

export function getSeoDetails(): Omit<Metadata, 'openGraph' | 'twitter' | 'alternates'> {
  const siteUrl = getSiteUrl();

  return {
    title: {
      default: `${brandName} â€” Accessible, secure, and connected healthcare`,
      template: `%s | ${brandName}`,
    },
    description: `${brandName} is a digital healthcare platform that connects you with verified healthcare professionals, lets you book consultations and lab tests online, and helps you manage health records securely in one place.`,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: companyName, url: siteUrl }],
    keywords: [
      brandName,
      altBrandName,
      'digital healthcare',
      'telehealth',
      'telemedicine',
      'online doctor',
      'health records',
      'lab tests',
      'book consultation',
      'healthcare professionals',
      'patient portal',
      'medical appointments',
    ],
    generator: 'Next.js',
    publisher: companyName,
    category: 'Healthcare',
    applicationName: brandName,
  };
}

export const siteOpenGraphImage = '/opengraph-image';

export function buildRootMetadata(): Metadata {
  const seoDetails = getSeoDetails();
  const title =
    typeof seoDetails.title === 'object' && seoDetails.title !== null
      ? seoDetails.title.default
      : brandName;

  return {
    ...seoDetails,
    openGraph: {
      title,
      description: seoDetails.description,
      type: 'website',
      url: seoDetails.metadataBase,
      siteName: brandName,
      locale: 'en_US',
      images: [{ url: siteOpenGraphImage, width: 1200, height: 630, alt: brandName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seoDetails.description,
      images: [siteOpenGraphImage],
    },
  };
}

type PageMetadataOptions = {
  title: string;
  path: `/${string}` | '/';
  description?: string;
};

/** Per-route metadata with correct canonical URL and social tags. */
export function buildPageMetadata({
  title,
  path,
  description,
}: PageMetadataOptions): Metadata {
  const seoDetails = getSeoDetails();
  const pageDescription = description ?? seoDetails.description;
  const canonicalUrl = new URL(path, seoDetails.metadataBase).toString();

  return {
    title,
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${brandName}`,
      description: pageDescription,
      type: 'website',
      url: canonicalUrl,
      siteName: brandName,
      locale: 'en_US',
      images: [{ url: siteOpenGraphImage, width: 1200, height: 630, alt: brandName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${brandName}`,
      description: pageDescription,
      images: [siteOpenGraphImage],
    },
  };
}

/** Routes with real content â€” included in sitemap. */
export const PUBLIC_ROUTES = [
  '/',
  '/for-professionals',
  '/faq',
  '/contact',
  '/privacy',
  '/terms',
] as const;

/** Placeholder routes â€” live but excluded from sitemap until content ships. */
export const STUB_ROUTES = ['/blog', '/careers'] as const;

/** Metadata for stub/placeholder pages (noindex, follow). */
export function buildStubPageMetadata({
  title,
  path,
  description,
}: PageMetadataOptions): Metadata {
  return {
    ...buildPageMetadata({ title, path, description }),
    robots: { index: false, follow: true },
  };
}
