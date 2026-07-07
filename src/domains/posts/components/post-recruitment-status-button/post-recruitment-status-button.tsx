import type { ButtonHTMLAttributes } from 'react';

import type { PostRecruitmentStatusTypes } from '@/domains/posts/model/post-recruitment-status';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from '@/shared/components/icons';

interface PostRecruitmentStatusButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  status?: PostRecruitmentStatusTypes;
}

const POST_RECRUITMENT_STATUS_LABELS: Record<
  PostRecruitmentStatusTypes,
  string
> = {
  recruiting: '모집 중',
  completed: '모집 완료',
};

export const PostRecruitmentStatusButton = ({
  status = 'recruiting',
  className,
  type = 'button',
  ...props
}: PostRecruitmentStatusButtonProps) => {
  const isCompleted = status === 'completed';

  return (
    <button
      className={cn(
        'text-body-sb-14 inline-flex items-center justify-center gap-2 rounded-lg border py-2.5 pr-2 pl-3',
        isCompleted
          ? 'border-mint-300 bg-mint-300 text-white'
          : 'border-gray-200 bg-white text-gray-800',
        className,
      )}
      type={type}
      {...props}
    >
      <span>{POST_RECRUITMENT_STATUS_LABELS[status]}</span>
      <ChevronDownIcon
        className={cn(
          'size-6 shrink-0',
          isCompleted ? 'text-white' : 'text-gray-200',
        )}
      />
    </button>
  );
};
