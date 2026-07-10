import {
  POST_AGE_CONDITION_LABELS,
  POST_COMPANION_TYPE_LABELS,
  POST_GENDER_CONDITION_LABELS,
  POST_RECRUITMENT_COUNT_LABELS,
} from '@/domains/posts/model/post-condition';
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
  { label: POST_AGE_CONDITION_LABELS.EARLY_20S, value: 'EARLY_20S' },
  { label: POST_AGE_CONDITION_LABELS.MID_20S, value: 'MID_20S' },
  { label: POST_AGE_CONDITION_LABELS.LATE_20S, value: 'LATE_20S' },
  { label: POST_AGE_CONDITION_LABELS.OVER_30S, value: 'OVER_30S' },
] satisfies PostCreateOption<AgeConditionType>[];

export const GENDER_OPTIONS = [
  { label: POST_GENDER_CONDITION_LABELS.MALE, value: 'MALE' },
  { label: POST_GENDER_CONDITION_LABELS.FEMALE, value: 'FEMALE' },
] satisfies PostCreateOption<PostCreateGenderConditionType>[];

export const COMPANION_TYPE_OPTIONS = [
  { label: POST_COMPANION_TYPE_LABELS.FULL_TRIP, value: 'FULL_TRIP' },
  { label: POST_COMPANION_TYPE_LABELS.PARTIAL_TRIP, value: 'PARTIAL_TRIP' },
  {
    label: POST_COMPANION_TYPE_LABELS.ACCOMMODATION_SHARE,
    value: 'ACCOMMODATION_SHARE',
  },
  { label: POST_COMPANION_TYPE_LABELS.TOUR, value: 'TOUR' },
  { label: POST_COMPANION_TYPE_LABELS.MEAL, value: 'MEAL' },
  { label: POST_COMPANION_TYPE_LABELS.DAILY_LIFE, value: 'DAILY_LIFE' },
  { label: POST_COMPANION_TYPE_LABELS.GROUP_PURCHASE, value: 'GROUP_PURCHASE' },
] satisfies PostCreateOption<CompanionType>[];

export const RECRUITMENT_COUNT_OPTIONS = [
  { label: POST_RECRUITMENT_COUNT_LABELS.UNDECIDED, value: 'UNDECIDED' },
  { label: POST_RECRUITMENT_COUNT_LABELS.ONE, value: 'ONE' },
  { label: POST_RECRUITMENT_COUNT_LABELS.TWO, value: 'TWO' },
  { label: POST_RECRUITMENT_COUNT_LABELS.THREE, value: 'THREE' },
  { label: POST_RECRUITMENT_COUNT_LABELS.FOUR_OR_MORE, value: 'FOUR_OR_MORE' },
] satisfies PostCreateOption<RecruitmentCountType>[];
