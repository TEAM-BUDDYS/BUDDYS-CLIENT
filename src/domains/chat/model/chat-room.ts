import { ChatRoomParticipant } from './chat-list';

export interface ChatRoomDetail {
  createdAt: string;
  participantNickname: string;
}

export interface ChatMessageData {
  messageId: number;
  sender: ChatRoomParticipant;
  content: string;
  sentAt: string;
  mine: boolean;
  isRead: boolean;
}

export interface ChatMessageList {
  messages: ChatMessageData[];
  nextCursorSentAt: string;
  nextCursorMessageId: number;
  hasNext: boolean;
}
