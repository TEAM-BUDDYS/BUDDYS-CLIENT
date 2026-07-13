'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { HomeChipGroup } from '@/domains/home/components/home-chip-group/home-chip-group';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { SummaryCard } from '@/domains/home/components/summary-card/summary-card';
import {
  DEFAULT_PREFERENCE_TAG_NAME,
  hasPostId,
  PREFERENCE_BUDDY_SIZE,
  PREFERENCE_TAGS,
} from '@/domains/home/model/preference-buddy';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { EmptyState } from '@/shared/components/ui';

export const PreferenceBuddySection = () => {
  const defaultTagId =
    PREFERENCE_TAGS.find((tag) => tag.name === DEFAULT_PREFERENCE_TAG_NAME)
      ?.id ??
    PREFERENCE_TAGS[0]?.id ??
    0;
  const [selectedPreferenceTagId, setSelectedPreferenceTagId] =
    useState(defaultTagId);
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const { data } = useSuspenseQuery(
    POST_QUERY_OPTIONS.LIST({
      tagId: selectedPreferenceTagId,
      size: PREFERENCE_BUDDY_SIZE,
    }),
  );

  const posts = (data?.data?.content ?? []).filter(hasPostId);
  const isEmpty = posts.length === 0;

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
        tags={PREFERENCE_TAGS}
        selectedTagId={selectedPreferenceTagId}
        onChange={setSelectedPreferenceTagId}
      />
      <div className="flex flex-col gap-5">
        {isEmpty ? (
          <EmptyState
            title="아직 취향에 맞는 게시물이 없어요"
            description="다른 태그를 선택해 동행 게시물을 찾아보세요"
            className="py-8"
          />
        ) : (
          posts.map((post) => (
            <BookmarkContainer
              key={post.postId}
              isBookmarked={bookmarkedItemIds.includes(post.postId)}
              variant="summary"
              onBookmarkClick={() => handleBookmarkClick(post.postId)}
            >
              <SummaryCard post={post} />
            </BookmarkContainer>
          ))
        )}
      </div>
    </section>
  );
};
