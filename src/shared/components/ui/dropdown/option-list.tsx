import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

type OptionListProps = ComponentPropsWithoutRef<'ul'>;

export const OptionList = ({
  className,
  children,
  ...props
}: OptionListProps) => {
  return (
    <div
      className={cn(
        'absolute top-full left-0 z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white py-2 pl-2 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      <ul
        {...props}
        className={cn(
          'flex max-h-55 scrollbar-gutter-stable flex-col gap-1 overflow-y-auto',
          '[&::-webkit-scrollbar]:w-3.75',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:border-6',
          '[&::-webkit-scrollbar-thumb]:border-transparent',
          '[&::-webkit-scrollbar-thumb]:bg-gray-200',
          '[&::-webkit-scrollbar-thumb]:bg-clip-content',
          '[&::-webkit-scrollbar-track]:my-1',
          '[&::-webkit-scrollbar-track]:bg-transparent',
        )}
        role="listbox"
      >
        {children}
      </ul>
    </div>
  );
};
