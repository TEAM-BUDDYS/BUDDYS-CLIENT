'use client';

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { Header } from '@/shared/components/layout';
import { BottomActionBar } from '@/shared/components/ui';

import { CHAT_QUERY_OPTIONS } from '../../api/query';
import { ReceiveChatMessageResponse } from '../../api/stomp-type';
import { useChatRoomStomp } from '../../hooks/use-chat-room-stomp';
import { ChatMessageData } from '../../model/chat-room';
import { ChatRoomMenu } from '../chat-room-menu/chat-room-menu';
import { ChatMessageList } from './chat-message-list';

const CHAT_MESSAGE_PAGE_SIZE = 10;

interface ChatRoomProps {
  chatRoomId: number;
}

export const ChatRoom = ({ chatRoomId }: ChatRoomProps) => {
  const { userId: currentUserId } = useAuthSession();
  const [message, setMessage] = useState('');
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessageData[]>(
    [],
  );
  const lastPublishedReadMessageIdRef = useRef<number | null>(null);

  const { data: chatRoomData } = useSuspenseQuery(
    CHAT_QUERY_OPTIONS.DETAIL(chatRoomId),
  );

  const {
    data: messagePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useSuspenseInfiniteQuery(
    CHAT_QUERY_OPTIONS.MESSAGES(chatRoomId, {
      size: CHAT_MESSAGE_PAGE_SIZE,
    }),
  );

  const handleReceiveMessage = useCallback(
    (response: ReceiveChatMessageResponse) => {
      if (response.type !== 'MESSAGE') {
        return;
      }

      const receivedMessage: ChatMessageData = {
        messageId: response.message.messageId,
        sender: response.message.sender,
        content: response.message.content,
        sentAt: response.message.sentAt,
        mine: response.message.sender.userId === currentUserId,
        isRead: false,
      };

      setRealtimeMessages((prevMessages) => {
        const isDuplicated = prevMessages.some(
          (message) => message.messageId === receivedMessage.messageId,
        );

        if (isDuplicated) {
          return prevMessages;
        }

        return [...prevMessages, receivedMessage];
      });
    },
    [currentUserId],
  );

  const { sendMessage, markChatRoomAsRead, isConnected } = useChatRoomStomp({
    chatRoomId,
    onMessage: handleReceiveMessage,
  });

  const messages = useMemo<ChatMessageData[]>(() => {
    const fetchedMessages = [
      ...(messagePages?.pages.flatMap((page) => page.messages) ?? []),
    ].reverse();

    const combinedMessages = [...fetchedMessages, ...realtimeMessages];

    return combinedMessages.filter(
      (message, index, array) =>
        array.findIndex((item) => item.messageId === message.messageId) ===
        index,
    );
  }, [messagePages?.pages, realtimeMessages]);

  useEffect(() => {
    const latestMessage = messages.at(-1);
    const lastPublishedReadMessageId = lastPublishedReadMessageIdRef.current;

    if (
      !isConnected ||
      !latestMessage ||
      (lastPublishedReadMessageId !== null &&
        latestMessage.messageId <= lastPublishedReadMessageId)
    ) {
      return;
    }

    const isPublished = markChatRoomAsRead(latestMessage.messageId);

    if (isPublished) {
      lastPublishedReadMessageIdRef.current = latestMessage.messageId;
    }
  }, [isConnected, markChatRoomAsRead, messages]);

  const handleSubmit = () => {
    const isSent = sendMessage(message);

    if (isSent) {
      setMessage('');
    }
  };

  if (currentUserId === null) {
    return null;
  }

  return (
    <div className="flex h-dvh flex-col">
      <Header
        content={chatRoomData.participantNickname}
        hasBackButton
        contentAlign="center"
        right={<ChatRoomMenu />}
      />
      <main className="flex min-h-0 flex-1 flex-col">
        <ChatMessageList
          createdAt={chatRoomData.createdAt}
          messages={messages}
          hasPreviousMessages={Boolean(hasNextPage)}
          isFetchingPreviousMessages={isFetchingNextPage}
          isFetchPreviousMessagesError={isFetchNextPageError}
          onLoadPreviousMessages={fetchNextPage}
        />

        <BottomActionBar
          value={message}
          onValueChange={setMessage}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        />
      </main>
    </div>
  );
};
