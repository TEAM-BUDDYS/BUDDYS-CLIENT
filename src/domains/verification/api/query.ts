import { apiClient, END_POINT } from '@/shared/api';

import type {
  ConfirmUniversityEmailRequest,
  ConfirmUniversityEmailResponse,
  SendUniversityEmailRequest,
  SendUniversityEmailResponse,
} from './type';

export const sendUniversityEmail = async (body: SendUniversityEmailRequest) => {
  const response = await apiClient
    .post(END_POINT.VERIFICATION.UNIVERSITY_EMAIL, {
      json: body,
    })
    .json<SendUniversityEmailResponse>();

  if (response.success !== true) {
    throw new Error(response.message || '인증번호를 발송하지 못했습니다.');
  }
};

export const confirmUniversityEmail = async (
  body: ConfirmUniversityEmailRequest,
) => {
  const response = await apiClient
    .post(END_POINT.VERIFICATION.UNIVERSITY_EMAIL_CONFIRM, {
      json: body,
    })
    .json<ConfirmUniversityEmailResponse>();

  if (response.success !== true) {
    throw new Error(response.message || '인증번호를 확인하지 못했습니다.');
  }
};
