'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
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
    <div className="flex w-full items-center justify-between border-b border-gray-100 pb-4">
      <div className="flex min-w-0 flex-1 items-center gap-3 pr-4">
        <button
          type="button"
          aria-label={`Previous ${title}`}
          disabled={atStart}
          onClick={onPrev}
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-blue-500 text-gray-900 transition',
            atStart ? 'cursor-not-allowed opacity-40' : 'hover:bg-blue-50',
          )}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-base md:text-lg font-bold leading-tight text-gray-900 truncate">
          {title}
        </span>
      </div>

      <button
        type="button"
        aria-label={`Next ${title}`}
        disabled={atEnd}
        onClick={onNext}
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-blue-500 text-gray-900 transition',
          atEnd ? 'cursor-not-allowed opacity-40' : 'hover:bg-blue-50',
        )}>
        <ChevronRight className="h-5 w-5" />
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

    const doctorName = pro.name || 'Dr. Aisha Bello';
    const doctorSpecialty = pro.specialty || 'General Doctor';
    const doctorRating = pro.rating || '4.9';
    const doctorReviews = pro.reviewCount || '120';

    return (
      <div className="mt-4 flex flex-1 flex-col gap-4 w-full max-w-full overflow-hidden">
        <CarouselHeader
          title={title}
          index={index}
          count={count}
          onPrev={goPrev}
          onNext={goNext}
        />

        <div className="flex items-end justify-between gap-2">
          <p className="text-sm text-gray-500 truncate">
            Looking for doctors available near you
          </p>
          <div className="flex shrink-0 items-end gap-1 pb-1" aria-hidden>
            {items.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'rounded-full transition-colors',
                  i === index
                    ? 'bg-gray-700 h-2.5 w-2.5 -translate-y-0.5'
                    : 'bg-gray-400 h-1.5 w-1.5',
                )}
              />
            ))}
          </div>
        </div>

        {/* Added overflow-hidden to prevent absolute elements from causing horizontal page scroll */}
        <div className="relative flex flex-col gap-4 rounded-2xl border-2 border-blue-400 bg-white p-4 overflow-hidden">
          <div className="flex gap-4">
            <div className="relative shrink-0">
              <Image
                key={pro.photoUrl}
                src={pro.photoUrl}
                alt={doctorName}
                width={80}
                height={80}
                priority
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <span
                className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white translate-x-1 -translate-y-1"
                aria-label="Available now">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                  <path d="M12 1L9 4l-4-1 1 4-4 3 3 4-3 4 4 3-1 4 4-1 3 3 3-3 4 1-1-4 4-3-3-4 3-4-4-3 1-4-4 1z" />
                  <path
                    fill="#34d399"
                    d="M10.5 15.5l-3.5-3.5 1.5-1.5 2 2 5-5 1.5 1.5z"
                    className="fill-emerald-400"
                  />
                  <path d="M10.5 15.5l-3.5-3.5 1.5-1.5 2 2 5-5 1.5 1.5z" fill="white" />
                </svg>
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <p className="truncate text-lg font-bold text-gray-900">{doctorName}</p>
              <p className="truncate text-sm font-medium text-blue-500">
                {doctorSpecialty}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-gray-900">{doctorRating}</span>
                <span className="truncate text-sm text-gray-500">
                  ({doctorReviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            <ArrowRight className="h-4 w-4" />
            View Profile
            <ArrowRight className="h-4 w-4" />
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
    <div className="mt-4 flex flex-col gap-3 w-full max-w-full overflow-hidden">
      <CarouselHeader
        title={title}
        index={index}
        count={count}
        onPrev={goPrev}
        onNext={goNext}
      />
      <p className="text-sm text-gray-500 truncate">Select the type of care you need</p>

      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <Image
          key={specialty.photoUrl}
          src={specialty.photoUrl}
          alt={specialty.label}
          fill
          sizes="(min-width: 1280px) 284px, (min-width: 640px) 45vw, 90vw"
          priority
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
