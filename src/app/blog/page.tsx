import Link from 'next/link';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { MarketingDocHero } from '@/components/marketing/MarketingDocHero';
import { buildStubPageMetadata } from '@/lib/constants/seo';

export const metadata = buildStubPageMetadata({
  title: 'Blog',
  path: '/blog',
  description: 'News and updates from OHealth+.',
});

export default function BlogPage() {
  return (
    <SiteChrome>
      <MarketingDocHero
        title="Blog"
        subtitle="Stories, product updates, and practical guidance for patients and care teams. More articles are on the way."
      />
      <ScrollReveal className="bg-white px-5 py-16 text-center md:px-10 md:py-24">
        <p className="mx-auto max-w-lg text-gray-600">
          We&apos;re preparing editorial content for this space. Until then, visit our{' '}
          <Link href="/faq" className="font-semibold text-brand-blue hover:underline">
            FAQs
          </Link>{' '}
          or{' '}
          <Link href="/contact" className="font-semibold text-brand-blue hover:underline">
            contact us
          </Link>
          .
        </p>
      </ScrollReveal>
    </SiteChrome>
  );
}
