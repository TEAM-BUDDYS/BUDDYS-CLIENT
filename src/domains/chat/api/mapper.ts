import type { components } from '@/types/schema';

import type { ChatRoom, ChatRoomList } from '../model/chat-list';
import type { ChatMessageData, ChatMessageList } from '../model/chat-room';
import type { GetChatRoomsResponse, GetMessagesResponse } from './type';

const isPositiveSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

const isNonNegativeSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;

const isNullableString = (value: unknown): value is string | null =>
  typeof value === 'string' || value === null;

type ChatRoomListItemResponse =
  components['schemas']['ChatRoomListItemResponse'];

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

type ChatMessageResponse = components['schemas']['ChatMessageResponse'];

const convertChatMessage = (
  message: ChatMessageResponse,
  index: number,
): ChatMessageData => {
  const { messageId, sender, content, sentAt, mine, isRead } = message;

  if (
    !isPositiveSafeInteger(messageId) ||
    !sender ||
    !isPositiveSafeInteger(sender.userId) ||
    typeof sender.nickname !== 'string' ||
    typeof content !== 'string' ||
    typeof sentAt !== 'string' ||
    typeof mine !== 'boolean' ||
    typeof isRead !== 'boolean'
  ) {
    throw new Error(`${index + 1}번째 메시지 응답이 올바르지 않습니다.`);
  }

  return {
    messageId,
    sender: {
      userId: sender.userId,
      nickname: sender.nickname,
      profileImageUrl: sender.profileImageUrl ?? null,
    },
    content,
    sentAt,
    mine,
    isRead,
  };
};

export const convertChatMessageListResponse = (
  response: GetMessagesResponse,
): ChatMessageList => {
  const data = response.data;

  if (
    response.success !== true ||
    !data ||
    !Array.isArray(data.messages) ||
    typeof data.hasNext !== 'boolean'
  ) {
    throw new Error(
      response.message || '메시지 목록 응답이 올바르지 않습니다.',
    );
  }

  if (
    data.hasNext &&
    (typeof data.nextCursorSentAt !== 'string' ||
      !isPositiveSafeInteger(data.nextCursorMessageId))
  ) {
    throw new Error('다음 메시지 커서가 올바르지 않습니다.');
  }

  return {
    messages: data.messages.map(convertChatMessage),
    nextCursorSentAt: data.nextCursorSentAt ?? null,
    nextCursorMessageId: data.nextCursorMessageId ?? null,
    hasNext: data.hasNext,
  };
};
