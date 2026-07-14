'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { FilterSheet } from '@/domains/home/features/filter-sheet/filter-sheet';
import { useFilterSheetValue } from '@/domains/home/hooks/use-filter-sheet-value';
import { useSheetScroll } from '@/domains/home/hooks/use-sheet-scroll';
import {
  buddyFilterItems,
  type BuddyFilterKey,
} from '@/domains/home/model/buddy-filter';
import { cn } from '@/lib/cn';
import { ChevronRightIcon } from '@/shared/components/icons';
import { Card, Filter } from '@/shared/components/ui';
import type { RecruitmentStatus } from '@/shared/components/ui/card/card-tag';
import { ROUTES } from '@/shared/config';

export interface BuddySearchItem {
  id: number;
  href: string;
  title: string;
  content: string;
  postStatus: RecruitmentStatus;
  tagValue: string;
  startDate: string;
  endDate: string;
  image?: string;
}

interface BuddySearchSectionProps {
  items: BuddySearchItem[];
}

export const BuddySearchSection = ({ items }: BuddySearchSectionProps) => {
  const router = useRouter();
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { filterValue, appliedFilterKeys, handleFilterApply } =
    useFilterSheetValue();
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isFilterSheetOpen);

  const handleMoreClick = () => {
    router.push(ROUTES.CUSTOMIZED_EXPLORE);
  };

  const handleFilterPress = (_filterKey: BuddyFilterKey) => {
    setIsFilterSheetOpen(true);
  };

  const handleFilterSheetClose = () => {
    setIsFilterSheetOpen(false);
  };

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
      <section className="flex flex-col">
        <SectionHeader
          label="맞춤 탐색"
          title="원하는 조건의 동행을 찾아보세요"
          rightSlot={<ChevronRightIcon className="size-6 text-gray-500" />}
          rightSlotLabel="맞춤 탐색 더보기"
          onClick={handleMoreClick}
        />
        <div className="-mx-4 scrollbar-none overflow-x-auto border-b border-gray-100 px-4 py-3">
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
          {items.map((item) => (
            <BookmarkContainer
              key={item.id}
              isBookmarked={bookmarkedItemIds.includes(item.id)}
              variant="card"
              onBookmarkClick={() => handleBookmarkClick(item.id)}
            >
              <Card
                href={item.href}
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
      {isFilterSheetOpen && (
        <div
          ref={sheetRef}
          className={cn(
            'fixed inset-0 z-50 mx-auto h-dvh max-w-107.5 bg-white',
            sheetScrollClassName,
          )}
        >
          <FilterSheet
            value={filterValue}
            onClose={handleFilterSheetClose}
            onApply={handleFilterApply}
          />
        </div>
      )}
    </>
  );
};
