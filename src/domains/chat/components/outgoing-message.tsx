import { formatChatTime } from '../utils/format-chat-time';

export const OutgoingMessage = () => {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-end gap-2">
        <span className="text-caption-r-12 text-gray-500">읽음</span>
        <div className="text-body-r-14 flex items-center justify-center rounded-lg rounded-tr-xs bg-gray-800 p-3 text-white">
          네! 좋아요. 오전 10시에 만나요~
        </div>
      </div>
      <span className="text-caption-m-12 text-end text-gray-500">
        {formatChatTime(new Date())}
      </span>
    </div>
  );
};
