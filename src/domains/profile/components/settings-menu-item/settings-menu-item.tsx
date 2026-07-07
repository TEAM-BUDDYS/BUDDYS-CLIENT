import Link from 'next/link';

import { ChevronRightIcon } from '@/shared/components/icons';

interface SettingsMenuItemProps {
  label: string;
  href: string;
}

export default function SettingsMenuItem({
  label,
  href,
}: SettingsMenuItemProps) {
  return (
    <Link href={href} className="flex w-full border-b border-gray-100 py-3">
      <div className="flex w-full items-center justify-between">
        <span className="text-body-sb-16 text-gray-800">{label}</span>
        <ChevronRightIcon className="size-6 text-gray-300" />
      </div>
    </Link>
  );
}

/**
 * 사용 예시
 *
 * const menuItems: { label: string; href: string }[] = [
 *   { label: "프로필 수정", href: "/settings/profile" },
 *   { label: "알람 설정", href: "/settings/alarm" },
 *   { label: "비밀번호 변경", href: "/settings/password" },
 *   { label: "개인정보 처리방침", href: "/settings/privacy" },
 *   { label: "이용약관", href: "/settings/terms" },
 * ];
 *
 * <div className="flex flex-col">
 *   {menuItems.map((item) => (
 *     <SettingsMenuItem key={item.href} label={item.label} href={item.href} />
 *   ))}
 * </div>
 */
