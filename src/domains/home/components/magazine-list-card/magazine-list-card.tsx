'use client';

import { cn } from '@/lib/cn';
import { BookmarkButton, CommonImage } from '@/shared/components/ui';

interface MagazineListCardProps {
  title: string;
  summary: string;
  thumbnailImageUrl: string;
  publishedAt: string;
  externalUrl: string;
  isBookmarked: boolean;
  onBookmarkClick: () => void;
  className?: string;
}

const formatPublishedAt = (publishedAt: string) => {
  const [year, month, day] = publishedAt.split('-');

  return `${year}년 ${month}월 ${day}일`;
};

export const MagazineListCard = ({
  title,
  summary,
  thumbnailImageUrl,
  publishedAt,
  externalUrl,
  isBookmarked,
  onBookmarkClick,
  className,
}: MagazineListCardProps) => {
  return (
    <article className={cn('flex w-full items-center gap-8', className)}>
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
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

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="text-body-sb-16 truncate text-gray-800">{title}</h3>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-caption-m-12 truncate text-gray-500">
              {summary}
            </p>
            <time
              dateTime={publishedAt}
              className="text-caption-r-12 text-gray-200"
            >
              {formatPublishedAt(publishedAt)}
            </time>
          </div>
        </div>
      </a>

      <BookmarkButton
        isBookmarked={isBookmarked}
        aria-label={isBookmarked ? `${title} 저장 해제` : `${title} 저장`}
        className="size-6 shrink-0 rounded-sm"
        onClick={onBookmarkClick}
      />
    </article>
  );
};
