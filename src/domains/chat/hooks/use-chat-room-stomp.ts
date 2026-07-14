'use client';

import { useCallback, useEffect } from 'react';

import { useStomp } from '@/shared/api/stomp';

import { CHAT_STOMP_DESTINATION } from '../api/stomp-destination';
import type {
  ReceiveChatMessageResponse,
  SendChatMessageRequest,
} from '../api/stomp-type';

interface UseChatRoomStompParams {
  chatRoomId: number;
  onMessage: (response: ReceiveChatMessageResponse) => void;
}

export const useChatRoomStomp = ({
  chatRoomId,
  onMessage,
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
          const response = JSON.parse(body) as ReceiveChatMessageResponse;

          if (response.type !== 'MESSAGE') {
            return;
          }

          if (response.chatRoomId !== chatRoomId) {
            return;
          }

          onMessage(response);
        } catch (error) {
          console.error('[CHAT] Failed to parse received message', {
            error,
            body,
          });
        }
      },
    );

    return unsubscribe;
  }, [chatRoomId, connectionStatus, subscribe, onMessage]);

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

  return {
    sendMessage,
    isConnected: connectionStatus === 'connected',
  };
};
