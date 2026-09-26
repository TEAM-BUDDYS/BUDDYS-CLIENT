'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';
import { UploadIcon } from '@/shared/components/icons';

interface FileUploadProps extends Omit<
  ComponentProps<'input'>,
  'children' | 'className' | 'type' | 'value'
> {
  className?: string;
}

export const FileUpload = ({
  accept = 'image/*,application/pdf',
  className,
  disabled,
  ...inputProps
}: FileUploadProps) => {
  return (
    <label
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-500 p-4',
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

      <UploadIcon aria-hidden className="size-15 text-gray-200" />

      <span className="text-body-r-14 text-gray-500">
        파일 업로드 (PDF/이미지)
      </span>
    </label>
  );
};
