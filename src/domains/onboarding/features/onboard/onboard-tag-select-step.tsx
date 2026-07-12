import { ChipGroup } from '@/shared/components/ui';
import { PreferenceTag } from '@/shared/constants/preference-tags';

interface OnboardTagSelectStepProps {
  title: string;
  description: string;
  tags: PreferenceTag[];
  selectedTagIds: number[];
  maxSelectionCount: number;
  onChange: (tagIds: number[]) => void;
}

export const OnboardTagSelectStep = ({
  title,
  description,
  tags,
  selectedTagIds,
  maxSelectionCount,
  onChange,
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

        <ChipGroup
          tags={tags}
          selectedTagIds={selectedTagIds}
          maxSelectionCount={maxSelectionCount}
          hasToggleButton={false}
          rowGap="md"
          chipClassName="px-4"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
