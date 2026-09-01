'use client';

import Link from 'next/link';

import {
  BookmarkButton,
  CardDate,
  CommonImage,
  PostStatusTag,
  Tag,
} from '@/shared/components/ui';

interface PartnerCardProps {
  href: string;
  isRecruiting: boolean;
  country: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  isBookmarked: boolean;
  onBookmarkClick: () => void;
}

export const PartnerCard = ({
  href,
  isRecruiting,
  country,
  title,
  description,
  startDate,
  endDate,
  imageUrl,
  isBookmarked,
  onBookmarkClick,
}: PartnerCardProps) => {
  return (
    <article className="relative">
      <Link href={href} className="flex justify-between gap-8">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex gap-1.5">
            <PostStatusTag status={isRecruiting ? 'RECRUITING' : 'COMPLETED'} />
            <Tag value={country} />
          </div>
          <div className="flex min-w-0 flex-col gap-0.75">
            <span className="text-body-sb-16 truncate text-gray-800">
              {title}
            </span>
            <span className="text-caption-m-12 truncate text-gray-500">
              {description}
            </span>
          </div>
          <CardDate
            endDate={endDate}
            startDate={startDate}
            className="text-gray-200"
          />
        </div>
        <div className="size-25 shrink-0">
          <CommonImage
            radius="rounded-xl"
            src={imageUrl}
            alt={`${title} 게시물 이미지`}
            width={100}
            height={100}
            className="size-25"
          />
        </div>
      </Link>
      <BookmarkButton
        isBookmarked={isBookmarked}
        onClick={onBookmarkClick}
        className="absolute top-2 right-1.5"
      />
    </article>
  );
};
