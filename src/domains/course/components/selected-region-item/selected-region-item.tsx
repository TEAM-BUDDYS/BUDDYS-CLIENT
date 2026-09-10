'use client';

import { XCircleIcon } from '@/shared/components/icons';

interface SelectedRegionItemProps {
  regionName: string;
  onRemove: () => void;
}

export const SelectedRegionItem = ({
  regionName,
  onRemove,
}: SelectedRegionItemProps) => {
  return (
    <div className="bg-mint-50 flex h-13 w-full items-center justify-between gap-3 rounded-xl py-2.5 pr-3 pl-4">
      <span className="text-body-sb-15 text-mint-300 min-w-0 truncate">
        {regionName}
      </span>

      <button
        type="button"
        aria-label={`${regionName} 지역 삭제`}
        className="focus-visible:outline-mint-300 size-6 shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={onRemove}
      >
        <XCircleIcon className="text-mint-300 size-full" />
      </button>
    </div>
  );
};
