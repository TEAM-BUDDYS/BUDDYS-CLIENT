'use client';

import { useState } from 'react';

import {
  BellIcon,
  DangerIcon,
  ForbidIcon,
  NoticeIcon,
  TrashIcon,
} from '@/shared/components/icons';
import { BottomSheet, Button } from '@/shared/components/ui';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';

type ConfirmType = 'block' | 'leave' | null;
type ChatBottomSheetAction =
  | 'report'
  | 'toggleNotification'
  | 'block'
  | 'leave';

interface BottomSheetChatProps {
  open: boolean;
  isNotificationOn?: boolean;
  onClose: () => void;
  onAction?: (action: ChatBottomSheetAction) => void;
}

export const BottomSheetChat = ({
  open,
  isNotificationOn = true,
  onClose,
  onAction,
}: BottomSheetChatProps) => {
  const [confirmType, setConfirmType] = useState<ConfirmType>(null);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);

  // TODO: 차단/나가기 확인 모달 연결 후 true로 변경
  const isConfirmModalEnabled = false;

  const handleAction = (action: ChatBottomSheetAction) => {
    onClose();

    if (onAction) {
      onAction(action);
      return;
    }

    setIsComingSoonModalOpen(true);
  };

  const handleBlockClick = () => {
    if (!isConfirmModalEnabled) {
      handleAction('block');
      return;
    }

    setConfirmType('block');
  };

  const handleLeaveChatClick = () => {
    if (!isConfirmModalEnabled) {
      handleAction('leave');
      return;
    }

    setConfirmType('leave');
  };

  const handleConfirm = () => {
    if (!confirmType) {
      return;
    }

    handleAction(confirmType);
    setConfirmType(null);
  };

  const handleClose = () => {
    setConfirmType(null);
    onClose();
  };

  const menuItems = [
    {
      label: '차단하기',
      icon: <ForbidIcon />,
      onClick: handleBlockClick,
    },
    {
      label: '신고하기',
      icon: <DangerIcon />,
      onClick: () => handleAction('report'),
    },
    {
      label: isNotificationOn ? '알림 끄기' : '알림 켜기',
      icon: isNotificationOn ? <NoticeIcon /> : <BellIcon />,
      onClick: () => handleAction('toggleNotification'),
    },
  ];

  return (
    <>
      <BottomSheet open={open} onClose={handleClose} ariaLabel="채팅방 옵션">
        <div className="mx-4 mb-8.5 flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl [&>button]:rounded-none">
            {menuItems.map(({ label, icon, onClick }) => (
              <Button
                key={label}
                variant="neutral"
                align="left"
                icon={icon}
                onClick={onClick}
              >
                {label}
              </Button>
            ))}
          </div>

          <Button
            variant="neutral"
            align="left"
            icon={<TrashIcon />}
            className="text-error"
            onClick={handleLeaveChatClick}
          >
            채팅방 나가기
          </Button>

          <Button onClick={handleClose}>닫기</Button>
        </div>
      </BottomSheet>
      {/* 
        confirmType === 'block' -> 차단 확인 모달
        confirmType === 'leave' -> 채팅방 나가기 확인 모달
        확인 버튼 onClick -> handleConfirm
        취소 버튼 onClick -> setConfirmType(null)
      */}
      <ComingSoonModal
        open={isComingSoonModalOpen}
        onClose={() => setIsComingSoonModalOpen(false)}
      />
    </>
  );
};
