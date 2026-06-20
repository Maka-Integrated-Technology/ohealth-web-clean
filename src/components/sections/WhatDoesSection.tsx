import Image from 'next/image';
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from '@/components/motion/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type WhatDoesCard = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

type WhatDoesSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: WhatDoesCard[];
  cardClassName?: string;
  gridClassName?: string;
};

export function WhatDoesSection({
  eyebrow,
  title,
  description,
  cards,
  cardClassName,
  gridClassName,
}: WhatDoesSectionProps) {
  return (
    <ScrollReveal
      as="section"
      className="mx-auto grid gap-10 rounded-b-3xl bg-white px-4 py-12.5 md:gap-20 md:px-6 md:py-25">
      <div className="mx-auto flex max-w-162.5 flex-col items-center gap-6 text-center">
        <p className="text-brand-accent-500 text-sm font-semibold leading-[120%]">
          {eyebrow}
        </p>
        <div>
          <h2 className="text-2xl font-semibold leading-[120%] text-brand-neutral-800 md:leading-none lg:text-[2.5rem]">
            {title}
          </h2>
          <p className="mt-3 text-base leading-5.5 tracking-[-1%] text-brand-neutral-700 md:leading-[120%]">
            {description}
          </p>
        </div>
      </div>
      <ScrollRevealGroup
        className={cn(
          'mx-auto grid max-w-318.5 grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4',
          gridClassName,
        )}>
        {cards.map(c => (
          <ScrollRevealItem key={c.title} variant="scaleIn">
            <Card className="h-full gap-0 border border-transparent bg-brand-neutral-50 py-0 shadow-brand-sm ring-0 transition hover:border-brand-primary-200 hover:shadow-md">
              <CardContent
                className={cn(
                  'flex flex-1 flex-col px-4 pb-4 pt-4 md:px-6 md:pb-6 md:pt-7.5',
                  cardClassName,
                )}>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold leading-8 text-brand-gray-800">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-base leading-5 text-brand-neutral-700">
                    {c.description}
                  </p>
                </div>
                {c.imageSrc ? (
                  <Image
                    src={c.imageSrc}
                    alt={c.imageAlt ?? c.title}
                    width={260}
                    height={154}
                    unoptimized
                    className="mt-4 h-auto w-full shrink-0"
                    style={{ width: '100%', height: 'auto' }}
                  />
                ) : null}
              </CardContent>
            </Card>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </ScrollReveal>
  );
}
