import { CommonImage } from '@/shared/components/ui';

export interface CarouselInfoProps {
  profileImageUrl: string;
  title: string;
  country: string;
  viewCount: number;
}

export const CarouselInfo = ({
  profileImageUrl,
  title,
  country,
  viewCount,
}: CarouselInfoProps) => {
  return (
    <div className="flex items-center gap-2 bg-transparent">
      <CommonImage
        src={profileImageUrl}
        alt={`${title} 작성자 프로필 이미지`}
        width={48}
        height={48}
        radius="rounded-full"
        unoptimized
      />
      <div className="flex w-37 flex-col gap-1">
        <span className="text-title-b-18 truncate text-white">{title}</span>
        <span className="text-body-m-15 truncate text-white">
          {country} | 조회수 {viewCount}
        </span>
      </div>
    </div>
  );
};
