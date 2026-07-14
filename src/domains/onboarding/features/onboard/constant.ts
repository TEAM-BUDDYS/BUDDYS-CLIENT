import type { GenderType } from '@/types/gender';

export const TOTAL_PROGRESS_STEP = 5;

export const GENDER_OPTIONS = [
  { label: '남자', value: 'MALE' },
  { label: '여자', value: 'FEMALE' },
] satisfies { label: string; value: GenderType }[];

export const INTEREST_CITY_OPTIONS_BY_COUNTRY_ID = {
  2: [{ id: 2001, name: 'New York', koreanName: '뉴욕' }],
} as const;

export const EXCHANGE_SCHOOL_OPTIONS_BY_COUNTRY_ID = {
  2: [{ id: 2001, name: '뉴욕 대학교' }],
} as const;

export const RECOMMENDED_PROFILE = {
  nickname: '버디즈웹화이팅',
  similarityScore: 99,
};

export const RECOMMENDED_POSTS = [
  {
    postId: 1,
    title: '같이 자연 여행 가요',
    content: '계획형으로 여행 다니실 분 구해요!',
    period: {
      startDate: '2027-03-01',
      endDate: '2027-03-10',
    },
    thumbnailUrl: null,
  },
  {
    postId: 2,
    title: '운동 좋아하는 분 모여요',
    content: '활발하게 액티비티 위주로 다닐 사람 구합니다',
    period: {
      startDate: '2027-04-01',
      endDate: '2027-04-10',
    },
    thumbnailUrl: null,
  },
  {
    postId: 3,
    title: '같이 자연 여행 가요',
    content: '계획형으로 여행 다니실 분 구해요!',
    period: {
      startDate: '2027-03-01',
      endDate: '2027-03-10',
    },
    thumbnailUrl: null,
  },
  {
    postId: 4,
    title: '운동 좋아하는 분 모여요',
    content: '활발하게 액티비티 위주로 다닐 사람 구합니다',
    period: {
      startDate: '2027-04-01',
      endDate: '2027-04-10',
    },
    thumbnailUrl: null,
  },
];
