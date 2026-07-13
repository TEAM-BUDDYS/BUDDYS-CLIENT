'use client';

import type { ChangeEvent } from 'react';

import { ChipOptionGroup } from '@/domains/posts/components/chip-option-group/chip-option-group';
import { ImageInput } from '@/domains/posts/components/image-input/image-input';
import { FormLabel, TextArea, TextField } from '@/shared/components/ui';

import {
  AGE_CONDITION_OPTIONS,
  COMPANION_TYPE_OPTIONS,
  GENDER_OPTIONS,
  MAX_IMAGE_COUNT,
  RECRUITMENT_COUNT_OPTIONS,
} from './constants';
import type { PostCreateDetailFormState } from './model';
import { PostCreatePreferenceTagFields } from './post-create-preference-tag-fields';

const MAX_POST_CONTENT_LENGTH = 120;
const MAX_POST_TITLE_LENGTH = 14;

interface PostCreateDetailStepProps {
  value: PostCreateDetailFormState;
  imageCount: number;
  onChange: (value: Partial<PostCreateDetailFormState>) => void;
  onImagesChange: (files: File[]) => void;
}

const Divider = () => {
  return <hr className="w-full border-gray-100" />;
};

export const PostCreateDetailStep = ({
  value,
  imageCount,
  onChange,
  onImagesChange,
}: PostCreateDetailStepProps) => {
  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const remainingImageCount = Math.max(0, MAX_IMAGE_COUNT - imageCount);
    const files = Array.from(event.target.files ?? []).slice(
      0,
      remainingImageCount,
    );

    if (files.length === 0) {
      event.target.value = '';
      return;
    }

    onImagesChange(files);
    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <TextField
          required
          label="제목"
          maxLength={MAX_POST_TITLE_LENGTH}
          placeholder="게시물의 제목을 작성해주세요."
          value={value.title}
          onChange={(event) => onChange({ title: event.target.value })}
        />
        <TextArea
          required
          label="내용"
          maxLength={MAX_POST_CONTENT_LENGTH}
          placeholder={`예시) 맛집 탐방을 좋아하는 분, 함께 사진을 찍으며\n여행할 분을 찾고 있어요!`}
          rows={5}
          value={value.content}
          onChange={(event) => onChange({ content: event.target.value })}
        />
      </div>

      <Divider />

      <section className="flex flex-col gap-6">
        <FormLabel as="h2" required>
          동행 조건
        </FormLabel>
        <ChipOptionGroup
          multiple
          label="나이"
          options={AGE_CONDITION_OPTIONS}
          selectedValues={value.ageConditions}
          onChange={(ageConditions) => onChange({ ageConditions })}
        />
        <ChipOptionGroup
          label="성별"
          options={GENDER_OPTIONS}
          selectedValues={value.genderConditions}
          onChange={(genderConditions) => onChange({ genderConditions })}
        />
      </section>

      <Divider />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <FormLabel as="h2" required>
            동행 유형
          </FormLabel>
          <ChipOptionGroup
            options={COMPANION_TYPE_OPTIONS}
            selectedValues={value.companionType ? [value.companionType] : []}
            onChange={(values) => onChange({ companionType: values[0] ?? '' })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormLabel as="h2" required>
            모집 인원
          </FormLabel>
          <ChipOptionGroup
            options={RECRUITMENT_COUNT_OPTIONS}
            selectedValues={
              value.recruitmentCountType ? [value.recruitmentCountType] : []
            }
            onChange={(values) =>
              onChange({ recruitmentCountType: values[0] ?? '' })
            }
          />
        </div>
      </section>

      <Divider />

      <section className="flex flex-col gap-6">
        <FormLabel as="h2">취향 태그</FormLabel>
        <PostCreatePreferenceTagFields value={value} onChange={onChange} />
      </section>

      <Divider />

      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-body-sb-15 text-gray-800">사진</h2>
          <p className="text-caption-r-12 text-gray-500">
            최대 10개 선택 ({imageCount}/{MAX_IMAGE_COUNT})
          </p>
        </div>
        <ImageInput
          multiple
          disabled={imageCount >= MAX_IMAGE_COUNT}
          onChange={handleImageInputChange}
        />
      </section>
    </div>
  );
};
