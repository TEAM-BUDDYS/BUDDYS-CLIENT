export const ACCEPTED_EXCHANGE_DOCUMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
] as const;

export const MAX_EXCHANGE_DOCUMENT_SIZE = 10 * 1024 * 1024;

export type ExchangeDocumentContentType =
  (typeof ACCEPTED_EXCHANGE_DOCUMENT_TYPES)[number];

export type ExchangeDocumentValidationError = 'file-type' | 'file-size';

type ExchangeDocumentValidationResult =
  | {
      isValid: true;
      contentType: ExchangeDocumentContentType;
    }
  | {
      isValid: false;
      error: ExchangeDocumentValidationError;
    };

export const isExchangeDocumentContentType = (
  contentType: string,
): contentType is ExchangeDocumentContentType => {
  return ACCEPTED_EXCHANGE_DOCUMENT_TYPES.some(
    (acceptedType) => acceptedType === contentType,
  );
};

export const validateExchangeDocumentFile = (
  file: File,
): ExchangeDocumentValidationResult => {
  if (!isExchangeDocumentContentType(file.type)) {
    return { isValid: false, error: 'file-type' };
  }

  if (file.size > MAX_EXCHANGE_DOCUMENT_SIZE) {
    return { isValid: false, error: 'file-size' };
  }

  return { isValid: true, contentType: file.type };
};
