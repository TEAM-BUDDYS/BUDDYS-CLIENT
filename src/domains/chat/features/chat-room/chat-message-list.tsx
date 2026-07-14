'use client';

import { useEffect, useRef } from 'react';

import { formatMonthDayWithWeekday } from '@/shared/utils/format-date-range';

import { ChatMessage } from '../../components/chat-message/chat-message';
import { ChatSystemMessage } from '../../components/chat-system-message/chat-system-message';
import type { ChatMessageData } from '../../model/chat-room';

interface ChatMessageListProps {
  createdAt: string;
  messages: ChatMessageData[];
}

export const ChatMessageList = ({
  createdAt,
  messages,
}: ChatMessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  return (
    <div className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto border-b border-b-gray-100 px-4 [&::-webkit-scrollbar]:hidden">
      <div className="mt-2 flex flex-col items-center gap-2">
        <span className="text-body-r-14 text-gray-500">
          {formatMonthDayWithWeekday(createdAt)}
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
  );
};
