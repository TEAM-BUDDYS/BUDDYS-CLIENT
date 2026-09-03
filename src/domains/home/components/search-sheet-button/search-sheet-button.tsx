'use client';

import { type KeyboardEvent, useRef, useState } from 'react';

import { SearchSheet } from '@/domains/home/features/search-sheet/search-sheet';
import { useSheetScroll } from '@/domains/home/hooks/use-sheet-scroll';
import { cn } from '@/lib/cn';
import { SearchIcon } from '@/shared/components/icons';

export const SearchSheetButton = () => {
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isSearchSheetOpen);

  const handleSearchSheetOpen = () => {
    setIsSearchSheetOpen(true);
  };

  const handleSearchSheetClose = () => {
    setIsSearchSheetOpen(false);
    searchButtonRef.current?.focus();
  };

  const handleSearchSheetKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      handleSearchSheetClose();
    }
  };

  return (
    <>
      <button
        ref={searchButtonRef}
        type="button"
        aria-label="검색"
        onClick={handleSearchSheetOpen}
      >
        <SearchIcon className="size-[22px] text-gray-800" iconOpacity={1} />
      </button>
      {isSearchSheetOpen && (
        <div
          ref={sheetRef}
          aria-label="검색"
          aria-modal="true"
          className={cn(
            'fixed inset-0 z-50 mx-auto h-dvh max-w-107.5 bg-white',
            sheetScrollClassName,
          )}
          onKeyDown={handleSearchSheetKeyDown}
          role="dialog"
        >
          <SearchSheet onClose={handleSearchSheetClose} />
        </div>
      )}
    </>
  );
};
