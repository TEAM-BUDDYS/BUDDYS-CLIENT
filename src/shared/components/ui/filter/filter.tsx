'use client';

const COLORS = {
  default: {
    bg: 'bg-white',
    text: 'text-gray-800',
    border: 'border border-[color:var(--color-gray-300)]',
  },
  pressed: {
    bg: 'bg-gray-800',
    text: 'text-white',
    border: 'border border-transparent',
  },
};

type IconComponent = React.ComponentType<{ className?: string }>;

export interface FilterProps {
  label: string;
  pressed: boolean;
  onPress: () => void;
  icon?: IconComponent;
}

export const Filter = ({
  label,
  pressed,
  onPress,
  icon: Icon,
}: FilterProps) => {
  const { bg, text, border } = COLORS[pressed ? 'pressed' : 'default'];

  return (
    <button
      type="button"
      onClick={onPress}
      aria-pressed={pressed}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-[30px] py-2 pr-3 pl-3.5 ${bg} ${border}`}
    >
      {Icon && <Icon className={`size-4 ${text}`} />}
      <span className={`text-caption-m-12 ${text}`}>{label}</span>
    </button>
  );
};
