'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { useEffect, useId } from 'react';

import { cn } from '@/lib/cn';
import { Button } from '@/shared/components/ui/button/button';

interface BaseModalProps {
  open: boolean;
  title: ReactNode;
  cancelLabel?: string;
  className?: string;
  description?: ReactNode;
  visual?: ReactNode;
  onClose: () => void;
}

type ModalProps =
  | (BaseModalProps & {
      type: 'alert';
    })
  | (BaseModalProps & {
      type?: 'confirm';
      confirmLabel: string;
      onConfirm: () => void;
    });

export const Modal = (props: ModalProps) => {
  const {
    open,
    title,
    cancelLabel = '닫기',
    className,
    description,
    visual,
    onClose,
  } = props;

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
          {visual && (
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              {visual}
            </div>
          )}

          <div className="flex w-full flex-col items-center gap-3 text-center">
            <h2
              id={titleId}
              className="text-title-b-18 whitespace-pre-line text-gray-800"
            >
              {title}
            </h2>

            {description && (
              <p
                id={descriptionId}
                className="text-body-m-15 whitespace-pre-line text-gray-500"
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
            className="text-body-m-16 flex-1"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          {props.type !== 'alert' && (
            <Button className="flex-1" onClick={props.onConfirm}>
              {props.confirmLabel}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};
