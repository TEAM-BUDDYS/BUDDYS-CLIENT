import { ChatRoomParticipant } from './chat-list';

export interface ChatRoomDetail {
  canSendMessage: boolean;
  hasBlocked: boolean;
  hasReported: boolean;
  createdAt: string;
  participantNickname: string;
  participantUserId: number;
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
  nextCursorSentAt: string | null;
  nextCursorMessageId: number | null;
  hasNext: boolean;
}
