import { cn } from '@/lib/cn';

const chipSizeStyles = {
  sm: 'px-3 text-body-r-14',
  md: 'px-4 text-body-m-15',
};

type ChipSize = 'sm' | 'md';

const chipBase =
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[30px] border border-gray-200 bg-white py-2 text-gray-800';

const chipActive = 'border-mint-300 bg-mint-100 text-mint-300';

const chipDisabled = 'border-gray-200 bg-gray-50 text-gray-200';

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: ChipSize;
  active?: boolean;
}

interface ChipButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  size?: ChipSize;
  active?: boolean;
}

export const Chip = ({
  size = 'sm',
  className,
  active = false,
  ...props
}: ChipProps) => {
  return (
    <span
      className={cn(
        chipBase,
        chipSizeStyles[size],
        active && chipActive,
        className,
      )}
      {...props}
    />
  );
};

export const ChipButton = ({
  size = 'sm',
  className,
  active = false,
  disabled,
  ...props
}: ChipButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      aria-pressed={active}
      className={cn(
        chipBase,
        chipSizeStyles[size],
        active && chipActive,
        disabled && chipDisabled,
        className,
      )}
    />
  );
};
