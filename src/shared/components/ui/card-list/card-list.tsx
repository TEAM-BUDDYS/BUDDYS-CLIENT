'use client';

import { cn } from '@/lib/cn';
import { BookmarkIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface CardListImage {
  src: string;
  alt: string;
}

interface CardListProps {
  title: string;
  description: string;
  images: CardListImage[];
  isBookmarked: boolean;
  onBookmarkClick: () => void;
  className?: string;
}

export const CardList = ({
  title,
  description,
  images,
  isBookmarked,
  onBookmarkClick,
  className,
}: CardListProps) => {
  return (
    <article
      className={cn(
        'flex w-full min-w-0 flex-col items-start gap-3',
        className,
      )}
    >
      <div className="flex w-full items-center gap-8">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <h3 className="text-body-sb-16 w-full truncate text-gray-800">
            {title}
          </h3>
          <p className="text-caption-m-12 w-full truncate text-gray-500">
            {description}
          </p>
        </div>

        <button
          type="button"
          aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
          aria-pressed={isBookmarked}
          className={cn(
            'focus-visible:outline-mint-300 flex h-6 w-6.25 shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
            isBookmarked ? 'text-mint-300' : 'text-gray-200',
          )}
          onClick={onBookmarkClick}
        >
          <BookmarkIcon
            className={cn('size-6', isBookmarked && 'fill-current')}
          />
        </button>
      </div>

      <div
        role="group"
        aria-label={`${title} 이미지 목록`}
        tabIndex={0}
        className="focus-visible:outline-mint-300 flex w-full scrollbar-none items-center gap-2 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid [&::-webkit-scrollbar]:hidden"
      >
        {images.map(({ src, alt }) => (
          <CommonImage
            key={src}
            src={src}
            alt={alt}
            width={100}
            height={100}
            radius="rounded-xl"
            className="size-25"
          />
        ))}
      </div>
    </article>
  );
};
