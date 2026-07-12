import type { HTMLAttributes } from 'react';

import type { CommentAuthor } from '@/domains/posts/model/comment';
import { cn } from '@/lib/cn';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';

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
  const profileImageSrc = author.profileImageUrl ?? defaultProfileImage;

  return (
    <article
      className={cn('flex w-full items-start gap-3', className)}
      {...props}
    >
      <CommonImage
        src={profileImageSrc}
        alt={`${author.nickname} 프로필 이미지`}
        width={40}
        height={40}
        unoptimized={Boolean(author.profileImageUrl)}
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
