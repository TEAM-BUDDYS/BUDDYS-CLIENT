'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui';

interface PostCarouselProps {
  imageUrls: string[];
  title: string;
  className?: string;
}

export const PostCarousel = ({
  imageUrls,
  title,
  className,
}: PostCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: imageUrls.length > 1,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative h-60 w-full overflow-hidden rounded-2xl',
        className,
      )}
    >
      <div
        ref={emblaRef}
        className="h-full overflow-hidden rounded-2xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="게시물 이미지"
      >
        <div className="flex h-full">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${imageUrls.length}`}
            >
              <CommonImage
                src={imageUrl}
                alt={`${title} 이미지 ${index + 1}`}
                width={343}
                height={240}
                radius="rounded-none"
                sizes="(max-width: 430px) 100vw, 430px"
                unoptimized
                className="h-full w-full"
                preload={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-caption-m-12 bg-opacity-60 absolute top-4 right-4 rounded px-2 py-1 text-white">
        {currentIndex + 1}/{imageUrls.length}
      </div>
    </div>
  );
};
