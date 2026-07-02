import { cn } from '@/lib/cn';

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
        'text-caption-m-12 rounded px-2 py-0.5',
        status === 'RECRUITING' && 'bg-badge text-white',
        status === 'COMPLETED' && 'bg-gray-50 text-gray-200',
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
    <span className="text-mint-300 bg-mint-100 text-caption-m-12 rounded px-2 py-0.5">
      {value}
    </span>
  );
};
