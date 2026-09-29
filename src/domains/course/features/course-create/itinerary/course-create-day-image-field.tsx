'use client';

import type { ChangeEvent } from 'react';

import { validateImageFile } from '@/shared/api/image';
import { ImageInput, ImagePreview, useToast } from '@/shared/components/ui';

import { COURSE_CREATE_MAX_DAY_IMAGE_COUNT } from '../constants';
import type { CourseCreateDayFormState } from '../model';

interface CourseCreateDayImageFieldProps {
  dayNumber: CourseCreateDayFormState['dayNumber'];
  images: CourseCreateDayFormState['images'];
  onImagesAdd: (
    dayNumber: CourseCreateDayFormState['dayNumber'],
    files: File[],
  ) => void;
  onImageRemove: (
    dayNumber: CourseCreateDayFormState['dayNumber'],
    previewUrl: string,
  ) => void;
}

export const CourseCreateDayImageField = ({
  dayNumber,
  images,
  onImagesAdd,
  onImageRemove,
}: CourseCreateDayImageFieldProps) => {
  const { showToast } = useToast();

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const remainingImageCount = Math.max(
      0,
      COURSE_CREATE_MAX_DAY_IMAGE_COUNT - images.length,
    );
    const files = Array.from(event.target.files ?? []).slice(
      0,
      remainingImageCount,
    );
    const validFiles = files.filter((file) => {
      try {
        validateImageFile(file);
        return true;
      } catch (error) {
        showToast(
          error instanceof Error
            ? error.message
            : '이미지 파일을 확인해 주세요.',
          { variant: 'gray' },
        );
        return false;
      }
    });

    if (validFiles.length > 0) {
      onImagesAdd(dayNumber, validFiles);
    }

    event.target.value = '';
  };

  return (
    <section className="flex min-w-0 flex-col gap-3">
      <div className="flex items-center gap-2">
        <h3 className="text-body-sb-14 text-gray-800">사진</h3>
        <p className="text-caption-r-12 text-gray-500">
          최소 1개 선택 ({images.length}/{COURSE_CREATE_MAX_DAY_IMAGE_COUNT})
        </p>
      </div>

      <div className="flex scrollbar-none gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
        <ImageInput
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="shrink-0"
          disabled={images.length >= COURSE_CREATE_MAX_DAY_IMAGE_COUNT}
          label={`Day ${dayNumber} 사진 추가`}
          onChange={handleImageInputChange}
        />
        {images.map((image, index) => (
          <ImagePreview
            key={image.previewUrl}
            src={image.previewUrl}
            alt={`Day ${dayNumber} 선택한 이미지 ${index + 1}`}
            onRemove={() => onImageRemove(dayNumber, image.previewUrl)}
          />
        ))}
      </div>
    </section>
  );
};
