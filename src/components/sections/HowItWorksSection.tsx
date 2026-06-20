import Image from 'next/image';
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from '@/components/motion/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Step = {
  n: number;
  title: string;
  body: string;
  tone: 'blue' | 'orange';
};

type HowItWorksSectionProps = {
  title: string;
  description: string;
  steps: Step[];
  headingWrapClassName?: string;
  cardsWrapClassName?: string;
  cardsGridClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  backgroundImageSrc?: string;
  backgroundImageClassName?: string;
  alternateFromMd?: boolean;
};

export function HowItWorksSection({
  title,
  description,
  steps,
  headingWrapClassName,
  cardsWrapClassName,
  cardsGridClassName,
  cardClassName,
  titleClassName,
  bodyClassName,
  backgroundImageSrc,
  backgroundImageClassName,
  alternateFromMd = true,
}: HowItWorksSectionProps) {
  const headingClasses =
    headingWrapClassName ?? 'mx-auto mb-12.5 max-w-150 text-center md:mb-25';
  const cardsWrapClasses = cardsWrapClassName ?? 'relative mx-auto mt-14 max-w-250';
  const isCustomCard = cardClassName != null;
  const cardClasses = isCustomCard
    ? cardClassName
    : 'relative max-w-125 gap-0 bg-white py-0 text-left shadow-brand-sm ring-0';

  return (
    <ScrollReveal
      as="section"
      className="mx-auto max-w-430 py-16 sm:px-5 xl:px-40 xl:py-25">
      <div className={headingClasses}>
        <h2 className="mb-3 text-3xl font-semibold leading-none text-brand-gray-800 md:text-[2.5rem]">
          {title}
        </h2>
        <p className="text-base tracking-[-1%] text-brand-neutral-700 md:leading-[120%]">
          {description}
        </p>
      </div>
      <div className={cardsWrapClasses}>
        {backgroundImageSrc ? (
          <div
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center blur-xs md:blur-none"
            aria-hidden>
            <Image
              src={backgroundImageSrc}
              alt="How OHealth+ works"
              width={400}
              height={640}
              unoptimized
              className={
                backgroundImageClassName ??
                'h-auto w-[300px] sm:w-[360px] md:w-[400px] lg:w-[400px]'
              }
              style={{ height: 'auto' }}
            />
          </div>
        ) : null}
        <ScrollRevealGroup
          className={`relative z-10 grid w-full gap-y-12.5 md:gap-y-10 ${cardsGridClassName ?? ''}`}
          stagger={0.12}>
          {steps.map((s, i) => {
            const cardAlign =
              i % 2 === 1
                ? alternateFromMd
                  ? 'md:ml-auto'
                  : 'ml-auto'
                : alternateFromMd
                  ? 'md:mr-auto'
                  : 'mr-auto';

            return (
              <ScrollRevealItem key={s.n} className="w-full overflow-visible">
                <Card
                  className={cn(
                    cardClasses,
                    cardAlign,
                    !isCustomCard && 'ring-0',
                    'overflow-visible!',
                  )}>
                  <div
                    className={`absolute top-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full font-sans text-xl leading-none font-bold text-white lg:h-15 lg:w-15 lg:text-[1.875rem] ${
                      i % 2 === 1 ? 'right-6 lg:left-6 lg:right-auto' : 'left-6'
                    } ${s.tone === 'blue' ? 'bg-brand-primary-600' : 'bg-brand-accent-500'}`}>
                    {s.n}
                  </div>
                  <CardContent className={isCustomCard ? 'p-0' : 'px-6 pb-6 pt-7.5'}>
                    <h3
                      className={`text-[1.125rem] font-semibold leading-8 text-brand-gray-800 lg:text-[1.375rem] ${titleClassName ?? ''}`}>
                      {s.title}
                    </h3>
                    <p
                      className={`mt-1 text-base leading-5 text-brand-neutral-700 ${bodyClassName ?? ''}`}>
                      {s.body}
                    </p>
                  </CardContent>
                </Card>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealGroup>
      </div>
    </ScrollReveal>
  );
}
