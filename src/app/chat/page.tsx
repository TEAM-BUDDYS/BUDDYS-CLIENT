import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { ChatListFeature } from '@/domains/chat/features/chat-list/chat-list-feature';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { AsyncBoundary } from '@/shared/components/ui';

export default function ChatPage() {
  return (
    <AuthEntryGuard>
      <div className="flex h-dvh flex-col">
        <Header content="채팅" />

        <main className="min-h-0 flex-1 scrollbar-none overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <AsyncBoundary
            loadingState={{
              title: '채팅 목록을 불러오고 있어요',
            }}
            errorState={{
              title: '채팅 목록을 불러오지 못했어요',
              description: '잠시 후 다시 시도해 주세요',
            }}
          >
            <ChatListFeature />
          </AsyncBoundary>
        </main>

        <BottomNavigation />
      </div>
    </AuthEntryGuard>
  );
}
