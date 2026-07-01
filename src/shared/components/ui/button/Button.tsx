'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const ButtonVariants = cva('flex items-center px-4 py-2 rounded-xl h-[52px]', {
  variants: {
    variant: {
      primary:
        'text-body-sb-16 justify-center bg-mint-300 text-white active:bg-mint-400 disabled:bg-gray-50 disabled:text-gray-200',
      secondary:
        'text-body-sb-16 justify-center bg-white border border-gray-200 text-gray-800 active:bg-mint-50 active:border-mint-200 active:text-mint-300 disabled:text-gray-200',
      neutral:
        'text-body-m-15 gap-3 bg-gray-50 active:bg-gray-100 disabled:text-gray-200',
      icon: 'text-body-m-15 gap-[84px] bg-[#FAE100] text-gray-900',
    },
    size: {
      sm: 'w-[84px]',
      md: 'w-[164px]',
      lg: 'w-[247px]',
      xl: 'w-[343px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'xl',
  },
});

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

type ButtonSizeTypes = NonNullable<VariantProps<typeof ButtonVariants>['size']>;

type ButtonIconSizeTypes = NonNullable<
  VariantProps<typeof ButtonIconVariants>['iconSize']
>;

export interface ButtonProps extends Omit<ButtonElementProps, 'children'> {
  variant?: ButtonVariantTypes;
  size?: ButtonSizeTypes;
  icon?: ReactNode;
  iconSize?: ButtonIconSizeTypes;
  children: ReactNode;
}

export const Button = ({
  ref,
  variant,
  size,
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
      className={cn(
        ButtonVariants({
          variant,
          size,
        }),
        className,
      )}
    >
      {icon ? (
        <span aria-hidden className={cn(ButtonIconVariants({ iconSize }))}>
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
};
