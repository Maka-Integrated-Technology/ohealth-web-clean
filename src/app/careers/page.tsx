import Link from 'next/link';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { MarketingDocHero } from '@/components/marketing/MarketingDocHero';
import { buildStubPageMetadata, brandName } from '@/lib/constants/seo';

export const metadata = buildStubPageMetadata({
  title: 'Careers',
  path: '/careers',
  description: `Explore careers at ${brandName} and help make healthcare more accessible.`,
});

export default function CareersPage() {
  return (
    <SiteChrome>
      <MarketingDocHero
        title={`Careers at ${brandName}`}
        subtitle="We’re building a calmer, more connected healthcare experience. Open roles will be posted here soon."
      />
      <ScrollReveal className="bg-white px-5 py-16 text-center md:px-10 md:py-24">
        <p className="mx-auto max-w-lg text-gray-600">
          Interested in working with us? Send a note through{' '}
          <Link href="/contact" className="font-semibold text-brand-blue hover:underline">
            contact
          </Link>{' '}
          and tell us what you’d like to build.
        </p>
      </ScrollReveal>
    </SiteChrome>
  );
}
