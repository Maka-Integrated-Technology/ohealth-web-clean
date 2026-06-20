import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { images } from '@/lib/images';

type WhoCanItem = {
  title: string;
  description?: string;
};

type WhoCanSectionProps = {
  heading: string;
  subheading: string;
  items: WhoCanItem[];
  highlightedIndex?: number;
};

export function WhoCanSection({
  heading,
  subheading,
  items,
  highlightedIndex = 0,
}: WhoCanSectionProps) {
  return (
    <ScrollReveal
      as="section"
      className="bg-white px-4 py-12.5 md:px-8 md:py-10 xl:px-39.5 xl:py-25">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-12.5 md:flex-row">
        <ScrollReveal variant="slideInLeft" className="grid w-full gap-10 md:w-1/2">
          <div className="max-w-80">
            <h2 className="mb-3 text-2xl font-semibold leading-none text-brand-gray-800 lg:text-[2.5rem]">
              {heading}
            </h2>
            <p className="text-sm text-brand-neutral-700 tracking-[-1%] md:text-base md:leading-[120%]">
              {subheading}
            </p>
          </div>
          <ul className="max-w-137.5 space-y-9 text-gray-800 lg:space-y-12.5">
            {items.map((item, index) => (
              <li key={item.title} className="flex gap-1.5">
                <div
                  className={`w-1 self-stretch rounded-[1px] ${index === highlightedIndex ? 'bg-brand-accent-500' : 'bg-brand-accent-200'}`}
                  aria-hidden
                />
                <div>
                  <h3 className="text-xl font-semibold text-brand-gray-800 lg:text-2xl">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="text-base leading-5.5 tracking-[-1%] text-brand-neutral-700 lg:mt-1.5 lg:text-lg lg:leading-7">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal
          variant="slideInRight"
          delay={0.08}
          className="relative h-auto w-full md:w-auto">
          <Image
            src={images.whoItsFor}
            alt="OHealth+ app on mobile"
            width={522}
            height={642}
            className="h-auto w-full max-w-[522px] object-contain"
            style={{ width: '100%', height: 'auto' }}
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}
