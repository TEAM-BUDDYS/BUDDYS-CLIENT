export const MY_POSTS_PAGE_SIZE = 10;

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
  title: string;
  image: string;
}
