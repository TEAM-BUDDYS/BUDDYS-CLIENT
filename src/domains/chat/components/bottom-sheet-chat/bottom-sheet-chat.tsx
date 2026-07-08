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

type ConfirmType = 'block' | 'leave' | null;

interface BottomSheetChatProps {
  open: boolean;
  isNotificationOn: boolean;
  onClose: () => void; // 닫기
  onReport: () => void; // 신고하기
  onToggleNotification: () => void;
  onConfirmBlock: () => void; // 차단하기
  onConfirmLeaveChat: () => void; // 채팅방 나가기
}

export const BottomSheetChat = ({
  open,
  isNotificationOn = true,
  onClose,
  onReport,
  onToggleNotification,
  onConfirmBlock,
  onConfirmLeaveChat,
}: BottomSheetChatProps) => {
  const [confirmType, setConfirmType] = useState<ConfirmType>(null);

  const handleBlockClick = () => {
    setConfirmType('block');
  };

  const handleLeaveChatClick = () => {
    setConfirmType('leave');
  };

  const handleConfirm = () => {
    if (confirmType === 'block') {
      onConfirmBlock();
    }

    if (confirmType === 'leave') {
      onConfirmLeaveChat();
    }

    setConfirmType(null);
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
      onClick: onReport,
    },
    {
      label: isNotificationOn ? '알림 끄기' : '알림 켜기',
      icon: isNotificationOn ? <NoticeIcon /> : <BellIcon />,
      onClick: onToggleNotification,
    },
  ];

  return (
    <>
      <BottomSheet open={open} onClose={onClose}>
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

          <Button onClick={onClose}>닫기</Button>
        </div>
      </BottomSheet>

      {/* TODO: 공통 Modal 컴포넌트 생기면 여기서 confirmType에 따라 모달 띄우기 */}
      {/* 
        confirmType === 'block' -> 차단 확인 모달
        confirmType === 'leave' -> 채팅방 나가기 확인 모달
        확인 버튼 onClick -> handleConfirm
        취소 버튼 onClick -> setConfirmType(null)
      */}
    </>
  );
};
