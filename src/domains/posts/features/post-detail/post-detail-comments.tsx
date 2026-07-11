'use client';

import { type SubmitEvent, useState } from 'react';

import type { PostDetailComment } from '@/domains/posts/model/comment';
import { PostDetailCommentSection } from '@/domains/posts/sections/post-detail-comment-section';
import { BottomActionBar } from '@/shared/components/ui';

interface PostDetailCommentsProps {
  viewCount: number;
  commentCount: number;
  comments: PostDetailComment[];
}

export const PostDetailComments = ({
  viewCount,
  commentCount,
  comments,
}: PostDetailCommentsProps) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: 댓글 작성 API 연동 후 제출 로직 추가
  };

  return (
    <>
      <PostDetailCommentSection
        viewCount={viewCount}
        commentCount={commentCount}
        comments={comments}
      />
      <BottomActionBar
        className="fixed bottom-0 left-1/2 z-20 w-full max-w-107.5 -translate-x-1/2 border-t border-gray-100"
        value={comment}
        onSubmit={handleCommentSubmit}
        onValueChange={setComment}
      />
    </>
  );
};
