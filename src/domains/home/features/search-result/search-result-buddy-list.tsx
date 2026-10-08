'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { SEARCH_QUERY_OPTIONS } from '@/domains/home/api/query';
import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import { SearchBuddys } from '@/domains/home/components/search-buddys/search-buddys';
import { EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SEARCH_RESULT_SIZE = 10;

interface SearchResultBuddyListProps {
  keyword: string;
}

export const SearchResultBuddyList = ({
  keyword,
}: SearchResultBuddyListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    SEARCH_QUERY_OPTIONS.INFINITE({
      keyword,
      type: 'USER',
      size: SEARCH_RESULT_SIZE,
    }),
  );

  const users = data.pages.flatMap((page) => page.data?.users?.content ?? []);
  const totalCount = data.pages[0]?.data?.users?.totalElements ?? users.length;
  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  // TODO: 채팅방 생성 API 연동 시 채팅 화면으로 이동
  const handleChatClick = () => {};

  if (users.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="검색 결과가 없어요"
        description="다른 검색어로 버디를 찾아보세요"
        className="py-20"
      />
    );
  }

  return (
    <>
      <ListToolbar count={totalCount} />

      <div className="mt-4 flex flex-col gap-3.5">
        {users.map(({ userId, nickname, profileImageUrl }) => (
          <SearchBuddys
            key={userId}
            nickname={nickname}
            profileImageUrl={profileImageUrl}
            href={ROUTES.PROFILE.DETAIL(userId)}
            onChatClick={handleChatClick}
          />
        ))}
      </div>
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          버디를 불러오는 중이에요
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
