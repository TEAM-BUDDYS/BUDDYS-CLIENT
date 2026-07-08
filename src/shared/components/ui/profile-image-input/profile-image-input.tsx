'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';
import { CameraIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface ProfileImageInputProps extends Omit<
  ComponentProps<'input'>,
  'aria-label' | 'children' | 'className' | 'type' | 'value'
> {
  alt: string;
  className?: string;
  label?: string;
  src: string;
}

export const ProfileImageInput = ({
  accept = 'image/*',
  alt,
  className,
  disabled,
  label = '프로필 이미지 변경',
  src,
  ...inputProps
}: ProfileImageInputProps) => {
  return (
    <label
      className={cn(
        'relative block size-30',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <input
        {...inputProps}
        aria-label={label}
        accept={accept}
        className="sr-only"
        disabled={disabled}
        type="file"
      />
      <CommonImage
        src={src}
        alt={alt}
        width={120}
        height={120}
        unoptimized
        radius="rounded-full"
        className="size-30"
      />
      <span className="bg-mint-50 text-mint-300 absolute right-0 bottom-0 flex size-10 items-center justify-center rounded-full">
        <CameraIcon className="size-5" />
      </span>
    </label>
  );
};
