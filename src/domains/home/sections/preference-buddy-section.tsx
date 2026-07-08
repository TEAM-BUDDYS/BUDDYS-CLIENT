'use client';

import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { SummaryCard } from '@/domains/home/components/summary-card/summary-card';

const temporaryThumbnail = 'https://loremflickr.com/72/72/person?random=1';

const preferenceBuddyItems = [
  {
    id: 1,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 18자 본문이 들어가는 자리입니다.',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    image: temporaryThumbnail,
  },
  {
    id: 2,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 18자 본문이 들어가는 자리입니다.',
    startDate: '2026-07-15',
    endDate: '2026-07-16',
  },
  {
    id: 3,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 18자 본문이 들어가는 자리입니다.',
    startDate: '2026-08-01',
    endDate: '2026-08-03',
    image: temporaryThumbnail,
  },
  {
    id: 4,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 18자 본문이 들어가는 자리입니다.',
    startDate: '2026-08-10',
    endDate: '2026-08-10',
  },
];

export const PreferenceBuddySection = () => {
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);

  const handleBookmarkClick = (itemId: number) => {
    setBookmarkedItemIds((prevBookmarkedItemIds) =>
      prevBookmarkedItemIds.includes(itemId)
        ? prevBookmarkedItemIds.filter(
            (bookmarkedItemId) => bookmarkedItemId !== itemId,
          )
        : [...prevBookmarkedItemIds, itemId],
    );
  };

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        label="취향 기반 추천"
        title="이런 취향의 동행자는 어떠세요?"
      />

      <div className="flex flex-col gap-6">
        {preferenceBuddyItems.map((item) => (
          <BookmarkContainer
            key={item.id}
            hasImage={Boolean(item.image)}
            isBookmarked={bookmarkedItemIds.includes(item.id)}
            variant="summary"
            onBookmarkClick={() => handleBookmarkClick(item.id)}
          >
            <SummaryCard {...item} />
          </BookmarkContainer>
        ))}
      </div>
    </section>
  );
};
