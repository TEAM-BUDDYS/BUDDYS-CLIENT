'use client';

import type { ChangeEvent } from 'react';

import { ImageInput } from '@/domains/posts/components/image-input/image-input';
import { ImagePreview } from '@/domains/posts/components/image-preview/image-preview';

import { MAX_IMAGE_COUNT } from './constants';
import type { PostCreateImage } from './model';

interface PostCreateImageFieldProps {
  images: PostCreateImage[];
  onImagesAdd: (files: File[]) => void;
  onImageRemove: (previewUrl: string) => void;
}

export const PostCreateImageField = ({
  images,
  onImagesAdd,
  onImageRemove,
}: PostCreateImageFieldProps) => {
  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const remainingImageCount = Math.max(0, MAX_IMAGE_COUNT - images.length);
    const files = Array.from(event.target.files ?? []).slice(
      0,
      remainingImageCount,
    );

    if (files.length > 0) {
      onImagesAdd(files);
    }

    event.target.value = '';
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-body-sb-15 text-gray-800">사진</h2>
        <p className="text-caption-r-12 text-gray-500">
          최대 10개 선택 ({images.length}/{MAX_IMAGE_COUNT})
        </p>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        <ImageInput
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="shrink-0"
          disabled={images.length >= MAX_IMAGE_COUNT}
          onChange={handleImageInputChange}
        />
        {images.map((image, index) => (
          <ImagePreview
            key={image.previewUrl}
            src={image.previewUrl}
            alt={`선택한 이미지 ${index + 1}`}
            onRemove={() => onImageRemove(image.previewUrl)}
          />
        ))}
      </div>
    </section>
  );
};
