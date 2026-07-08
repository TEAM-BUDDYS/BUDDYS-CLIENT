'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { useEffect, useId } from 'react';

import { cn } from '@/lib/cn';
import { Button } from '@/shared/components/ui/button/button';

export interface ModalProps {
  open: boolean;
  title: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  className?: string;
  description?: ReactNode;
  icon?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal = ({
  open,
  title,
  confirmLabel,
  cancelLabel = '닫기',
  className,
  description,
  icon,
  onClose,
  onConfirm,
}: ModalProps) => {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [open]);

  const handleModalKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        aria-label="모달 닫기"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      <section
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={cn(
          'relative flex w-80 flex-col items-center gap-6 rounded-2xl bg-white p-4',
          className,
        )}
        onKeyDown={handleModalKeyDown}
        role="dialog"
      >
        <div className="flex flex-col items-center gap-4">
          {icon && (
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              {icon}
            </div>
          )}

          <div className="flex w-full max-w-[269px] flex-col items-center gap-3 text-center">
            <h2
              id={titleId}
              className="text-title-b-18 whitespace-pre-line text-gray-800"
            >
              {title}
            </h2>

            {description && (
              <p
                id={descriptionId}
                className="text-body-m-15 max-w-[257px] whitespace-pre-line text-gray-500"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full gap-2">
          <Button
            variant="secondary"
            autoFocus
            className="text-body-m-16"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </section>
    </div>
  );
};
