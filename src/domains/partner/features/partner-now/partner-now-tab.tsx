'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { PartnerCard } from '@/domains/partner/components/partner-card/partner-card';
import { FilterSheet } from '@/domains/partner/features/filter-sheet/filter-sheet';
import type { FilterSheetValue } from '@/domains/partner/features/filter-sheet/use-filter-sheet';
import {
  partnerFilterItems,
  type PartnerFilterKey,
} from '@/domains/partner/model/partner-filter';
import {
  type DisplayablePartnerPost,
  getPartnerSearchParams,
  hasPartnerCardFields,
  PARTNER_SEARCH_SIZE,
} from '@/domains/partner/model/partner-search';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { usePostBookmark } from '@/domains/posts/features/post-bookmark/use-post-bookmark';
import { cn } from '@/lib/cn';
import { AsyncBoundary, EmptyState, Filter } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import { useSheetScroll } from '@/shared/hooks/use-sheet-scroll';

import { usePartnerFilterValue } from './use-partner-filter-value';

interface PartnerPostItemProps {
  post: DisplayablePartnerPost;
}

const PartnerPostItem = ({ post }: PartnerPostItemProps) => {
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

interface PostListProps {
  filterValue: FilterSheetValue;
}

const PostList = ({ filterValue }: PostListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    POST_QUERY_OPTIONS.INFINITE_LIST(
      getPartnerSearchParams(filterValue, PARTNER_SEARCH_SIZE),
    ),
  );

  const posts = data.pages
    .flatMap((page) => page.data?.content ?? [])
    .filter(hasPartnerCardFields);
  const isEmpty = posts.length === 0;
  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  const totalElements = data.pages[0]?.data?.totalElements ?? 0;

  if (isEmpty) {
    return (
      <div>
        <p className="text-caption-m-12 pt-4 text-gray-500">총 0건</p>
        <EmptyState
          title="조건에 맞는 동행 게시물이 없어요"
          description="필터를 바꿔 다른 동행 게시물을 찾아보세요"
          className="py-8"
        />
      </div>
    );
  }

  return (
    <>
      <p className="text-caption-m-12 pt-4 text-gray-500">
        총 {totalElements}건
      </p>
      <div className="flex flex-col gap-6 pt-4">
        {posts.map((post) => (
          <PartnerPostItem key={post.postId} post={post} />
        ))}
      </div>
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

interface PartnerNowTabProps {
  isFilterFixed: boolean;
  isTopNavigationVisible: boolean;
}

export const PartnerNowTab = ({
  isFilterFixed,
  isTopNavigationVisible,
}: PartnerNowTabProps) => {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const {
    appliedFilterKeys,
    appliedFilterSummary,
    filterValue,
    handleFilterApply,
  } = usePartnerFilterValue();
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isFilterSheetOpen);

  const handleFilterPress = (_filterKey: PartnerFilterKey) => {
    setIsFilterSheetOpen(true);
  };

  const handleFilterSheetClose = () => {
    setIsFilterSheetOpen(false);
  };

  return (
    <>
      <section className="flex flex-col">
        <div
          className={cn(
            '-mx-4 h-[122px]',
            !isFilterFixed && 'sticky top-0 z-30',
          )}
        >
          <div
            className={cn(
              'z-30 h-[122px] bg-white px-4',
              isFilterFixed &&
                'fixed left-1/2 w-full max-w-107.5 -translate-x-1/2',
              isTopNavigationVisible ? 'top-[105px]' : 'top-0',
            )}
          >
            <div className="flex items-center justify-between pt-6">
              <h2 className="text-title-b-18 text-gray-800">
                원하는 조건으로 동행 찾기
              </h2>
              {appliedFilterSummary && (
                <p className="text-body-r-14 text-gray-500">
                  {appliedFilterSummary}
                </p>
              )}
            </div>

            <div className="flex scrollbar-none gap-2 overflow-x-auto py-3">
              {partnerFilterItems.map((filterItem) => (
                <Filter
                  key={filterItem.key}
                  label={filterItem.label}
                  pressed={appliedFilterKeys.includes(filterItem.key)}
                  onPress={() => handleFilterPress(filterItem.key)}
                />
              ))}
              <div aria-hidden="true" className="w-2 shrink-0" />
            </div>

            <hr
              className="-mx-4 h-2 border-0 bg-gray-50 opacity-50"
              aria-hidden="true"
            />
          </div>
        </div>

        <AsyncBoundary
          className="py-8"
          resetKeys={[filterValue]}
          loadingFallback={<div className="min-h-96 pt-6" aria-busy="true" />}
        >
          <PostList filterValue={filterValue} />
        </AsyncBoundary>
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
