import { ComponentProps } from 'react';

import { ChevronRightIcon } from '@/shared/components/icons';

type CourseSectionHeaderProps = Pick<ComponentProps<'button'>, 'onClick'>;

export const CourseSectionHeader = ({ onClick }: CourseSectionHeaderProps) => {
  return (
    <div className="flex justify-between">
      <span className="text-body-sb-16">원하는 조건의 코스를 찾아보세요</span>
      <button
        type="button"
        className="flex items-center"
        aria-label="맞춤 코스 탐색으로 이동"
        onClick={onClick}
      >
        <ChevronRightIcon className="size-6 text-gray-500" />
      </button>
    </div>
  );
};
