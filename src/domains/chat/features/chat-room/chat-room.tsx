'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Header } from '@/shared/components/layout';
import { BottomActionBar } from '@/shared/components/ui';
import { formatMonthDayWithWeekday } from '@/shared/utils/format-date-range';

import { CHAT_QUERY_OPTIONS } from '../../api/query';
import { ReceiveChatMessageResponse } from '../../api/stomp-type';
import { ChatMessage } from '../../components/chat-message/chat-message';
import { ChatSystemMessage } from '../../components/chat-system-message/chat-system-message';
import { useChatRoomStomp } from '../../hooks/use-chat-room-stomp';
import { ChatMessageData } from '../../model/chat-room';
import { ChatRoomMenu } from '../chat-room-menu/chat-room-menu';

interface ChatRoomProps {
  chatRoomId: number;
  currentUserId: number;
}

export const ChatRoom = ({ chatRoomId, currentUserId }: ChatRoomProps) => {
  const [message, setMessage] = useState('');
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessageData[]>(
    [],
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data: chatRoomData,
    isPending,
    isError,
  } = useQuery(CHAT_QUERY_OPTIONS.DETAIL(chatRoomId));

  const { data: initialMessages } = useQuery(
    CHAT_QUERY_OPTIONS.MESSAGES(chatRoomId),
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

  const { sendMessage, isConnected } = useChatRoomStomp({
    chatRoomId,
    onMessage: handleReceiveMessage,
  });

  const messages = useMemo<ChatMessageData[]>(() => {
    const fetchedMessages = [...(initialMessages?.messages ?? [])].reverse();

    const combinedMessages = [...fetchedMessages, ...realtimeMessages];

    return combinedMessages.filter(
      (message, index, array) =>
        array.findIndex((item) => item.messageId === message.messageId) ===
        index,
    );
  }, [initialMessages?.messages, realtimeMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  const handleSubmit = () => {
    const isSent = sendMessage(message);

    if (isSent) {
      setMessage('');
    }
  };

  if (isPending) {
    return <div>채팅방을 불러오는 중...</div>;
  }

  if (isError || !chatRoomData) {
    return <div>채팅방을 불러오지 못했습니다.</div>;
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
        <div className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto border-b border-b-gray-100 px-4 [&::-webkit-scrollbar]:hidden">
          <div className="mt-2 flex flex-col items-center gap-2">
            <span className="text-body-r-14 text-gray-500">
              {formatMonthDayWithWeekday(chatRoomData.createdAt)}
            </span>
            <ChatSystemMessage />
          </div>
          <div className="flex flex-col gap-3.5 pt-6">
            {messages.map((message) =>
              message.mine ? (
                <ChatMessage
                  key={message.messageId}
                  type="outgoing"
                  content={message.content}
                  sentAt={message.sentAt}
                  isRead={message.isRead}
                />
              ) : (
                <ChatMessage
                  key={message.messageId}
                  type="incoming"
                  content={message.content}
                  sentAt={message.sentAt}
                  profileImageUrl={message.sender.profileImageUrl}
                />
              ),
            )}
          </div>
          <div ref={bottomRef} />
        </div>

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
