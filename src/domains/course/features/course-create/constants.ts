import type { CourseCreateScreen } from './model';

export const COURSE_CREATE_TOTAL_STEP = 5;
export const COURSE_CREATE_SEARCH_DEBOUNCE_MS = 300;
export const COURSE_CREATE_MAX_TITLE_LENGTH = 14;
export const COURSE_CREATE_MAX_CONTENT_LENGTH = 120;
export const COURSE_CREATE_PAST_YEAR_COUNT = 5;
export const COURSE_CREATE_MAX_DATE_RANGE_DAYS = 30;

export const COURSE_CREATE_PROGRESS_STEP_BY_SCREEN = {
  country: 1,
  city: 2,
  date: 3,
  detail: 3,
} satisfies Record<CourseCreateScreen, number>;

export const COURSE_CREATE_QUESTION_CONTENT = {
  country: {
    title: '어느 국가를 다녀오셨나요?',
    description: '한글 검색이 안 된다면 영어로 검색해보세요.',
  },
  city: {
    title: '어느 도시를 다녀오셨나요?',
    description: '한글 검색이 안 된다면 영어로 검색해보세요.',
  },
  date: {
    title: '어떤 일정으로 계획하고 계신가요?',
    description: '동행할 날짜를 선택해주세요',
  },
} satisfies Record<
  Exclude<CourseCreateScreen, 'detail'>,
  { title: string; description: string }
>;
