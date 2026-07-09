'use client';

import Link from 'next/link';

import { CommonImage } from '@/shared/components/ui';

import { CarouselIndicator } from './carousel-indicator';
import { CarouselInfo, type CarouselInfoProps } from './carousel-info';
import { useCarousel } from './use-carousel';

interface CarouselItem {
  href: string;
  imageUrl: string;
  carouselInfo: CarouselInfoProps;
}

interface CarouselProps {
  items: CarouselItem[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const { currentIndex, emblaRef, handleIndicatorChange } = useCarousel();

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={emblaRef} className="w-full overflow-hidden rounded-lg">
        <div className="flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative block w-full shrink-0 overflow-hidden rounded-lg"
            >
              <CommonImage
                src={item.imageUrl}
                alt={item.carouselInfo.title}
                width={412}
                height={264}
                unoptimized
                radius="rounded-lg"
              />

              <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/40" />

              <div className="absolute bottom-5 left-5">
                <CarouselInfo {...item.carouselInfo} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CarouselIndicator
        total={items.length}
        currentIndex={currentIndex}
        onChange={handleIndicatorChange}
      />
    </div>
  );
};
