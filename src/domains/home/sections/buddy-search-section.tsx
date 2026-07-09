'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import {
  buddyFilterItems,
  type BuddyFilterKey,
} from '@/domains/home/model/buddy-filter';
import { ChevronRightIcon } from '@/shared/components/icons';
import { Card, Filter } from '@/shared/components/ui';

const appliedFilterKeys: BuddyFilterKey[] = [];

const buddySearchItems = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  title: '최대 17자 제목이 들어가는 자리입니다',
  content: '최대 21자 본문이 들어가는 자리입니다.',
  postStatus: 'RECRUITING' as const,
  tagValue: '국가',
  startDate: '2026-07-10',
  endDate: '2026-07-12',
  image:
    index % 2 === 0
      ? undefined
      : `https://loremflickr.com/100/100/travel?random=${index + 1}`,
}));

export const BuddySearchSection = () => {
  const router = useRouter();
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);

  const handleFilterPress = (_filterKey: BuddyFilterKey) => {};

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
    <section className="flex flex-col">
      <SectionHeader
        label="맞춤 탐색"
        title="원하는 조건의 동행을 찾아보세요"
        rightSlot={<ChevronRightIcon className="size-6 text-gray-500" />}
        rightSlotLabel="맞춤 탐색 더보기"
        onClick={() => router.push('/customized-explore')}
      />
      <div className="-mx-4 scrollbar-none overflow-x-auto border-b border-gray-100 px-4 py-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {buddyFilterItems.map((filterItem) => (
            <Filter
              key={filterItem.key}
              label={filterItem.label}
              pressed={appliedFilterKeys.includes(filterItem.key)}
              icon={filterItem.icon}
              onPress={() => handleFilterPress(filterItem.key)}
            />
          ))}
          <div aria-hidden="true" className="w-2 shrink-0" />
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-6">
        {buddySearchItems.map((item) => (
          <BookmarkContainer
            key={item.id}
            isBookmarked={bookmarkedItemIds.includes(item.id)}
            variant="card"
            onBookmarkClick={() => handleBookmarkClick(item.id)}
          >
            <Card
              title={item.title}
              content={item.content}
              postStatus={item.postStatus}
              tagValue={item.tagValue}
              startDate={item.startDate}
              endDate={item.endDate}
              image={item.image}
            />
          </BookmarkContainer>
        ))}
      </div>
    </section>
  );
};
