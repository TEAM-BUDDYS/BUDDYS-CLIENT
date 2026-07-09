import { ChatList } from '@/domains/chat/components/chat-list/chat-list';
import { BottomNavigation, Header } from '@/shared/components/layout';

export default function ChatPage() {
  return (
    <div className="flex h-dvh flex-col">
      <Header content="채팅" />
      <main className="min-h-0 flex-1 scrollbar-none overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <ChatList />
      </main>
      <BottomNavigation />
    </div>
  );
}
