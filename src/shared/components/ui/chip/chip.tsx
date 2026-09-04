import { cn } from '@/lib/cn';

const chipBase =
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[30px] border border-gray-200 bg-white py-2 text-gray-800';

const chipVariantStyles = {
  lineMedium: {
    default: 'px-4 text-body-m-15',
    active: 'bg-mint-100 border-mint-300 text-mint-300',
  },
  lineSmall: {
    default: 'px-3 text-body-r-14',
    active: 'bg-mint-100 border-mint-300 text-mint-300',
  },
  fillMedium: {
    default: 'px-4 text-body-r-14 text-gray-500',
    active: 'bg-gray-800 border-gray-800 text-white text-body-sb-14',
  },
};

type ChipVariantTypes = 'lineMedium' | 'lineSmall' | 'fillMedium';

const chipDisabled = 'border-gray-200 bg-gray-50 text-gray-200';

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  variant?: ChipVariantTypes;
}

interface ChipButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  active?: boolean;
  variant?: ChipVariantTypes;
}

export const Chip = ({
  className,
  active = false,
  variant = 'lineSmall',
  ...props
}: ChipProps) => {
  const styles = chipVariantStyles[variant];

  return (
    <span
      className={cn(
        chipBase,
        styles.default,
        active && styles.active,
        className,
      )}
      {...props}
    />
  );
};

export const ChipButton = ({
  className,
  active = false,
  disabled,
  variant = 'lineSmall',
  ...props
}: ChipButtonProps) => {
  const styles = chipVariantStyles[variant];

  return (
    <button
      {...props}
      type="button"
      aria-pressed={active}
      disabled={disabled}
      className={cn(
        chipBase,
        styles.default,
        active && styles.active,
        disabled && chipDisabled,
        className,
      )}
    />
  );
};
