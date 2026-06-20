'use client';

import { m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

import { motionVariantMap, type MotionVariantName } from '@/lib/motion/presets';
import { cn } from '@/lib/utils';

type ScrollRevealItemProps = {
  className?: string;
  children?: ReactNode;
  variant?: MotionVariantName;
};

export function ScrollRevealItem({
  className,
  children,
  variant = 'fadeUp',
}: ScrollRevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div className={cn(className)} variants={motionVariantMap[variant]}>
      {children}
    </m.div>
  );
}
