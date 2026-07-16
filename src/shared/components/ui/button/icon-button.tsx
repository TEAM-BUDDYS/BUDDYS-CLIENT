'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const IconButtonVariants = cva(
  ' inline-flex items-center justify-center p-3 rounded-full gap-1.5 w-fit text-body-m-15 disabled:border disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-200',
  {
    variants: {
      variant: {
        primary: 'bg-mint-300 text-white enabled:active:bg-mint-400',
        secondary:
          'bg-mint-50 text-mint-300 border border-mint-200 enabled:active:border-mint-300 enabled:active:bg-mint-300 enabled:active:text-white',
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

interface IconButtonBaseProps extends IconButtonElementProps {
  variant?: IconButtonVariantTypes;
  icon: ReactNode;
}

type IconButtonWithLabelProps = IconButtonBaseProps & {
  children: ReactNode;
  'aria-label'?: string;
};

type IconButtonOnlyProps = IconButtonBaseProps & {
  children?: never;
  'aria-label': string;
};

export type IconButtonProps = IconButtonWithLabelProps | IconButtonOnlyProps;

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
  return (
    <button
      ref={ref}
      {...buttonProps}
      type={type}
      aria-label={ariaLabel}
      className={cn(
        IconButtonVariants({ variant }),
        !children && 'size-11 p-0',
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
