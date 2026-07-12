'use client';

import { useState } from 'react';

import { SearchSheet } from '@/domains/home/features/search-sheet/search-sheet';
import { useSheetScroll } from '@/domains/home/hooks/use-sheet-scroll';
import { cn } from '@/lib/cn';
import { SearchIcon } from '@/shared/components/icons';

export const SearchSheetButton = () => {
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isSearchSheetOpen);

  const handleSearchSheetOpen = () => {
    setIsSearchSheetOpen(true);
  };

  const handleSearchSheetClose = () => {
    setIsSearchSheetOpen(false);
  };

  return (
    <>
      <button type="button" aria-label="검색" onClick={handleSearchSheetOpen}>
        <SearchIcon className="size-6" />
      </button>
      {isSearchSheetOpen && (
        <div
          ref={sheetRef}
          className={cn(
            'fixed inset-0 z-50 mx-auto h-dvh max-w-107.5 bg-white',
            sheetScrollClassName,
          )}
        >
          <SearchSheet onClose={handleSearchSheetClose} />
        </div>
      )}
    </>
  );
};
