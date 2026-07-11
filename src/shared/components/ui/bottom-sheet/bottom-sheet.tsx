'use client';

import type { ReactNode } from 'react';
import { Drawer } from 'vaul';

import { cn } from '@/lib/cn';

interface BottomSheetProps {
  open: boolean;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  onClose: () => void;
}

export const BottomSheet = ({
  open,
  children,
  className,
  ariaLabel,
  ariaLabelledBy,
  onClose,
}: BottomSheetProps) => {
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Drawer.Content
          aria-describedby={undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(
            'fixed right-0 bottom-0 left-0 z-50 mx-auto max-h-[calc(100dvh-24px)] w-full max-w-[430px] overflow-hidden rounded-t-[28px] bg-white shadow-[0_4px_2px_0_rgba(0,0,0,0.25)]',
            className,
          )}
        >
          <div className="flex shrink-0 justify-center pt-2 pb-4">
            <Drawer.Handle className="h-1.25 w-11 rounded-[15px] bg-gray-200" />
          </div>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
