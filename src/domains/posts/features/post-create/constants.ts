import type {
  AgeConditionType,
  CompanionType,
  RecruitmentCountType,
} from '@/domains/posts/model/post-form';

import type {
  LocationOption,
  PostCreateGenderConditionType,
  PostCreateOption,
  PostCreateQuestionStep,
  PostCreateStep,
} from './model';

export const TOTAL_STEP = 4 satisfies PostCreateStep;
export const MAX_IMAGE_COUNT = 10;

// TODO: 국가 목록 API 연동 후 삭제
export const COUNTRY_OPTIONS = [
  { id: 1, name: '프랑스' },
  { id: 2, name: '미국' },
  { id: 3, name: '영국' },
  { id: 4, name: '독일' },
  { id: 5, name: '일본' },
  { id: 6, name: '호주' },
] satisfies LocationOption[];

// TODO: 도시 검색 API 연동 후 삭제
export const CITY_OPTIONS = [
  { id: 3, name: '뉴욕' },
] satisfies LocationOption[];

export const STEP_CONTENTS = {
  1: {
    title: '어느 국가에서 동행을 구하시나요?',
    description: '한글 검색이 안 될 경우 영어로 검색해주세요.',
  },
  2: {
    title: '어느 도시에서 동행을 구하시나요?',
    description: '한글 검색이 안 될 경우 영어로 검색해주세요.',
  },
  3: {
    title: '어떤 일정으로 계획하고 계신가요?',
    description: '동행할 날짜를 선택해주세요',
  },
} satisfies Record<
  PostCreateQuestionStep,
  { title: string; description: string }
>;

export const AGE_CONDITION_OPTIONS = [
  { label: '20대 초반', value: 'EARLY_20S' },
  { label: '20대 중반', value: 'MID_20S' },
  { label: '20대 후반', value: 'LATE_20S' },
  { label: '30대 이상', value: 'OVER_30S' },
] satisfies PostCreateOption<AgeConditionType>[];

export const GENDER_OPTIONS = [
  { label: '남자', value: 'MALE' },
  { label: '여자', value: 'FEMALE' },
] satisfies PostCreateOption<PostCreateGenderConditionType>[];

export const COMPANION_TYPE_OPTIONS = [
  { label: '여행 전체 동행', value: 'FULL_TRIP' },
  { label: '여행 부분 동행', value: 'PARTIAL_TRIP' },
  { label: '숙박 공유', value: 'ACCOMMODATION_SHARE' },
  { label: '투어 동행', value: 'TOUR' },
  { label: '식사 동행', value: 'MEAL' },
  { label: '생활 동행', value: 'DAILY_LIFE' },
  { label: '공동 구매', value: 'GROUP_PURCHASE' },
] satisfies PostCreateOption<CompanionType>[];

export const RECRUITMENT_COUNT_OPTIONS = [
  { label: '미정', value: 'UNDECIDED' },
  { label: '1인', value: 'ONE' },
  { label: '2인', value: 'TWO' },
  { label: '3인', value: 'THREE' },
  { label: '4인 이상', value: 'FOUR_OR_MORE' },
] satisfies PostCreateOption<RecruitmentCountType>[];
