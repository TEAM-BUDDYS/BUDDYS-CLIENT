import type { components } from '@/types/schema';

type PostDetailCommentCandidate = components['schemas']['CommentResponse'];

export type PostDetailComment = PostDetailCommentCandidate & {
  commentId: number;
  writerId: number;
  writerName: string;
  writerProfileImageUrl?: string | null;
  content: string;
};

export const hasPostDetailCommentFields = (
  comment: PostDetailCommentCandidate,
): comment is PostDetailComment => {
  return (
    typeof comment.commentId === 'number' &&
    typeof comment.writerId === 'number' &&
    typeof comment.writerName === 'string' &&
    (comment.writerProfileImageUrl === undefined ||
      comment.writerProfileImageUrl === null ||
      typeof comment.writerProfileImageUrl === 'string') &&
    typeof comment.content === 'string'
  );
};
