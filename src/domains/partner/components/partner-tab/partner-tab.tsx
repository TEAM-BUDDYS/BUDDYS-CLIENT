'use client';

import { cn } from '@/lib/cn';

export type PartnerTabValue = 'now' | 'recommend';

interface PartnerTabItem {
  label: string;
  value: PartnerTabValue;
}

const PARTNER_TAB_ITEMS: PartnerTabItem[] = [
  { label: 'NOW', value: 'now' },
  { label: '추천 동행', value: 'recommend' },
];

interface PartnerTabProps {
  value: PartnerTabValue;
  onChange: (value: PartnerTabValue) => void;
}

export const PartnerTab = ({ value, onChange }: PartnerTabProps) => {
  return (
    <div className="flex w-full border-b border-gray-200 px-4" role="tablist">
      {PARTNER_TAB_ITEMS.map((item) => {
        const isSelected = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              'text-body-sb-16 flex-1 translate-y-px border-b-2 border-transparent py-2.5',
              isSelected ? 'border-b-mint-300 text-mint-300' : 'text-gray-200',
            )}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
