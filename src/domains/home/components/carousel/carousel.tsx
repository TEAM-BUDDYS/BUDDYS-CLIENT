'use client';

import Image from 'next/image';
import Link from 'next/link';

import { CarouselIndicator } from '@/domains/home/components/carousel/carousel-indicator';
import {
  CarouselInfo,
  type CarouselInfoProps,
} from '@/domains/home/components/carousel/carousel-info';
import { useCarousel } from '@/domains/home/components/carousel/use-carousel';

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
              <Image
                src={item.imageUrl}
                alt={item.carouselInfo.title}
                width={412}
                height={264}
                unoptimized
                className="h-55 w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60" />

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
