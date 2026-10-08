import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { BookmarkIcon, MessageIcon } from '@/shared/components/icons';
import { CommentItem } from '@/shared/components/ui/comment-item/comment-item';
import { EmptyState } from '@/shared/components/ui/empty-state/empty-state';

export interface CommentSectionItem {
  commentId: number;
  writerId: number;
  writerName: string;
  writerProfileImageUrl?: string | null;
  content: string;
  createdAt?: string;
  timeAgo?: string;
}

interface CommentSectionProps extends HTMLAttributes<HTMLElement> {
  bookmarkCount?: number;
  commentCount: number;
  comments: CommentSectionItem[];
  viewCount: number;
  viewerUserId: number | null;
}

export const CommentSection = ({
  bookmarkCount,
  commentCount,
  comments,
  viewCount,
  viewerUserId,
  className,
  ...props
}: CommentSectionProps) => {
  return (
    <section className={cn('flex w-full flex-col gap-6', className)} {...props}>
      <div className="flex items-center gap-3">
        <span className="text-body-r-14 text-gray-800">조회 {viewCount}</span>
        <span className="flex items-center gap-1">
          <MessageIcon className="size-4 text-gray-500" />
          <span className="text-body-r-14 text-gray-800">{commentCount}</span>
        </span>
        {bookmarkCount !== undefined && (
          <span className="flex items-center gap-1">
            <BookmarkIcon className="size-4 text-gray-500" />
            <span className="text-body-r-14 text-gray-800">
              {bookmarkCount}
            </span>
          </span>
        )}
      </div>

      {comments.length === 0 ? (
        <EmptyState
          title="아직 작성된 댓글이 없어요"
          description="첫 댓글을 남겨보세요"
          imageWidth={120}
          imageHeight={96}
          className="py-8"
        />
      ) : (
        <ul className="flex flex-col gap-6">
          {comments.map((comment) => (
            <li key={comment.commentId}>
              <CommentItem
                content={comment.content}
                writerId={comment.writerId}
                writerName={comment.writerName}
                profileImageUrl={comment.writerProfileImageUrl}
                viewerUserId={viewerUserId}
                createdAt={comment.createdAt}
                timeAgo={comment.timeAgo}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
