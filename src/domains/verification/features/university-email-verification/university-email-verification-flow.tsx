'use client';

import * as Sentry from '@sentry/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { isHTTPError } from 'ky';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { USER_QUERY_KEY } from '@/shared/api';
import { Header } from '@/shared/components/layout';
import { Button, useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { confirmUniversityEmail, sendUniversityEmail } from '../../api/query';
import { VerificationHeader } from '../../components/verification-header/verification-header';
import type { VerificationEntry } from '../../model/verification-entry';
import { CodeInputStep } from './code-input-step';
import { EMAIL_PATTERN, EmailInputStep } from './email-input-step';

interface UniversityEmailVerificationFlowProps {
  entryPoint: VerificationEntry;
}

type UniversityEmailVerificationStep = 1 | 2;
const UNIVERSITY_EMAIL_VERIFICATION_STEP_HEADER = {
  1: {
    title: '학교 이메일로\n신원 인증하기',
    description: '신원 인증을 위해 한국 학교 이메일이 필요해요',
  },
  2: {
    title: '인증번호 입력하기',
    description: '이메일에서 받은 인증번호를 입력해주세요',
  },
};

export const UniversityEmailVerificationFlow = ({
  entryPoint,
}: UniversityEmailVerificationFlowProps) => {
  const [currentStep, setCurrentStep] =
    useState<UniversityEmailVerificationStep>(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const isValidEmail = EMAIL_PATTERN.test(email.trim());
  const isVerificationCodeComplete = verificationCode.length === 6;

  const router = useRouter();
  const exchangeDocumentVerificationHref = `${ROUTES.VERIFICATION.EXCHANGE_DOCUMENT}?from=${entryPoint}`;

  const queryClient = useQueryClient();

  const { showToast } = useToast();
  const { logout } = useAuthSession();
  const [isLogout, setIsLogout] = useState(false);

  const handleBackButtonClick = async () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      return;
    }

    if (entryPoint === 'login') {
      if (isLogout) return;

      setIsLogout(true);

      try {
        await logout();
        router.replace(ROUTES.AUTH.LOGIN);
      } catch (error) {
        Sentry.captureException(error);
        setIsLogout(false);

        showToast('로그아웃에 실패했어요. 잠시 후 다시 시도해 주세요.', {
          variant: 'gray',
        });
      }
      return;
    }
    router.back();
  };

  const requestVerificationCode = async () => {
    if (!isValidEmail || isSending) {
      return false;
    }

    setIsSending(true);

    try {
      await sendUniversityEmail({
        email: email.trim(),
      });

      return true;
    } catch (error) {
      const message =
        isHTTPError(error) && error.response.status === 404
          ? '등록된 학교 이메일이 아닙니다.'
          : '인증번호 발송에 실패했습니다. 잠시 후 다시 시도해 주세요.';

      showToast(message, {
        bottomOffsetClassName: 'bottom-24.5',
        variant: 'gray',
      });

      return false;
    } finally {
      setIsSending(false);
    }
  };

  const handleSendVerificationCode = async () => {
    const isSuccess = await requestVerificationCode();

    if (!isSuccess) {
      return;
    }

    setVerificationCode('');
    setCurrentStep(2);
  };

  const handleResendVerificationCode = async () => {
    const isSuccess = await requestVerificationCode();

    if (!isSuccess) {
      return;
    }

    setVerificationCode('');
    showToast('인증번호를 다시 전송했습니다.', {
      bottomOffsetClassName: 'bottom-24.5',
    });
  };

  const handleConfirmVerificationCode = async () => {
    if (!isVerificationCodeComplete || isConfirming) return;

    setIsConfirming(true);

    try {
      await confirmUniversityEmail({
        code: verificationCode,
      });

      if (entryPoint === 'login') {
        router.replace(exchangeDocumentVerificationHref);
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.ME(),
      });

      router.back();
    } catch (error) {
      const status = isHTTPError(error) ? error.response.status : undefined;

      const message =
        status === 400
          ? '인증번호가 올바르지 않거나 만료되었습니다.'
          : status === 429
            ? '인증번호 입력 횟수를 초과했습니다. 인증번호를 다시 발급해 주세요.'
            : '인증번호 확인에 실패했습니다. 잠시 후 다시 시도해 주세요.';

      showToast(message, {
        bottomOffsetClassName: 'bottom-24.5',
        variant: 'gray',
      });
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col">
      <Header hasBackButton onBackClick={handleBackButtonClick} />

      <section className="flex flex-col px-4 pt-10">
        <div className="mb-10">
          <VerificationHeader
            title={UNIVERSITY_EMAIL_VERIFICATION_STEP_HEADER[currentStep].title}
            description={
              UNIVERSITY_EMAIL_VERIFICATION_STEP_HEADER[currentStep].description
            }
          />
        </div>

        {currentStep === 1 ? (
          <EmailInputStep email={email} onEmailChange={setEmail} />
        ) : (
          <CodeInputStep
            code={verificationCode}
            onCodeChange={setVerificationCode}
          />
        )}
      </section>

      <div className="mt-auto mb-8.5 flex flex-col gap-4 px-4">
        {currentStep === 1 && (
          <>
            <Button
              disabled={!isValidEmail || isSending}
              onClick={handleSendVerificationCode}
            >
              계속하기
            </Button>

            {entryPoint === 'login' && (
              <Link
                className="text-body-r-14 text-center text-gray-500"
                href={exchangeDocumentVerificationHref}
              >
                건너뛰기
              </Link>
            )}
          </>
        )}

        {currentStep === 2 && (
          <>
            <Button
              disabled={!isVerificationCodeComplete || isConfirming}
              onClick={handleConfirmVerificationCode}
            >
              인증완료
            </Button>
            <div className="flex items-center justify-center gap-2">
              <span className="text-body-r-14 text-gray-500">
                이메일이 오지 않았나요?
              </span>
              <button
                className="text-body-sb-14 text-gray-800"
                type="button"
                disabled={isSending}
                onClick={handleResendVerificationCode}
              >
                다시 보내기
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
