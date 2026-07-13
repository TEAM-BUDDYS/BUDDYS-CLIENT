'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement, SVGProps } from 'react';

import { cn } from '@/lib/cn';
import {
  HomeIcon,
  LocationIcon,
  MessageIcon,
  MyIcon,
} from '@/shared/components/icons';
import { ROUTES } from '@/shared/config';

interface BottomNavigationProps {
  className?: string;
}

interface BottomNavigationItem {
  key: string;
  href?: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  label: string;
}

const BOTTOM_NAVIGATION_ITEMS: BottomNavigationItem[] = [
  {
    key: 'home',
    href: ROUTES.HOME,
    icon: HomeIcon,
    label: '홈',
  },
  {
    key: 'course',
    icon: LocationIcon,
    label: '코스',
  },
  {
    key: 'chat',
    href: ROUTES.CHAT.ROOT,
    icon: MessageIcon,
    label: '채팅',
  },
  {
    key: 'profile',
    href: ROUTES.PROFILE.ROOT,
    icon: MyIcon,
    label: '프로필',
  },
];

export const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="하단 네비게이션"
      className={cn(
        'h-18 w-full rounded-t-2xl border border-gray-300/30 bg-white px-6.25 py-1',
        className,
      )}
    >
      <ul className="flex items-center justify-center gap-5.75">
        {BOTTOM_NAVIGATION_ITEMS.map(({ key, href, icon: Icon, label }) => {
          const isActive = href === pathname;
          const itemClassName = cn(
            'flex size-16 flex-col items-center justify-center gap-1',
            isActive ? 'text-gray-800' : 'text-gray-200',
          );

          return (
            <li key={key}>
              {href ? (
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={itemClassName}
                >
                  <Icon className="size-6" />
                  <span className="text-caption-r-12">{label}</span>
                </Link>
              ) : (
                <button type="button" disabled className={itemClassName}>
                  <Icon className="size-6" />
                  <span className="text-caption-r-12">{label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
