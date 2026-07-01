'use client';

import type { ReactElement, SVGProps } from 'react';

import { cn } from '@lib/cn';
import {
  HomeIcon,
  LocationIcon,
  MessageIcon,
  MyprofileIcon,
} from '@shared/components/icons';

interface BottomNavigationItem {
  key: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  label: string;
}

interface BottomNavigationProps {
  activeKey?: string;
  onSelect?: (key: string) => void;
}

const BOTTOM_NAVIGATION_ITEMS: BottomNavigationItem[] = [
  {
    key: 'home',
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
    icon: MessageIcon,
    label: '채팅',
  },
  {
    key: 'profile',
    icon: MyprofileIcon,
    label: '프로필',
  },
];

export const BottomNavigation = ({
  activeKey,
  onSelect,
}: BottomNavigationProps) => {
  return (
    <nav
      aria-label="하단 네비게이션"
      className="w-full rounded-t-2xl border border-gray-300/30 bg-white px-6.25 py-1"
    >
      <ul className="flex items-center justify-center gap-5.75">
        {BOTTOM_NAVIGATION_ITEMS.map(({ key, icon: Icon, label }) => {
          const isActive = key === activeKey;

          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onSelect?.(key)}
                className={cn(
                  'flex size-16 flex-col items-center justify-center gap-1',
                  isActive ? 'text-gray-800' : 'text-gray-200',
                )}
              >
                <Icon className="size-6" />
                <span className="text-caption-r-12">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
