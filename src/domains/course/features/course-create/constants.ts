import type { CourseCreateScreen } from './model';

export const COURSE_CREATE_TOTAL_STEP = 5;
export const COURSE_CREATE_SEARCH_DEBOUNCE_MS = 300;
export const COURSE_CREATE_MAX_TITLE_LENGTH = 14;
export const COURSE_CREATE_MAX_CONTENT_LENGTH = 120;
export const COURSE_CREATE_PAST_YEAR_COUNT = 5;
export const COURSE_CREATE_MAX_DATE_RANGE_DAYS = 30;
export const COURSE_CREATE_MIN_DURATION_DAYS = 1;
export const COURSE_CREATE_MAX_DAY_IMAGE_COUNT = 10;
export const COURSE_CREATE_MIN_DAY_IMAGE_COUNT = 1;
export const COURSE_CREATE_MAX_DAY_PLACE_COUNT = 10;
export const COURSE_CREATE_MAX_FLIGHT_COUNT = 5;
export const COURSE_CREATE_MAX_COMPANION_COUNT = 11;

export const COURSE_CREATE_PROGRESS_STEP_BY_SCREEN = {
  country: 1,
  city: 2,
  date: 3,
  duration: 3,
  detail: 3,
  itinerary: 4,
  companion: 5,
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
    description: '최대 30일까지 선택할 수 있어요.',
  },
  duration: {
    title: '며칠 코스로 계획하고 계신가요?',
    description: '정확한 일정 대신, 기간만 선택해주세요',
  },
  companion: {
    title: '코스를 함께한 동행을 초대해보세요',
    description: `최대 ${COURSE_CREATE_MAX_COMPANION_COUNT}명과 함께 코스를 기록할 수 있어요`,
  },
} satisfies Record<
  Exclude<CourseCreateScreen, 'detail' | 'itinerary'>,
  { title: string; description: string }
>;
