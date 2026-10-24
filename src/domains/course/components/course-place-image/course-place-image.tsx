'use client';

import { useState } from 'react';

import { getApiResourceUrl } from '@/shared/api';
import { PhotoAlbumIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui';

interface CoursePlaceImageProps {
  photoUrl?: string | null;
}

export const CoursePlaceImage = ({ photoUrl }: CoursePlaceImageProps) => {
  const [failedPhotoUrl, setFailedPhotoUrl] = useState<string>();
  const resolvedPhotoUrl = photoUrl ? getApiResourceUrl(photoUrl) : null;
  const hasImageError = failedPhotoUrl === resolvedPhotoUrl;

  if (!resolvedPhotoUrl || hasImageError) {
    return (
      <span
        aria-hidden
        className="flex size-25 shrink-0 items-center justify-center rounded-xl bg-gray-100"
      >
        <PhotoAlbumIcon className="size-6" />
      </span>
    );
  }

  return (
    <CommonImage
      unoptimized
      src={resolvedPhotoUrl}
      alt=""
      width={100}
      height={100}
      radius="rounded-xl"
      className="size-25 shrink-0"
      onError={() => setFailedPhotoUrl(resolvedPhotoUrl)}
    />
  );
};
