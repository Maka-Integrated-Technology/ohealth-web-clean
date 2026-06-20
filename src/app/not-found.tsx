import Link from 'next/link';

import { SiteChrome } from '@/components/layout/SiteChrome';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <ScrollReveal
        as="section"
        aboveFold
        className="mx-auto flex min-h-[min(70vh,40rem)] max-w-3xl flex-col items-center justify-center gap-6 px-5 py-16 text-center md:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary-600">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.02em] text-brand-neutral-900 md:text-4xl">
          This page could not be found
        </h1>
        <p className="max-w-md text-base leading-relaxed text-brand-neutral-600">
          The link may be broken or the page may have been removed. Head back home or
          contact us if you need help.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            nativeButton={false}
            variant="marketingPrimary"
            size="marketing-sm"
            render={<Link href="/" />}>
            Back to home
          </Button>
          <Button
            nativeButton={false}
            variant="marketingOutline"
            size="marketing-sm"
            render={<Link href="/contact" />}>
            Contact support
          </Button>
        </div>
      </ScrollReveal>
    </SiteChrome>
  );
}
