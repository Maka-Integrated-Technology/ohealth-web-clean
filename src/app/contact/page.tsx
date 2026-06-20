import { SiteChrome } from '@/components/layout/SiteChrome';
import { ContactLeadForm } from '@/components/contact/ContactLeadForm';
import { SupportCardGrid } from '@/components/contact/SupportCardGrid';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { MarketingDocHero } from '@/components/marketing/MarketingDocHero';
import { buildPageMetadata } from '@/lib/constants/seo';

export const metadata = buildPageMetadata({
  title: 'Contact',
  path: '/contact',
  description:
    'Get in touch with the OHealth+ team for support, partnerships, or general inquiries.',
});

export default function ContactPage() {
  return (
    <SiteChrome>
      <MarketingDocHero
        eyebrow="Contact us"
        title="How can we help?"
        subtitle="Have questions, need support, or want to partner with us? We are here to help."
      />
      <div className="mx-auto flex max-w-310 flex-col gap-5 bg-white px-5 py-12 md:flex-row md:items-start md:px-8 md:py-25 xl:gap-12.5 xl:px-0">
        <ScrollReveal
          variant="slideInLeft"
          className="w-full sm:min-w-0 sm:flex-9 lg:flex-11">
          <SupportCardGrid />
        </ScrollReveal>
        <div className="w-full sm:min-w-0 sm:flex-13 lg:flex-17">
          <ContactLeadForm />
        </div>
      </div>
    </SiteChrome>
  );
}
