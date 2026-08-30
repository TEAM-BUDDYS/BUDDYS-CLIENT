'use client';

import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { cn } from '@/lib/cn';
import { CommonImage, Tag } from '@/shared/components/ui';

interface TodayCardProps {
  postImgSrc?: string | StaticImageData;
}

export const TodayCard = ({ postImgSrc }: TodayCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked((currentIsBookmarked) => !currentIsBookmarked);
  };

  return (
    <article className="w-[343px]">
      <BookmarkContainer
        isBookmarked={isBookmarked}
        variant="todayCard"
        onBookmarkClick={handleBookmarkClick}
      >
        <Link href="" className="flex h-[100px] w-full gap-4">
          {postImgSrc && (
            <CommonImage
              radius="rounded-xl"
              src={postImgSrc}
              alt="게시물 이미지"
              width={100}
              height={100}
            />
          )}

          <div className="flex min-w-0 flex-1 flex-col justify-between pr-14">
            <Tag value="오스트레일리아" />
            <div className="flex flex-col gap-1">
              <p
                className={cn(
                  'text-body-sb-15',
                  postImgSrc ? 'line-clamp-2' : 'truncate',
                )}
              >
                호주가서 시드니 대학교 탐방하고 같이 산책하실 분~~~~!!!!!!!!!!
              </p>
              {!postImgSrc && (
                <p className="text-caption-m-12 truncate text-gray-500">
                  본문본문본문본문본문본문본문본문본문본문본문본문본문본문
                </p>
              )}
            </div>
            <span className="text-caption-m-12 text-gray-200">2026.08.26</span>
          </div>
        </Link>
      </BookmarkContainer>
    </article>
  );
};
