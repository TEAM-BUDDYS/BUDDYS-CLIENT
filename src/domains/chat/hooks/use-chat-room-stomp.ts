'use client';

import { useCallback } from 'react';

import { useStomp } from '@/shared/api/stomp';

import { CHAT_STOMP_DESTINATION } from '../api/stomp-destination';
import type { SendChatMessageRequest } from '../api/stomp-type';

export const useChatRoomStomp = (chatRoomId: number) => {
  const { connectionStatus, publish } = useStomp();

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
