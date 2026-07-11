import { ChatRoomParticipant } from './chat-list';

export interface ChatMessageData {
  messageId: number;
  sender: ChatRoomParticipant;
  content: string;
  sentAt: string;
  mine: boolean;
  readByParticipant: boolean;
}

export interface ChatMessageList {
  messages: ChatMessageData[];
  nextCursorSentAt: string;
  nextCursor: number;
  hasNext: boolean;
}
