'use client';

import { useState } from 'react';

import { SettingsMenuItem } from '@/domains/profile/components/settings-menu-item/settings-menu-item';
import { Header } from '@/shared/components/layout';
import { Button } from '@/shared/components/ui';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';

const SETTINGS_MENU_ITEMS = [
  { label: '프로필 수정' },
  { label: '알림 설정' },
  { label: '비밀번호 변경' },
  { label: '개인정보 처리방침' },
  { label: '이용약관' },
] as const;

export default function SettingsPage() {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <main className="flex min-h-dvh flex-col">
      <Header content="설정" contentAlign="center" hasBackButton />

      <nav>
        <ul className="flex flex-col">
          {SETTINGS_MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <SettingsMenuItem
                label={item.label}
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
    </main>
  );
}
