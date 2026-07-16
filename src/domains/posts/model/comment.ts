interface PostDetailCommentCandidate {
  commentId?: number;
  writerName?: string;
  profileImageUrl?: string | null;
  content?: string;
  createdAt?: string;
  timeAgo?: string;
}

export interface PostDetailComment {
  commentId: number;
  writerName: string;
  profileImageUrl?: string | null;
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
    (comment.profileImageUrl === undefined ||
      comment.profileImageUrl === null ||
      typeof comment.profileImageUrl === 'string') &&
    typeof comment.content === 'string'
  );
};
