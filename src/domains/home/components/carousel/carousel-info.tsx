import { CommonImage } from '@/shared/components/ui';

export interface CarouselInfoProps {
  authorProfileImageUrl: string;
  title: string;
  country: string;
  viewCount: number;
}

export const CarouselInfo = ({
  authorProfileImageUrl,
  title,
  country,
  viewCount,
}: CarouselInfoProps) => {
  return (
    <div className="flex items-center gap-2 bg-transparent">
      <CommonImage
        src={authorProfileImageUrl}
        alt={`${title} 작성자 프로필 이미지`}
        width={48}
        height={48}
        radius="rounded-full"
        className="size-12"
      />
      <div className="flex w-37 flex-col gap-1">
        <span className="text-title-b-18 truncate text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.12)]">
          {title}
        </span>
        <span className="text-body-m-15 truncate text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.12)]">
          {country} | 조회수 {viewCount}
        </span>
      </div>
    </div>
  );
};
