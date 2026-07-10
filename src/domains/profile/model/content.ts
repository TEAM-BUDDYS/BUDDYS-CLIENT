export interface PostItem {
  id: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export interface CourseItem {
  id: string;
  image?: string;
}

export type ContentTabValue = 'post' | 'course';
