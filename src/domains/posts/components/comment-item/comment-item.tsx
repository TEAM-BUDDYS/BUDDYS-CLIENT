import Link from 'next/link';
import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { formatRelativeTime } from '@/shared/utils/format-relative-time';

interface CommentItemProps extends HTMLAttributes<HTMLElement> {
  content: string;
  writerId: number;
  writerName: string;
  profileImageUrl?: string | null;
  viewerUserId: number | null;
  createdAt?: string;
  timeAgo?: string;
}

export const CommentItem = ({
  content,
  writerId,
  writerName,
  profileImageUrl,
  viewerUserId,
  createdAt,
  timeAgo,
  className,
  ...props
}: CommentItemProps) => {
  const timeLabel = timeAgo ?? (createdAt ? formatRelativeTime(createdAt) : '');
  const profileImageSrc = profileImageUrl || defaultProfileImage;
  const profileHref =
    writerId === viewerUserId
      ? ROUTES.PROFILE.ROOT
      : ROUTES.PROFILE.DETAIL(writerId);

  return (
    <article
      className={cn('flex w-full items-start gap-3', className)}
      {...props}
    >
      <Link
        href={profileHref}
        aria-label={`${writerName} 프로필로 이동`}
        className="shrink-0 rounded-full"
      >
        <CommonImage
          src={profileImageSrc}
          alt=""
          width={40}
          height={40}
          radius="rounded-full"
          className="size-10 border border-gray-100"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-body-sb-15 text-gray-800">{writerName}</span>
          {timeLabel && (
            <span className="text-body-m-15 text-gray-500">{timeLabel}</span>
          )}
        </div>
        <p className="text-body-m-15 text-gray-800">{content}</p>
      </div>
    </article>
  );
};
