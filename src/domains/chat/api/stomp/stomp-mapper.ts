import { ChatRoomListUpdatedResponse } from './stomp-type';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isPositiveSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

const isNonNegativeSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;

const isNullableString = (value: unknown): value is string | null =>
  typeof value === 'string' || value === null;

export const parseChatRoomListUpdatedResponse = (
  body: string,
): ChatRoomListUpdatedResponse => {
  const response: unknown = JSON.parse(body);

  if (
    !isRecord(response) ||
    response.type !== 'CHAT_ROOM_UPDATED' ||
    !isRecord(response.chatRoom)
  ) {
    throw new Error('채팅방 목록 STOMP 응답이 올바르지 않습니다.');
  }

  const chatRoom = response.chatRoom;
  const participant = chatRoom.participant;

  if (
    !isPositiveSafeInteger(chatRoom.chatRoomId) ||
    !isRecord(participant) ||
    !isPositiveSafeInteger(participant.userId) ||
    typeof participant.nickname !== 'string' ||
    !isNullableString(participant.profileImageUrl) ||
    !isNullableString(chatRoom.lastMessage) ||
    !isNullableString(chatRoom.lastMessageSentAt) ||
    !isNonNegativeSafeInteger(chatRoom.unreadMessageCount)
  ) {
    throw new Error('채팅방 목록 STOMP 응답이 올바르지 않습니다.');
  }

  return {
    type: 'CHAT_ROOM_UPDATED',
    chatRoom: {
      chatRoomId: chatRoom.chatRoomId,
      participant: {
        userId: participant.userId,
        nickname: participant.nickname,
        profileImageUrl: participant.profileImageUrl,
      },
      lastMessage: chatRoom.lastMessage,
      lastMessageSentAt: chatRoom.lastMessageSentAt,
      unreadMessageCount: chatRoom.unreadMessageCount,
    },
  };
};
