'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { PartnerCard } from '@/domains/partner/components/partner-card/partner-card';
import {
  type DisplayablePartnerPost,
  hasPartnerCardFields,
} from '@/domains/partner/model/partner-search';
import { usePostBookmark } from '@/domains/posts/features/post-bookmark/use-post-bookmark';
import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SAVED_PARTNERS_PAGE_SIZE = 20;

interface SavedPartnerItemProps {
  partner: DisplayablePartnerPost;
}

const SavedPartnerItem = ({ partner }: SavedPartnerItemProps) => {
  const bookmark = usePostBookmark({
    postId: partner.postId,
    isBookmarked: partner.isBookmarked ?? true,
  });

  return (
    <PartnerCard
      href={ROUTES.POST.DETAIL(partner.postId)}
      isRecruiting={partner.recruitmentStatus === 'RECRUITING'}
      country={partner.country.name}
      title={partner.title}
      description={partner.content}
      startDate={partner.startDate}
      endDate={partner.endDate}
      imageUrl={partner.thumbnailImageUrl}
      isBookmarked={bookmark.isBookmarked}
      isBookmarkPending={bookmark.isPending}
      onBookmarkClick={bookmark.toggleBookmark}
    />
  );
};

const SavedPartnerItems = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PROFILE_QUERY_OPTIONS.BOOKMARKED_POSTS_INFINITE({
      size: SAVED_PARTNERS_PAGE_SIZE,
    }),
  );

  const partners = data.pages
    .flatMap((page) => page.data?.content ?? [])
    .filter(hasPartnerCardFields);

  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  if (partners.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="게시물을 찾을 수 없어요"
        description="동행 게시물을 저장해 보세요"
        className="pt-25.25"
      />
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-5">
        {partners.map((partner) => (
          <li key={partner.postId}>
            <SavedPartnerItem partner={partner} />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          게시물을 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto block py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </>
  );
};

export const SavedPartnerList = () => {
  return (
    <AsyncBoundary
      className="py-8"
      loadingFallback={<div className="min-h-96" aria-busy="true" />}
    >
      <SavedPartnerItems />
    </AsyncBoundary>
  );
};
