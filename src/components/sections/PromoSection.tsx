import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/images';

type PromoSectionProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export function PromoSection({
  ctaHref = '/for-professionals',
  ctaLabel = 'Get Started as a Provider',
}: PromoSectionProps) {
  return (
    <ScrollReveal
      as="section"
      className="bg-brand-neutral-50 px-4 md:px-8 md:py-4 xl:px-15 xl:py-7.5">
      <div className="mx-auto flex max-w-430 flex-col items-center gap-10 px-4 py-12.5 text-center xl:px-6 xl:py-25">
        <div className="flex flex-col items-center gap-6">
          <p className="text-brand-accent-500 text-sm font-semibold leading-[120%]">
            For Professionals
          </p>
          <div className="mx-auto max-w-162.5">
            <h2 className="text-2xl font-semibold leading-[120%] text-brand-neutral-800 md:leading-none lg:text-[2.5rem]">
              Grow Your Practice with OHealth+
            </h2>
            <p className="mt-3 text-base leading-5.5 tracking-[-1%] text-brand-neutral-700 md:leading-[120%]">
              Join a trusted digital platform to reach more patients, manage your
              schedule, and deliver care flexibly.
            </p>
          </div>
          <Button
            nativeButton={false}
            variant="marketingPrimary"
            size="marketing-sm"
            render={<Link href={ctaHref} />}>
            {ctaLabel}
          </Button>
        </div>
        <ScrollReveal
          variant="scaleIn"
          delay={0.1}
          className="relative overflow-hidden rounded-t-3xl bg-brand-gray-100 md:px-7.5 md:pt-7.5">
          <Image
            src={images.proDashboard}
            alt="Appointments and patient records"
            width={1200}
            height={700}
            className="h-auto w-full"
            style={{ width: '100%', height: 'auto' }}
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}
