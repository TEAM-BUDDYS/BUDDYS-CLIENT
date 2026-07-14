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
