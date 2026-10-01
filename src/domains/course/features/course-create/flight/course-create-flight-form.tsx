'use client';

import { type FormEvent, useState } from 'react';

import type { Airline } from '@/domains/course/api/type';
import { Header } from '@/shared/components/layout';
import {
  Button,
  FormLabel,
  SearchOptionField,
  TextField,
} from '@/shared/components/ui';

import type { CourseCreateFlightFormState } from '../model';
import { useCourseAirlineSearch } from './use-course-airline-search';

interface CourseCreateFlightFormProps {
  onBack: () => void;
  onConfirm: (flight: CourseCreateFlightFormState) => void;
}

const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const getAirlineName = ({ koreanName, name }: Airline) => koreanName ?? name;

const getAirlineOptionLabel = (airline: Airline) => {
  return `${getAirlineName(airline)}(${airline.code})`;
};

const formatTimeInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);

  return digits.length <= 2
    ? digits
    : `${digits.slice(0, 2)}:${digits.slice(2)}`;
};

export const CourseCreateFlightForm = ({
  onBack,
  onConfirm,
}: CourseCreateFlightFormProps) => {
  const [airlineKeyword, setAirlineKeyword] = useState('');
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);
  const [flightNumber, setFlightNumber] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const airlineSearch = useCourseAirlineSearch({
    keyword: airlineKeyword,
    enabled: selectedAirline === null,
  });
  const isComplete =
    selectedAirline !== null &&
    flightNumber.trim().length > 0 &&
    departureAirport.trim().length > 0 &&
    TIME_PATTERN.test(departureTime) &&
    arrivalAirport.trim().length > 0 &&
    TIME_PATTERN.test(arrivalTime);

  const handleAirlineKeywordChange = (value: string) => {
    setAirlineKeyword(value);

    if (selectedAirline && value !== getAirlineName(selectedAirline)) {
      setSelectedAirline(null);
    }
  };

  const handleAirlineSelect = (airline: Airline) => {
    setSelectedAirline(airline);
    setAirlineKeyword(getAirlineName(airline));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedAirline || !isComplete) {
      return;
    }

    onConfirm({
      airline: getAirlineName(selectedAirline),
      flightNumber: flightNumber.trim(),
      departureAirport: departureAirport.trim(),
      departureTime,
      arrivalAirport: arrivalAirport.trim(),
      arrivalTime,
    });
  };

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <Header
        content={<h1 className="text-title-b-18 text-gray-800">항공편 추가</h1>}
        contentAlign="center"
        hasBackButton
        onBackClick={onBack}
      />

      <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 px-4 pt-11.5">
          <div className="flex flex-col gap-2">
            <FormLabel required htmlFor="course-flight-airline">
              항공사
            </FormLabel>
            <SearchOptionField
              required
              id="course-flight-airline"
              label="항공사"
              placeholder="검색어를 입력해주세요"
              value={airlineKeyword}
              isCompleted={selectedAirline !== null}
              isLoading={airlineSearch.isSearching}
              selectedOption={selectedAirline}
              results={airlineSearch.airlines}
              getOptionKey={({ id }) => id}
              getOptionLabel={getAirlineOptionLabel}
              onChange={handleAirlineKeywordChange}
              onSelect={handleAirlineSelect}
              onEndReached={airlineSearch.loadMore}
            />
            {airlineSearch.isError && (
              <div className="flex items-center justify-between px-1">
                <p className="text-caption-r-12 text-error" role="alert">
                  항공사를 불러오지 못했어요.
                </p>
                <button
                  className="text-caption-m-12 text-mint-400"
                  type="button"
                  onClick={airlineSearch.retry}
                >
                  다시 시도
                </button>
              </div>
            )}
          </div>

          <TextField
            required
            className="border-gray-200 bg-white"
            id="course-flight-number"
            label="항공편명"
            placeholder="항공편명을 작성해주세요"
            value={flightNumber}
            onChange={(event) => setFlightNumber(event.target.value)}
          />

          <TextField
            required
            className="border-gray-200 bg-white"
            id="course-flight-departure-airport"
            label="출발 공항"
            placeholder="출발 공항을 작성해주세요"
            value={departureAirport}
            onChange={(event) => setDepartureAirport(event.target.value)}
          />

          <TextField
            required
            className="border-gray-200 bg-white"
            id="course-flight-departure-time"
            label="출발 시간"
            inputMode="numeric"
            maxLength={5}
            placeholder="출발 시간을 작성해주세요"
            value={departureTime}
            onChange={(event) =>
              setDepartureTime(formatTimeInput(event.target.value))
            }
          />

          <TextField
            required
            className="border-gray-200 bg-white"
            id="course-flight-arrival-airport"
            label="도착 공항"
            placeholder="도착 공항을 작성해주세요"
            value={arrivalAirport}
            onChange={(event) => setArrivalAirport(event.target.value)}
          />

          <TextField
            required
            className="border-gray-200 bg-white"
            id="course-flight-arrival-time"
            label="도착 시간"
            inputMode="numeric"
            maxLength={5}
            placeholder="도착 시간을 작성해주세요"
            value={arrivalTime}
            onChange={(event) =>
              setArrivalTime(formatTimeInput(event.target.value))
            }
          />
        </div>

        <div className="mt-auto bg-white px-4 pt-10 pb-8.5">
          <Button disabled={!isComplete} type="submit">
            다음
          </Button>
        </div>
      </form>
    </main>
  );
};
