'use client';

import { usePathname } from 'next/navigation';

import { NavLinkButton } from '@/components/layout/NavLinkButton';
import { mainNav } from '@/lib/nav';
import { APP_CTA_LABEL, getAppCtaHref } from '@/lib/constants/external-links';
import { cn } from '@/lib/utils';

export function NavbarDesktopNav() {
  const pathname = usePathname();
  const appCtaHref = getAppCtaHref();

  return (
    <div className="hidden items-center gap-8 xl:gap-39.5 lg:flex">
      <div className="hidden items-center gap-4 xl:gap-7.5 lg:flex">
        {mainNav.map(item => (
          <NavLinkButton
            key={item.href + item.label}
            href={item.href}
            variant="navLink"
            className={cn(
              'leading-[110%] tracking-[-0.2px] text-brand-neutral-700 hover:text-brand-blue',
              pathname === item.href && 'text-brand-blue',
            )}>
            {item.label}
          </NavLinkButton>
        ))}
      </div>
      <div className="hidden items-center gap-2 lg:flex">
        <NavLinkButton
          href="/for-professionals"
          variant="marketingOutline"
          size="nav-cta">
          Join as a professional
        </NavLinkButton>
        <NavLinkButton href={appCtaHref} variant="marketingPrimary" size="nav-cta">
          {APP_CTA_LABEL}
        </NavLinkButton>
      </div>
    </div>
  );
}
