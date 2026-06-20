import Link from 'next/link';
import Image from 'next/image';
import { AppStoreBadges } from '@/components/marketing/AppStoreBadges';
import { FooterSocialLinks } from '@/components/layout/FooterSocialLinks';
import { footerPrimaryLinks } from '@/lib/nav';
import { getSocialLinks } from '@/lib/constants/external-links';
import { Button } from '@/components/ui/button';

type FooterLinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

function FooterLinkButton({ href, children }: FooterLinkButtonProps) {
  return (
    <Button
      nativeButton={false}
      variant="footerLink"
      className="group/footer-link relative h-auto overflow-visible px-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:text-brand-blue"
      render={<Link href={href} />}>
      <span className="relative inline-block">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-brand-blue transition-all duration-300 ease-out group-hover/footer-link:w-full"
        />
      </span>
    </Button>
  );
}

export function Footer() {
  const socialLinks = getSocialLinks();

  return (
    <footer id="site-footer" className="border-t border-brand-gray-100 bg-brand-gray-100">
      <section className="mx-auto grid max-w-460 gap-12 px-4 py-12 xl:gap-16 xl:px-20 xl:pt-16 xl:pb-12">
        <section className="flex flex-col gap-12 px-0 md:px-8 lg:flex-row lg:justify-between">
          <div className="grid gap-8">
            <div className="grid gap-6 md:gap-8">
              <div className="flex items-center gap-1">
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
              </div>
              <p className="max-w-md text-base text-brand-neutral-500">
                OHealth+ is a digital healthcare platform that connects you with verified
                healthcare professionals, lets you book consultations and lab tests
                online, and securely manage all your health records in one place.
              </p>
            </div>
            <ul className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-y-2 sm:gap-3 text-base leading-6 font-medium text-brand-neutral-500 md:flex md:gap-8">
              {footerPrimaryLinks.map(item => (
                <li key={item.href + item.label}>
                  <FooterLinkButton href={item.href}>{item.label}</FooterLinkButton>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base font-medium text-brand-primary-700">Get the app</p>
            <AppStoreBadges className="flex flex-wrap gap-4 lg:flex-col" />
          </div>
        </section>

        <section className="flex flex-col-reverse items-center justify-between gap-4 border-t border-brand-neutral-200 pt-8 md:flex-row md:px-8">
          <p className="text-base text-brand-neutral-500" suppressHydrationWarning>
            © {new Date().getFullYear()} OHealth+ Ltd. All rights reserved.
          </p>
          {socialLinks.length > 0 ? <FooterSocialLinks links={socialLinks} /> : null}
        </section>
      </section>
    </footer>
  );
}
