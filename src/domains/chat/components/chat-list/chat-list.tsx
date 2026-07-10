import { defaultProfileImage } from '@/shared/assets/illustrations';

import { ChatRoom } from '../../model/chat-list';
import { ChatListItem } from './chat-list-item/chat-list-item';

interface ChatListProps {
  chatRooms: ChatRoom[];
}

export const ChatList = ({ chatRooms }: ChatListProps) => {
  return (
    <ul className="mt-0.5 mb-10">
      {chatRooms.map((chatRoom) => (
        <ChatListItem
          key={chatRoom.chatRoomId}
          chatRoomId={chatRoom.chatRoomId}
          imgUrl={chatRoom.participant.profileImageUrl ?? defaultProfileImage}
          nickname={chatRoom.participant.nickname}
          lastMessage={chatRoom.lastMessage}
          sentAt={chatRoom.lastMessageSentAt}
          unreadCount={chatRoom.unreadMessageCount}
        />
      ))}
    </ul>
  );
};
