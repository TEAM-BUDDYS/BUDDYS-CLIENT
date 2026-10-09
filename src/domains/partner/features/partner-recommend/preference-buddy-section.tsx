'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { PartnerCard } from '@/domains/partner/components/partner-card/partner-card';
import { PartnerChipGroup } from '@/domains/partner/components/partner-chip-group/partner-chip-group';
import {
  DEFAULT_PREFERENCE_TAG_NAME,
  type DisplayablePreferencePartnerPost,
  isDisplayablePreferencePartnerPost,
  PREFERENCE_PARTNER_SIZE,
  PREFERENCE_TAGS,
} from '@/domains/partner/model/preference-partner';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { usePostBookmark } from '@/domains/posts/features/post-bookmark/use-post-bookmark';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

interface PreferenceBuddyPostItemProps {
  post: DisplayablePreferencePartnerPost;
}

const PreferenceBuddyPostItem = ({ post }: PreferenceBuddyPostItemProps) => {
  const bookmark = usePostBookmark({
    postId: post.postId,
    isBookmarked: post.isBookmarked ?? false,
  });

  return (
    <PartnerCard
      href={ROUTES.POST.DETAIL(post.postId)}
      isRecruiting={post.recruitmentStatus === 'RECRUITING'}
      country={post.country.name}
      title={post.title}
      description={post.content}
      startDate={post.startDate}
      endDate={post.endDate}
      imageUrl={post.thumbnailImageUrl}
      isBookmarked={bookmark.isBookmarked}
      isBookmarkPending={bookmark.isPending}
      onBookmarkClick={bookmark.toggleBookmark}
    />
  );
};

interface PreferenceBuddyPostListProps {
  selectedPreferenceTagId: number;
}

const PreferenceBuddyPostList = ({
  selectedPreferenceTagId,
}: PreferenceBuddyPostListProps) => {
  const { data } = useSuspenseQuery(
    POST_QUERY_OPTIONS.LIST({
      tagId: selectedPreferenceTagId,
      size: PREFERENCE_PARTNER_SIZE,
    }),
  );

  const posts = (data?.data?.content ?? []).filter(
    isDisplayablePreferencePartnerPost,
  );
  const isEmpty = posts.length === 0;

  return (
    <div className="mt-6 flex flex-col gap-5 pb-33">
      {isEmpty ? (
        <EmptyState
          title="아직 취향에 맞는 게시물이 없어요"
          description="다른 태그를 선택해 동행 게시물을 찾아보세요"
          className="py-8"
        />
      ) : (
        posts.map((post) => (
          <PreferenceBuddyPostItem key={post.postId} post={post} />
        ))
      )}
    </div>
  );
};

export const PreferenceBuddySection = () => {
  const defaultTagId =
    PREFERENCE_TAGS.find((tag) => tag.name === DEFAULT_PREFERENCE_TAG_NAME)
      ?.id ??
    PREFERENCE_TAGS[0]?.id ??
    0;
  const [selectedPreferenceTagId, setSelectedPreferenceTagId] =
    useState(defaultTagId);

  return (
    <section className="flex flex-col">
      <div className="mt-6 mb-2 flex flex-col">
        <h2 className="text-title-b-18 text-gray-800">취향 기반 추천</h2>
        <span className="text-body-r-14 text-gray-700">
          이런 취향의 동행자는 어떠세요?
        </span>
      </div>
      <PartnerChipGroup
        tags={PREFERENCE_TAGS}
        selectedTagId={selectedPreferenceTagId}
        onChange={setSelectedPreferenceTagId}
      />
      <AsyncBoundary
        className="py-8"
        resetKeys={[selectedPreferenceTagId]}
        loadingFallback={<div className="min-h-72" aria-busy="true" />}
      >
        <PreferenceBuddyPostList
          selectedPreferenceTagId={selectedPreferenceTagId}
        />
      </AsyncBoundary>
    </section>
  );
};
