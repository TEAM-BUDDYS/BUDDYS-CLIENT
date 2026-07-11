import Link from 'next/link';

import { ChevronRightIcon } from '@/shared/components/icons';

interface SettingsMenuItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export const SettingsMenuItem = ({
  label,
  href,
  onClick,
}: SettingsMenuItemProps) => {
  const className =
    'flex w-full items-center justify-between border-b border-gray-100 px-4 py-5.5';

  if (href) {
    return (
      <Link href={href} className={className}>
        <span className="text-body-sb-16 text-gray-800">{label}</span>
        <ChevronRightIcon className="size-6 text-gray-200" />
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <span className="text-body-sb-16 text-gray-800">{label}</span>
      <ChevronRightIcon className="size-6 text-gray-200" />
    </button>
  );
};
