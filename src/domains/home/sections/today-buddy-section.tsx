import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { CommonImage } from '@/shared/components/ui';

import { Carousel } from '../components/carousel/carousel';

const temporaryHeaderImage =
  "data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='84' height='84' rx='16' fill='%23F1F4F9'/%3E%3Ccircle cx='42' cy='34' r='14' fill='%23CDD3DE'/%3E%3Cpath d='M20 70C23.7 56.3 31.9 48 42 48C52.1 48 60.3 56.3 64 70H20Z' fill='%23CDD3DE'/%3E%3C/svg%3E";

const temporaryImage =
  "data:image/svg+xml,%3Csvg width='412' height='264' viewBox='0 0 412 264' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='412' height='264' fill='%23B0F0F3'/%3E%3Ccircle cx='314' cy='64' r='60' fill='%23ECFF56'/%3E%3Cpath d='M0 199L82 128L151 178L224 104L412 244V264H0V199Z' fill='%2300A6AC'/%3E%3Cpath d='M0 218L105 146L182 203L258 142L412 246V264H0V218Z' fill='%23005D61'/%3E%3C/svg%3E";

const temporaryProfileImage =
  "data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' rx='24' fill='%23E5EAF2'/%3E%3Ccircle cx='24' cy='18' r='8' fill='%239398A4'/%3E%3Cpath d='M10 42C12.2 33.8 17.4 29 24 29C30.6 29 35.8 33.8 38 42H10Z' fill='%239398A4'/%3E%3C/svg%3E";

const todayBuddyItems = [
  {
    href: '/posts/1',
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '최대 17자 제목이에요',
      country: '일본',
      viewCount: 1234,
    },
  },
  {
    href: '/posts/2',
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '도쿄 같이 걸을 버디',
      country: '일본',
      viewCount: 856,
    },
  },
  {
    href: '/posts/3',
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '주말 여행 동행 구해요',
      country: '대만',
      viewCount: 432,
    },
  },
];

export const TodayBuddySection = () => {
  return (
    <section className="flex flex-col gap-5 pt-5">
      <SectionHeader
        label="오늘의 추천 동행"
        title="함께 떠날 버디를 찾아보세요"
        rightSlot={
          <CommonImage
            src={temporaryHeaderImage}
            alt="오늘의 추천 동행 이미지"
            width={44}
            height={44}
            radius="rounded-lg"
            unoptimized
            className="size-11"
          />
        }
      />
      <Carousel items={todayBuddyItems} />
    </section>
  );
};
