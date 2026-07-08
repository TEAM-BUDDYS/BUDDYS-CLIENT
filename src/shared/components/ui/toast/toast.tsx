import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';
import { WarningIcon } from '@/shared/components/icons';

export type ToastVariant = 'primary' | 'gray';

interface ToastProps extends ComponentPropsWithoutRef<'div'> {
  message: string;
  variant?: ToastVariant;
}

const toastVariantClassName = {
  primary: {
    container: 'bg-mint-300 text-white',
    icon: 'text-white',
  },
  gray: {
    container: 'bg-gray-50 text-gray-800',
    icon: 'text-gray-800',
  },
} as const;

export const Toast = ({
  message,
  variant = 'primary',
  className,
  ...props
}: ToastProps) => {
  const variantClassName = toastVariantClassName[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'text-body-sb-14 flex w-fit items-center gap-2 rounded-full px-5 py-4 transition-all duration-300 ease-out',
        variantClassName.container,
        className,
      )}
      {...props}
    >
      <WarningIcon
        aria-hidden="true"
        className={cn('size-5 shrink-0', variantClassName.icon)}
      />
      <span className="whitespace-nowrap">{message}</span>
    </div>
  );
};
