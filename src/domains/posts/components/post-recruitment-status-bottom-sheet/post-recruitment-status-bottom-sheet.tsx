'use client';

import { useId } from 'react';

import type { PostRecruitmentStatusTypes } from '@domains/posts/model/post-recruitment-status';
import { CheckCircleLineIcon, SandglassIcon } from '@shared/components/icons';
import { BottomSheet } from '@shared/components/ui/bottom-sheet/bottom-sheet';
import { Button } from '@shared/components/ui/button/button';

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
    icon: <CheckCircleLineIcon />,
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

  return (
    <BottomSheet
      ariaLabelledBy={titleId}
      className="px-4 pb-8.5"
      open={open}
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
                ? 'rounded-b-none text-gray-800'
                : 'rounded-t-none text-gray-800'
            }
            icon={option.icon}
            variant="neutral"
            onClick={() => handleStatusClick(option.key)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <Button className="mt-5.5" onClick={onClose}>
        닫기
      </Button>
    </BottomSheet>
  );
};
