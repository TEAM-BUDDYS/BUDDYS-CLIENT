export interface CommentAuthor {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
}

export interface PostDetailComment {
  commentId: number;
  content: string;
  author: CommentAuthor;
  createdAt: string;
}
