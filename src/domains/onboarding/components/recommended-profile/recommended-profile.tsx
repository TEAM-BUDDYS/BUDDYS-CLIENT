import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface RecommendedProfileProps {
  imgUrl: string;
  nickname: string;
  percentage: number;
}

export const RecommendedProfile = ({
  imgUrl,
  nickname,
  percentage,
}: RecommendedProfileProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CommonImage
        src={imgUrl}
        alt={`${nickname} 프로필 사진`}
        width={120}
        height={120}
        radius="rounded-full"
      />

      <p className="text-body-m-16 text-gray-500">
        {nickname} · {percentage}% 일치
      </p>
    </div>
  );
};
