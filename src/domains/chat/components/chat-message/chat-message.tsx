import { formatChatTime } from '@/domains/chat/utils/format-chat-time';
import { cn } from '@/lib/cn';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';

interface BaseChatMessageProps {
  content: string;
  sentAt: string;
}

type ChatMessageProps =
  | (BaseChatMessageProps & {
      type: 'incoming';
      profileImageUrl: string | null;
      isRead?: never;
    })
  | (BaseChatMessageProps & {
      type: 'outgoing';
      profileImageUrl?: never;
      isRead?: boolean;
    });

export const ChatMessage = (props: ChatMessageProps) => {
  const isOutgoing = props.type === 'outgoing';

  return (
    <div
      className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start gap-4')}
    >
      {!isOutgoing && (
        <CommonImage
          radius="rounded-full"
          src={props.profileImageUrl ?? defaultProfileImage}
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
          {isOutgoing && props.isRead && (
            <span className="text-caption-r-12 text-gray-500">읽음</span>
          )}
          <div
            className={cn(
              'text-body-r-14 max-w-55 rounded-lg p-3 break-all',
              isOutgoing
                ? 'rounded-tr-xs bg-gray-800 text-white'
                : 'rounded-tl-xs bg-gray-50',
            )}
          >
            {props.content}
          </div>
        </div>
        <time className="text-caption-m-12 text-gray-500">
          {formatChatTime(props.sentAt)}
        </time>
      </div>
    </div>
  );
};
