// TODO: API 연동 후 삭제 예정

import type { PostDetailComment } from '@/domains/posts/model/comment';
import type { PostDetail } from '@/domains/posts/model/post-detail';

export const getSamplePostDetail = (postId: number): PostDetail => ({
  postId,
  author: {
    userId: 1,
    nickname: '버디즈',
    profileImageUrl: null,
    country: '대한민국',
    age: 20,
    ageRange: '20대',
    gender: 'FEMALE',
  },
  isMine: true,
  recruitmentStatus: 'RECRUITING',
  title: '주말에 서울 근교 함께 가실 분!',
  imageUrls: [],
  country: { countryId: 31, name: '대한민국' },
  city: { cityId: 20692, name: 'Seoul' },
  startDate: '2026-09-06',
  endDate: '2026-09-19',
  recruitmentCountType: 'TWO',
  content: '안녕하세요. 서울 근교 여행 동행을 구합니다.',
  conditions: {
    ageConditions: ['EARLY_20S', 'MID_20S'],
    genderCondition: 'FEMALE',
    travelType: 'FULL_TRIP',
    activityTags: [
      { tagId: 1, name: '여행' },
      { tagId: 2, name: '맛집 탐방' },
      { tagId: 3, name: '카페 탐방' },
    ],
    interestTags: [],
    travelStyleTags: [],
  },
  viewCount: 1,
  commentCount: 2,
  createdAt: '2026-07-09T17:57:32.157461',
});

export const SAMPLE_POST_DETAIL_COMMENTS: PostDetailComment[] = [
  {
    commentId: 1,
    content: '저도 관심 있어요! DM 보낼게요.',
    author: { userId: 2, nickname: '유저 1' },
    createdAt: '1시간 전',
  },
  {
    commentId: 2,
    content: '저도 관심 있어요! DM 보낼게요.',
    author: { userId: 3, nickname: '유저 1' },
    createdAt: '1시간 전',
  },
];
