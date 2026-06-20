/** True for assets served from `/public` — skip the Cloudinary custom loader. */
export function isLocalPublicImage(src: string): boolean {
  return src.startsWith('/') && !src.startsWith('//');
}

/** Cloudinary public IDs (same asset pipeline as legacy healthBridge-web). */
export const images = {
  heroPhones: 'comp-01_gpjgmk.png',
  feature1: '1_wu3tr8.png',
  feature2: '2_cacued.png',
  feature3: '3_ycuynq.png',
  howItWorksDesktop: 'hit-01_brxw2r.png',
  howItWorksMobile: 'hit-02_v7r6d4.png',
  whoItsFor: 'hit_03_jgc2wq.png',
  proDashboard: 'prev_01_lkdewg.png',
  ctaPhones: 'comp-02_s0dfxh.png',
} as const;
