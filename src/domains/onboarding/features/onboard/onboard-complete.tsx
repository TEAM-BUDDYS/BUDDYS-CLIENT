import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { RECOMMENDATION_QUERY_OPTIONS } from '@/shared/api';
import type { RecommendedPost } from '@/shared/api/recommended-posts/type';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import {
  ArchivePostCard,
  AsyncBoundary,
  EmptyState,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { RecommendedProfile } from '../../components/recommended-profile/recommended-profile';

const RECOMMENDED_POST_SIZE = 4;

type DisplayableRecommendedPost = RecommendedPost & {
  postId: number;
  period: {
    startDate: string;
    endDate: string;
  };
};

const isDisplayableRecommendedPost = (
  post: RecommendedPost,
): post is DisplayableRecommendedPost => {
  return Boolean(post.postId && post.period?.startDate && post.period.endDate);
};

interface OnboardCompleteProps {
  nickname: string;
  otherNickname: string;
  otherProfileImageUrl?: string | null;
  similarityScore: number;
}

const RecommendedPostList = () => {
  const { data } = useSuspenseQuery(
    RECOMMENDATION_QUERY_OPTIONS.RECOMMENDED_POSTS({
      size: RECOMMENDED_POST_SIZE,
      requireImage: false,
    }),
  );

  const recommendedPosts = (data?.data?.posts ?? []).filter(
    isDisplayableRecommendedPost,
  );

  if (recommendedPosts.length === 0) {
    return (
      <EmptyState
        title="아직 추천할 동행 게시물이 없어요"
        description="관심 정보가 쌓이면 더 잘 맞는 동행을 보여드릴게요"
        className="py-8"
      />
    );
  }

  return (
    <>
      {recommendedPosts.map((post) => (
        <Link
          key={post.postId}
          href={ROUTES.POST.DETAIL(post.postId)}
          className="w-full"
        >
          <ArchivePostCard
            title={post.title ?? ''}
            content={post.content ?? ''}
            startDate={post.period.startDate}
            endDate={post.period.endDate}
            image={post.thumbnailUrl ?? undefined}
          />
        </Link>
      ))}
    </>
  );
};

export const OnboardComplete = ({
  nickname,
  otherNickname,
  otherProfileImageUrl,
  similarityScore,
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
        <AsyncBoundary className="py-8">
          <RecommendedPostList />
        </AsyncBoundary>
      </div>
    </div>
  );
};
