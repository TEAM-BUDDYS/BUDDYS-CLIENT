import { ChatRoomList } from '../../model/chat-list';
import { ChatListItem } from './chat-list-item/chat-list-item';

const MOCK_CHAT_ROOM_LIST: ChatRoomList = {
  chatRooms: [
    {
      chatRoomId: 1,
      participant: {
        userId: 2,
        nickname: '민지',
        profileImageUrl: '/images/profile.png',
      },
      lastMessage: '내일 몇 시에 만날까요?',
      lastMessageSentAt: '2026-07-05T14:30:00',
      unreadMessageCount: 3,
    },
  ],
  page: 0,
  size: 20,
  hasNext: true,
};

export const ChatList = () => {
  const { chatRooms } = MOCK_CHAT_ROOM_LIST;

  return (
    <ul className="mt-0.5 mb-10">
      {chatRooms.map((chatRoom) => (
        <ChatListItem
          key={chatRoom.chatRoomId}
          chatRoomId={chatRoom.chatRoomId}
          imgUrl={chatRoom.participant.profileImageUrl ?? ''}
          nickname={chatRoom.participant.nickname}
          lastMessage={chatRoom.lastMessage}
          sentAt={chatRoom.lastMessageSentAt}
          unreadCount={chatRoom.unreadMessageCount}
        />
      ))}
    </ul>
  );
};
