'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { ChevronLeftIcon } from '@/shared/components/icons';

type HeaderContentAlignTypes = 'left' | 'center';

interface HeaderProps {
  content?: ReactNode;
  right?: ReactNode;
  hasBackButton?: boolean;
  contentAlign?: HeaderContentAlignTypes;
  onBackClick?: () => void;
}

export const Header = ({
  content,
  right,
  hasBackButton = false,
  contentAlign = 'left',
  onBackClick,
}: HeaderProps) => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }

    router.back();
  };

  const contentNode =
    typeof content === 'string' ? (
      <h1 className="text-title-b-20 text-gray-800">{content}</h1>
    ) : (
      content
    );

  return (
    <header className="relative flex h-15 w-full items-center bg-white pr-4 pl-5">
      {hasBackButton && (
        <button
          aria-label="뒤로가기"
          className="m-2.5 -ml-0.5 flex shrink-0 items-center justify-center text-gray-800"
          type="button"
          onClick={handleBackButtonClick}
        >
          <ChevronLeftIcon className="shrink-0" width={24} height={24} />
        </button>
      )}
      <div
        className={cn(
          'min-w-0',
          contentAlign === 'center'
            ? 'pointer-events-none absolute left-1/2 -translate-x-1/2'
            : 'flex flex-1 items-center justify-start',
        )}
      >
        {contentNode}
      </div>
      {right && (
        <div className="flex shrink-0 items-center justify-end gap-5">
          {right}
        </div>
      )}
    </header>
  );
};
