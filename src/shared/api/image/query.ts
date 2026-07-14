import { mutationOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import type {
  CreatePresignedUrlRequest,
  CreatePresignedUrlResponse,
  UploadImageVariables,
} from './type';

const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const isSupportedImageType = (
  type: string,
): type is CreatePresignedUrlRequest['contentType'] => {
  return SUPPORTED_IMAGE_TYPES.some((supportedType) => supportedType === type);
};

const createPresignedUrl = async (body: CreatePresignedUrlRequest) => {
  const response = await apiClient
    .post(END_POINT.IMAGE.PRESIGNED_URL, {
      json: body,
    })
    .json<CreatePresignedUrlResponse>();

  if (!response.success) {
    throw new Error(
      response.message || '이미지 업로드 URL을 발급하지 못했습니다.',
    );
  }

  const uploadUrl = response.data?.uploadUrl;
  const imageUrl = response.data?.imageUrl;

  if (!uploadUrl || !imageUrl) {
    throw new Error('이미지 업로드 URL 응답 형식이 올바르지 않습니다.');
  }

  return { imageUrl, uploadUrl };
};

const uploadImageToStorage = async (uploadUrl: string, file: File) => {
  let response: Response;

  try {
    response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
  } catch {
    throw new Error('네트워크 연결을 확인한 뒤 다시 시도해 주세요.');
  }

  if (!response.ok) {
    throw new Error('이미지를 업로드하지 못했습니다.');
  }
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

  const { imageUrl, uploadUrl } = await createPresignedUrl({
    imageDomain,
    contentType: file.type,
    fileSize: file.size,
  });

  await uploadImageToStorage(uploadUrl, file);

  return imageUrl;
};

export const IMAGE_MUTATION_OPTIONS = {
  UPLOAD: () =>
    mutationOptions({
      mutationFn: uploadImage,
    }),
};
