'use client';

import { useEffect, useRef, useState } from 'react';

import type { Country } from '@/shared/api';
import type { DateRangeTypes } from '@/shared/components/ui';
import { getDateRangeDayCount } from '@/shared/components/ui/date-range-picker/date-utils';
import { formatDateToIsoDate } from '@/shared/utils/format-date-range';

import {
  COURSE_CREATE_MAX_DAY_IMAGE_COUNT,
  COURSE_CREATE_MAX_FLIGHT_COUNT,
  COURSE_CREATE_MIN_DAY_IMAGE_COUNT,
} from './constants';
import type {
  CourseCreateBasicInfoValue,
  CourseCreateCityOption,
  CourseCreateDayFormState,
  CourseCreateDetailFormState,
  CourseCreateFlightFormState,
  CourseCreateScreen,
  CourseCreateValue,
} from './model';

const INITIAL_DATE_RANGE: DateRangeTypes = {
  startDate: null,
  endDate: null,
};

const INITIAL_DETAIL_FORM: CourseCreateDetailFormState = {
  title: '',
  content: '',
  activityTagIds: [],
  interestTagIds: [],
  travelStyleTagIds: [],
};

const isDetailComplete = (detail: CourseCreateDetailFormState) => {
  return Boolean(detail.title.trim() && detail.activityTagIds.length > 0);
};

const isItineraryComplete = (
  days: CourseCreateDayFormState[],
  durationDays: number | null,
) => {
  return (
    durationDays !== null &&
    days.length === durationDays &&
    days.every((day) => day.images.length >= COURSE_CREATE_MIN_DAY_IMAGE_COUNT)
  );
};

const getDateByDayIndex = (startDate: Date, dayIndex: number) => {
  const date = new Date(startDate);

  date.setDate(date.getDate() + dayIndex);

  return date;
};

export const useCourseCreateForm = () => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedCities, setSelectedCities] = useState<
    CourseCreateCityOption[]
  >([]);
  const [dateRange, setDateRange] =
    useState<DateRangeTypes>(INITIAL_DATE_RANGE);
  const [selectedDurationDays, setSelectedDurationDays] = useState<
    number | null
  >(null);
  const [detail, setDetail] =
    useState<CourseCreateDetailFormState>(INITIAL_DETAIL_FORM);
  const [days, setDays] = useState<CourseCreateDayFormState[]>([]);
  const previewUrlsRef = useRef(new Set<string>());
  const durationDays = dateRange.startDate
    ? getDateRangeDayCount(
        dateRange.startDate,
        dateRange.endDate ?? dateRange.startDate,
      )
    : selectedDurationDays;

  useEffect(() => {
    const previewUrls = previewUrlsRef.current;

    return () => {
      previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
      previewUrls.clear();
    };
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountries((prevCountries) =>
      prevCountries.some(({ id }) => id === country.id)
        ? prevCountries
        : [...prevCountries, country],
    );
  };

  const handleCountryRemove = (countryId: number) => {
    setSelectedCountries((prevCountries) =>
      prevCountries.filter(({ id }) => id !== countryId),
    );
    setSelectedCities((prevCities) =>
      prevCities.filter((city) => city.countryId !== countryId),
    );
  };

  const handleCitySelect = (city: CourseCreateCityOption) => {
    setSelectedCities((prevCities) =>
      prevCities.some(({ id }) => id === city.id)
        ? prevCities
        : [...prevCities, city],
    );
  };

  const handleCityRemove = (cityId: number) => {
    setSelectedCities((prevCities) =>
      prevCities.filter(({ id }) => id !== cityId),
    );
  };

  const updateDetail = (nextDetail: Partial<CourseCreateDetailFormState>) => {
    setDetail((prevDetail) => ({ ...prevDetail, ...nextDetail }));
  };

  const clearDateRange = () => {
    setDateRange(INITIAL_DATE_RANGE);
  };

  const handleDateRangeChange = (value: DateRangeTypes) => {
    setDateRange(value);
    setSelectedDurationDays(null);
  };

  const handleDurationConfirm = (value: number) => {
    setSelectedDurationDays(value);
  };

  const initializeDays = () => {
    if (durationDays === null) {
      return;
    }

    days.slice(durationDays).forEach((day) => {
      day.images.forEach(({ previewUrl }) => {
        URL.revokeObjectURL(previewUrl);
        previewUrlsRef.current.delete(previewUrl);
      });
    });

    setDays((prevDays) => {
      return Array.from({ length: durationDays }, (_, index) => {
        const dayNumber = index + 1;
        const prevDay = prevDays[index];
        const date = dateRange.startDate
          ? formatDateToIsoDate(getDateByDayIndex(dateRange.startDate, index))
          : undefined;

        if (prevDay) {
          return { ...prevDay, dayNumber, date };
        }

        return {
          dayNumber,
          date,
          places: [],
          images: [],
          memo: '',
          cost: null,
          flights: [],
        };
      });
    });
  };

  const setDayPlaces = (
    dayNumber: number,
    places: CourseCreateDayFormState['places'],
  ) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayNumber === dayNumber ? { ...day, places } : day,
      ),
    );
  };

  const addDayImages = (dayNumber: number, files: File[]) => {
    const currentDay = days.find((day) => day.dayNumber === dayNumber);

    if (!currentDay) {
      return;
    }

    const remainingImageCount = Math.max(
      0,
      COURSE_CREATE_MAX_DAY_IMAGE_COUNT - currentDay.images.length,
    );
    const nextImages = files.slice(0, remainingImageCount).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    if (nextImages.length === 0) {
      return;
    }

    nextImages.forEach(({ previewUrl }) => {
      previewUrlsRef.current.add(previewUrl);
    });

    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayNumber === dayNumber
          ? { ...day, images: [...day.images, ...nextImages] }
          : day,
      ),
    );
  };

  const removeDayImage = (dayNumber: number, previewUrl: string) => {
    URL.revokeObjectURL(previewUrl);
    previewUrlsRef.current.delete(previewUrl);
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              images: day.images.filter(
                (image) => image.previewUrl !== previewUrl,
              ),
            }
          : day,
      ),
    );
  };

  const updateDayMemoCost = (
    dayNumber: number,
    value: Pick<CourseCreateDayFormState, 'memo' | 'cost'>,
  ) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayNumber === dayNumber ? { ...day, ...value } : day,
      ),
    );
  };

  const addDayFlight = (
    dayNumber: number,
    flight: CourseCreateFlightFormState,
  ) => {
    setDays((prevDays) => {
      const flightCount = prevDays.reduce(
        (count, day) => count + day.flights.length,
        0,
      );

      if (flightCount >= COURSE_CREATE_MAX_FLIGHT_COUNT) {
        return prevDays;
      }

      return prevDays.map((day) =>
        day.dayNumber === dayNumber
          ? { ...day, flights: [...day.flights, flight] }
          : day,
      );
    });
  };

  const canGoNext = (screen: CourseCreateScreen) => {
    if (screen === 'country') {
      return selectedCountries.length > 0;
    }

    if (screen === 'city') {
      return selectedCities.length > 0;
    }

    if (screen === 'date') {
      return Boolean(dateRange.startDate);
    }

    if (screen === 'duration') {
      return selectedDurationDays !== null;
    }

    if (screen === 'itinerary') {
      return isItineraryComplete(days, durationDays);
    }

    return durationDays !== null && isDetailComplete(detail);
  };

  const getBasicInfoValue = (): CourseCreateBasicInfoValue | null => {
    if (
      selectedCountries.length === 0 ||
      selectedCities.length === 0 ||
      durationDays === null ||
      !isDetailComplete(detail)
    ) {
      return null;
    }

    return {
      countries: selectedCountries,
      cities: selectedCities,
      durationDays,
      ...(dateRange.startDate
        ? {
            dateRange: {
              startDate: dateRange.startDate,
              endDate: dateRange.endDate ?? dateRange.startDate,
            },
          }
        : {}),
      detail: {
        ...detail,
        title: detail.title.trim(),
        content: detail.content.trim(),
      },
    };
  };

  const getCourseCreateValue = (): CourseCreateValue | null => {
    const basicInfoValue = getBasicInfoValue();

    if (
      !basicInfoValue ||
      !isItineraryComplete(days, basicInfoValue.durationDays)
    ) {
      return null;
    }

    return {
      ...basicInfoValue,
      days,
    };
  };

  return {
    selectedCountries,
    selectedCities,
    dateRange,
    durationDays,
    detail,
    days,
    handleCountrySelect,
    handleCountryRemove,
    handleCitySelect,
    handleCityRemove,
    handleDateRangeChange,
    handleDurationConfirm,
    clearDateRange,
    updateDetail,
    initializeDays,
    setDayPlaces,
    addDayImages,
    removeDayImage,
    updateDayMemoCost,
    addDayFlight,
    canGoNext,
    getCourseCreateValue,
  };
};
