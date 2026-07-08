const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export const formatRelativeTime = (date: string): string => {
  const targetDate = new Date(date);
  const now = new Date();

  const diffSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffSeconds < MINUTE) return '방금 전';
  if (diffSeconds < HOUR) return `${Math.floor(diffSeconds / MINUTE)}분 전`;
  if (diffSeconds < DAY) return `${Math.floor(diffSeconds / HOUR)}시간 전`;
  if (diffSeconds < MONTH) return `${Math.floor(diffSeconds / DAY)}일 전`;
  if (diffSeconds < YEAR) return `${Math.floor(diffSeconds / MONTH)}개월 전`;

  return `${Math.floor(diffSeconds / YEAR)}년 전`;
};
