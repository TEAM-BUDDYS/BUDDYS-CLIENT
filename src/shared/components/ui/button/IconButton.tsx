'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const IconButtonVariants = cva(
  'inline-flex items-center justify-center px-2.5 py-2 rounded-[200px] gap-1.5 h-[44px] text-body-sb-14',
  {
    variants: {
      variant: {
        primary:
          'bg-mint-300 text-white active:bg-mint-400 disabled:border disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-200',
        secondary:
          'bg-mint-50 text-mint-300 border border-mint-200 active:border-mint-300 active:bg-mint-300 active:text-white disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-200',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

type IconButtonElementProps = ComponentPropsWithRef<'button'>;

type IconButtonVariantTypes = NonNullable<
  VariantProps<typeof IconButtonVariants>['variant']
>;

export interface IconButtonProps extends Omit<
  IconButtonElementProps,
  'children'
> {
  variant?: IconButtonVariantTypes;
  icon: ReactNode;
  children?: ReactNode;
  'aria-label'?: string;
}

export const IconButton = ({
  ref,
  variant,
  icon,
  className,
  children,
  type = 'button',
  'aria-label': ariaLabel,
  ...buttonProps
}: IconButtonProps) => {
  const hasLabel = Boolean(children);

  return (
    <button
      ref={ref}
      {...buttonProps}
      type={type}
      aria-label={ariaLabel}
      className={cn(
        IconButtonVariants({ variant }),
        hasLabel ? 'w-fit' : 'wit-[44px]',
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-flex size-[24px] items-center justify-center text-current [&>svg]:size-full [&>svg]:shrink-0"
      >
        {icon}
      </span>
      {children ? <span>{children}</span> : null}
    </button>
  );
};
