'use client';

import { cn } from '@/lib/cn';

const PARTNER_TAB_ITEMS = [
  { label: 'NOW', value: 'now' },
  { label: '추천 동행', value: 'recommend' },
] as const;
export type PartnerTabValue = (typeof PARTNER_TAB_ITEMS)[number]['value'];

interface PartnerTabProps {
  value: PartnerTabValue;
  onChange: (value: PartnerTabValue) => void;
}

export const PartnerTab = ({ value, onChange }: PartnerTabProps) => {
  return (
    <div
      className="flex h-11 w-full border-b border-gray-100 px-4"
      role="tablist"
    >
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
