import type { ComponentProps } from 'react';

import { ChevronRightIcon } from '@/shared/components/icons';

interface CourseSectionHeaderProps {
  onClick: NonNullable<ComponentProps<'button'>['onClick']>;
  title: string;
}

export const CourseSectionHeader = ({
  title,
  onClick,
}: CourseSectionHeaderProps) => {
  return (
    <div className="flex justify-between">
      <h2 className="text-body-sb-16 text-gray-800">{title}</h2>
      <button
        type="button"
        className="flex items-center"
        aria-label={`${title} 더보기`}
        onClick={onClick}
      >
        <ChevronRightIcon className="size-6 text-gray-500" />
      </button>
    </div>
  );
};
