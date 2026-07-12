export interface CalendarDayTypes {
  date: Date;
  isCurrentMonth: boolean;
}

export interface DateRangeTypes {
  startDate: Date | null;
  endDate: Date | null;
}

const DAYS_IN_WEEK = 7;

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const getStartOfDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const getStartOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const addDays = (date: Date, amount: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

const addMonths = (date: Date, amount: number) => {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
};

const compareDates = (leftDate: Date, rightDate: Date) => {
  return getStartOfDay(leftDate).getTime() - getStartOfDay(rightDate).getTime();
};

export const checkSameDate = (
  leftDate: Date | null,
  rightDate: Date | null,
) => {
  if (!leftDate || !rightDate) {
    return false;
  }

  return compareDates(leftDate, rightDate) === 0;
};

export const checkBeforeDate = (leftDate: Date, rightDate: Date) => {
  return compareDates(leftDate, rightDate) < 0;
};

const checkAfterDate = (leftDate: Date, rightDate: Date) => {
  return compareDates(leftDate, rightDate) > 0;
};

export const checkBetweenDates = (
  date: Date,
  startDate: Date | null,
  endDate: Date | null,
) => {
  if (!startDate || !endDate) {
    return false;
  }

  return checkAfterDate(date, startDate) && checkBeforeDate(date, endDate);
};

export const getNextDateRange = (
  selectedDate: Date,
  currentRange: DateRangeTypes,
): DateRangeTypes => {
  if (
    !currentRange.startDate ||
    currentRange.endDate ||
    checkBeforeDate(selectedDate, currentRange.startDate)
  ) {
    return { startDate: selectedDate, endDate: null };
  }

  return { startDate: currentRange.startDate, endDate: selectedDate };
};

export const createCalendarDays = (month: Date): CalendarDayTypes[] => {
  const monthStart = getStartOfMonth(month);
  const nextMonthStart = addMonths(monthStart, 1);
  const monthEnd = addDays(nextMonthStart, -1);
  const calendarStart = addDays(monthStart, -monthStart.getDay());
  const calendarEnd = addDays(monthEnd, DAYS_IN_WEEK - 1 - monthEnd.getDay());
  const days: CalendarDayTypes[] = [];

  for (
    let currentDate = calendarStart;
    compareDates(currentDate, calendarEnd) <= 0;
    currentDate = addDays(currentDate, 1)
  ) {
    days.push({
      date: currentDate,
      isCurrentMonth: currentDate.getMonth() === monthStart.getMonth(),
    });
  }

  return days;
};

export const createMonths = (startDate: Date, monthCount: number) => {
  const startMonth = getStartOfMonth(startDate);

  return Array.from({ length: monthCount }, (_, index) =>
    addMonths(startMonth, index),
  );
};
