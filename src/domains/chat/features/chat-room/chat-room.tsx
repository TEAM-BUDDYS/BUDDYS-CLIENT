'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { Header } from '@/shared/components/layout';
import { BottomActionBar } from '@/shared/components/ui';
import { formatMonthDayWithWeekday } from '@/shared/utils/format-date-range';

import { CHAT_QUERY_OPTIONS } from '../../api/query';
import { ChatMessage } from '../../components/chat-message/chat-message';
import { ChatSystemMessage } from '../../components/chat-system-message/chat-system-message';
import { useChatRoomStomp } from '../../hooks/use-chat-room-stomp';
import { ChatRoomMenu } from '../chat-room-menu/chat-room-menu';

interface ChatRoomProps {
  chatRoomId: number;
}

export const ChatRoom = ({ chatRoomId }: ChatRoomProps) => {
  const [message, setMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isError } = useQuery(
    CHAT_QUERY_OPTIONS.DETAIL(chatRoomId),
  );

  const { data: initialMessages } = useQuery(
    CHAT_QUERY_OPTIONS.MESSAGES(chatRoomId),
  );

  const messages = initialMessages?.data?.messages ?? [];
  const displayMessages = [...messages].reverse();

  const { sendMessage, isConnected } = useChatRoomStomp(chatRoomId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [initialMessages]);

  const handleSubmit = () => {
    const isSent = sendMessage(message);

    if (isSent) {
      setMessage('');
    }
  };

  if (isPending) {
    return <div>채팅방을 불러오는 중...</div>;
  }

  if (isError || !data?.data) {
    return <div>채팅방을 불러오지 못했습니다.</div>;
  }

  const chatRoom = data.data;

  return (
    <div className="flex h-dvh flex-col">
      <Header
        content={chatRoom.participant?.nickname ?? ''}
        hasBackButton
        contentAlign="center"
        right={<ChatRoomMenu />}
      />
      <main className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto border-b border-b-gray-100 px-4 [&::-webkit-scrollbar]:hidden">
          <div className="mt-2 flex flex-col items-center gap-2">
            <span className="text-body-r-14 text-gray-500">
              {chatRoom.createdAt
                ? formatMonthDayWithWeekday(chatRoom.createdAt)
                : null}
            </span>
            <ChatSystemMessage />
          </div>
          <div className="flex flex-col gap-3.5 pt-6">
            {displayMessages.map((message) =>
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
