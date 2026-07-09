import documentImage from '@/domains/auth/asset/document.svg';
import { CommonImage } from '@/shared/components/ui';

export const LoginMain = () => {
  return (
    <section className="flex max-w-50 flex-col items-center gap-10">
      <CommonImage
        src={documentImage}
        alt="문서 이미지"
        width={100}
        height={116}
        radius="rounded-none"
        preload
      />

      <div className="flex flex-col items-center gap-2 text-center">
        <header className="text-title-b-22 text-gray-800">
          간편하게 시작하기
        </header>
        <p className="text-body-m-15 text-gray-500">
          소셜 계정으로 바로 가입하고 <br /> 동행을 찾아보세요
        </p>
      </div>
    </section>
  );
};
