import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

type OptionListProps = ComponentPropsWithoutRef<'ul'>;

export const OptionList = ({
  className,
  children,
  ...props
}: OptionListProps) => {
  return (
    <ul
      {...props}
      className={cn(
        'absolute top-full left-0 z-10 mt-2 flex max-h-59 w-full scrollbar-gutter-stable flex-col gap-1 overflow-y-auto rounded-xl border border-gray-200 bg-white py-2 pr-1 pl-4 shadow-md',
        '[&::-webkit-scrollbar]:w-2.25',
        '[&::-webkit-scrollbar-thumb]:rounded-full',
        '[&::-webkit-scrollbar-thumb]:border-[3px]',
        '[&::-webkit-scrollbar-thumb]:border-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-gray-200',
        '[&::-webkit-scrollbar-thumb]:bg-clip-content',
        '[&::-webkit-scrollbar-track]:my-2.75',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        className,
      )}
      role="listbox"
    >
      {children}
    </ul>
  );
};
