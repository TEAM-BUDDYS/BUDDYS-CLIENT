import type { PreferenceTag } from '@/shared/api';
import { ChipGroup } from '@/shared/components/ui';

interface OnboardTagSelectStepProps {
  title: string;
  description: string;
  tags: PreferenceTag[];
  isLoading: boolean;
  isError: boolean;
  selectedTagIds: number[];
  maxSelectionCount: number;
  onChange: (tagIds: number[]) => void;
  onRetry: () => void;
}

export const OnboardTagSelectStep = ({
  title,
  description,
  tags,
  isLoading,
  isError,
  selectedTagIds,
  maxSelectionCount,
  onChange,
  onRetry,
}: OnboardTagSelectStepProps) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-title-b-20 text-gray-800">{title}</h1>
        <p className="text-body-sb-16 text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-body-r-14 text-gray-500">
          1~{maxSelectionCount}개 선택 ({selectedTagIds.length}/
          {maxSelectionCount})
        </p>

        {isLoading && (
          <p className="text-body-r-14 text-gray-500">태그를 불러오는 중...</p>
        )}
        {isError && (
          <div className="flex items-center gap-3">
            <p className="text-body-r-14 text-gray-500">
              태그를 불러오지 못했습니다.
            </p>
            <button
              type="button"
              className="text-body-sb-14 text-mint-400"
              onClick={onRetry}
            >
              다시 시도
            </button>
          </div>
        )}
        {!isLoading && !isError && (
          <ChipGroup
            tags={tags}
            selectedTagIds={selectedTagIds}
            maxSelectionCount={maxSelectionCount}
            hasToggleButton={false}
            rowGap="md"
            chipClassName="px-4"
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};
