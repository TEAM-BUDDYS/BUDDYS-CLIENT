import type { components } from '@/types/schema';

type PostDetailCommentCandidate = components['schemas']['CommentResponse'];

export type PostDetailComment = PostDetailCommentCandidate & {
  commentId: number;
  writerName: string;
  content: string;
};

export const hasPostDetailCommentFields = (
  comment: PostDetailCommentCandidate,
): comment is PostDetailComment => {
  return (
    typeof comment.commentId === 'number' &&
    typeof comment.writerName === 'string' &&
    (comment.writerProfileImageUrl === undefined ||
      comment.writerProfileImageUrl === null ||
      typeof comment.writerProfileImageUrl === 'string') &&
    typeof comment.content === 'string'
  );
};
