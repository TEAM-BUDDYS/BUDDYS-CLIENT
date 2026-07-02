import { CalendarDayCell } from './calendar-day-cell';
import {
  createCalendarDays,
  type DateRangeTypes,
  WEEKDAYS,
} from './date-utils';

interface CalendarMonthProps {
  month: Date;
  value: DateRangeTypes;
  minDate: Date;
  onSelect: (date: Date) => void;
}

export const CalendarMonth = ({
  month,
  value,
  minDate,
  onSelect,
}: CalendarMonthProps) => {
  const days = createCalendarDays(month);

  return (
    <section className="flex w-full flex-col items-center gap-6">
      <h3 className="text-title-m-18 text-center text-gray-800">
        {month.getFullYear()}년{' '}
        <span className="ml-2">{month.getMonth() + 1}월</span>
      </h3>
      <div className="flex w-full flex-col gap-1">
        <div
          aria-hidden="true"
          className="grid h-5.25 grid-cols-7 place-items-center"
        >
          {WEEKDAYS.map((weekday) => (
            <span
              key={weekday}
              className="text-body-r-14 w-12 text-center text-gray-500"
            >
              {weekday}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 place-items-center">
          {days.map((day, dayIndex) => (
            <CalendarDayCell
              key={day.date.toISOString()}
              day={day}
              dayIndex={dayIndex}
              value={value}
              minDate={minDate}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
