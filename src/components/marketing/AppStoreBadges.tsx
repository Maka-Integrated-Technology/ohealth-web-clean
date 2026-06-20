import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getGooglePlayUrl, getIosAppStoreUrl } from '@/lib/constants/external-links';

type AppStoreBadgesProps = {
  className?: string;
};

function StoreBadgePlaceholder({ label, src }: { label: string; src: string }) {
  return (
    <span
      className="inline-flex cursor-not-allowed opacity-60"
      aria-disabled="true"
      title="Coming soon">
      <span className="sr-only">{label} — coming soon</span>
      <Image src={src} alt="" width={135} height={40} unoptimized aria-hidden />
    </span>
  );
}

export function AppStoreBadges({ className }: AppStoreBadgesProps) {
  const iosUrl = getIosAppStoreUrl();
  const androidUrl = getGooglePlayUrl();

  return (
    <div className={className}>
      {iosUrl ? (
        <Button
          nativeButton={false}
          variant="storeBadge"
          render={<Link href={iosUrl} prefetch={false} />}>
          <Image
            src="/icons/apple-app-store.svg"
            alt="Download on the Apple App Store"
            width={135}
            height={40}
            unoptimized
          />
        </Button>
      ) : (
        <StoreBadgePlaceholder label="Apple App Store" src="/icons/apple-app-store.svg" />
      )}
      {androidUrl ? (
        <Button
          nativeButton={false}
          variant="storeBadge"
          render={<Link href={androidUrl} prefetch={false} />}>
          <Image
            src="/icons/google-play-store.svg"
            alt="Get it on Google Play"
            width={135}
            height={40}
            unoptimized
          />
        </Button>
      ) : (
        <StoreBadgePlaceholder
          label="Google Play Store"
          src="/icons/google-play-store.svg"
        />
      )}
    </div>
  );
}
