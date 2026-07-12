import { CalendarIcon } from '@/shared/components/icons';
import { formatDateRange } from '@/shared/utils/format-date-range';

interface CardDateProps {
  startDate: string;
  endDate: string;
}
export const CardDate = ({ startDate, endDate }: CardDateProps) => {
  const { durationDays, formattedEndDate, formattedStartDate } =
    formatDateRange({
      endDate,
      startDate,
    });
  const dateText =
    startDate === endDate
      ? `${formattedStartDate} (1일)`
      : `${formattedStartDate} - ${formattedEndDate} (${durationDays}일)`;

  return (
    <div className="flex gap-1">
      <CalendarIcon className="text-mint-300 size-4" />
      <span className="text-caption-r-12 text-gray-500">{dateText}</span>
    </div>
  );
};
