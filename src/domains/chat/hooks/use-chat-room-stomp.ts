'use client';

import { useCallback, useEffect } from 'react';

import { useStomp } from '@/shared/api/stomp';

import { CHAT_STOMP_DESTINATION } from '../api/stomp-destination';
import type {
  ReceiveChatMessageResponse,
  ReceiveChatReadResponse,
  ReceiveChatRoomResponse,
  SendChatMessageRequest,
  SendChatReadRequest,
} from '../api/stomp-type';

interface UseChatRoomStompParams {
  chatRoomId: number;
  onMessage: (response: ReceiveChatMessageResponse) => void;
  onRead: (response: ReceiveChatReadResponse) => void;
}

export const useChatRoomStomp = ({
  chatRoomId,
  onMessage,
  onRead,
}: UseChatRoomStompParams) => {
  const { connectionStatus, publish, subscribe } = useStomp();

  useEffect(() => {
    if (connectionStatus !== 'connected') {
      return;
    }

    const unsubscribe = subscribe(
      CHAT_STOMP_DESTINATION.SUBSCRIBE(chatRoomId),
      (body) => {
        try {
          const response = JSON.parse(body) as ReceiveChatRoomResponse;

          if (response.chatRoomId !== chatRoomId) {
            return;
          }

          if (response.type === 'MESSAGE') {
            onMessage(response);
            return;
          }

          if (response.type === 'READ') {
            onRead(response);
          }
        } catch (error) {
          console.error('[CHAT] Failed to parse received message', {
            error,
            body,
          });
        }
      },
    );

    return unsubscribe;
  }, [chatRoomId, connectionStatus, subscribe, onMessage, onRead]);

  const sendMessage = useCallback(
    (content: string) => {
      const trimmedContent = content.trim();

      if (!trimmedContent) {
        return false;
      }

      if (connectionStatus !== 'connected') {
        console.error('[CHAT] STOMP is not connected');
        return false;
      }

      const body: SendChatMessageRequest = {
        content: trimmedContent,
      };

      try {
        publish(CHAT_STOMP_DESTINATION.SEND(chatRoomId), JSON.stringify(body));

        console.info('[CHAT] Message sent', body);
        return true;
      } catch (error) {
        console.error('[CHAT] Failed to send message', error);
        return false;
      }
    },
    [chatRoomId, connectionStatus, publish],
  );

  const markChatRoomAsRead = useCallback(
    (lastReadMessageId: number) => {
      if (connectionStatus !== 'connected') {
        console.error('[CHAT] STOMP is not connected');
        return false;
      }

      const body: SendChatReadRequest = {
        lastReadMessageId,
      };

      try {
        publish(CHAT_STOMP_DESTINATION.READ(chatRoomId), JSON.stringify(body));

        return true;
      } catch (error) {
        console.error('[CHAT] Failed to mark chat room as read', error);
        return false;
      }
    },
    [chatRoomId, connectionStatus, publish],
  );

  return {
    sendMessage,
    markChatRoomAsRead,
    isConnected: connectionStatus === 'connected',
  };
};
