import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui';

import { formatChatTime } from '../../utils/format-chat-time';
import profileImg from './달뭉.webp';

interface ChatMessageProps {
  type: 'incoming' | 'outgoing';
  content: string;
  createdAt: string;
  isRead?: boolean;
  profileImageUrl?: string;
}

export const ChatMessage = ({
  type,
  content,
  createdAt,
  isRead,
  profileImageUrl,
}: ChatMessageProps) => {
  const isOutgoing = type === 'outgoing';

  return (
    <div
      className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start gap-4')}
    >
      {!isOutgoing && (
        <CommonImage
          radius="rounded-full"
          src={profileImg}
          alt="프로필 이미지"
          width={40}
          height={40}
          className="size-10"
        />
      )}

      <div
        className={cn(
          'flex flex-col gap-2',
          isOutgoing ? 'items-end' : 'items-start',
        )}
      >
        <div className="flex items-end gap-2">
          {isOutgoing && isRead && (
            <span className="text-caption-r-12 text-gray-500">읽음</span>
          )}
          <div
            className={cn(
              'text-body-r-14 max-w-55 rounded-lg p-3',
              isOutgoing
                ? 'rounded-tr-xs bg-gray-800 text-white'
                : 'rounded-tl-xs bg-gray-50',
            )}
          >
            {content}
          </div>
        </div>
        <span className="text-caption-m-12 text-gray-500">
          {formatChatTime(createdAt)}
        </span>
      </div>
    </div>
  );
};
