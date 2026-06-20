'use client';

import { m } from 'motion/react';

export const motionTags = {
  div: m.div,
  section: m.section,
  article: m.article,
  header: m.header,
  main: m.main,
  ul: m.ul,
  li: m.li,
  footer: m.footer,
} as const;

export type MotionTag = keyof typeof motionTags;
