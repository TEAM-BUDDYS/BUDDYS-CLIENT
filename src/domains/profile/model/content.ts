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
