'use client';

import type { KeyboardEvent } from 'react';

import type { CourseDay } from '@/domains/course/api/type';
import { CommonImage } from '@/shared/components/ui';
import { useCarouselIndex } from '@/shared/hooks/use-carousel-index';

interface CourseDayImageCarouselProps extends Pick<
  CourseDay,
  'imageUrls' | 'dayNumber'
> {
  preload?: boolean;
}

export const CourseDayImageCarousel = ({
  imageUrls,
  dayNumber,
  preload = false,
}: CourseDayImageCarouselProps) => {
  const { currentIndex, emblaApi, emblaRef } = useCarouselIndex({
    align: 'start',
    loop: imageUrls.length > 1,
  });
  const hasMultipleImages = imageUrls.length > 1;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      emblaApi?.scrollPrev();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="relative h-55 w-full overflow-hidden">
      <div
        ref={emblaRef}
        className="focus-visible:outline-mint-300 h-full overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
        role="region"
        aria-roledescription="carousel"
        aria-label={`Day ${dayNumber} 사진${hasMultipleImages ? ', 좌우 방향키로 이동' : ''}`}
        tabIndex={hasMultipleImages ? 0 : undefined}
        onKeyDown={handleKeyDown}
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
                alt={`Day ${dayNumber} 여행 사진 ${index + 1}`}
                width={430}
                height={220}
                radius="rounded-none"
                sizes="(max-width: 430px) 100vw, 430px"
                className="h-full w-full"
                preload={preload && index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <span
        className="text-caption-m-12 absolute top-4 right-4 rounded bg-black/60 px-2 py-1 text-white"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentIndex + 1}/{imageUrls.length}
      </span>
    </div>
  );
};
