import { SiteChrome } from '@/components/layout/SiteChrome';
import { MarketingDocHero } from '@/components/marketing/MarketingDocHero';
import { PolicyBody } from '@/components/marketing/PolicyBody';
import { termsSections } from '@/content/legal';
import { buildPageMetadata } from '@/lib/constants/seo';

export const metadata = buildPageMetadata({
  title: 'Terms & conditions',
  path: '/terms',
  description: 'Terms and conditions for using the OHealth+ platform and services.',
});

export default function TermsPage() {
  return (
    <SiteChrome>
      <MarketingDocHero
        eyebrow="Current as of May 13, 2026"
        title="Terms and conditions"
        subtitle="Please read these terms carefully before using OHealth+."
      />
      <div className="bg-white">
        <PolicyBody sections={termsSections} />
      </div>
    </SiteChrome>
  );
}
