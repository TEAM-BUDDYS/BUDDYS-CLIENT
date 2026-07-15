import { notFound } from 'next/navigation';

import { PostDetailAsyncBoundary } from '@/domains/posts/features/post-detail/post-detail-async-boundary';
import { PostDetailContent } from '@/domains/posts/features/post-detail/post-detail-content';

interface PostDetailPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  const parsedPostId = Number(postId);

  if (!Number.isInteger(parsedPostId) || parsedPostId <= 0) {
    notFound();
  }

  return (
    <PostDetailAsyncBoundary>
      <PostDetailContent postId={parsedPostId} />
    </PostDetailAsyncBoundary>
  );
}
