'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { SettingsMenuItem } from '@/domains/profile/components/settings-menu-item/settings-menu-item';
import {
  SETTINGS_CONFIRM_MODAL_CONTENT,
  type SettingsConfirmType,
} from '@/domains/profile/model/settings';
import { Button, Modal, useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config/routes';

import { PROFILE_QUERY_OPTIONS, requestWithdraw } from '../../api/query';

const POLICY_MENU_ITEMS = [
  { label: '개인정보 처리방침', href: ROUTES.PROFILE.PRIVACY_POLICY },
  { label: '이용약관', href: ROUTES.PROFILE.TERMS },
] as const;

export const SettingsContent = () => {
  const { data: profile } = useQuery(PROFILE_QUERY_OPTIONS.ME());

  const verificationMenuItems = profile
    ? [
        {
          label: '학교 이메일 인증',
          href: ROUTES.VERIFICATION.UNIVERSITY_EMAIL,
          isVisible: !profile.isUniversityEmailVerified,
        },
        {
          label: '파견교 서류 인증',
          href: ROUTES.VERIFICATION.EXCHANGE_DOCUMENT,
          isVisible: !profile.isExchangeDocumentVerified,
        },
      ].filter((item) => item.isVisible)
    : [];

  const menuItems = [...verificationMenuItems, ...POLICY_MENU_ITEMS];

  const [confirmType, setConfirmType] = useState<SettingsConfirmType | null>(
    null,
  );

  const confirmContent =
    confirmType === null ? null : SETTINGS_CONFIRM_MODAL_CONTENT[confirmType];

  const { logout, finishWithdraw } = useAuthSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleLogout = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await logout();
    } catch {
      showToast('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.', {
        variant: 'gray',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await requestWithdraw();
      finishWithdraw();
    } catch {
      showToast('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해 주세요.', {
        variant: 'gray',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav>
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li key={item.label}>
              <SettingsMenuItem label={item.label} href={item.href} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 flex flex-col items-center gap-3 px-4">
        <Button variant="secondary" onClick={() => setConfirmType('logout')}>
          로그아웃
        </Button>

        <button
          type="button"
          className="text-body-r-14 text-gray-500"
          onClick={() => setConfirmType('withdraw')}
        >
          회원 탈퇴
        </button>
      </div>

      {confirmContent && (
        <Modal
          type="confirm"
          open={true}
          title={confirmContent.title}
          description={confirmContent.description}
          cancelLabel="닫기"
          confirmLabel={confirmContent.confirmLabel}
          onClose={() => setConfirmType(null)}
          onConfirm={() => {
            if (confirmType === 'logout') {
              void handleLogout();
              return;
            }

            if (confirmType === 'withdraw') {
              void handleWithdraw();
              return;
            }
          }}
        />
      )}
    </>
  );
};
