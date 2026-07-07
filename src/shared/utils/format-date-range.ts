interface FormatDateRangeParams {
  startDate: string;
  endDate: string;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const getDateParts = (date: Date | string) => {
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-');

    return { day, month, year };
  }

  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    year: String(date.getFullYear()),
  };
};

export const formatDate = (date: Date | string) => {
  const { day, month, year } = getDateParts(date);

  return `${year.slice(2)}.${month}.${day}`;
};

export const formatDateWithWeekday = (date: Date) => {
  const weekday = WEEKDAYS[date.getDay()];

  return `${formatDate(date)} (${weekday})`;
};

const getDurationDays = (startDate: string, endDate: string) => {
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

  const startTime = Date.UTC(startYear, startMonth - 1, startDay);
  const endTime = Date.UTC(endYear, endMonth - 1, endDay);

  return (endTime - startTime) / (1000 * 60 * 60 * 24) + 1;
};

export const formatDateRange = ({
  startDate,
  endDate,
}: FormatDateRangeParams) => {
  return {
    durationDays: getDurationDays(startDate, endDate),
    formattedEndDate: formatDate(endDate),
    formattedStartDate: formatDate(startDate),
  };
};
