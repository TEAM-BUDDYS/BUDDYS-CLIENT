import { type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-checked' | 'aria-label' | 'onChange' | 'onClick' | 'role' | 'type'
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}

export const Toggle = ({
  checked,
  onChange,
  ariaLabel,
  className,
  ...props
}: ToggleProps) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <button
      {...props}
      aria-checked={checked}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex h-6 w-10 shrink-0 items-center rounded-full p-0.75 transition-colors duration-200 ease-in-out',
        checked ? 'bg-mint-300' : 'bg-gray-300',
        className,
      )}
      onClick={handleToggle}
      role="switch"
      type="button"
    >
      <span
        aria-hidden
        className={cn(
          'size-4.5 shrink-0 rounded-full transition-transform duration-200 ease-in-out',
          checked ? 'translate-x-4 bg-gray-50' : 'translate-x-0 bg-gray-100',
        )}
      />
    </button>
  );
};
