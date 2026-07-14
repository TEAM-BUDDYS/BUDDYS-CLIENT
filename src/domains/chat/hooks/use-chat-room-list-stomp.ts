'use client';

import { useEffect } from 'react';

import { useStomp } from '@/shared/api/stomp';

import { CHAT_STOMP_DESTINATION } from '../api/stomp-destination';
import type { ChatRoomListUpdatedResponse } from '../api/stomp-type';
import type { ChatRoom } from '../model/chat-list';

interface UseChatRoomListStompParams {
  onChatRoomUpdated: (chatRoom: ChatRoom) => void;
}

export const useChatRoomListStomp = ({
  onChatRoomUpdated,
}: UseChatRoomListStompParams) => {
  const { connectionStatus, subscribe } = useStomp();

  useEffect(() => {
    if (connectionStatus !== 'connected') {
      return;
    }

    const unsubscribe = subscribe(CHAT_STOMP_DESTINATION.LIST, (body) => {
      try {
        const response = JSON.parse(body) as ChatRoomListUpdatedResponse;

        if (response.type !== 'CHAT_ROOM_UPDATED') {
          return;
        }

        onChatRoomUpdated(response.chatRoom);
      } catch (error) {
        console.error('[CHAT] Failed to parse chat room list update', {
          error,
          body,
        });
      }
    });

    return unsubscribe;
  }, [connectionStatus, subscribe, onChatRoomUpdated]);

  return {
    isConnected: connectionStatus === 'connected',
  };
};
