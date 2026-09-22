import type { ComponentPropsWithoutRef } from 'react';

type OptionListProps = ComponentPropsWithoutRef<'ul'>;

export const OptionList = ({ children, ...props }: OptionListProps) => {
  return (
    <ul
      {...props}
      className="absolute top-full right-0 z-10 flex flex-col items-start gap-1 rounded-xl bg-white p-1.5 shadow-[0_1px_4px_0_rgba(0,0,0,0.20)]"
      role="listbox"
    >
      {children}
    </ul>
  );
};
