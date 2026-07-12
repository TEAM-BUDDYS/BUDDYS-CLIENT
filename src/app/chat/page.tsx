import { ChatList } from '@/domains/chat/components/chat-list/chat-list';
import { ChatRoomList } from '@/domains/chat/model/chat-list';
import { BottomNavigation, Header } from '@/shared/components/layout';

const MOCK_CHAT_ROOM_LIST: ChatRoomList = {
  chatRooms: [
    {
      chatRoomId: 1,
      participant: {
        userId: 2,
        nickname: '민지',
        profileImageUrl: null,
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

export default function ChatPage() {
  return (
    <div className="flex h-dvh flex-col">
      <Header content="채팅" />
      <main className="min-h-0 flex-1 scrollbar-none overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <ChatList chatRooms={MOCK_CHAT_ROOM_LIST.chatRooms} />
      </main>
      <BottomNavigation />
    </div>
  );
}
