import Link from 'next/link';

import { earthImage } from '@/shared/assets/illustrations';
import { BuddysLogoIcon } from '@/shared/components/icons';
import { CommonImage } from '@/shared/components/ui';
import { Button } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center px-4">
      <section className="flex max-w-50 flex-1 flex-col items-center justify-center gap-10">
        <CommonImage
          src={earthImage}
          alt="지구 이미지"
          width={120}
          height={146}
          radius="rounded-none"
          preload
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <BuddysLogoIcon
            className="text-gray-800"
            width={120}
            height={32}
            aria-label="버디즈"
          />
          <p className="text-body-r-14 text-gray-500">
            취향에 맞는 교환학생 동행을 찾고 <br /> 함께한 코스를 기록하세요
          </p>
        </div>
      </section>

      <div className="flex w-full flex-col items-center gap-4 pb-[34px]">
        <Link href={ROUTES.AUTH.LOGIN} className="w-full">
          <Button>시작하기</Button>
        </Link>
        <div className="flex items-center justify-center gap-2">
          <p className="text-body-r-14 text-gray-500">이미 계정이 있나요?</p>
          <Link href={ROUTES.AUTH.LOGIN}>
            <button className="text-body-sb-14 text-gray-800">로그인</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
