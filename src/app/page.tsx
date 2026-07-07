import { CommentItem } from '@/domains/posts/components/comment-item/comment-item';

export default function Home() {
  return (
    <main className="min-h-dvh bg-white px-4 py-8">
      <div className="mx-auto w-full max-w-[343px]">
        <CommentItem
          content="저 관심 있어요!"
          author={{
            userId: 10,
            nickname: '가윤',
            profileImageUrl: 'https://picsum.photos/id/64/80/80',
          }}
          createdAt="1시간 전"
        />
      </div>
    </main>
  );
}
