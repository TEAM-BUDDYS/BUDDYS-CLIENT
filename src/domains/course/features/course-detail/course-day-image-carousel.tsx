'use client';

import type { KeyboardEvent } from 'react';
import { useState } from 'react';

import type { CourseDay } from '@/domains/course/api/type';
import { CommonImage } from '@/shared/components/ui';
import { useCarouselIndex } from '@/shared/hooks/use-carousel-index';

import { CourseImageViewer } from './course-image-viewer';

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
  const [viewerStartIndex, setViewerStartIndex] = useState<number | null>(null);
  const { currentIndex, emblaApi, emblaRef } = useCarouselIndex({
    align: 'start',
    loop: imageUrls.length > 1,
  });
  const hasMultipleImages = imageUrls.length > 1;

  const handleViewerClose = (index: number) => {
    emblaApi?.scrollTo(index, true);
    setViewerStartIndex(null);
  };

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

  const imageUrlOccurrences = new Map<string, number>();

  return (
    <>
      <div className="relative aspect-375/280 w-full overflow-hidden">
        <div
          ref={emblaRef}
          className="focus-visible:outline-mint-300 h-full [touch-action:pan-y_pinch-zoom] overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
          role="region"
          aria-roledescription="carousel"
          aria-label={`Day ${dayNumber} 사진${hasMultipleImages ? ', 좌우 방향키로 이동' : ''}`}
          tabIndex={hasMultipleImages ? 0 : undefined}
          onKeyDown={handleKeyDown}
        >
          <div className="flex h-full">
            {imageUrls.map((imageUrl, index) => {
              const occurrence = imageUrlOccurrences.get(imageUrl) ?? 0;

              imageUrlOccurrences.set(imageUrl, occurrence + 1);

              return (
                <div
                  key={`${imageUrl}-${occurrence}`}
                  className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${imageUrls.length}`}
                >
                  <button
                    aria-label={`Day ${dayNumber} 여행 사진 ${index + 1} 전체 보기`}
                    className="block h-full w-full"
                    type="button"
                    onClick={() => setViewerStartIndex(index)}
                  >
                    <CommonImage
                      src={imageUrl}
                      alt=""
                      width={375}
                      height={280}
                      radius="rounded-none"
                      sizes="(max-width: 430px) 100vw, 430px"
                      className="h-full w-full"
                      draggable={false}
                      preload={preload && index === 0}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <span
          className="text-caption-m-12 pointer-events-none absolute top-4 right-4 rounded bg-black/60 px-2 py-1 text-white"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentIndex + 1}/{imageUrls.length}
        </span>
      </div>
      {viewerStartIndex !== null && (
        <CourseImageViewer
          imageUrls={imageUrls}
          dayNumber={dayNumber}
          startIndex={viewerStartIndex}
          onClose={handleViewerClose}
        />
      )}
    </>
  );
};
