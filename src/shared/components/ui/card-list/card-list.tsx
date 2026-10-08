'use client';

import Link from 'next/link';

import { cn } from '@/lib/cn';
import { BookmarkButton } from '@/shared/components/ui/bookmark-button/bookmark-button';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface CardListProps {
  title: string;
  description: string;
  images: readonly string[];
  isBookmarked: boolean;
  isBookmarkPending?: boolean;
  onBookmarkClick: () => void;
  href?: string;
  className?: string;
}

export const CardList = ({
  title,
  description,
  images,
  isBookmarked,
  isBookmarkPending = false,
  onBookmarkClick,
  href,
  className,
}: CardListProps) => {
  const information = (
    <>
      <h3 className="text-body-sb-16 w-full truncate text-gray-800">{title}</h3>
      <p className="text-caption-m-12 w-full truncate text-gray-500">
        {description}
      </p>
    </>
  );

  return (
    <article
      className={cn(
        'flex w-full min-w-0 flex-col items-start gap-3',
        className,
      )}
    >
      <div className="flex w-full items-center gap-8">
        {href ? (
          <Link
            href={href}
            className="focus-visible:outline-mint-300 flex min-w-0 flex-1 flex-col items-start gap-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          >
            {information}
          </Link>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
            {information}
          </div>
        )}

        <BookmarkButton
          isBookmarked={isBookmarked}
          aria-busy={isBookmarkPending}
          className="h-6 w-6.25"
          disabled={isBookmarkPending}
          onClick={onBookmarkClick}
        />
      </div>

      <div
        role="group"
        aria-label={`${title} 이미지 목록`}
        tabIndex={0}
        className="focus-visible:outline-mint-300 flex w-full scrollbar-none items-center gap-2 overflow-x-auto overscroll-x-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, index) => (
          <CommonImage
            key={src}
            src={src}
            alt={`${title} 이미지 ${index + 1}`}
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
