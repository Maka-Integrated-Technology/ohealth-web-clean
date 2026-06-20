import Link from 'next/link';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { Button } from '@/components/ui/button';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { MarketingDocHero } from '@/components/marketing/MarketingDocHero';
import { faqItems } from '@/content/faq';
import { buildPageMetadata } from '@/lib/constants/seo';

export const metadata = buildPageMetadata({
  title: 'FAQs',
  path: '/faq',
  description:
    'Answers to common questions about OHealth+, consultations, lab tests, and your health records.',
});

export default function FaqPage() {
  return (
    <SiteChrome>
      <MarketingDocHero
        title="FAQs"
        eyebrow="Support"
        subtitle="Need something cleared up? Here are our most frequently asked questions."
      />
      <ScrollReveal className="bg-white px-4 py-10 xl:px-20 xl:py-24">
        <FaqAccordion items={faqItems} />
      </ScrollReveal>
      <ScrollReveal
        as="section"
        className="grid gap-8 bg-brand-gray-50 px-4 pt-16 pb-28 text-center lg:gap-10 xl:px-20 xl:pt-24 xl:pb-40">
        <div className="grid gap-4 lg:gap-5">
          <div className="grid gap-3">
            <p className="text-base font-semibold text-brand-primary-700">Contact us</p>
            <h2 className="text-2xl font-semibold text-brand-neutral-900 md:text-4xl tracking-[-2%]">
              Still have questions?
            </h2>
          </div>
          <p className="text-brand-neutral-500 text-lg">
            If you need more help, our support team is available to assist you.
          </p>
        </div>
        <Button
          nativeButton={false}
          variant="marketingPrimary"
          size="marketing-lg"
          className="mx-auto"
          render={<Link href="/contact" />}>
          Contact Support
        </Button>
      </ScrollReveal>
    </SiteChrome>
  );
}
