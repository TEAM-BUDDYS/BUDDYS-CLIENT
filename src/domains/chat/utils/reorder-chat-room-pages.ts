import type { InfiniteData } from '@tanstack/react-query';

import type { ChatRoom, ChatRoomList } from '../model/chat-list';

export const reorderChatRoomPages = (
  oldData: InfiniteData<ChatRoomList>,
  updatedChatRoom: ChatRoom,
): InfiniteData<ChatRoomList> => {
  if (oldData.pages.length === 0) {
    return oldData;
  }

  // 1. 현재 불러온 모든 페이지를 하나의 배열로 합칩니다.
  // 2. 같은 채팅방이 이미 있으면 제거합니다.
  // 3. 업데이트된 채팅방을 맨 앞에 넣습니다.
  const reorderedChatRooms = [
    updatedChatRoom,
    ...oldData.pages
      .flatMap((page) => page.chatRooms)
      .filter((chatRoom) => chatRoom.chatRoomId !== updatedChatRoom.chatRoomId),
  ];

  let startIndex = 0;

  const pages = oldData.pages.map((page, pageIndex, cachedPages) => {
    const endIndex = startIndex + page.size;

    const chatRooms = reorderedChatRooms.slice(startIndex, endIndex);

    startIndex = endIndex;

    const isLastCachedPage = pageIndex === cachedPages.length - 1;
    const hasOverflow = reorderedChatRooms.length > endIndex;

    return {
      ...page,
      chatRooms,
      hasNext: isLastCachedPage && hasOverflow ? true : page.hasNext,
    };
  });

  return {
    ...oldData,
    pages,
  };
};
