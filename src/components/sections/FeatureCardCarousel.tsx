'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { ProfessionalCarouselItem, SpecialtyCarouselItem } from '@/content/home';
import { cn } from '@/lib/utils';

type ProfessionalsCarouselProps = {
  variant: 'professionals';
  title: string;
  items: ProfessionalCarouselItem[];
};

type SpecialtiesCarouselProps = {
  variant: 'specialties';
  title: string;
  items: SpecialtyCarouselItem[];
};

type FeatureCardCarouselProps = ProfessionalsCarouselProps | SpecialtiesCarouselProps;

function CarouselHeader({
  title,
  index,
  count,
  onPrev,
  onNext,
}: {
  title: string;
  index: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const atStart = index === 0;
  const atEnd = index === count - 1;

  return (
    <div className="flex items-center justify-between gap-2 border-b border-brand-gray-100 pb-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Previous ${title}`}
          disabled={atStart}
          onClick={onPrev}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary-600 text-brand-neutral-900 transition',
            atStart ? 'cursor-not-allowed opacity-40' : 'hover:bg-brand-primary-200/40',
          )}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-base font-semibold text-brand-neutral-900">{title}</span>
      </div>
      <button
        type="button"
        aria-label={`Next ${title}`}
        disabled={atEnd}
        onClick={onNext}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary-600 text-brand-neutral-900 transition',
          atEnd ? 'cursor-not-allowed opacity-40' : 'hover:bg-brand-primary-200/40',
        )}>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function FeatureCardCarousel(props: FeatureCardCarouselProps) {
  const { title, items } = props;
  const [index, setIndex] = useState(0);
  const count = items.length;

  const goPrev = () => setIndex(i => Math.max(0, i - 1));
  const goNext = () => setIndex(i => Math.min(count - 1, i + 1));

  if (count === 0) return null;

  if (props.variant === 'professionals') {
    const pro = props.items[index];
    return (
      <div className="mt-4 flex flex-col gap-3">
        <CarouselHeader
          title={title}
          index={index}
          count={count}
          onPrev={goPrev}
          onNext={goNext}
        />
        <p className="text-xs text-brand-neutral-500">
          Looking for doctors available near you
        </p>
        <div className="flex items-center gap-3 rounded-xl border border-brand-neutral-200 bg-white p-3">
          <Image
            src={pro.photoUrl}
            alt={pro.name}
            width={56}
            height={56}
            unoptimized
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-brand-neutral-900">{pro.name}</p>
            <p className="text-xs text-brand-primary-600">{pro.specialty}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-brand-neutral-600">
              <Star className="h-3 w-3 fill-brand-accent-500 text-brand-accent-500" />
              <span>{pro.rating}</span>
              <span>({pro.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-neutral-900">
            {pro.price}
          </span>
          <button
            type="button"
            className="flex items-center gap-1 rounded-full bg-brand-primary-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-primary-700">
            View Profile
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  const specialty = props.items[index];

  const gradientClass =
    specialty.labelSide === 'right'
      ? 'bg-gradient-to-l from-black/70 via-black/25 to-transparent'
      : 'bg-gradient-to-r from-black/70 via-black/25 to-transparent';

  const labelAlignClass =
    specialty.labelSide === 'right'
      ? 'justify-end text-right'
      : 'justify-start text-left';

  return (
    <div className="mt-4 flex flex-col gap-3">
      <CarouselHeader
        title={title}
        index={index}
        count={count}
        onPrev={goPrev}
        onNext={goNext}
      />
      <p className="text-xs text-brand-neutral-500">Select the type of care you need</p>

      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <Image
          src={specialty.photoUrl}
          alt={specialty.label}
          fill
          unoptimized
          className="object-cover transition-transform duration-500"
          style={{
            objectPosition: specialty.objectPosition,
            transform: `scale(${specialty.scale})`,
            transformOrigin: specialty.objectPosition,
          }}
        />

        <div
          className={cn(
            'absolute inset-0 flex items-center p-4',
            gradientClass,
            labelAlignClass,
          )}>
          <span className="max-w-[45%] text-base font-semibold leading-snug text-white drop-shadow-md">
            {specialty.label}
          </span>
        </div>
      </div>
    </div>
  );
}
