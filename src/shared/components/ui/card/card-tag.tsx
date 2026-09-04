import { cn } from '@/lib/cn';
import { FilledLocationIcon } from '@/shared/components/icons';

export type RecruitmentStatus = 'RECRUITING' | 'COMPLETED';

interface PostStatusTagProps {
  status: RecruitmentStatus;
}

const POST_STATUS_LABEL = {
  RECRUITING: '모집중',
  COMPLETED: '모집완료',
} as const;

export const PostStatusTag = ({ status }: PostStatusTagProps) => {
  return (
    <span
      className={cn(
        'text-caption-m-10 inline-flex w-fit rounded px-2 py-0.75 text-white',
        status === 'RECRUITING' && 'bg-gray-800',
        status === 'COMPLETED' && 'bg-gray-300',
      )}
    >
      {POST_STATUS_LABEL[status]}
    </span>
  );
};

interface TagProps {
  value: string;
}

export const Tag = ({ value }: TagProps) => {
  return (
    <span className="text-caption-m-10 inline-flex w-fit items-center gap-0.5 rounded bg-gray-50 px-1.5 py-0.75 whitespace-nowrap text-gray-500">
      <FilledLocationIcon className="size-3 text-gray-500" />
      {value}
    </span>
  );
};
