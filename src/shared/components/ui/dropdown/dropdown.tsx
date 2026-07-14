'use client';

import { useId, useState } from 'react';

import { cn } from '@/lib/cn';
import { ChevronDownIcon, ChevronUpIcon } from '@/shared/components/icons';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import { OptionItem } from './option-item';
import { OptionList } from './option-list';

interface DropdownProps {
  options: string[];
  value: string;
  disabled?: boolean;
  placeholder?: string;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onChange?: (value: string) => void;
  onLoadMore?: () => void;
}

export const Dropdown = ({
  options,
  value,
  disabled = false,
  hasMore = false,
  isLoadingMore = false,
  onChange,
  onLoadMore,
  placeholder = '선택해주세요.',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const dropdownRef = useClickOutside<HTMLElement>(() => setIsOpen(false));
  const hasSelectedValue = Boolean(value);

  const handleOptionListScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;

    const isNearBottom = scrollHeight - clientHeight - scrollTop <= 20;

    if (isNearBottom && hasMore && !isLoadingMore) {
      onLoadMore?.();
    }
  };

  return (
    <article ref={dropdownRef} className="relative">
      <button
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        type="button"
        className={cn(
          'text-body-m-15 flex w-full justify-between rounded-xl bg-gray-50 px-4 py-3.5 text-gray-500',
          isOpen && 'bg-gray-100',
          hasSelectedValue && 'border border-gray-200 text-gray-800',
          disabled && 'bg-gray-50 text-gray-200',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {hasSelectedValue ? value : placeholder}
        {isOpen ? (
          <ChevronUpIcon width={24} height={24} />
        ) : (
          <ChevronDownIcon width={24} height={24} />
        )}
      </button>
      {isOpen && !disabled && (
        <OptionList id={listboxId} onScroll={handleOptionListScroll}>
          {options.map((option) => (
            <OptionItem
              key={option}
              option={option}
              isSelected={value === option}
              onSelect={() => {
                onChange?.(option);
                setIsOpen(false);
              }}
            />
          ))}
          {isLoadingMore && (
            <li
              role="presentation"
              className="text-body-m-15 px-4 py-3.5 text-gray-400"
            >
              <span role="status">목록을 불러오는 중입니다.</span>
            </li>
          )}
        </OptionList>
      )}
    </article>
  );
};
