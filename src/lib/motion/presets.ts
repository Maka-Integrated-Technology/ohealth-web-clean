import type { Transition, Variants } from 'motion/react';

export const easeOutSmooth: Transition['ease'] = [0.22, 1, 0.36, 1];

export const transitionDefault: Transition = {
  duration: 0.55,
  ease: easeOutSmooth,
};

export const viewportDefault = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -8% 0px',
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const motionVariantMap = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
} as const;

export type MotionVariantName = keyof typeof motionVariantMap;
