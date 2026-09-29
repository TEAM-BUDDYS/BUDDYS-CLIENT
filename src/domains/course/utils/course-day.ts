import type { CourseDay } from '@/domains/course/api/type';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const formatCourseDayDate = (date: CourseDay['date']) => {
  if (!date) {
    return '';
  }

  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (
    !year ||
    !month ||
    !day ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return '';
  }

  return `${month}/${day} ${WEEKDAYS[parsedDate.getDay()]}요일`;
};

export const formatCourseCost = (cost: NonNullable<CourseDay['cost']>) =>
  `KRW ${cost.toLocaleString('ko-KR')}원`;
