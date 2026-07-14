import { notFound } from 'next/navigation';

import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { PostDetailView } from '@/domains/posts/features/post-detail/post-detail-view';

import { getSamplePostDetail } from './post-detail.fixture';

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
    <AuthEntryGuard>
      <PostDetailView post={getSamplePostDetail(parsedPostId)} />
    </AuthEntryGuard>
  );
}
