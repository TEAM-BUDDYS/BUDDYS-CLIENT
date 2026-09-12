import Link from 'next/link';

import { cn } from '@/lib/cn';
import { CourseIcon, LocationIcon } from '@/shared/components/icons';
import { ROUTES } from '@/shared/config';

interface WriteFloatingMenuProps {
  className?: string;
}

const WRITE_MENU_ITEMS = [
  {
    label: '동행 모집하기',
    icon: <LocationIcon />,
    href: ROUTES.POST.ROOT, // TODO: 동행 글쓰기 라우트가 정해지면 교체
  },
  {
    label: '코스 기록하기',
    icon: <CourseIcon />,
    href: ROUTES.POST.ROOT, // TODO: 코스 글쓰기 라우트가 정해지면 교체
  },
];

export const WriteFloatingMenu = ({ className }: WriteFloatingMenuProps) => {
  return (
    <ul
      className={cn(
        'pointer-events-auto mb-2 flex w-fit flex-col gap-2 rounded-[20px] bg-white p-2',
        className,
      )}
    >
      {WRITE_MENU_ITEMS.map(({ label, icon, href }) => (
        <li key={label}>
          <Link
            href={href}
            className="text-body-m-15 flex h-12 items-center gap-3 rounded-xl px-4 text-gray-800 active:bg-gray-50"
          >
            <span
              aria-hidden
              className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-full"
            >
              {icon}
            </span>
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
