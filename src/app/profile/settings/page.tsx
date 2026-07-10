import { SettingsMenuItem } from '@/domains/profile/components/settings-menu-item/settings-menu-item';
import { Header } from '@/shared/components/layout';
import { Button } from '@/shared/components/ui';

const SETTINGS_MENU_ITEMS = [
  { label: '프로필 수정', href: '/profile/edit' },
  { label: '알림 설정', href: '/profile/settings/notification' },
  { label: '비밀번호 변경', href: '/profile/settings/password' },
  { label: '개인정보 처리방침', href: '/profile/settings/privacy-policy' },
  { label: '이용약관', href: '/profile/settings/terms' },
] as const;

export default function SettingsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header content="설정" contentAlign="center" hasBackButton />

      <nav className="flex flex-col">
        {SETTINGS_MENU_ITEMS.map((item) => (
          <SettingsMenuItem
            key={item.href}
            label={item.label}
            href={item.href}
          />
        ))}
      </nav>

      <div className="mt-6 flex flex-col items-center gap-3 px-4">
        <Button variant="secondary">로그아웃</Button>

        <button type="button" className="text-body-r-14 text-gray-500">
          회원 탈퇴
        </button>
      </div>
    </main>
  );
}
