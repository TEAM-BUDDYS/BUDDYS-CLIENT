const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export const formatRelativeTime = (date: string): string => {
  const targetDate = new Date(date);
  const targetTime = targetDate.getTime();

  if (Number.isNaN(targetTime)) {
    return '';
  }

  const nowTime = new Date().getTime();

  const diffSeconds = Math.floor((nowTime - targetTime) / 1000);

  if (diffSeconds < 0) return '';
  if (diffSeconds < MINUTE) return '방금 전';
  if (diffSeconds < HOUR) return `${Math.floor(diffSeconds / MINUTE)}분 전`;
  if (diffSeconds < DAY) return `${Math.floor(diffSeconds / HOUR)}시간 전`;
  if (diffSeconds < MONTH) return `${Math.floor(diffSeconds / DAY)}일 전`;
  if (diffSeconds <= YEAR) return `${Math.floor(diffSeconds / MONTH)}개월 전`;

  return `${Math.floor(diffSeconds / YEAR)}년 전`;
};
