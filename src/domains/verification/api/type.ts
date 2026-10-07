import type { components } from '@/types/schema';

export type SendUniversityEmailRequest =
  components['schemas']['UniversityVerificationRequest'];

export type SendUniversityEmailResponse =
  components['schemas']['BaseResponseVoid'];

export type ConfirmUniversityEmailRequest =
  components['schemas']['UniversityVerificationConfirmRequest'];

export type ConfirmUniversityEmailResponse =
  components['schemas']['BaseResponseVoid'];
