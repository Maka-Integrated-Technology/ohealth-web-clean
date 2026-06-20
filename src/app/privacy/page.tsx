import { SiteChrome } from '@/components/layout/SiteChrome';
import { MarketingDocHero } from '@/components/marketing/MarketingDocHero';
import { PolicyBody } from '@/components/marketing/PolicyBody';
import { privacySections } from '@/content/legal';
import { buildPageMetadata } from '@/lib/constants/seo';

export const metadata = buildPageMetadata({
  title: 'Privacy policy',
  path: '/privacy',
  description:
    'How OHealth+ collects, uses, and protects your personal and health information.',
});

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <MarketingDocHero
        eyebrow="Current as of May 13, 2026"
        title="Privacy policy"
        subtitle="We respect your privacy regarding any information we may collect from you across our application."
      />
      <div className="bg-white">
        <PolicyBody sections={privacySections} />
      </div>
    </SiteChrome>
  );
}
