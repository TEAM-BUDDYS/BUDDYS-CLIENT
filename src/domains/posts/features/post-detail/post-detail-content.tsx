'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { PostDetailView } from '@/domains/posts/features/post-detail/post-detail-view';

interface PostDetailContentProps {
  postId: number;
}

export const PostDetailContent = ({ postId }: PostDetailContentProps) => {
  const { data: post } = useSuspenseQuery(POST_QUERY_OPTIONS.DETAIL(postId));

  return <PostDetailView post={post} />;
};
