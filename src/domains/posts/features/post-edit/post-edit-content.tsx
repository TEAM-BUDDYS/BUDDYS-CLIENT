'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { PostCreateFlow } from '@/domains/posts/features/post-create/post-create-flow';
import { PostNotFoundView } from '@/domains/posts/features/post-detail/post-not-found-view';

interface PostEditContentProps {
  postId: number;
}

export const PostEditContent = ({ postId }: PostEditContentProps) => {
  const { data: post } = useSuspenseQuery(POST_QUERY_OPTIONS.DETAIL(postId));

  if (!post.isMine) {
    return <PostNotFoundView />;
  }

  return <PostCreateFlow initialPost={post} />;
};
