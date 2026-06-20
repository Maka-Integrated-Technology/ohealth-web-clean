'use client';

import { useReducedMotion, type Transition } from 'motion/react';
import type { ReactNode } from 'react';

import { motionTags, type MotionTag } from '@/components/motion/motion-tags';
import {
  motionVariantMap,
  transitionDefault,
  viewportDefault,
  type MotionVariantName,
} from '@/lib/motion/presets';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  as?: MotionTag;
  variant?: MotionVariantName;
  /** Animate on mount (heroes, page headers above the fold). */
  aboveFold?: boolean;
  delay?: number;
  className?: string;
  children?: ReactNode;
  id?: string;
};

export function ScrollReveal({
  as = 'div',
  variant = 'fadeUp',
  aboveFold = false,
  delay = 0,
  className,
  children,
  id,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionComponent = motionTags[as];
  const variants = motionVariantMap[variant];
  const transition: Transition = { ...transitionDefault, delay };

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  if (aboveFold) {
    return (
      <MotionComponent
        id={id}
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={transition}>
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefault}
      variants={variants}
      transition={transition}>
      {children}
    </MotionComponent>
  );
}
