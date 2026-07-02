'use client';
import { cn } from '@/lib/cn';

interface TabProps {
  value: TabValue;
  onChange: (value: TabValue) => void;
}

const TAB_ITEMS = [
  { label: '게시물', value: 'posts' },
  { label: '코스', value: 'course' },
] as const;

export type TabValue = (typeof TAB_ITEMS)[number]['value'];

export const Tab = ({ value, onChange }: TabProps) => {
  return (
    <div className="flex w-full" role="tablist">
      {TAB_ITEMS.map((item) => {
        const isSelected = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              'text-body-sb-15 flex-1 border-b-[3px] px-17.5 py-4.5',
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
