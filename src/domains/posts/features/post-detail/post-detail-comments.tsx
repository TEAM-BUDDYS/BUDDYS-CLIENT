'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type SubmitEvent, useState } from 'react';

import { POST_MUTATION_OPTIONS } from '@/domains/posts/api/query';
import type { PostDetailComment } from '@/domains/posts/model/comment';
import { PostDetailCommentSection } from '@/domains/posts/sections/post-detail-comment-section';
import { POST_QUERY_KEY } from '@/shared/api';
import { BottomActionBar } from '@/shared/components/ui';

interface PostDetailCommentsProps {
  postId: number;
  viewCount: number;
  commentCount: number;
  comments: PostDetailComment[];
}

export const PostDetailComments = ({
  postId,
  viewCount,
  commentCount,
  comments,
}: PostDetailCommentsProps) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const createCommentMutation = useMutation({
    ...POST_MUTATION_OPTIONS.CREATE_COMMENT(),
    onSuccess: () => {
      setComment('');

      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.COMMENTS_ALL(postId),
        }),
        queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.DETAIL(postId),
        }),
      ]);
    },
  });

  const handleCommentSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = comment.trim();

    if (!content || createCommentMutation.isPending) {
      return;
    }

    createCommentMutation.mutate({
      postId,
      body: { content },
    });
  };

  const handleCommentChange = (value: string) => {
    if (createCommentMutation.isError) {
      createCommentMutation.reset();
    }

    setComment(value);
  };

  return (
    <>
      <PostDetailCommentSection
        viewCount={viewCount}
        commentCount={commentCount}
        comments={comments}
      />
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-107.5 -translate-x-1/2 border-t border-gray-100 bg-white">
        {createCommentMutation.isError && (
          <p
            className="text-caption-r-12 text-error px-4 pt-2"
            id="comment-submit-error"
            role="alert"
          >
            댓글을 등록하지 못했습니다. 다시 시도해 주세요.
          </p>
        )}
        <BottomActionBar
          aria-busy={createCommentMutation.isPending}
          inputProps={{
            'aria-describedby': createCommentMutation.isError
              ? 'comment-submit-error'
              : undefined,
            'aria-invalid': createCommentMutation.isError,
            disabled: createCommentMutation.isPending,
            maxLength: 100,
          }}
          submitDisabled={!comment.trim() || createCommentMutation.isPending}
          value={comment}
          onSubmit={handleCommentSubmit}
          onValueChange={handleCommentChange}
        />
      </div>
    </>
  );
};
