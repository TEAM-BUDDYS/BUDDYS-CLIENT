import documentImage from '@/domains/auth/asset/document.svg';
import { KakaoIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui';
import { Button } from '@/shared/components/ui';

export default function LoginPage() {
  return (
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

      <div className="w-full pb-[34px]">
        <Button
          variant="kakao"
          align="center"
          icon={<KakaoIcon />}
          iconSize="lg"
        >
          카카오로 시작하기
        </Button>
      </div>
    </main>
  );
}
