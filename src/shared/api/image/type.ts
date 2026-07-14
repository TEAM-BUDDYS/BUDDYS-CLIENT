import type { components } from '@/types/schema';

export type CreatePresignedUrlRequest =
  components['schemas']['PresignedUrlRequest'];
export type CreatePresignedUrlResponse =
  components['schemas']['BaseResponsePresignedUrlResponse'];

export interface UploadImageVariables {
  file: File;
  imageDomain: CreatePresignedUrlRequest['imageDomain'];
}
