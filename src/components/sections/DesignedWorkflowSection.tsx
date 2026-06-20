import Image from 'next/image';
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from '@/components/motion/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';

type DesignedWorkflowCard = {
  title: string;
  description: string;
  iconSrc: string;
};

type DesignedWorkflowSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  cards: DesignedWorkflowCard[];
  desktopCols?: 2 | 3 | 4;
};

export function DesignedWorkflowSection({
  eyebrow,
  title,
  description,
  cards,
  desktopCols = 3,
}: DesignedWorkflowSectionProps) {
  const desktopColsClass =
    desktopCols === 2
      ? 'md:grid-cols-2'
      : desktopCols === 4
        ? 'md:grid-cols-4'
        : 'md:grid-cols-3';

  return (
    <ScrollReveal
      as="section"
      className="bg-white px-4 py-12.5 md:px-8 md:py-10 lg:px-12.5 lg:py-30">
      <div className="mx-auto flex max-w-180.5 flex-col items-center gap-3 text-center">
        {eyebrow ? (
          <p className="text-brand-primary-600 text-sm font-semibold leading-[120%]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold leading-[120%] text-brand-neutral-800 md:leading-none lg:text-[2.5rem]">
          {title}
        </h2>
        <p className="text-base leading-5.5 tracking-[-1%] text-brand-neutral-700 md:leading-[120%]">
          {description}
        </p>
      </div>
      <ScrollRevealGroup
        className={`mx-auto mt-10 grid max-w-335 gap-6 ${desktopColsClass} lg:gap-10`}>
        {cards.map(c => (
          <ScrollRevealItem key={c.title} variant="scaleIn">
            <Card className="!grid h-full place-items-center gap-4 border-transparent bg-white py-0 text-center shadow-brand-sm ring-0 hover:border hover:border-brand-primary-200">
              <CardContent className="grid place-items-center gap-4 px-4 pb-6 pt-7.5 text-center lg:px-6">
                <Image
                  src={c.iconSrc}
                  alt={c.title}
                  width={50}
                  height={50}
                  unoptimized
                  className="h-10 w-10 lg:h-12.5 lg:w-12.5"
                />
                <div>
                  <h3 className="text-lg font-semibold text-brand-gray-800 lg:text-[1.375rem] lg:leading-8">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-base leading-[120%] tracking-[-1%] text-brand-gray-700">
                    {c.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </ScrollReveal>
  );
}
