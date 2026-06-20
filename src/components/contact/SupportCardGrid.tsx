import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/motion/scroll-reveal';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { supportCards } from '@/content/contact';

export function SupportCardGrid() {
  return (
    <ScrollRevealGroup className="grid max-w-116.5 gap-4 md:gap-6 xl:gap-12.5">
      {supportCards.map(card => (
        <ScrollRevealItem key={card.title}>
          <Card className="items-start gap-3 rounded-[0.5rem] border border-brand-neutral-200 bg-black/3 py-0 shadow-sm ring-0 transition-shadow hover:shadow-md">
            <CardContent className="p-4 md:p-6 md:pb-0">
              <h3 className="text-lg font-semibold leading-[110%] tracking-[-0.8px] text-brand-gray-800">
                {card.title}
              </h3>
              <p className="mt-2 text-base leading-[120%] tracking-[-0.8px] text-brand-neutral-700">
                {card.description}
              </p>
            </CardContent>
            <CardFooter className="border-0 bg-transparent p-4 pt-0 md:px-6 md:pb-6">
              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-base font-semibold leading-[110%] tracking-[-0.8px] text-brand-primary-600 hover:text-blue-800">
                {card.linkLabel}
                <ArrowUpRight className="size-5 stroke-2" aria-hidden />
              </Link>
            </CardFooter>
          </Card>
        </ScrollRevealItem>
      ))}
    </ScrollRevealGroup>
  );
}
