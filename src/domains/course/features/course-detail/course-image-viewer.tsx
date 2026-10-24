'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import type { CourseDay } from '@/domains/course/api/type';
import { XIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';
import { useCarouselIndex } from '@/shared/hooks/use-carousel-index';
import { useLockBodyScroll } from '@/shared/hooks/use-lock-body-scroll';

interface CourseImageViewerProps extends Pick<
  CourseDay,
  'imageUrls' | 'dayNumber'
> {
  startIndex: number;
  onClose: (index: number) => void;
}

export const CourseImageViewer = ({
  imageUrls,
  dayNumber,
  startIndex,
  onClose,
}: CourseImageViewerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { currentIndex, emblaRef } = useCarouselIndex({
    align: 'start',
    loop: imageUrls.length > 1,
    startIndex,
  });

  useLockBodyScroll(true);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const imageUrlOccurrences = new Map<string, number>();

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Day ${dayNumber} 여행 사진 전체 보기`}
      className="fixed inset-0 m-auto h-dvh max-h-none w-full max-w-107.5 overflow-hidden border-0 bg-black p-0 text-white backdrop:bg-black"
      onClose={() => onClose(currentIndex)}
    >
      <div className="absolute inset-x-0 top-0 z-10 pt-[env(safe-area-inset-top)]">
        <Header
          className="bg-transparent px-2"
          contentAlign="center"
          content={
            <p
              className="text-title-b-18 text-white"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentIndex + 1}/{imageUrls.length}
            </p>
          }
          right={
            <button
              aria-label="사진 전체 보기 닫기"
              className="flex size-11 items-center justify-center rounded-lg text-white"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              <XIcon className="size-6" />
            </button>
          }
        />
      </div>

      <div
        ref={emblaRef}
        aria-label="좌우로 넘겨 여행 사진 보기"
        aria-roledescription="carousel"
        className="h-full [touch-action:pan-y_pinch-zoom] overflow-hidden py-[calc(60px+env(safe-area-inset-top))]"
        role="region"
      >
        <div className="flex h-full">
          {imageUrls.map((imageUrl, index) => {
            const occurrence = imageUrlOccurrences.get(imageUrl) ?? 0;

            imageUrlOccurrences.set(imageUrl, occurrence + 1);

            return (
              <div
                key={`${imageUrl}-${occurrence}`}
                aria-hidden={currentIndex !== index}
                aria-label={`${index + 1} / ${imageUrls.length}`}
                aria-roledescription="slide"
                className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
                role="group"
              >
                <Image
                  fill
                  alt={`Day ${dayNumber} 여행 사진 ${index + 1}`}
                  className="object-contain"
                  draggable={false}
                  loading={index === startIndex ? 'eager' : 'lazy'}
                  sizes="(max-width: 430px) 100vw, 430px"
                  src={imageUrl}
                />
              </div>
            );
          })}
        </div>
      </div>
    </dialog>
  );
};
