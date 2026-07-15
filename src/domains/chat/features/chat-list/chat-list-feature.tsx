'use client';

import {
  InfiniteData,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { useCallback } from 'react';

import { CHAT_ROOM_QUERY_KEY } from '@/shared/api';
import { EmptyState } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

import { CHAT_QUERY_OPTIONS } from '../../api/query';
import { ChatList } from '../../components/chat-list/chat-list';
import { useChatRoomListStomp } from '../../hooks/use-chat-room-list-stomp';
import { ChatRoom, ChatRoomList } from '../../model/chat-list';
import { reorderChatRoomPages } from '../../utils/reorder-chat-room-pages';

const CHAT_LIST_PAGE_SIZE = 20;

const CHAT_LIST_PARAMS = {
  size: CHAT_LIST_PAGE_SIZE,
};

export const ChatListFeature = () => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useSuspenseInfiniteQuery(
    CHAT_QUERY_OPTIONS.INFINITE_LIST(CHAT_LIST_PARAMS),
  );

  const handleSubscribed = useCallback(() => {
    void queryClient.invalidateQueries({
      queryKey: CHAT_ROOM_QUERY_KEY.INFINITE_LIST_ALL(),
    });
  }, [queryClient]);

  const handleChatRoomUpdated = useCallback(
    (updatedChatRoom: ChatRoom) => {
      queryClient.setQueryData<InfiniteData<ChatRoomList>>(
        CHAT_ROOM_QUERY_KEY.INFINITE_LIST(CHAT_LIST_PARAMS),
        (oldData) => {
          if (!oldData || oldData.pages.length === 0) {
            return oldData;
          }

          return reorderChatRoomPages(oldData, updatedChatRoom);
        },
      );
    },
    [queryClient],
  );

  useChatRoomListStomp({
    onChatRoomUpdated: handleChatRoomUpdated,
    onSubscribed: handleSubscribed,
  });

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
