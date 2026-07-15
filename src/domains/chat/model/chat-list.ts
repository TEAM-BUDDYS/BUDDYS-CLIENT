export interface ChatRoomParticipant {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface ChatRoom {
  chatRoomId: number;
  participant: ChatRoomParticipant;
  lastMessage: string | null;
  lastMessageSentAt: string | null;
  unreadMessageCount: number;
}

export interface ChatRoomList {
  chatRooms: ChatRoom[];
  page: number;
  size: number;
  hasNext: boolean;
}
