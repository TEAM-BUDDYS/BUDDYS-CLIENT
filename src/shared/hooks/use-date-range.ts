interface UseDateRangeParams {
  startDate: string;
  endDate: string;
}

const formatDate = (date: string) => {
  const [year, month, day] = date.split('-');

  return `${year.slice(2)}.${month}.${day}`;
};

const getDurationDays = (startDate: string, endDate: string) => {
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

  const startTime = Date.UTC(startYear, startMonth - 1, startDay);
  const endTime = Date.UTC(endYear, endMonth - 1, endDay);

  return (endTime - startTime) / (1000 * 60 * 60 * 24) + 1;
};

export const useDateRange = ({ startDate, endDate }: UseDateRangeParams) => {
  return {
    durationDays: getDurationDays(startDate, endDate),
    formattedEndDate: formatDate(endDate),
    formattedStartDate: formatDate(startDate),
  };
};
