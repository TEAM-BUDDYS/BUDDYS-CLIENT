'use client';

import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { HomeChipGroup } from '@/domains/home/components/home-chip-group/home-chip-group';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { SummaryCard } from '@/domains/home/components/summary-card/summary-card';
import type { Tag } from '@/types/tag';

export interface PreferenceBuddyItem {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  image?: string;
}

interface PreferenceBuddySectionProps {
  tags: Tag[];
  items: PreferenceBuddyItem[];
}

export const PreferenceBuddySection = ({
  tags,
  items,
}: PreferenceBuddySectionProps) => {
  const [selectedPreferenceTagId, setSelectedPreferenceTagId] = useState<
    number | null
  >(null);
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
      <HomeChipGroup
        tags={tags}
        selectedTagId={selectedPreferenceTagId}
        onChange={setSelectedPreferenceTagId}
      />
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <BookmarkContainer
            key={item.id}
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
