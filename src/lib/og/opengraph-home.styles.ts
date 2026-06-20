import type { CSSProperties } from 'react';

/** Satori / ImageResponse only supports inline styles — kept as module constants to avoid per-render object allocation. */
export const openGraphHomeRootStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: 80,
  background: 'linear-gradient(135deg, #0040c1 0%, #155eef 45%, #063595 100%)',
  color: '#ffffff',
  fontFamily: 'system-ui, sans-serif',
};

export const openGraphHomeBrandStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  fontSize: 28,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  opacity: 0.95,
};

export const openGraphHomeHeadlineStyle: CSSProperties = {
  marginTop: 32,
  fontSize: 56,
  fontWeight: 700,
  lineHeight: 1.15,
  letterSpacing: '-0.03em',
  maxWidth: 900,
};

export const openGraphHomeSubheadStyle: CSSProperties = {
  marginTop: 28,
  fontSize: 26,
  lineHeight: 1.4,
  opacity: 0.9,
  maxWidth: 820,
};

export const openGraphHomeImageSize = { width: 1200, height: 630 } as const;
