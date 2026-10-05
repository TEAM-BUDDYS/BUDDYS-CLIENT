'use client';

import { useState } from 'react';

import { SettingsMenuItem } from '@/domains/profile/components/settings-menu-item/settings-menu-item';
import {
  SETTINGS_CONFIRM_MODAL_CONTENT,
  type SettingsConfirmType,
} from '@/domains/profile/model/settings';
import { Button, Modal } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config/routes';

const SETTINGS_MENU_ITEMS = [
  { label: '학교 이메일 인증', href: ROUTES.VERIFICATION.UNIVERSITY_EMAIL },
  { label: '파견교 서류 인증', href: ROUTES.VERIFICATION.EXCHANGE_DOCUMENT },
  { label: '개인정보 처리방침', href: ROUTES.PROFILE.PRIVACY_POLICY },
  { label: '이용약관', href: ROUTES.PROFILE.TERMS },
] as const;

export const SettingsContent = () => {
  const [confirmType, setConfirmType] = useState<SettingsConfirmType | null>(
    null,
  );

  const confirmContent =
    confirmType === null ? null : SETTINGS_CONFIRM_MODAL_CONTENT[confirmType];

  return (
    <>
      <nav>
        <ul className="flex flex-col">
          {SETTINGS_MENU_ITEMS.map((item) => (
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
          onConfirm={() => setConfirmType(null)}
        />
      )}
    </>
  );
};
