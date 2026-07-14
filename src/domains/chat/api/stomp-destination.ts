export const CHAT_STOMP_DESTINATION = {
  LIST: '/user/sub/chat-room-list',
  ROOM: (chatRoomId: number) => `/topic/chat-rooms/${chatRoomId}`,
  SEND: (chatRoomId: number) => `/pub/chat-rooms/${chatRoomId}/messages`,
} as const;
