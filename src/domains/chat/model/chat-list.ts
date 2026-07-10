export interface ChatRoomParticipant {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface ChatRoom {
  chatRoomId: number;
  participant: ChatRoomParticipant;
  lastMessage: string;
  lastMessageSentAt: string;
  unreadMessageCount: number;
}

export interface ChatRoomList {
  chatRooms: ChatRoom[];
  page: number;
  size: number;
  hasNext: boolean;
}
