import type { Metadata } from 'next';

import { SiteChrome } from '@/components/layout/SiteChrome';
import { HomeContent } from '@/components/home/HomeContent';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <SiteChrome>
      <HomeContent />
    </SiteChrome>
  );
}
