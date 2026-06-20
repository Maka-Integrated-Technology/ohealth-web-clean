'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'motion/react';

import type { SocialLink } from '@/lib/constants/external-links';
import { cn } from '@/lib/utils';

type FooterSocialLinksProps = {
  links: SocialLink[];
};

export function FooterSocialLinks({ links }: FooterSocialLinksProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-0.5">
      {links.map((link, index) => (
        <m.div
          key={link.label}
          className="flex"
          whileHover={
            reduceMotion
              ? { scale: 1.05 }
              : {
                  y: -6,
                  scale: 1.18,
                  rotate: index % 2 === 0 ? -10 : 10,
                }
          }
          whileTap={reduceMotion ? undefined : { scale: 0.9, y: 0 }}
          transition={{ type: 'spring', stiffness: 520, damping: 14, mass: 0.6 }}>
          <Link
            href={link.href}
            prefetch={false}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex size-9 items-center justify-center rounded-full text-brand-neutral-500 transition-colors duration-200',
              'hover:bg-white/80 hover:shadow-sm',
              link.className,
            )}>
            <svg
              className="size-5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden>
              <path d={link.path} />
            </svg>
          </Link>
        </m.div>
      ))}
    </div>
  );
}
