'use client';

import { useCallback, useEffect, useRef } from 'react';

import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import { formatMonthDayWithWeekday } from '@/shared/utils/format-date-range';

import { ChatMessage } from '../../components/chat-message/chat-message';
import { ChatSystemMessage } from '../../components/chat-system-message/chat-system-message';
import type { ChatMessageData } from '../../model/chat-room';

interface ChatMessageListProps {
  createdAt: string;
  messages: ChatMessageData[];
  hasPreviousMessages: boolean;
  isFetchingPreviousMessages: boolean;
  isFetchPreviousMessagesError: boolean;
  onLoadPreviousMessages: () => Promise<unknown>;
}

export const ChatMessageList = ({
  createdAt,
  messages,
  hasPreviousMessages,
  isFetchingPreviousMessages,
  isFetchPreviousMessagesError,
  onLoadPreviousMessages,
}: ChatMessageListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const latestMessageId = messages.at(-1)?.messageId;

  const handleLoadPreviousMessages = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const previousScrollHeight = scrollContainer.scrollHeight;

    void onLoadPreviousMessages().then(() => {
      requestAnimationFrame(() => {
        const currentScrollContainer = scrollContainerRef.current;

        if (!currentScrollContainer) {
          return;
        }

        const addedScrollHeight =
          currentScrollContainer.scrollHeight - previousScrollHeight;

        currentScrollContainer.scrollTop += addedScrollHeight;
      });
    });
  }, [onLoadPreviousMessages]);

  const loadPreviousRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      hasPreviousMessages &&
      !isFetchingPreviousMessages &&
      !isFetchPreviousMessagesError,
    onIntersect: handleLoadPreviousMessages,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [latestMessageId]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto border-b border-b-gray-100 px-4 pb-4 [&::-webkit-scrollbar]:hidden"
    >
      <div ref={loadPreviousRef} className="h-1 shrink-0" aria-hidden="true" />

      {isFetchPreviousMessagesError && !isFetchingPreviousMessages && (
        <button
          type="button"
          className="text-caption-sb-12 text-mint-400 mx-auto shrink-0 py-4"
          onClick={handleLoadPreviousMessages}
        >
          이전 메시지 다시 불러오기
        </button>
      )}

      {!hasPreviousMessages && (
        <div className="mt-2 flex flex-col items-center gap-2">
          <span className="text-body-r-14 text-gray-500">
            {formatMonthDayWithWeekday(createdAt)}
          </span>
          <ChatSystemMessage />
        </div>
      )}
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
