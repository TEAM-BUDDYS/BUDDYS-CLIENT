export interface PostItem {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export type ContentTabValue = 'post' | 'course';
