export const CHAT_STOMP_DESTINATION = {
  LIST: '/user/sub/chat-room-list',
  SUBSCRIBE: (chatRoomId: number) => `/sub/chat-rooms/${chatRoomId}`,
  SEND: (chatRoomId: number) => `/pub/chat-rooms/${chatRoomId}/messages`,
} as const;
