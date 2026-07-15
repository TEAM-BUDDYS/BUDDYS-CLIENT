import type { components } from '@/types/schema';

import type { ChatRoom, ChatRoomList } from '../model/chat-list';
import type { GetChatRoomsResponse } from './type';

type ChatRoomListItemResponse =
  components['schemas']['ChatRoomListItemResponse'];

const isPositiveSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

const isNonNegativeSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;

const isNullableString = (value: unknown): value is string | null =>
  typeof value === 'string' || value === null;

const convertChatRoom = (
  chatRoom: ChatRoomListItemResponse,
  index: number,
): ChatRoom => {
  const {
    chatRoomId,
    participant,
    lastMessage,
    lastMessageSentAt,
    unreadMessageCount,
  } = chatRoom;

  if (
    !isPositiveSafeInteger(chatRoomId) ||
    !participant ||
    !isPositiveSafeInteger(participant.userId) ||
    typeof participant.nickname !== 'string' ||
    !isNullableString(participant.profileImageUrl) ||
    !isNullableString(lastMessage) ||
    !isNullableString(lastMessageSentAt) ||
    !isNonNegativeSafeInteger(unreadMessageCount)
  ) {
    throw new Error(`${index + 1}번째 채팅방 응답이 올바르지 않습니다.`);
  }

  return {
    chatRoomId,
    participant: {
      userId: participant.userId,
      nickname: participant.nickname,
      profileImageUrl: participant.profileImageUrl,
    },
    lastMessage,
    lastMessageSentAt,
    unreadMessageCount,
  };
};

export const convertChatRoomListResponse = (
  response: GetChatRoomsResponse,
): ChatRoomList => {
  const data = response.data;

  if (
    response.success !== true ||
    !data ||
    !Array.isArray(data.chatRooms) ||
    !isNonNegativeSafeInteger(data.page) ||
    !isPositiveSafeInteger(data.size) ||
    typeof data.hasNext !== 'boolean'
  ) {
    throw new Error(
      response.message || '채팅방 목록 응답이 올바르지 않습니다.',
    );
  }

  return {
    chatRooms: data.chatRooms.map(convertChatRoom),
    page: data.page,
    size: data.size,
    hasNext: data.hasNext,
  };
};
