'use client';

import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui';
import { useCarouselIndex } from '@/shared/hooks/use-carousel-index';

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
  const { currentIndex, emblaRef } = useCarouselIndex({
    align: 'start',
    loop: imageUrls.length > 1,
  });

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
                width={398}
                height={240}
                radius="rounded-none"
                sizes="(max-width: 430px) calc(100vw - 32px), 398px"
                className="h-full w-full"
                preload={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-caption-m-12 absolute top-4 right-4 rounded bg-black/60 px-2 py-1 text-white">
        {currentIndex + 1}/{imageUrls.length}
      </div>
    </div>
  );
};
