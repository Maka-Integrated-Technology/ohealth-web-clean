import { MarketingCtaBandSection } from '@/components/sections/MarketingCtaBandSection';
import { PromoSection } from '@/components/sections/PromoSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { DesignedWorkflowSection } from '../sections/DesignedWorkflowSection';
import { WhoCanSection } from '../sections/WhoCanSection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { WhatDoesSection } from '../sections/WhatDoesSection';
import {
  designedCards,
  proSteps,
  whoCanItems,
  whyCards,
} from '@/content/for-professionals';
import { getAppCtaHref } from '@/lib/constants/external-links';

export function ForProfessionalsContent() {
  return (
    <>
      <section className="overflow-hidden bg-brand-gray-100 px-4 md:mx-5 xl:px-10">
        <HeroSection variant="professionals" />

        <WhatDoesSection
          eyebrow="Why Join OHealth+"
          title="Why Healthcare Professionals Choose OHealth+"
          description="OHealth+ is built to simplify your workflow, expand your reach, and help you
            focus on what matters most - providing quality care."
          cards={whyCards}
        />

        <HowItWorksSection
          title="Get started"
          description="Start using OHealth+ in just a few steps and begin connecting with patients seamlessly."
          steps={proSteps}
        />
      </section>

      <WhoCanSection
        heading="Who Can Join"
        subheading="Built for Healthcare Professionals Across Specialties"
        items={whoCanItems}
        highlightedIndex={0}
      />

      <DesignedWorkflowSection
        eyebrow="Built for Your Workflow"
        title="Designed for Modern Healthcare Professionals"
        description="OHealth+ is designed to fit naturally into your workflow, helping you deliver care efficiently without the complexity of traditional systems."
        cards={designedCards}
        desktopCols={3}
      />

      <PromoSection ctaHref="/contact" ctaLabel="Get in touch" />

      <MarketingCtaBandSection
        title="Start Growing Your Practice Today"
        description="Join OHealth+ and take the next step in delivering accessible, efficient, and modern healthcare."
        primaryCtaLabel="Join as professional"
        primaryCtaHref="/contact"
        secondaryCtaLabel="Create an Account"
        secondaryCtaHref={getAppCtaHref()}
      />
    </>
  );
}
