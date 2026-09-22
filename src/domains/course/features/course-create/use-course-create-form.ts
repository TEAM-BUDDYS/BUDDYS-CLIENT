'use client';

import { useState } from 'react';

import type { Country } from '@/shared/api';
import type { DateRangeTypes } from '@/shared/components/ui';
import { getDateRangeDayCount } from '@/shared/components/ui/date-range-picker/date-utils';

import type {
  CourseCreateBasicInfoValue,
  CourseCreateCityOption,
  CourseCreateDetailFormState,
  CourseCreateScreen,
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
  const durationDays = dateRange.startDate
    ? getDateRangeDayCount(
        dateRange.startDate,
        dateRange.endDate ?? dateRange.startDate,
      )
    : selectedDurationDays;

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

  return {
    selectedCountries,
    selectedCities,
    dateRange,
    durationDays,
    detail,
    handleCountrySelect,
    handleCountryRemove,
    handleCitySelect,
    handleCityRemove,
    handleDateRangeChange,
    handleDurationConfirm,
    clearDateRange,
    updateDetail,
    canGoNext,
    getBasicInfoValue,
  };
};
