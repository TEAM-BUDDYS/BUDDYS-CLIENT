import documentImage from '@/domains/auth/asset/illustrations/document.svg';
import { LoginRedirect } from '@/domains/auth/features/auth-session/login-redirect';
import { GoogleLoginButton } from '@/domains/auth/features/google-login/google-login-button';
import { KakaoLoginButton } from '@/domains/auth/features/kakao-login/kakao-login-button';
import { CommonImage } from '@/shared/components/ui';

export default function LoginPage() {
  return (
    <>
      <LoginRedirect />

      <main className="flex min-h-dvh flex-col items-center px-4">
        <section className="flex max-w-50 flex-1 flex-col items-center justify-center gap-10">
          <CommonImage
            src={documentImage}
            alt="문서 이미지"
            width={100}
            height={116}
            radius="rounded-none"
            preload
          />

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-title-b-22 text-gray-800">간편하게 시작하기</h1>
            <p className="text-body-m-15 text-gray-500">
              소셜 계정으로 바로 가입하고 <br /> 동행을 찾아보세요
            </p>
          </div>
        </section>

        <div className="flex w-full flex-col gap-3 pb-8.5">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>
      </main>
    </>
  );
}
