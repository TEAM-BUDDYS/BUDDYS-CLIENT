import { CommonImage } from '@/shared/components/ui';

export interface CarouselInfoProps {
  authorProfileImageUrl: string;
  nickName: string;
  title: string;
  country: string;
}

export const CarouselInfo = ({
  authorProfileImageUrl,
  nickName,
  title,
  country,
}: CarouselInfoProps) => {
  return (
    <div className="flex h-full flex-col justify-between bg-transparent">
      <div className="flex gap-2">
        <CommonImage
          src={authorProfileImageUrl}
          alt={`${title} 작성자 프로필 이미지`}
          width={24}
          height={24}
          radius="rounded-full"
          className="size-6"
        />
        <span className="text-body-r-14 flex items-center text-white">
          {nickName}
        </span>
      </div>
      <div className="flex w-50 flex-col gap-1">
        <span className="text-title-b-18 line-clamp-2 text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.12)]">
          {title}
        </span>
        <span className="text-caption-m-12 truncate text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.12)]">
          {country}
        </span>
      </div>
    </div>
  );
};
