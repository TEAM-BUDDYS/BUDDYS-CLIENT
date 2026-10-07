import { notFound } from 'next/navigation';

import { PostDetailAsyncBoundary } from '@/domains/posts/features/post-detail/post-detail-async-boundary';
import { PostEditContent } from '@/domains/posts/features/post-edit/post-edit-content';

interface PostEditPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  const { postId } = await params;
  const parsedPostId = Number(postId);

  if (!Number.isInteger(parsedPostId) || parsedPostId <= 0) {
    notFound();
  }

  return (
    <PostDetailAsyncBoundary>
      <PostEditContent postId={parsedPostId} />
    </PostDetailAsyncBoundary>
  );
}
