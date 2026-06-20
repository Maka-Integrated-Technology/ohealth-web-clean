'use client';

import { m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

import { staggerContainer, viewportDefault } from '@/lib/motion/presets';
import { cn } from '@/lib/utils';

type ScrollRevealGroupProps = {
  className?: string;
  children?: ReactNode;
  stagger?: number;
};

export function ScrollRevealGroup({
  className,
  children,
  stagger = 0.09,
}: ScrollRevealGroupProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefault}
      variants={{
        ...staggerContainer,
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.06,
          },
        },
      }}>
      {children}
    </m.div>
  );
}
