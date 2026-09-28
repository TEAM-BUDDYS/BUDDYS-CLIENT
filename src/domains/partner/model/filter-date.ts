const FILTER_DATE_PATTERN = /^\d{2}\.\d{2}\.\d{2}$/;

export const formatFilterDateForParams = (date: string) => {
  if (!FILTER_DATE_PATTERN.test(date)) {
    return undefined;
  }

  const [year, month, day] = date.split('.');
  const fullYear = Number(`20${year}`);
  const monthNumber = Number(month);
  const dayNumber = Number(day);
  const dateValue = new Date(fullYear, monthNumber - 1, dayNumber);

  const isValidDate =
    dateValue.getFullYear() === fullYear &&
    dateValue.getMonth() === monthNumber - 1 &&
    dateValue.getDate() === dayNumber;

  if (!isValidDate) {
    return undefined;
  }

  return `${fullYear}-${month}-${day}`;
};

export const hasInvalidFilterDate = (...dates: string[]) => {
  return dates.some((date) => date && !formatFilterDateForParams(date));
};

export const hasInvalidFilterDateOrder = (
  startDate: string,
  endDate: string,
) => {
  const formattedStartDate = formatFilterDateForParams(startDate);
  const formattedEndDate = formatFilterDateForParams(endDate);

  if (!formattedStartDate || !formattedEndDate) {
    return false;
  }

  return formattedStartDate > formattedEndDate;
};
