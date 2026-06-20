'use client';

import { LazyMotion, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

type MotionLazyProps = {
  children: ReactNode;
};

/** Loads a smaller motion feature set (~30kb savings vs full `motion` import). */
export function MotionLazy({ children }: MotionLazyProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
