'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { EmptyState } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

import { CHAT_QUERY_OPTIONS } from '../../api/query';
import { ChatList } from '../../components/chat-list/chat-list';

const CHAT_LIST_PAGE_SIZE = 20;

export const ChatListFeature = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useSuspenseInfiniteQuery(
    CHAT_QUERY_OPTIONS.INFINITE_LIST({
      size: CHAT_LIST_PAGE_SIZE,
    }),
  );

  const chatRooms = data.pages.flatMap((page) => page.chatRooms);
  const isEmpty = chatRooms.length === 0;

  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);

  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  return isEmpty ? (
    <EmptyState
      title="채팅방이 없어요"
      description="새로운 버디와 대화를 시작해 보세요"
      className="h-full"
    />
  ) : (
    <>
      <ChatList chatRooms={chatRooms} />
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
    </>
  );
};
