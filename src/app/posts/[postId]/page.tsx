import { notFound } from 'next/navigation';

import { PostDetailView } from '@/domains/posts/features/post-detail/post-detail-view';

import {
  getSamplePostDetail,
  SAMPLE_POST_DETAIL_COMMENTS,
} from './post-detail.fixture';

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
    <PostDetailView
      post={getSamplePostDetail(parsedPostId)}
      comments={SAMPLE_POST_DETAIL_COMMENTS}
    />
  );
}
