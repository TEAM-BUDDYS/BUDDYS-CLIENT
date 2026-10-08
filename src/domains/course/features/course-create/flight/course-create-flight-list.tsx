import { FlightIcon, TrashIcon } from '@/shared/components/icons';

import type { CourseCreateDayFormState } from '../model';

interface CourseCreateFlightListProps {
  days: CourseCreateDayFormState[];
  isDisabled?: boolean;
  onRemove: (dayNumber: number, flightIndex: number) => void;
}

export const CourseCreateFlightList = ({
  days,
  isDisabled = false,
  onRemove,
}: CourseCreateFlightListProps) => {
  const flights = days.flatMap((day) =>
    day.flights.map((flight, flightIndex) => ({
      dayNumber: day.dayNumber,
      flight,
      flightIndex,
    })),
  );

  if (flights.length === 0) {
    return null;
  }

  return (
    <section
      className="flex flex-col gap-3"
      aria-labelledby="flight-list-title"
    >
      <h2 id="flight-list-title" className="text-body-sb-14 text-gray-800">
        등록한 항공편
      </h2>
      <ul className="flex flex-col gap-2">
        {flights.map(({ dayNumber, flight, flightIndex }) => {
          const flightLabel = flight.flightNumber
            ? `${flight.airline} ${flight.flightNumber}`
            : flight.airline;

          return (
            <li
              key={`${dayNumber}-${flight.airline}-${flight.departureAirport}-${flight.departureTime}-${flight.arrivalAirport}-${flight.arrivalTime}-${flightIndex}`}
              className="relative flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 pr-12"
            >
              <div className="bg-mint-50 text-mint-400 flex size-9 shrink-0 items-center justify-center rounded-full">
                <FlightIcon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-caption-m-12 text-gray-500">
                  {`Day ${dayNumber}`}
                </p>
                <p className="text-body-sb-14 truncate text-gray-800">
                  {flightLabel}
                </p>
                <p className="text-caption-r-12 truncate text-gray-500">
                  {`${flight.departureAirport} ${flight.departureTime} → ${flight.arrivalAirport} ${flight.arrivalTime}`}
                </p>
              </div>
              <button
                aria-label={`${flightLabel} 항공편 삭제`}
                className="focus-visible:outline-mint-300 absolute top-1/2 right-1 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-gray-100"
                disabled={isDisabled}
                type="button"
                onClick={() => onRemove(dayNumber, flightIndex)}
              >
                <TrashIcon className="size-5" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
