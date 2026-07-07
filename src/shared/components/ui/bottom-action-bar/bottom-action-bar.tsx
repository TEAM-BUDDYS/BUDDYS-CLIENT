'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';
import { SendIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui/button/icon-button';

type BottomActionBarInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'aria-label'
  | 'children'
  | 'className'
  | 'onChange'
  | 'placeholder'
  | 'type'
  | 'value'
>;

interface BottomActionBarProps extends Omit<
  ComponentPropsWithoutRef<'form'>,
  'children'
> {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  inputProps?: BottomActionBarInputProps;
}

export const BottomActionBar = ({
  className,
  inputProps,
  placeholder = '내용을 입력해주세요.',
  value,
  onValueChange,
  ...formProps
}: BottomActionBarProps) => {
  return (
    <form
      className={cn(
        'flex h-24.5 w-full items-start gap-2.5 bg-white px-4.25 pt-4',
        className,
      )}
      {...formProps}
    >
      <input
        {...inputProps}
        aria-label="내용 입력"
        className="text-body-m-15 h-12 min-w-0 flex-1 rounded-full bg-gray-50 px-[20.5px] text-gray-800 outline-none placeholder:text-gray-500"
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
      <IconButton
        aria-label="전송"
        className="shrink-0"
        icon={<SendIcon />}
        type="submit"
        variant="secondary"
      />
    </form>
  );
};
