import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui';

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
      <CommonImage
        src={author.profileImageUrl}
        alt={`${author.nickname} 프로필 이미지`}
        width={40}
        height={40}
        unoptimized
        radius="rounded-full"
        className="size-10"
      />
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
