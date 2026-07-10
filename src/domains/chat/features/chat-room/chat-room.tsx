'use client';

import { useState } from 'react';

import { BottomActionBar } from '@/shared/components/ui';
import { formatMonthDayWithWeekday } from '@/shared/utils/format-date-range';

import { ChatMessage } from '../../components/chat-message/chat-message';
import { ChatSystemMessage } from '../../components/chat-system-message/chat-system-message';
import { ChatMessageData } from '../../model/chat-room';

interface ChatRoomProps {
  createdAt: string;
  initialMessages: ChatMessageData[];
}

export const ChatRoom = ({ createdAt, initialMessages }: ChatRoomProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) return;

    // 웹소켓 전송
    // sendMessage(message);
    console.log(message);
    setMessage('');
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 scrollbar-none flex-col gap-6 overflow-y-auto px-4 [&::-webkit-scrollbar]:hidden">
        <div className="mt-2 flex flex-col items-center gap-2">
          <span className="text-body-r-14 text-gray-500">
            {formatMonthDayWithWeekday(createdAt)}
          </span>
          <ChatSystemMessage />
        </div>

        {initialMessages.map((message) =>
          message.mine ? (
            <ChatMessage
              key={message.messageId}
              type="outgoing"
              content={message.content}
              sentAt={message.sentAt}
              isRead={message.readByParticipant}
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

      <BottomActionBar
        value={message}
        onValueChange={setMessage}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      />
    </main>
  );
};
