import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from '@/components/ui/button-variants';

type MarketingButtonSize = Extract<
  VariantProps<typeof buttonVariants>['size'],
  'marketing-md' | 'marketing-md-wide'
>;

export type HeroCtaKind = 'appCta';

export type HeroCta = {
  label: string;
  href: string;
  variant: 'marketingPrimary' | 'marketingOutline';
  size: MarketingButtonSize;
  /** Resolved at render time (e.g. app CTA href from env). */
  kind?: HeroCtaKind;
};

export type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageClassName: string;
};

export type HeroContent = {
  headingMaxWidthClass: string;
  description: string;
  ctas: HeroCta[];
  image: HeroImage;
};

export const homeHero: HeroContent = {
  headingMaxWidthClass: 'xl:max-w-212',
  description:
    'OHealth+ is a digital healthcare platform that connects you with verified healthcare professionals, lets you book consultations and lab tests online, and securely manage all your health records in one place.',
  ctas: [
    {
      label: 'Get App',
      href: '/contact',
      variant: 'marketingPrimary',
      size: 'marketing-md-wide',
      kind: 'appCta',
    },
    {
      label: 'Join as a professional',
      href: '/for-professionals',
      variant: 'marketingOutline',
      size: 'marketing-md',
    },
  ],
  image: {
    src: '/images/hero-home.svg',
    alt: 'Appointments and patient records',
    width: 717,
    height: 598,
    imageClassName: 'max-w-[717px]',
  },
};

export const professionalsHero: HeroContent = {
  headingMaxWidthClass: 'xl:max-w-209',
  description:
    'OHealth+ helps healthcare professionals connect with patients, manage consultations, and deliver care more efficiently through a secure, easy-to-use web platform.',
  ctas: [
    {
      label: 'Join as a Professional',
      href: '/contact',
      variant: 'marketingPrimary',
      size: 'marketing-md',
    },
  ],
  image: {
    src: '/images/hero-professional.svg',
    alt: 'Appointments and patient records',
    width: 1300,
    height: 566,
    imageClassName: 'max-w-[1300px]',
  },
};
