import SettingsMenuItem from '@domains/profile/components/settings-menu-item/settings-menu-item';

const MENU_ITEMS: { label: string; href: string }[] = [
  { label: '프로필 수정', href: '/settings/profile' },
  { label: '알람 설정', href: '/settings/alarm' },
  { label: '비밀번호 변경', href: '/settings/password' },
  { label: '개인정보 처리방침', href: '/settings/privacy' },
  { label: '이용약관', href: '/settings/terms' },
];

export default function TestPage() {
  return (
    <main className="flex flex-col items-start gap-4 p-6">
      <h1 className="text-title-sb-18">SettingsMenuItem 테스트</h1>
      <div className="flex w-full flex-col">
        {MENU_ITEMS.map((item) => (
          <SettingsMenuItem
            key={item.href}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </main>
  );
}
