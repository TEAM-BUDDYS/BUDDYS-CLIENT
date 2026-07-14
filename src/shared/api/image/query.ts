import { mutationOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import type {
  CreatePresignedUrlRequest,
  CreatePresignedUrlResponse,
} from './type';

const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

interface UploadImageVariables {
  file: File;
  imageDomain: CreatePresignedUrlRequest['imageDomain'];
}

const isSupportedImageType = (
  type: string,
): type is CreatePresignedUrlRequest['contentType'] => {
  return SUPPORTED_IMAGE_TYPES.some((supportedType) => supportedType === type);
};

const uploadImage = async ({
  file,
  imageDomain,
}: UploadImageVariables): Promise<string> => {
  if (!isSupportedImageType(file.type)) {
    throw new Error('지원하지 않는 이미지 형식입니다.');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('이미지 크기는 10MB 이하여야 합니다.');
  }

  const response = await apiClient
    .post(END_POINT.IMAGE.PRESIGNED_URL, {
      json: {
        imageDomain,
        contentType: file.type,
        fileSize: file.size,
      } satisfies CreatePresignedUrlRequest,
    })
    .json<CreatePresignedUrlResponse>();

  const uploadUrl = response.data?.uploadUrl;
  const imageUrl = response.data?.imageUrl;

  if (!response.success || !uploadUrl || !imageUrl) {
    throw new Error(
      response.message || '이미지 업로드 URL을 발급하지 못했습니다.',
    );
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error('이미지를 업로드하지 못했습니다.');
  }

  return imageUrl;
};

export const IMAGE_MUTATION_OPTIONS = {
  UPLOAD: () =>
    mutationOptions({
      mutationFn: uploadImage,
    }),
};
