import Link from 'next/link';

import { ChevronRightIcon } from '@/shared/components/icons';

interface SettingsMenuItemProps {
  label: string;
  href: string;
}

export const SettingsMenuItem = ({ label, href }: SettingsMenuItemProps) => {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-5.5"
    >
      <span className="text-body-sb-16 text-gray-800">{label}</span>
      <ChevronRightIcon className="size-6 text-gray-200" />
    </Link>
  );
};
