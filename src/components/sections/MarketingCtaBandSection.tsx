import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/images';

type MarketingCtaBandProps = {
  title: ReactNode;
  description: ReactNode;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export function MarketingCtaBandSection({
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: MarketingCtaBandProps) {
  return (
    <ScrollReveal
      as="section"
      className="bg-brand-primary-800 px-4 pb-0 pt-12.5 md:px-5 md:pt-8 lg:py-[0.005rem] xl:px-15">
      <div className="mx-auto flex max-w-430 flex-col items-center gap-7.5 md:flex-row md:justify-between md:gap-0 md:pl-6 xl:pl-16">
        <ScrollReveal
          variant="slideInLeft"
          className="max-w-xl py-0 text-center md:py-6 md:text-left lg:py-16">
          <div>
            <h2 className="text-[2.5rem] font-semibold leading-[1.15] tracking-[-1px] text-brand-neutral-25 lg:text-[3.75rem]">
              {title}
            </h2>
            <p className="mt-3 text-base text-brand-neutral-50">{description}</p>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center md:mt-17.5 md:justify-start">
            <Button
              nativeButton={false}
              variant="marketingInverse"
              size="marketing-base"
              render={<Link href={primaryCtaHref} />}>
              {primaryCtaLabel}
            </Button>
            <Button
              nativeButton={false}
              variant="marketingOnDark"
              size="marketing-base"
              render={<Link href={secondaryCtaHref} />}>
              {secondaryCtaLabel}
              <ArrowRightCircle className="size-6" aria-hidden />
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal
          variant="slideInRight"
          delay={0.1}
          className="relative h-auto self-end">
          <Image
            src={images.ctaPhones}
            alt="Doctor profile on mobile"
            width={652}
            height={683}
            className="h-auto w-full max-w-[652px] object-contain object-bottom"
            style={{ width: '100%', height: 'auto' }}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}
