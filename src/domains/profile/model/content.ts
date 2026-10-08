export const MY_POSTS_PAGE_SIZE = 10;
export const MY_COURSES_PAGE_SIZE = 18;

export interface PostItem {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export type ContentTabValue = 'post' | 'course';

export interface CourseItem {
  id: number;
  image: string | null;
}

// TODO: 타인 프로필 코스 목록 API 연동 후 제거
export const MOCK_PROFILE_COURSES: CourseItem[] = Array.from(
  { length: 7 },
  (_, index) => ({
    id: index + 1,
    image: `https://picsum.photos/seed/profile-course-${index + 1}/240/240`,
  }),
);
