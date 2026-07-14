import Link from 'next/link';

import { defaultProfileImage } from '@/shared/assets/illustrations';
import { ArchivePostCard } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { RecommendedProfile } from '../../components/recommended-profile/recommended-profile';

interface RecommendedPost {
  postId: number;
  title: string;
  content: string;
  period: {
    startDate: string;
    endDate: string;
  };

  thumbnailUrl?: string | null;
}
interface OnboardCompleteProps {
  nickname: string;
  otherNickname: string;
  otherProfileImageUrl?: string | null;
  similarityScore: number;
  recommendedPosts: RecommendedPost[];
}

export const OnboardComplete = ({
  nickname,
  otherNickname,
  otherProfileImageUrl,
  similarityScore,
  recommendedPosts,
}: OnboardCompleteProps) => {
  const recommendedProfileImage = otherProfileImageUrl ?? defaultProfileImage;
  return (
    <div className="flex flex-col gap-15">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-title-b-28 text-gray-800">환영합니다!</h1>
          <p className="text-body-m-16 text-center text-gray-500">
            {nickname} 님과 취향이 {similarityScore}% <br />
            일치하는 동행을 추천해드릴게요
          </p>
        </div>

        <RecommendedProfile
          imgUrl={recommendedProfileImage}
          nickname={otherNickname}
          percentage={similarityScore}
        />
      </div>

      <div className="flex flex-col items-center gap-2 pb-20">
        {recommendedPosts.map((post) => (
          <Link
            key={post.postId}
            href={ROUTES.POST.DETAIL(post.postId)}
            className="w-full"
          >
            <ArchivePostCard
              title={post.title}
              content={post.content}
              startDate={post.period.startDate}
              endDate={post.period.endDate}
              image={post.thumbnailUrl ?? undefined}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
