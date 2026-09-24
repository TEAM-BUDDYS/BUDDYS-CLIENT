'use client';

import { useState } from 'react';

import {
  BellIcon,
  DangerIcon,
  ForbidIcon,
  NoticeIcon,
  TrashIcon,
} from '@/shared/components/icons';
import { BottomSheet, Button, Modal } from '@/shared/components/ui';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';

import { CHAT_CONFIRM_MODAL_CONTENT } from '../../model/chat-room-menu';

type ConfirmType = 'block' | 'report' | null;
export type ChatBottomSheetAction =
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

  const confirmContent =
    confirmType === null ? null : CHAT_CONFIRM_MODAL_CONTENT[confirmType];

  const handleAction = (action: ChatBottomSheetAction) => {
    onAction?.(action);
  };

  // 차단 메뉴 선택
  const handleBlockClick = () => {
    onClose();
    setConfirmType('block');
  };

  // 신고 메뉴 선택
  const handleReportClick = () => {
    onClose();
    setConfirmType('report');
  };

  // 알림 메뉴 선택 — 준비 중
  const handleNotificationClick = () => {
    onClose();
    setIsComingSoonModalOpen(true);
  };

  // 나가기 메뉴 선택 — 준비 중
  const handleLeaveChatClick = () => {
    onClose();
    setIsComingSoonModalOpen(true);
  };

  const handleConfirm = () => {
    if (!confirmType) {
      return;
    }

    handleAction(confirmType);
    setConfirmType(null);
  };

  const handleConfirmClose = () => {
    setConfirmType(null);
  };

  const handleClose = () => {
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
      onClick: handleReportClick,
    },
    {
      label: isNotificationOn ? '알림 끄기' : '알림 켜기',
      icon: isNotificationOn ? (
        <NoticeIcon />
      ) : (
        <BellIcon className="opacity-60" />
      ),
      onClick: handleNotificationClick,
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
      {confirmContent && (
        <Modal
          type="confirm"
          open={true}
          title={confirmContent.title}
          description={confirmContent.description}
          cancelLabel="닫기"
          confirmLabel={confirmContent.confirmLabel}
          onClose={handleConfirmClose}
          onConfirm={handleConfirm}
        />
      )}
      <ComingSoonModal
        open={isComingSoonModalOpen}
        onClose={() => setIsComingSoonModalOpen(false)}
      />
    </>
  );
};
