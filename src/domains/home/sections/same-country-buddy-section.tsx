import { CardProfile } from '@/domains/home/components/card-profile/card-profile';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';

export interface SameCountryBuddyItem {
  nickname: string;
  country: string;
  ageGroup: string;
  matchingRate: number;
  imageUrl: string;
  href: string;
}

interface SameCountryBuddySectionProps {
  items: SameCountryBuddyItem[];
}

export const SameCountryBuddySection = ({
  items,
}: SameCountryBuddySectionProps) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        label="오늘의 추천 동행"
        title="같은 파견 국가의 학생이에요"
      />

      <div className="-mx-4 scrollbar-none overflow-x-auto px-4">
        <div className="flex gap-3">
          {items.map((item) => (
            <CardProfile key={`${item.nickname}-${item.imageUrl}`} {...item} />
          ))}
          <div aria-hidden="true" className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
};
