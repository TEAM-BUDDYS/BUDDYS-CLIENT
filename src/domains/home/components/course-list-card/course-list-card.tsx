'use client';

import Link from 'next/link';

import { cn } from '@/lib/cn';
import { BookmarkButton, CommonImage } from '@/shared/components/ui';

interface CourseListCardProps {
  title: string;
  description: string;
  thumbnailImageUrl: string;
  href: string;
  isBookmarked: boolean;
  onBookmarkClick: () => void;
  className?: string;
}

export const CourseListCard = ({
  title,
  description,
  thumbnailImageUrl,
  href,
  isBookmarked,
  onBookmarkClick,
  className,
}: CourseListCardProps) => {
  return (
    <article className={cn('flex w-full items-center gap-8', className)}>
      <Link
        href={href}
        className="focus-visible:outline-mint-300 flex min-w-0 flex-1 items-center gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
      >
        <CommonImage
          src={thumbnailImageUrl}
          alt={`${title} 썸네일`}
          width={100}
          height={100}
          radius="rounded-xl"
          className="size-25 shrink-0"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-body-sb-16 truncate text-gray-800">{title}</h3>
          <p className="text-caption-m-12 truncate text-gray-500">
            {description}
          </p>
        </div>
      </Link>

      <BookmarkButton
        isBookmarked={isBookmarked}
        aria-label={isBookmarked ? `${title} 저장 해제` : `${title} 저장`}
        className="size-6 shrink-0 rounded-sm"
        onClick={onBookmarkClick}
      />
    </article>
  );
};
