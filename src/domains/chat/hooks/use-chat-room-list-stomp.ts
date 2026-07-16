'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import { useStomp } from '@/shared/api/stomp';

import { CHAT_STOMP_DESTINATION } from '../api/stomp/stomp-destination';
import { parseChatRoomListUpdatedResponse } from '../api/stomp/stomp-mapper';
import type { ChatRoom } from '../model/chat-list';

interface UseChatRoomListStompParams {
  onChatRoomUpdated: (chatRoom: ChatRoom) => void;
  onSubscribed?: () => void;
}

export const useChatRoomListStomp = ({
  onChatRoomUpdated,
  onSubscribed,
}: UseChatRoomListStompParams) => {
  const { connectionStatus, subscribe } = useStomp();

  useEffect(() => {
    if (connectionStatus !== 'connected') {
      return;
    }

    const unsubscribe = subscribe(CHAT_STOMP_DESTINATION.LIST, (body) => {
      try {
        const response = parseChatRoomListUpdatedResponse(body);

        onChatRoomUpdated(response.chatRoom);
      } catch (error) {
        Sentry.captureException(error);
      }
    });

    onSubscribed?.();

    return unsubscribe;
  }, [connectionStatus, subscribe, onChatRoomUpdated, onSubscribed]);

  return {
    isConnected: connectionStatus === 'connected',
  };
};
