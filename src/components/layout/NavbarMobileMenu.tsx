'use client';

import { NavLinkButton } from '@/components/layout/NavLinkButton';
import { useMobileMenu } from '@/hooks/use-mobile-menu';
import { mainNav } from '@/lib/nav';
import { APP_CTA_LABEL, getAppCtaHref } from '@/lib/constants/external-links';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const MOBILE_MENU_ID = 'mobile-primary-navigation';

export function NavbarMobileMenu() {
  const { open, close, toggle, menuRef, toggleRef } = useMobileMenu();
  const appCtaHref = getAppCtaHref();

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'icon-sm' }),
          'flex flex-col gap-0.5 border-brand-neutral-300 p-0 text-gray-600 lg:hidden',
        )}
        aria-expanded={open}
        aria-controls={MOBILE_MENU_ID}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={toggle}>
        <span className="block h-0.5 w-3 rounded-full bg-current" />
        <span className="block h-0.5 w-3 rounded-full bg-current" />
        <span className="block h-0.5 w-3 rounded-full bg-current" />
      </button>

      {open ? (
        <nav
          ref={menuRef}
          id={MOBILE_MENU_ID}
          className="absolute top-full left-0 w-full border-b border-gray-100 bg-white px-6 py-8 lg:hidden"
          aria-label="Mobile">
          <div className="flex flex-col gap-2">
            {mainNav.map(item => (
              <NavLinkButton
                key={item.href + item.label}
                href={item.href}
                variant="navLink"
                className="justify-start text-gray-900 hover:text-brand-blue"
                onClick={close}>
                {item.label}
              </NavLinkButton>
            ))}
            <hr className="my-2 border-gray-100" />
            <div className="flex flex-col sm:flex-row gap-3">
              <NavLinkButton
                href="/for-professionals"
                variant="marketingOutline"
                size="nav-cta"
                className="w-fit"
                onClick={close}>
                Join as a professional
              </NavLinkButton>
              <NavLinkButton
                href={appCtaHref}
                variant="marketingPrimary"
                size="nav-cta"
                onClick={close}>
                {APP_CTA_LABEL}
              </NavLinkButton>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
}
