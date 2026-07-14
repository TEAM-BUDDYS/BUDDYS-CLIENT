import { notFound } from 'next/navigation';

import { ChatRoom } from '@/domains/chat/features/chat-room/chat-room';

interface ChatRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id } = await params;
  const chatRoomId = Number(id);

  if (!Number.isInteger(chatRoomId) || chatRoomId <= 0) {
    notFound();
  }

  return <ChatRoom chatRoomId={chatRoomId} currentUserId={6} />;
}
