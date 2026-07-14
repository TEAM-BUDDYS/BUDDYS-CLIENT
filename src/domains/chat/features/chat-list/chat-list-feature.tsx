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

const CHAT_LIST_PAGE_SIZE = 20;

export const ChatListFeature = () => {
  const queryClient = useQueryClient();

  const chatListParams = {
    size: CHAT_LIST_PAGE_SIZE,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useSuspenseInfiniteQuery(
    CHAT_QUERY_OPTIONS.INFINITE_LIST(chatListParams),
  );

  const handleChatRoomUpdated = useCallback(
    (updatedChatRoom: ChatRoom) => {
      queryClient.setQueryData<InfiniteData<ChatRoomList>>(
        CHAT_ROOM_QUERY_KEY.INFINITE_LIST(chatListParams),
        (oldData) => {
          if (!oldData || oldData.pages.length === 0) {
            return oldData;
          }

          const pagesWithoutUpdatedRoom = oldData.pages.map((page) => ({
            ...page,
            chatRooms: page.chatRooms.filter(
              (chatRoom) => chatRoom.chatRoomId !== updatedChatRoom.chatRoomId,
            ),
          }));

          return {
            ...oldData,
            pages: [
              {
                ...pagesWithoutUpdatedRoom[0],
                chatRooms: [
                  updatedChatRoom,
                  ...pagesWithoutUpdatedRoom[0].chatRooms,
                ],
              },
              ...pagesWithoutUpdatedRoom.slice(1),
            ],
          };
        },
      );
    },
    [queryClient],
  );

  useChatRoomListStomp({
    onChatRoomUpdated: handleChatRoomUpdated,
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
