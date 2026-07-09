'use client';

import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import {
  buddyFilterItems,
  type BuddyFilterKey,
} from '@/domains/home/model/buddy-filter';
import { BellIcon, SearchIcon } from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { Card, Filter } from '@/shared/components/ui';

const appliedFilterKeys: BuddyFilterKey[] = [];

const customizedExploreItems = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  title: '최대 17자 제목이 들어가는 자리입니다',
  content: '최대 21자 본문이 들어가는 자리입니다.',
  postStatus: 'RECRUITING' as const,
  tagValue: '국가',
  startDate: '2026-07-10',
  endDate: '2026-07-12',
  image: `https://loremflickr.com/100/100/travel?random=${index + 1}`,
}));

export default function CustomizedExplore() {
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
    <>
      <Header
        hasBackButton
        right={
          <>
            <button type="button" aria-label="검색">
              <SearchIcon className="size-6" />
            </button>
            <button type="button" aria-label="알림">
              <BellIcon className="size-6" />
            </button>
          </>
        }
      />
      <main className="px-4 pb-19">
        <SectionHeader label="" title="나에게 딱 맞는 동행을 만나보세요" />
        <div className="-mx-4 scrollbar-none overflow-x-auto border-b border-gray-100 px-4 pt-2 pb-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
        <div className="flex flex-col gap-6 py-6">
          {customizedExploreItems.map((item) => (
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
      </main>
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-[430px]" />
    </>
  );
}
