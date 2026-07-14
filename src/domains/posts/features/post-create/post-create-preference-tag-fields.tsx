'use client';

import { useSuspenseQueries } from '@tanstack/react-query';

import { TAG_QUERY_OPTIONS } from '@/shared/api';
import { ChipGroup, FormLabel } from '@/shared/components/ui';

import type { PostCreateDetailFormState } from './model';

type PreferenceTagFieldsValue = Pick<
  PostCreateDetailFormState,
  'activityTagIds' | 'interestTagIds' | 'companionStyleTagIds'
>;

interface PostCreatePreferenceTagFieldsProps {
  value: PreferenceTagFieldsValue;
  onChange: (value: Partial<PreferenceTagFieldsValue>) => void;
}

export const PostCreatePreferenceTagFields = ({
  value,
  onChange,
}: PostCreatePreferenceTagFieldsProps) => {
  const [activityTagsQuery, interestTagsQuery, travelStyleTagsQuery] =
    useSuspenseQueries({
      queries: [
        TAG_QUERY_OPTIONS.LIST('ACTIVITY'),
        TAG_QUERY_OPTIONS.LIST('INTEREST'),
        TAG_QUERY_OPTIONS.LIST('TRAVEL_STYLE'),
      ],
    });

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormLabel as="p" required variant="field">
          활동
        </FormLabel>
        <ChipGroup
          collapsedCount={5}
          maxSelectionCount={3}
          tags={activityTagsQuery.data}
          selectedTagIds={value.activityTagIds}
          onChange={(activityTagIds) => onChange({ activityTagIds })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormLabel as="p" variant="field">
          관심사
        </FormLabel>
        <ChipGroup
          collapsedCount={5}
          maxSelectionCount={2}
          tags={interestTagsQuery.data}
          selectedTagIds={value.interestTagIds}
          onChange={(interestTagIds) => onChange({ interestTagIds })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormLabel as="p" variant="field">
          동행 스타일
        </FormLabel>
        <ChipGroup
          collapsedCount={5}
          maxSelectionCount={2}
          tags={travelStyleTagsQuery.data}
          selectedTagIds={value.companionStyleTagIds}
          onChange={(companionStyleTagIds) =>
            onChange({ companionStyleTagIds })
          }
        />
      </div>
    </>
  );
};
