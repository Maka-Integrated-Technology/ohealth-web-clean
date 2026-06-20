'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/motion/scroll-reveal';
import type { FaqItem } from '@/content/faq';
import { cn } from '@/lib/utils';

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ScrollRevealGroup className="mx-auto max-w-3xl space-y-4" stagger={0.06}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <ScrollRevealItem key={item.question} className="p-5 xl:p-8">
            <button
              type="button"
              id={triggerId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full cursor-pointer flex-row-reverse items-start gap-3 text-left md:flex-row md:gap-6">
              <span className="relative mt-0.5 h-6 w-6 shrink-0" aria-hidden>
                <Image
                  src="/icons/plus-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                  className={cn(
                    'absolute inset-0 h-6 w-6 transition-all duration-300 ease-out motion-reduce:transition-none',
                    open
                      ? 'scale-75 rotate-90 opacity-0'
                      : 'scale-100 rotate-0 opacity-100',
                  )}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/icons/minus-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                  className={cn(
                    'absolute inset-0 h-6 w-6 transition-all duration-300 ease-out motion-reduce:transition-none',
                    open
                      ? 'scale-100 rotate-0 opacity-100'
                      : 'scale-75 -rotate-90 opacity-0',
                  )}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </span>
              <span className="min-w-0 flex-1 text-lg font-medium text-brand-neutral-900">
                {item.question}
              </span>
            </button>

            <section
              id={panelId}
              aria-labelledby={triggerId}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none md:ml-12',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}>
              <div className="overflow-hidden" aria-hidden={!open}>
                <p
                  className={cn(
                    'pt-2 text-base leading-relaxed text-brand-neutral-500 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
                    open
                      ? 'translate-y-0 opacity-100 delay-75'
                      : 'pointer-events-none -translate-y-2 opacity-0 delay-0',
                  )}>
                  {item.answer}
                </p>
              </div>
            </section>
          </ScrollRevealItem>
        );
      })}
    </ScrollRevealGroup>
  );
}
