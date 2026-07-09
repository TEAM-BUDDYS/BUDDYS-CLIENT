import Link from 'next/link';

import { NoticeIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui';
import { formatRelativeTime } from '@/shared/utils/format-relative-time';

interface ChatListItemProps {
  chatRoomId: number;
  imgUrl: string;
  nickname: string;
  lastMessage: string;
  sentAt: string;
  unreadCount: number;
  isNotificationOn?: boolean;
}

export const ChatListItem = ({
  chatRoomId,
  imgUrl,
  nickname,
  lastMessage,
  sentAt,
  unreadCount,
  isNotificationOn,
}: ChatListItemProps) => {
  const hasUnread = unreadCount > 0;

  return (
    <li>
      <Link
        href={`/chat/${chatRoomId}`}
        className="flex w-full justify-between border-b border-gray-100 pt-4 pr-6 pb-3.5 pl-6.5"
      >
        <div className="flex max-w-[270px] items-start gap-[13px]">
          <div className="relative flex">
            <CommonImage
              src={imgUrl}
              alt={`${nickname} 프로필 사진`}
              width={50}
              height={50}
              radius="rounded-full"
            />
            {hasUnread && (
              <span
                aria-label={`읽지 않은 메시지 ${unreadCount}개`}
                className="bg-mint-300 text-caption-m-10 absolute top-[-2px] left-[-2px] flex size-4.5 items-center justify-center rounded-full px-[5px] text-white"
              >
                {unreadCount >= 10 ? '9+' : unreadCount}
              </span>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="text-body-sb-15 text-gray-800">{nickname}</p>
              {!isNotificationOn && (
                <span
                  aria-label="알람 끈 채팅방"
                  className="size-[14px] text-gray-300"
                >
                  <NoticeIcon />
                </span>
              )}
            </div>

            <p className="text-body-r-14 truncate text-gray-300">
              {lastMessage}
            </p>
          </div>
        </div>

        <time
          dateTime={sentAt}
          className="text-caption-m-12 shrink-0 text-gray-500"
        >
          {formatRelativeTime(sentAt)}
        </time>
      </Link>
    </li>
  );
};
