import type { HTMLAttributes } from 'react';

import { CommentItem } from '@/domains/posts/components/comment-item/comment-item';
import type { CommentAuthor } from '@/domains/posts/model/comment';
import { cn } from '@/lib/cn';
import { MessageIcon } from '@/shared/components/icons';

export interface PostDetailComment {
  commentId: number;
  content: string;
  author: CommentAuthor;
  createdAt: string;
}

interface PostDetailCommentSectionProps extends HTMLAttributes<HTMLElement> {
  viewCount: number;
  commentCount: number;
  comments: PostDetailComment[];
}

export const PostDetailCommentSection = ({
  viewCount,
  commentCount,
  comments,
  className,
  ...props
}: PostDetailCommentSectionProps) => {
  return (
    <section className={cn('flex w-full flex-col gap-6', className)} {...props}>
      <div className="flex items-center gap-4">
        <span className="text-body-r-14 text-gray-800">조회 {viewCount}</span>
        <div className="flex items-center gap-2">
          <MessageIcon className="size-4 text-gray-500" />
          <span className="text-body-r-14 text-gray-800">{commentCount}</span>
        </div>
      </div>

      <ul className="flex flex-col gap-6">
        {comments.map((comment) => (
          <li key={comment.commentId}>
            <CommentItem
              content={comment.content}
              author={comment.author}
              createdAt={comment.createdAt}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
