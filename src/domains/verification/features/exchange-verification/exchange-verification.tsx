'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';

import { cn } from '@/lib/cn';
import { XCircleIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';
import { Button, useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { FileUpload } from '../../components/file-upload/file-upload';
import { VerificationHeader } from '../../components/verification-header/verification-header';
import type { VerificationEntry } from '../../model/verification-entry';

interface ExchangeVerificationProps {
  entryPoint: VerificationEntry;
}

type FileValidationError = 'file-type' | 'file-size';

const ACCEPTED_FILE_TYPES: string[] = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const FILE_ERROR_MESSAGES: Record<FileValidationError, string> = {
  'file-type': 'JPG, PNG, PDF 파일만 업로드할 수 있어요',
  'file-size': '10MB 이하의 파일만 업로드 가능합니다.',
};

export const ExchangeVerification = ({
  entryPoint,
}: ExchangeVerificationProps) => {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<FileValidationError | null>(null);
  const [hasUploadError, setHasUploadError] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  const router = useRouter();
  const universityEmailVerificationHref = `${ROUTES.VERIFICATION.UNIVERSITY_EMAIL}?from=${entryPoint}`;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setHasUploadError(false);

    const validationError = !ACCEPTED_FILE_TYPES.includes(file.type)
      ? 'file-type'
      : file.size > MAX_FILE_SIZE
        ? 'file-size'
        : null;

    setFileError(validationError);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFileError(null);
    setHasUploadError(false);
    setFileInputKey((currentKey) => currentKey + 1);
  };

  const handleSubmit = () => {
    if (fileError) {
      setHasUploadError(true);
      showToast(FILE_ERROR_MESSAGES[fileError], {
        bottomOffsetClassName: 'bottom-[139px]',
        variant: 'gray',
      });
      return;
    }
  };

  const handleBackButtonClick = () => {
    if (entryPoint === 'login') {
      router.replace(universityEmailVerificationHref);
      return;
    }

    router.back();
  };

  const canSubmit = selectedFile !== null;

  return (
    <main className="flex min-h-dvh flex-col">
      <Header hasBackButton onBackClick={handleBackButtonClick} />

      <section className="flex flex-col px-4 pt-10">
        <VerificationHeader
          description={'교환학생 입학허가서 등\n관련 서류를 업로드해주세요'}
          title={'파견교 서류로\n교환학생 인증하기'}
        />

        <div className="mt-10 flex flex-col gap-4">
          <FileUpload
            key={fileInputKey}
            accept={ACCEPTED_FILE_TYPES.join(',')}
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div
              className={cn(
                'flex h-13 items-center gap-3 rounded-xl border-2 bg-white px-4',
                hasUploadError ? 'border-error-50' : 'border-mint-200',
              )}
            >
              <span className="text-body-m-15 min-w-0 flex-1 truncate text-gray-800">
                {selectedFile.name}
              </span>

              <button
                aria-label="선택한 파일 삭제"
                className="shrink-0 rounded-full"
                type="button"
                onClick={handleFileRemove}
              >
                <XCircleIcon aria-hidden className="size-6 text-gray-200" />
              </button>
            </div>
          )}

          <p className="text-body-r-14 text-center text-gray-500">
            관리자 확인까지 1~2일 소요됩니다
          </p>
        </div>
      </section>

      <div className="mt-auto mb-8.5 flex flex-col gap-4 px-4">
        <Button disabled={!canSubmit} onClick={handleSubmit}>
          제출하기
        </Button>

        {entryPoint === 'login' && (
          <button
            className="text-body-r-14 text-center text-gray-500"
            type="button"
            onClick={() => router.replace(ROUTES.ONBOARDING_INTRO)}
          >
            건너뛰기
          </button>
        )}
      </div>
    </main>
  );
};
