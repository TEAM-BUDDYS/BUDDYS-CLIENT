import { CalendarIcon } from '@/shared/components/icons';
import { useDateRange } from '@/shared/hooks/use-date-range';

interface CardDateProps {
  startDate: string;
  endDate: string;
}
export const CardDate = ({ startDate, endDate }: CardDateProps) => {
  const { durationDays, formattedEndDate, formattedStartDate } = useDateRange({
    endDate,
    startDate,
  });

  return (
    <div className="flex gap-1">
      <CalendarIcon className="text-mint-300 size-4" />
      <span className="text-caption-r-12 text-gray-500">
        {formattedStartDate} - {formattedEndDate} ({durationDays}일)
      </span>
    </div>
  );
};
