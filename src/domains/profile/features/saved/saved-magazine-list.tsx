'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { MagazineListCard } from '@/domains/home/components/magazine-list-card/magazine-list-card';
import { useMagazineBookmarkMutation } from '@/domains/home/hooks/use-magazine-bookmark-mutation';
import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SAVED_MAGAZINES_PAGE_SIZE = 20;

const SavedMagazineItems = () => {
  const bookmarkMutation = useMagazineBookmarkMutation();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PROFILE_QUERY_OPTIONS.BOOKMARKED_MAGAZINES_INFINITE({
      size: SAVED_MAGAZINES_PAGE_SIZE,
    }),
  );

  const magazines = data.pages.flatMap((page) => page.data?.magazines ?? []);

  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  const handleBookmarkClick = (magazineId: number) => {
    if (bookmarkMutation.isPending) return;
    bookmarkMutation.mutate({ magazineId, isBookmarked: false });
  };

  if (magazines.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="게시물을 찾을 수 없어요"
        description="매거진을 저장해 보세요"
        className="pt-25.25"
      />
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-5">
        {magazines.map((magazine) => (
          <li key={magazine.magazineId}>
            <MagazineListCard
              title={magazine.title}
              summary={magazine.summary}
              thumbnailImageUrl={magazine.thumbnailImageUrl}
              publishedAt={magazine.publishedAt}
              externalUrl={magazine.externalUrl}
              isBookmarked={magazine.isBookmarked}
              isBookmarkPending={bookmarkMutation.isPending}
              onBookmarkClick={() => handleBookmarkClick(magazine.magazineId)}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          매거진을 불러오는 중이에요
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

export const SavedMagazineList = () => {
  return (
    <AsyncBoundary
      className="py-8"
      loadingFallback={<div className="min-h-96" aria-busy="true" />}
    >
      <SavedMagazineItems />
    </AsyncBoundary>
  );
};
