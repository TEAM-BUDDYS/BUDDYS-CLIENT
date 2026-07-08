'use client';

import type { ComponentProps } from 'react';

import { cn } from '@lib/cn';
import { PlusIcon } from '@shared/components/icons';

interface ImageInputProps extends Omit<
  ComponentProps<'input'>,
  'children' | 'className' | 'type' | 'value'
> {
  className?: string;
  label?: string;
}

export const ImageInput = ({
  accept = 'image/*',
  className,
  disabled,
  label = '이미지 추가',
  ...inputProps
}: ImageInputProps) => {
  return (
    <label
      className={cn(
        'flex size-20 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-500',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <input
        {...inputProps}
        accept={accept}
        className="sr-only"
        disabled={disabled}
        type="file"
      />
      <PlusIcon aria-hidden className="size-6 shrink-0" />
      <span className="sr-only">{label}</span>
    </label>
  );
};
