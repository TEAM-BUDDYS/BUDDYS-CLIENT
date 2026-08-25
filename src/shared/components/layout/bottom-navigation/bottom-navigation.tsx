'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement, SVGProps } from 'react';
import { useState } from 'react';

import { cn } from '@/lib/cn';
import {
  CourseIcon,
  HomeIcon,
  LocationIcon,
  MessageIcon,
  MyIcon,
} from '@/shared/components/icons';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';
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
    key: 'companion',
    icon: LocationIcon,
    label: '동행',
  },
  {
    key: 'course',
    icon: CourseIcon,
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
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const handleComingSoonOpen = () => setIsComingSoonOpen(true);
  const handleComingSoonClose = () => setIsComingSoonOpen(false);

  return (
    <>
      <nav
        aria-label="하단 네비게이션"
        className={cn(
          'h-18 w-full rounded-t-2xl bg-white px-4 pt-1 pb-4 ring-1 ring-gray-100 ring-inset',
          className,
        )}
      >
        <ul className="flex w-full items-center justify-between">
          {BOTTOM_NAVIGATION_ITEMS.map(({ key, href, icon: Icon, label }) => {
            const isActive = href === pathname;
            const itemClassName = cn(
              'focus-visible:outline-mint-300 flex size-13 shrink-0 flex-col items-center justify-center gap-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2',
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
                    <span className="text-caption-m-10">{label}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={itemClassName}
                    onClick={handleComingSoonOpen}
                  >
                    <Icon className="size-6" />
                    <span className="text-caption-m-10">{label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={handleComingSoonClose}
      />
    </>
  );
};
