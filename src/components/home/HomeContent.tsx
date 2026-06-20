import { HeroSection } from '@/components/sections/HeroSection';
import { MarketingCtaBandSection } from '../sections/MarketingCtaBandSection';
import { PromoSection } from '../sections/PromoSection';
import { DesignedWorkflowSection } from '../sections/DesignedWorkflowSection';
import { WhoCanSection } from '../sections/WhoCanSection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { WhatDoesSection } from '../sections/WhatDoesSection';
import { homeSteps, trustedCards, whatDoesCards, whoItsForItems } from '@/content/home';
import { getAppCtaHref } from '@/lib/constants/external-links';

export function HomeContent() {
  return (
    <>
      <section className="overflow-hidden bg-brand-gray-100 px-4 md:mx-5 xl:px-10">
        <HeroSection variant="home" />

        <WhatDoesSection
          eyebrow="What OHealth+ Does"
          title="Everything You Need to Manage Your Health In One Platform"
          description="OHealth+ brings healthcare services together so you can access care, diagnostics, and your health data without stress or unnecessary hospital visits."
          cards={whatDoesCards}
          cardClassName="pb-0"
          gridClassName="md:grid-cols-2 xl:grid-cols-3"
        />

        <HowItWorksSection
          title="How OHealth+ Works"
          description="Create an account, connect with verified professionals, book consultations or lab tests, and manage your health data-all in one seamless experience."
          steps={homeSteps}
          headingWrapClassName="mx-auto max-w-181 text-center"
          cardsWrapClassName="relative mx-auto mt-2 sm:mt-10 md:mt-14 max-w-232 min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[813px]"
          cardsGridClassName="pt-10 md:pt-20 lg:pt-27"
          cardClassName="relative flex max-w-67 gap-4 rounded-xl bg-white px-3 pb-3 pt-4 text-left shadow-brand-sm md:max-w-87.5 md:px-6 md:pb-6 md:pt-7.5"
          titleClassName="text-base sm:text-lg lg:text-[1.375rem]"
          bodyClassName="text-sm sm:text-base"
          backgroundImageSrc="/images/how-iphone.svg"
          backgroundImageClassName="h-auto w-[300px] sm:w-[360px] md:w-[400px] lg:w-[400px]"
          alternateFromMd={false}
        />
      </section>

      <WhoCanSection
        heading="Who It’s For"
        subheading="Built for Everyone in the Healthcare Journey"
        items={whoItsForItems}
        highlightedIndex={0}
      />

      <DesignedWorkflowSection
        title="A Trusted Healthcare Platform You Can Rely On"
        description="Create an account, connect with verified professionals, book consultations or lab tests, and manage your health data-all in one seamless experience."
        cards={trustedCards}
        desktopCols={2}
      />

      <PromoSection />

      <MarketingCtaBandSection
        title={
          <>
            Get started with{' '}
            <span className="font-serif font-medium italic text-[#f5b179]">OHealth+</span>{' '}
            today
          </>
        }
        description="Whether you are seeking care or providing it, OHealth+ makes healthcare more accessible, efficient, and connected."
        primaryCtaLabel="Create a free account"
        primaryCtaHref={getAppCtaHref()}
        secondaryCtaLabel="Join as a professional"
        secondaryCtaHref="/for-professionals"
      />
    </>
  );
}
