import type { HTMLAttributes } from 'react';

import { CommentItem } from '@/domains/posts/components/comment-item/comment-item';
import type { PostDetailComment } from '@/domains/posts/model/comment';
import { cn } from '@/lib/cn';
import { MessageIcon } from '@/shared/components/icons';
import { EmptyState } from '@/shared/components/ui';

interface PostDetailCommentSectionProps extends HTMLAttributes<HTMLElement> {
  viewCount: number;
  commentCount: number;
  comments: PostDetailComment[];
  viewerUserId: number | null;
}

export const PostDetailCommentSection = ({
  viewCount,
  commentCount,
  comments,
  viewerUserId,
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
