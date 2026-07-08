import earthImage from '@/domains/landing/asset/earth.webp';
import { BuddysLogo } from '@/shared/components/icons/buddys-logo';
import { CommonImage } from '@/shared/components/ui';

export default function LandingPage() {
  return (
    <section className="flex max-w-50 flex-col items-center gap-10">
      <CommonImage
        src={earthImage}
        alt="지구 그림"
        width={120}
        height={145.629}
        radius="rounded-none"
      />

      <div className="flex flex-col items-center gap-2">
        <header>{<BuddysLogo />}</header>
        <p className="text-body-r-14 text-gray-500">
          취향에 맞는 교환학생 동행을 찾고 함께한 코스를 기록하세요
        </p>
      </div>
    </section>
  );
}
