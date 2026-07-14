import { notFound } from 'next/navigation';

import { ChatRoom } from '@/domains/chat/features/chat-room/chat-room';
import { ChatMessageData } from '@/domains/chat/model/chat-room';

interface ChatRoomPageProps {
  params: Promise<{ id: string }>;
}

const MOCK_MESSAGES: ChatMessageData[] = [
  {
    messageId: 1,
    sender: {
      userId: 2,
      nickname: '유저 1',
      profileImageUrl: null,
    },
    content: '안녕하세요!',
    sentAt: '2026-07-10T21:30:00',
    mine: false,
    readByParticipant: true,
  },
  {
    messageId: 2,
    sender: {
      userId: 1,
      nickname: '나',
      profileImageUrl: null,
    },
    content: '안녕하세요~',
    sentAt: '2026-07-10T21:31:00',
    mine: true,
    readByParticipant: true,
  },
  {
    messageId: 3,
    sender: {
      userId: 2,
      nickname: '유저 1',
      profileImageUrl: null,
    },
    content: '혹시 이번 주말에 같이 한강 가실 분 구하신 거 맞나요?',
    sentAt: '2026-07-10T21:32:00',
    mine: false,
    readByParticipant: true,
  },
  {
    messageId: 4,
    sender: {
      userId: 1,
      nickname: '나',
      profileImageUrl: null,
    },
    content: '네 맞아요! 아직 한 자리 남아있어요.',
    sentAt: '2026-07-10T21:33:00',
    mine: true,
    readByParticipant: true,
  },
  {
    messageId: 5,
    sender: {
      userId: 2,
      nickname: '유저 1',
      profileImageUrl: null,
    },
    content: '오 다행이다 ㅎㅎ 몇 시쯤 만나기로 하셨어요?',
    sentAt: '2026-07-10T21:34:00',
    mine: false,
    readByParticipant: true,
  },
  {
    messageId: 6,
    sender: {
      userId: 1,
      nickname: '나',
      profileImageUrl: null,
    },
    content: '일단 오후 4시쯤 여의나루역에서 만나려고 해요!',
    sentAt: '2026-07-10T21:35:00',
    mine: true,
    readByParticipant: true,
  },
  {
    messageId: 7,
    sender: {
      userId: 2,
      nickname: '유저 1',
      profileImageUrl: null,
    },
    content:
      '좋아요! 저는 수업이 2시쯤 끝나서 아마 시간 맞춰서 갈 수 있을 것 같아요.',
    sentAt: '2026-07-10T21:36:00',
    mine: false,
    readByParticipant: true,
  },
];

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id } = await params;
  const chatRoomId = Number(id);

  if (!Number.isInteger(chatRoomId) || chatRoomId <= 0) {
    notFound();
  }

  return <ChatRoom chatRoomId={chatRoomId} initialMessages={MOCK_MESSAGES} />;
}
