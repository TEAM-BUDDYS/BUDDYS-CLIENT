'use client';

import { cn } from '@/lib/cn';

interface TabItem {
  label: string;
  value: string;
}

interface TabProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
}

export const Tab = ({ items, value, onChange }: TabProps) => {
  return (
    <div className="flex w-full" role="tablist">
      {items.map((item) => {
        const isSelected = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              'text-body-sb-15 flex-1 border-b-[3px] px-17.5 py-4.5 active:bg-gray-50',
              isSelected
                ? 'border-b-gray-800 text-gray-800'
                : 'border-transparent text-gray-200',
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
