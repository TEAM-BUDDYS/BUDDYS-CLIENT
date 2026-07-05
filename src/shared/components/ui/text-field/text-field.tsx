'use client';

import { type ComponentProps, type ReactNode, useId } from 'react';

import { cn } from '@lib/cn';
import {
  CheckCircleIcon,
  EssentialIcon,
  WarningIcon,
  XCircleIcon,
} from '@shared/components/icons';

export type TextFieldStatus = 'default' | 'success' | 'error';

export interface TextFieldProps extends ComponentProps<'input'> {
  label?: ReactNode;
  message?: ReactNode;
  status?: TextFieldStatus;
  onClear?: () => void;
}

const STATUS_ICONS = {
  error: WarningIcon,
  success: CheckCircleIcon,
};

export const TextField = ({
  id,
  label,
  message,
  status = 'default',
  onClear,
  required,
  disabled,
  placeholder,
  className,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...inputProps
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = message ? `${inputId}-message` : undefined;
  const StatusIcon = status === 'default' ? null : STATUS_ICONS[status];
  const hasClearButton = status === 'default' && Boolean(onClear) && !disabled;
  const describedBy =
    [ariaDescribedBy, messageId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          className="text-body-sb-15 flex items-start gap-0.5 text-gray-800"
          htmlFor={inputId}
        >
          {label}
          {required && (
            <EssentialIcon
              aria-hidden="true"
              className="text-error mt-0.75 size-1.5 shrink-0"
            />
          )}
        </label>
      )}

      <div className="relative">
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={status === 'error' ? true : ariaInvalid}
          className={cn(
            'peer text-body-m-15 h-13 w-full rounded-xl border border-transparent bg-gray-50 px-4 py-3.5 text-gray-800 outline-none',
            'placeholder:text-gray-500 focus:bg-white',
            'focus-visible:border-mint-200 focus-visible:ring-mint-200 focus-visible:ring-1',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
            (StatusIcon || hasClearButton) && 'pr-12',
            status === 'error' &&
              'border-error-50 focus-visible:border-error-50 focus-visible:ring-error-50',
            status === 'success' &&
              'focus-visible:border-info-50 focus-visible:ring-info-50 border-gray-200',
            className,
          )}
          disabled={disabled}
          id={inputId}
          placeholder={placeholder ?? ' '}
          required={required}
        />

        {StatusIcon && (
          <StatusIcon
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-1/2 right-4 size-6 -translate-y-1/2',
              status === 'error' ? 'text-error' : 'text-info',
            )}
          />
        )}

        {hasClearButton && (
          <button
            aria-label="입력 내용 지우기"
            className="absolute top-1/2 right-4 hidden size-6 -translate-y-1/2 rounded-full text-gray-200 peer-not-placeholder-shown:block"
            onClick={onClear}
            onPointerDown={(event) => event.preventDefault()}
            type="button"
          >
            <XCircleIcon aria-hidden="true" className="size-6" />
          </button>
        )}
      </div>

      {message && (
        <p
          className={
            status === 'error'
              ? 'text-caption-r-12 text-error'
              : 'text-caption-r-12 text-gray-500'
          }
          id={messageId}
        >
          {message}
        </p>
      )}
    </div>
  );
};
