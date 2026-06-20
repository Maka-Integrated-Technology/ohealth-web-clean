'use client';

import { m, useReducedMotion } from 'motion/react';
import { useId } from 'react';

import { easeOutSmooth } from '@/lib/motion/presets';
import { cn } from '@/lib/utils';

type BrandLogoMarkProps = {
  className?: string;
  size?: number;
  /** When true, runs the intro animation (splash). When false, renders static mark. */
  animate?: boolean;
};

export function BrandLogoMark({
  className,
  size = 96,
  animate = false,
}: BrandLogoMarkProps) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const gradientId = `brand-heart-${uid}`;
  const shouldAnimate = animate && !reduceMotion;

  const heartTransition = shouldAnimate
    ? { type: 'spring' as const, stiffness: 280, damping: 20, mass: 0.85 }
    : { duration: 0 };

  const plusTransition = shouldAnimate
    ? { duration: 0.45, ease: easeOutSmooth }
    : { duration: 0 };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('overflow-visible', className)}
      aria-hidden>
      <defs>
        <linearGradient
          id={gradientId}
          x1="2"
          y1="11.9994"
          x2="22"
          y2="11.9994"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#063595" />
          <stop offset="1" stopColor="#254991" />
        </linearGradient>
      </defs>

      <m.g
        style={{ transformOrigin: '12px 12px' }}
        initial={shouldAnimate ? { scale: 0.68, opacity: 0 } : false}
        animate={
          shouldAnimate
            ? { scale: [0.68, 1.06, 1], opacity: 1 }
            : { scale: 1, opacity: 1 }
        }
        transition={
          shouldAnimate
            ? {
                scale: {
                  times: [0, 0.72, 1],
                  duration: 0.9,
                  ease: easeOutSmooth,
                },
                opacity: { duration: 0.35, ease: easeOutSmooth },
              }
            : heartTransition
        }>
        <path
          d="M19.46 3.99C16.78 2.35 14.44 3.01 13.03 4.07C12.46 4.5 12.17 4.72 12 4.72C11.83 4.72 11.54 4.5 10.97 4.07C9.56 3.01 7.22 2.35 4.54 3.99C1.02 6.15 0.22 13.27 8.34 19.28C9.89 20.43 10.66 21 12 21C13.34 21 14.11 20.43 15.66 19.28C23.78 13.27 22.98 6.15 19.46 3.99Z"
          fill={`url(#${gradientId})`}
        />
      </m.g>

      <m.path
        d="M12 9V15"
        stroke="#D1E0FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: '12px 12px' }}
        initial={shouldAnimate ? { scaleY: 0, opacity: 0 } : false}
        animate={shouldAnimate ? { scaleY: 1, opacity: 1 } : undefined}
        transition={shouldAnimate ? { ...plusTransition, delay: 0.38 } : plusTransition}
      />
      <m.path
        d="M9 12H15"
        stroke="#D1E0FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: '12px 12px' }}
        initial={shouldAnimate ? { scaleX: 0, opacity: 0 } : false}
        animate={shouldAnimate ? { scaleX: 1, opacity: 1 } : undefined}
        transition={shouldAnimate ? { ...plusTransition, delay: 0.52 } : plusTransition}
      />
    </svg>
  );
}
