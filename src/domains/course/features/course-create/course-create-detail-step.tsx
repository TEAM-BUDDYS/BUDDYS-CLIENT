'use client';

import {
  AsyncBoundary,
  FormLabel,
  TextArea,
  TextField,
} from '@/shared/components/ui';

import {
  COURSE_CREATE_MAX_CONTENT_LENGTH,
  COURSE_CREATE_MAX_TITLE_LENGTH,
} from './constants';
import { CourseCreatePreferenceTagFields } from './course-create-preference-tag-fields';
import type { CourseCreateDetailFormState } from './model';

interface CourseCreateDetailStepProps {
  value: CourseCreateDetailFormState;
  onChange: (value: Partial<CourseCreateDetailFormState>) => void;
}

export const CourseCreateDetailStep = ({
  value,
  onChange,
}: CourseCreateDetailStepProps) => {
  return (
    <fieldset className="flex min-w-0 flex-col gap-6">
      <div className="flex flex-col gap-6">
        <TextField
          required
          label="제목"
          maxLength={COURSE_CREATE_MAX_TITLE_LENGTH}
          placeholder="코스의 제목을 작성해주세요."
          value={value.title}
          onChange={(event) => onChange({ title: event.target.value })}
        />
        <TextArea
          label="내용"
          maxLength={COURSE_CREATE_MAX_CONTENT_LENGTH}
          placeholder="예시)"
          rows={5}
          value={value.content}
          onChange={(event) => onChange({ content: event.target.value })}
        />
      </div>

      <hr className="w-full border-gray-100" />

      <section className="flex flex-col gap-6">
        <FormLabel as="h2">취향 태그</FormLabel>
        <AsyncBoundary
          className="min-h-40 px-0 py-6"
          loadingState={{ title: '취향 태그를 불러오고 있어요' }}
          errorState={{ title: '취향 태그를 불러오지 못했어요' }}
        >
          <CourseCreatePreferenceTagFields value={value} onChange={onChange} />
        </AsyncBoundary>
      </section>
    </fieldset>
  );
};
