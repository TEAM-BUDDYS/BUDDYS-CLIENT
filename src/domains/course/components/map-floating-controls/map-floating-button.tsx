import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface MapFloatingButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  icon: ReactNode;
  color: 'white' | 'mint';
}

const variantClass = {
  white: 'bg-white text-mint-300',
  mint: 'bg-mint-300 text-white',
};

export const MapFloatingButton = ({
  icon,
  color,
  ...props
}: MapFloatingButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex size-9 items-center justify-center rounded-full shadow-[0_2px_4px_0_rgb(0_0_0/0.20)] active:translate-y-px',
        variantClass[color],
      )}
      {...props}
    >
      <span className="flex size-5 items-center justify-center [&>svg]:size-full">
        {icon}
      </span>
    </button>
  );
};
