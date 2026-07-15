import { notFound } from 'next/navigation';

import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { ChatRoom } from '@/domains/chat/features/chat-room/chat-room';
import { AsyncBoundary } from '@/shared/components/ui';

interface ChatRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id } = await params;
  const chatRoomId = Number(id);

  if (!Number.isInteger(chatRoomId) || chatRoomId <= 0) {
    notFound();
  }

  return (
    <AuthEntryGuard>
      <AsyncBoundary
        key={chatRoomId}
        loadingState={{ title: '채팅방을 불러오고 있어요' }}
        errorState={{
          title: '채팅방을 불러오지 못했어요',
          description: '잠시 후 다시 시도해 주세요',
        }}
      >
        <ChatRoom chatRoomId={chatRoomId} />
      </AsyncBoundary>
    </AuthEntryGuard>
  );
}
