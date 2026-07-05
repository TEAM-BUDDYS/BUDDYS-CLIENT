import type { HTMLAttributes } from 'react';

import { cn } from '@lib/cn';
import { ProfileIcon } from '@shared/components/icons';

interface CommentAuthor {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

interface CommentItemProps extends HTMLAttributes<HTMLElement> {
  content: string;
  author: CommentAuthor;
  createdAt: string;
}

export const CommentItem = ({
  content,
  author,
  createdAt,
  className,
  ...props
}: CommentItemProps) => {
  return (
    <article
      className={cn('flex w-full items-start gap-3', className)}
      {...props}
    >
      <ProfileIcon className="size-10 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-body-sb-15 text-gray-800">
            {author.nickname}
          </span>
          <span className="text-body-m-15 text-gray-500">{createdAt}</span>
        </div>
        <p className="text-body-m-15 text-gray-800">{content}</p>
      </div>
    </article>
  );
};
