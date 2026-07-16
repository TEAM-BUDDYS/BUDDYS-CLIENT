interface PostDetailCommentCandidate {
  commentId?: number;
  writerId?: number;
  writerName?: string;
  writerProfileImageUrl?: string | null;
  content?: string;
  createdAt?: string;
  timeAgo?: string;
}

export interface PostDetailComment {
  commentId: number;
  writerId: number;
  writerName: string;
  writerProfileImageUrl?: string | null;
  content: string;
  createdAt?: string;
  timeAgo?: string;
}

export const hasPostDetailCommentFields = (
  comment: PostDetailCommentCandidate,
): comment is PostDetailComment => {
  return (
    typeof comment.commentId === 'number' &&
    typeof comment.writerId === 'number' &&
    typeof comment.writerName === 'string' &&
    typeof comment.content === 'string'
  );
};
