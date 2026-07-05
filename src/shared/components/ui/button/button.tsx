'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const ButtonVariants = cva(
  'flex items-center px-4 py-3.5 rounded-xl w-full flex-1',
  {
    variants: {
      variant: {
        primary:
          'text-body-sb-16 bg-mint-300 text-white active:bg-mint-400 disabled:bg-gray-50 disabled:text-gray-200',
        secondary:
          'text-body-sb-16 bg-white border border-gray-200 text-gray-800 active:bg-mint-50 active:border-mint-200 active:text-mint-300 disabled:text-gray-200',
        neutral:
          'text-body-m-15 bg-gray-50 active:bg-gray-100 disabled:text-gray-200',
        kakao: 'text-body-m-15 bg-[#FAE100] text-gray-900',
      },
      align: {
        left: 'justify-start gap-3',
        center: 'relative justify-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      align: 'center',
    },
  },
);

const ButtonIconVariants = cva(
  'inline-flex items-center text-current [&>svg]:size-full [&>svg]:shrink-0',
  {
    variants: {
      iconSize: {
        sm: 'size-[20px]',
        lg: 'size-[24px]',
      },
    },
    defaultVariants: {
      iconSize: 'sm',
    },
  },
);

type ButtonElementProps = ComponentPropsWithRef<'button'>;

type ButtonVariantTypes = NonNullable<
  VariantProps<typeof ButtonVariants>['variant']
>;

type ButtonAlignTypes = NonNullable<
  VariantProps<typeof ButtonVariants>['align']
>;

type ButtonIconSizeTypes = NonNullable<
  VariantProps<typeof ButtonIconVariants>['iconSize']
>;

export interface ButtonProps extends Omit<ButtonElementProps, 'children'> {
  variant?: ButtonVariantTypes;
  align?: ButtonAlignTypes;
  icon?: ReactNode;
  iconSize?: ButtonIconSizeTypes;
  children: ReactNode;
}

export const Button = ({
  ref,
  variant,
  align,
  icon,
  iconSize,
  className,
  children,
  type = 'button',
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      {...buttonProps}
      type={type}
      className={cn(ButtonVariants({ variant, align }), className)}
    >
      {icon ? (
        <span
          aria-hidden
          className={cn(
            ButtonIconVariants({ iconSize }),
            align === 'center' ? 'absolute left-4' : null,
          )}
        >
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
};
