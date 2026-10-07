import { apiClient, END_POINT } from '@/shared/api';

import { validateExchangeDocumentFile } from '../model/exchange-document';
import type {
  ExchangeDocumentUploadUrlRequest,
  ExchangeDocumentUploadUrlResponse,
  ExchangeVerificationSubmitRequest,
  ExchangeVerificationSubmitResponse,
} from './type';

export const createExchangeDocumentUploadUrl = async (
  body: ExchangeDocumentUploadUrlRequest,
) => {
  const response = await apiClient
    .post(END_POINT.VERIFICATION.EXCHANGE_UPLOAD_URL, {
      json: body,
    })
    .json<ExchangeDocumentUploadUrlResponse>();

  const uploadUrl = response.data?.uploadUrl;
  const fields = response.data?.fields;
  const documentKey = response.data?.documentKey;

  if (response.success !== true || !uploadUrl || !fields || !documentKey) {
    throw new Error(
      response.message || '서류 업로드 URL을 발급받지 못했습니다.',
    );
  }

  return {
    uploadUrl,
    fields,
    documentKey,
  };
};

export const uploadExchangeDocument = async (
  uploadUrl: string,
  fields: Record<string, string>,
  file: File,
) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append('file', file);

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('서류를 업로드하지 못했습니다.');
  }
};

export const submitExchangeVerification = async (
  body: ExchangeVerificationSubmitRequest,
) => {
  const response = await apiClient
    .post(END_POINT.VERIFICATION.EXCHANGE, {
      json: body,
    })
    .json<ExchangeVerificationSubmitResponse>();

  if (
    response.success !== true ||
    typeof response.data?.verificationId !== 'number' ||
    !response.data.status
  ) {
    throw new Error(response.message || '파견교 인증을 신청하지 못했습니다.');
  }

  return response.data;
};

export const requestExchangeVerification = async (file: File) => {
  const validationResult = validateExchangeDocumentFile(file);

  if (!validationResult.isValid) {
    throw new Error(
      validationResult.error === 'file-type'
        ? '지원하지 않는 파일 형식입니다.'
        : '10MB 이하의 파일만 업로드할 수 있습니다.',
    );
  }

  const { contentType } = validationResult;
  const { uploadUrl, fields, documentKey } =
    await createExchangeDocumentUploadUrl({
      contentType,
      fileSize: file.size,
    });

  await uploadExchangeDocument(uploadUrl, fields, file);

  return submitExchangeVerification({
    documentKey,
    originalFileName: file.name,
    contentType,
    fileSize: file.size,
  });
};
