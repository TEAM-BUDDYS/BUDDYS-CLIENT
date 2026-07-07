'use client';

import { useId } from 'react';

import { CheckCircleIcon, SandglassIcon } from '@shared/components/icons';
import { BottomSheet } from '@shared/components/ui/bottom-sheet/bottom-sheet';
import { Button } from '@shared/components/ui/button/button';

export type PostRecruitmentStatusTypes = 'recruiting' | 'completed';

interface PostRecruitmentStatusBottomSheetProps {
  open: boolean;
  value?: PostRecruitmentStatusTypes;
  onClose: () => void;
  onSelect: (status: PostRecruitmentStatusTypes) => void;
}

const POST_RECRUITMENT_STATUS_OPTIONS = [
  {
    key: 'recruiting',
    label: '모집 중',
    icon: <SandglassIcon />,
  },
  {
    key: 'completed',
    label: '모집 완료',
    icon: <CheckCircleIcon />,
  },
] as const;

export const PostRecruitmentStatusBottomSheet = ({
  open,
  value,
  onClose,
  onSelect,
}: PostRecruitmentStatusBottomSheetProps) => {
  const titleId = useId();

  const handleStatusClick = (status: PostRecruitmentStatusTypes) => {
    onSelect(status);
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <BottomSheet
      ariaLabelledBy={titleId}
      className="px-4 pb-8.5"
      open
      onClose={onClose}
    >
      <h2 className="sr-only" id={titleId}>
        모집 상태 선택
      </h2>
      <div className="mt-1.5 flex flex-col">
        {POST_RECRUITMENT_STATUS_OPTIONS.map((option, index) => (
          <Button
            key={option.key}
            align="left"
            aria-pressed={value === option.key}
            className={
              index === 0
                ? 'h-13 flex-none rounded-b-none text-gray-800'
                : 'h-13 flex-none rounded-t-none text-gray-800'
            }
            icon={option.icon}
            type="button"
            variant="neutral"
            onClick={() => handleStatusClick(option.key)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <Button className="mt-5.5 flex-none" type="button" onClick={onClose}>
        닫기
      </Button>
    </BottomSheet>
  );
};
