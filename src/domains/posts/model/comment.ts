interface PostDetailCommentCandidate {
  commentId?: number;
  writerName?: string;
  content?: string;
  createdAt?: string;
  timeAgo?: string;
}

export interface PostDetailComment {
  commentId: number;
  writerName: string;
  content: string;
  createdAt?: string;
  timeAgo?: string;
}

export const hasPostDetailCommentFields = (
  comment: PostDetailCommentCandidate,
): comment is PostDetailComment => {
  return (
    typeof comment.commentId === 'number' &&
    typeof comment.writerName === 'string' &&
    typeof comment.content === 'string'
  );
};
