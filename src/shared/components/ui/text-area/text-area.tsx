'use client';

import { type ComponentProps, type ReactNode, useId } from 'react';

import { cn } from '@/lib/cn';
import { EssentialIcon, WarningIcon } from '@/shared/components/icons';

export type TextAreaStatus = 'default' | 'error';

export interface TextAreaProps extends Omit<
  ComponentProps<'textarea'>,
  'defaultValue'
> {
  label?: ReactNode;
  message?: ReactNode;
  status?: TextAreaStatus;
}

export const TextArea = ({
  id,
  label,
  message,
  status = 'default',
  required,
  disabled,
  placeholder,
  className,
  maxLength,
  value,
  rows = 5,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...textAreaProps
}: TextAreaProps) => {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const isError = status === 'error';
  const showCount = typeof maxLength === 'number';
  const messageId = message ? `${textAreaId}-message` : undefined;
  const countId = showCount ? `${textAreaId}-count` : undefined;
  const describedBy =
    [ariaDescribedBy, messageId, countId].filter(Boolean).join(' ') ||
    undefined;
  const textLength = value == null ? 0 : String(value).length;
  const displayTextLength = showCount
    ? Math.min(textLength, maxLength)
    : textLength;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          className="text-body-sb-15 flex items-start gap-0.5 text-gray-800"
          htmlFor={textAreaId}
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

      <div
        className={cn(
          'flex min-h-30 w-full flex-col rounded-xl border border-transparent bg-gray-50 p-4 outline outline-transparent',
          !disabled &&
            !isError &&
            'focus-within:border-mint-200 focus-within:outline-mint-200 focus-within:bg-white has-[textarea:not(:placeholder-shown)]:border-gray-200',
          disabled && 'cursor-not-allowed',
          isError &&
            'border-error-50 focus-within:border-error-50 focus-within:outline-error-50 bg-white',
          className,
        )}
      >
        <textarea
          {...textAreaProps}
          aria-describedby={describedBy}
          aria-invalid={isError ? true : ariaInvalid}
          className={cn(
            'text-body-m-15 min-h-0 w-full flex-1 resize-none bg-transparent text-gray-800 outline-none placeholder:text-gray-500',
            'disabled:cursor-not-allowed disabled:text-gray-400',
          )}
          disabled={disabled}
          id={textAreaId}
          maxLength={maxLength}
          placeholder={placeholder ?? ' '}
          required={required}
          rows={rows}
          value={value}
        />

        {showCount && (
          <div className="flex justify-end">
            <p className="text-caption-r-12 text-gray-500" id={countId}>
              {displayTextLength}/{maxLength}
            </p>
          </div>
        )}
      </div>

      {message && (
        <div
          className={cn(isError && 'flex items-center gap-1')}
          id={messageId}
        >
          {isError && (
            <WarningIcon
              aria-hidden="true"
              className="text-error size-4 shrink-0"
            />
          )}
          <p
            className={
              isError
                ? 'text-caption-r-12 text-error'
                : 'text-caption-r-12 text-gray-500'
            }
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
};
