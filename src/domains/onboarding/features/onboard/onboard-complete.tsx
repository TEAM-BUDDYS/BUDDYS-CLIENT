import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { HOME_QUERY_OPTIONS } from '@/domains/home/api/query';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { ArchivePostCard } from '@/shared/components/ui';

import { RecommendedProfile } from '../../components/recommended-profile/recommended-profile';

const RECOMMENDED_POST_SIZE = 4;

interface OnboardCompleteProps {
  nickname: string;
  otherNickname: string;
  otherProfileImageUrl?: string | null;
  similarityScore: number;
}

export const OnboardComplete = ({
  nickname,
  otherNickname,
  otherProfileImageUrl,
  similarityScore,
}: OnboardCompleteProps) => {
  const { data } = useQuery(
    HOME_QUERY_OPTIONS.RECOMMENDED_POSTS({
      size: RECOMMENDED_POST_SIZE,
    }),
  );

  const recommendedPosts = (data?.data?.posts ?? []).filter(
    (post) => post.postId && post.period?.startDate && post.period.endDate,
  );
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
            href={`/posts/${post.postId}`}
            className="w-full"
          >
            <ArchivePostCard
              title={post.title ?? ''}
              content={post.content ?? ''}
              startDate={post.period?.startDate ?? ''}
              endDate={post.period?.endDate ?? ''}
              image={post.thumbnailUrl ?? undefined}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
