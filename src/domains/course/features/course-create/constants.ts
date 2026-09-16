import type { CourseCreateLocationStep } from './model';

export const COURSE_CREATE_TOTAL_STEP = 5;
export const COURSE_CREATE_SEARCH_DEBOUNCE_MS = 300;

export const COURSE_CREATE_LOCATION_STEP_CONTENT = {
  1: {
    title: '어느 국가를 다녀오셨나요?',
    description: '한글 검색이 안 된다면 영어로 검색해보세요.',
  },
  2: {
    title: '어느 도시를 다녀오셨나요?',
    description: '한글 검색이 안 된다면 영어로 검색해보세요.',
  },
} satisfies Record<
  CourseCreateLocationStep,
  { title: string; description: string }
>;
