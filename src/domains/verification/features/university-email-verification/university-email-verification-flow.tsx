'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const exchangeVerificationHref = `${ROUTES.VERIFICATION.EXCHANGE}?from=${entryPoint}`;

  const handleBackButtonClick = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      return;
    }

    if (entryPoint === 'login') {
      // TODO: 로그아웃 API를 호출하고 인증 세션을 초기화한 뒤 로그인 페이지로 이동
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    router.back();
  };

  const handleSendVerificationCode = () => {
    // TODO: 학교 이메일 인증번호 발송 API 호출한 뒤 인증번호 입력 단계로 이동
    setCurrentStep(2);
  };

  const handleConfirmVerificationCode = () => {
    // TODO: 학교 이메일 인증번호 확인 API 호출
    if (entryPoint === 'login') {
      router.replace(exchangeVerificationHref);
      return;
    }

    router.back();
  };

  const handleResendVerificationCode = () => {
    // TODO: 현재 학교 이메일로 인증번호 발송 API 호출
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
                href={exchangeVerificationHref}
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
