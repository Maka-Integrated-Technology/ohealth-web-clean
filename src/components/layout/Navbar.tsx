import Link from 'next/link';
import Image from 'next/image';

import { NavbarDesktopNav } from '@/components/layout/NavbarDesktopNav';
import { NavbarMobileMenu } from '@/components/layout/NavbarMobileMenu';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md">
      <nav
        className="relative mx-auto flex max-w-460 items-center justify-between px-4 py-3.5 xl:py-7.5 xl:px-15"
        aria-label="Primary">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            alt="OHealth+ logo"
            width={24}
            height={24}
            className="h-6 w-6"
            unoptimized
          />
          <p className="text-base font-semibold text-brand-black-800 tracking-[-0.8px] leading-[110%]">
            OHealth+
          </p>
        </Link>

        <NavbarDesktopNav />
        <NavbarMobileMenu />
      </nav>
    </header>
  );
}
