'use client';

import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { ChevronRightIcon } from '@/shared/components/icons';
import { Filter } from '@/shared/components/ui';
import { Card } from '@/shared/components/ui/card/card';

type FilterKey =
  | 'country'
  | 'date'
  | 'age'
  | 'gender'
  | 'buddyType'
  | 'verification';

type FilterIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const filterItems = [
  { key: 'country', label: '국가', icon: undefined },
  { key: 'date', label: '날짜', icon: undefined },
  { key: 'age', label: '나이', icon: undefined },
  { key: 'gender', label: '성별', icon: undefined },
  { key: 'buddyType', label: '동행 유형', icon: undefined },
  { key: 'verification', label: '인증 상태', icon: undefined },
] satisfies { key: FilterKey; label: string; icon?: FilterIcon }[];

const appliedFilterKeys: FilterKey[] = [];

const buddySearchItems = [
  {
    id: 1,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 21자 본문이 들어가는 자리입니다.',
    postStatus: 'RECRUITING' as const,
    tagValue: '국가',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
  },
  {
    id: 2,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 21자 본문이 들어가는 자리입니다.',
    postStatus: 'RECRUITING' as const,
    tagValue: '국가',
    startDate: '2026-07-15',
    endDate: '2026-07-16',
    image: 'https://loremflickr.com/100/100/travel?random=1',
  },
  {
    id: 3,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 21자 본문이 들어가는 자리입니다.',
    postStatus: 'RECRUITING' as const,
    tagValue: '국가',
    startDate: '2026-08-01',
    endDate: '2026-08-03',
    image: 'https://loremflickr.com/100/100/travel?random=2',
  },
];

export const BuddySearchSection = () => {
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);

  const handleFilterPress = (_filterKey: FilterKey) => {};

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
      />
      <div className="-mx-4 scrollbar-none overflow-x-auto border-b border-gray-100 px-4 py-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {filterItems.map((filterItem) => (
            <Filter
              key={filterItem.key}
              label={filterItem.label}
              pressed={appliedFilterKeys.includes(filterItem.key)}
              icon={filterItem.icon}
              onPress={() => handleFilterPress(filterItem.key)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-6">
        {buddySearchItems.map((item) => (
          <BookmarkContainer
            key={item.id}
            hasImage={Boolean(item.image)}
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
