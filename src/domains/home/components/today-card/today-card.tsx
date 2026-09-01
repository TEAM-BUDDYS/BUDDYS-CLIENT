'use client';

import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/cn';
import { BookmarkButton, CommonImage, Tag } from '@/shared/components/ui';
import { formatFullDate } from '@/shared/utils/format-date-range';

import { DisplayablePostSummary } from '../../model/buddy-search';

interface TodayCardProps {
  post: DisplayablePostSummary;
}

export const TodayCard = ({ post }: TodayCardProps) => {
  const {
    postId,
    title,
    content,
    startDate,
    endDate,
    country,
    thumbnailImageUrl,
  } = post;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const dateText =
    startDate === endDate
      ? formatFullDate(startDate)
      : `${formatFullDate(startDate)} - ${formatFullDate(endDate)}`;

  const handleBookmarkClick = () => {
    setIsBookmarked((currentIsBookmarked) => !currentIsBookmarked);
  };

  return (
    <article className="flex h-[100px] w-full items-center gap-8">
      <Link
        href={`/posts/${postId}`}
        className="flex h-full min-w-0 flex-1 gap-4"
      >
        {thumbnailImageUrl && (
          <CommonImage
            radius="rounded-xl"
            src={thumbnailImageUrl}
            alt={`${title} 썸네일`}
            width={100}
            height={100}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <Tag value={country.name} />

          <div className="flex flex-col gap-1">
            <h3
              className={cn(
                'text-body-sb-15 text-gray-800',
                thumbnailImageUrl ? 'line-clamp-2' : 'truncate',
              )}
            >
              {title}
            </h3>

            {!thumbnailImageUrl && (
              <p className="text-caption-m-12 truncate text-gray-500">
                {content}
              </p>
            )}
          </div>

          <time
            dateTime={
              startDate === endDate ? startDate : `${startDate}/${endDate}`
            }
            className="text-caption-m-12 text-gray-200"
          >
            {dateText}
          </time>
        </div>
      </Link>

      <BookmarkButton
        isBookmarked={isBookmarked}
        onClick={handleBookmarkClick}
      />
    </article>
  );
};
