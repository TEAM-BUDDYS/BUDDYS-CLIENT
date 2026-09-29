'use client';

import { useState } from 'react';

import { SettingsMenuItem } from '@/domains/profile/components/settings-menu-item/settings-menu-item';
import { Toggle } from '@/domains/profile/components/toggle/toggle';
import { Button } from '@/shared/components/ui';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';
import { ROUTES } from '@/shared/config/routes';

const SETTINGS_MENU_ITEMS: { label: string; href?: string }[] = [
  { label: '학교 이메일 인증' },
  { label: '파견교 서류 인증' },
  { label: '개인정보 처리방침', href: ROUTES.PROFILE.PRIVACY_POLICY },
  { label: '이용약관', href: ROUTES.PROFILE.TERMS },
];

export const SettingsContent = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  return (
    <>
      <nav>
        <ul className="flex flex-col">
          <li className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-5.5">
            <span className="text-body-sb-16 text-gray-800">알림 설정</span>
            <Toggle
              checked={isNotificationEnabled}
              onChange={setIsNotificationEnabled}
              ariaLabel="알림 설정"
            />
          </li>
          {SETTINGS_MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <SettingsMenuItem
                label={item.label}
                href={item.href}
                onClick={() => setIsComingSoonOpen(true)}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 flex flex-col items-center gap-3 px-4">
        <Button variant="secondary" onClick={() => setIsComingSoonOpen(true)}>
          로그아웃
        </Button>

        <button
          type="button"
          className="text-body-r-14 text-gray-500"
          onClick={() => setIsComingSoonOpen(true)}
        >
          회원 탈퇴
        </button>
      </div>

      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </>
  );
};
