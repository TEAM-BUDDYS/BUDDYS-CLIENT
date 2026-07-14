import { ChatRoom } from '../model/chat-list';

export interface ChatRoomListUpdatedResponse {
  type: 'CHAT_ROOM_UPDATED';
  chatRoom: ChatRoom;
}

export interface SendChatMessageRequest {
  content: string;
}

export interface ReceiveChatMessageResponse {
  type: 'MESSAGE';
  chatRoomId: number;
  message: {
    messageId: number;
    sender: {
      userId: number;
      nickname: string;
      profileImageUrl: string | null;
    };
    content: string;
    sentAt: string;
  };
}

export interface SendChatReadRequest {
  lastReadMessageId: number;
}
