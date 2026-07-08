import { CommonImage } from '@/shared/components/ui';

interface ChatListItemProps {
  imgUrl: string;
  nickname: string;
  lastMessage: string;
  sentAt: string;
  unreadCount?: number;
}

export const ChatListItem = ({
  imgUrl,
  nickname,
  lastMessage,
  sentAt,
  unreadCount,
}: ChatListItemProps) => {
  return (
    <div className="relative flex w-full justify-between pt-0.5 pl-0.5">
      {unreadCount && (
        <span className="bg-mint-300 text-caption-m-12 absolute top-0 left-0 flex size-4.5 items-center justify-center rounded-full px-[5px] text-white">
          {unreadCount}
        </span>
      )}
      <div className="flex-start flex gap-[13px]">
        <CommonImage
          src={imgUrl}
          alt={`${nickname} 프로필 사진`}
          width={50}
          height={50}
          radius="rounded-full"
        />

        <div className="flex flex-col gap-1">
          <h2 className="text-body-sb-15 text-gray-800">{nickname}</h2>
          <p className="text-body-r-14 text-gray-300">{lastMessage}</p>
        </div>
      </div>

      <span className="text-caption-m-12 text-gray-500">{sentAt}</span>
    </div>
  );
};
