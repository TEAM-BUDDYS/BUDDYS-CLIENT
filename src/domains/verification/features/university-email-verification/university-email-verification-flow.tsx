'use client';

import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { Header } from '@/shared/components/layout';
import { Button } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

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

  const isValidEmail = EMAIL_PATTERN.test(email.trim());
  const isVerificationCodeComplete = verificationCode.length === 6;

  const router = useRouter();
  const exchangeDocumentVerificationHref = `${ROUTES.VERIFICATION.EXCHANGE_DOCUMENT}?from=${entryPoint}`;

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
      }
      return;
    }
    router.back();
  };

  const handleSendVerificationCode = () => {
    // TODO: 학교 이메일 인증번호 발송 API 성공 후 인증번호 입력 단계로 이동
    setVerificationCode('');
    setCurrentStep(2);
  };

  const handleConfirmVerificationCode = () => {
    // TODO: 학교 이메일 인증번호 확인 API 호출
    if (entryPoint === 'login') {
      router.replace(exchangeDocumentVerificationHref);
      return;
    }

    router.back();
  };

  const handleResendVerificationCode = () => {
    // TODO: 현재 학교 이메일로 인증번호 재발송 API 성공 후 입력값 초기화
    setVerificationCode('');
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
              disabled={!isValidEmail}
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
              disabled={!isVerificationCodeComplete}
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
