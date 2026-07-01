import { SiteChrome } from '@/components/layout/SiteChrome';
import { ForProfessionalsContent } from '@/components/for-professionals/ForProfessionalsContent';
import { buildPageMetadata, brandName } from '@/lib/constants/seo';

export const metadata = buildPageMetadata({
  title: 'For professionals',
  path: '/for-professionals',
  description: `Join ${brandName} as a healthcare professional — reach patients, manage consultations, and deliver care on a secure platform.`,
});

export default function ForProfessionalsPage() {
  return (
    <SiteChrome>
      <ForProfessionalsContent />
    </SiteChrome>
  );
}
