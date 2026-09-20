import { cn } from '@/lib/cn';

const COURSE_TAB_ITEMS = [
  { label: '근처 장소', value: 'nearby' },
  { label: '맞춤 탐색', value: 'recommend' },
] as const;

export type CourseTabValue = (typeof COURSE_TAB_ITEMS)[number]['value'];

interface CourseTabProps {
  value: CourseTabValue;
  onChange: (value: CourseTabValue) => void;
}

export const CourseTab = ({ value, onChange }: CourseTabProps) => {
  return (
    <div className="flex w-full rounded-xl bg-gray-50 p-1" role="tablist">
      {COURSE_TAB_ITEMS.map((item) => {
        const isSelected = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              'text-body-sb-14 flex flex-1 items-center justify-center rounded-xl py-1.5 transition-colors',
              isSelected ? 'bg-white text-gray-800' : 'text-gray-500',
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
