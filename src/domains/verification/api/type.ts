import type { components } from '@/types/schema';

export type ExchangeDocumentUploadUrlRequest =
  components['schemas']['ExchangeDocumentUploadUrlRequest'];

export type ExchangeDocumentUploadUrlResponse =
  components['schemas']['BaseResponseExchangeDocumentUploadUrlResponse'];

export type ExchangeVerificationSubmitRequest =
  components['schemas']['ExchangeVerificationSubmitRequest'];

export type ExchangeVerificationSubmitResponse =
  components['schemas']['BaseResponseExchangeVerificationSubmitResponse'];

export type SendUniversityEmailRequest =
  components['schemas']['UniversityVerificationRequest'];

export type SendUniversityEmailResponse =
  components['schemas']['BaseResponseVoid'];

export type ConfirmUniversityEmailRequest =
  components['schemas']['UniversityVerificationConfirmRequest'];

export type ConfirmUniversityEmailResponse =
  components['schemas']['BaseResponseVoid'];
