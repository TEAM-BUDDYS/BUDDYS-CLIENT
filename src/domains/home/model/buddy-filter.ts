import type { SVGProps } from 'react';

import {
  AgeIcon,
  CertificationIcon,
  CompanionIcon,
  CountryIcon,
  DateIcon,
  GenderIcon,
} from '@/shared/components/icons';

export type BuddyFilterKey =
  | 'country'
  | 'date'
  | 'age'
  | 'gender'
  | 'buddyType'
  | 'verification';

export type BuddyFilterIcon = React.ComponentType<SVGProps<SVGSVGElement>>;

export const buddyFilterItems = [
  { key: 'country', label: '국가', icon: CountryIcon },
  { key: 'date', label: '날짜', icon: DateIcon },
  { key: 'age', label: '나이', icon: AgeIcon },
  { key: 'gender', label: '성별', icon: GenderIcon },
  { key: 'buddyType', label: '동행 유형', icon: CompanionIcon },
  { key: 'verification', label: '인증 상태', icon: CertificationIcon },
] satisfies {
  key: BuddyFilterKey;
  label: string;
  icon?: BuddyFilterIcon;
}[];
