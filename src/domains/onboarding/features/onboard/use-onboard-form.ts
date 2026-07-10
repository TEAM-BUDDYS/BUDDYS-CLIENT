'use client';

import { useMemo, useState } from 'react';

import {
  EXCHANGE_SCHOOL_OPTIONS_BY_COUNTRY_ID,
  INTEREST_CITY_OPTIONS_BY_COUNTRY_ID,
  ONBOARD_COUNTRY_OPTIONS,
} from './constant';
import type { OnboardLocationOption, OnboardStep } from './model';

const getDefaultExchangeMonths = () => {
  return {
    startMonth: '',
    endMonth: '',
  };
};

const getOptionsByCountry = <
  TOptions extends Record<number, readonly OnboardLocationOption[]>,
>(
  optionsByCountry: TOptions,
  countryId?: number,
) => {
  if (!countryId) {
    return [];
  }

  return [...(optionsByCountry[countryId] ?? [])];
};

const getSearchResults = (
  options: OnboardLocationOption[],
  query: string,
  selectedOption: OnboardLocationOption | null,
) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery || selectedOption?.name === query) {
    return [];
  }

  return options.filter((option) => option.name.includes(trimmedQuery));
};

export const useOnboardForm = () => {
  const [interestCountry, setInterestCountry] =
    useState<OnboardLocationOption | null>(null);
  const [interestCity, setInterestCity] = useState('');
  const [selectedInterestCity, setSelectedInterestCity] =
    useState<OnboardLocationOption | null>(null);
  const [exchangeCountry, setExchangeCountry] =
    useState<OnboardLocationOption | null>(null);
  const [exchangeSchool, setExchangeSchool] = useState('');
  const [selectedExchangeSchool, setSelectedExchangeSchool] =
    useState<OnboardLocationOption | null>(null);
  const [exchangeMonths, setExchangeMonths] = useState(
    getDefaultExchangeMonths,
  );
  const [activityTagIds, setActivityTagIds] = useState<number[]>([]);
  const [interestTagIds, setInterestTagIds] = useState<number[]>([]);
  const [companionTagIds, setCompanionTagIds] = useState<number[]>([]);

  const countryOptions = useMemo(
    () => [...ONBOARD_COUNTRY_OPTIONS],
    [],
  ) satisfies OnboardLocationOption[];

  const interestCityOptions = getOptionsByCountry(
    INTEREST_CITY_OPTIONS_BY_COUNTRY_ID,
    interestCountry?.id,
  );
  const exchangeSchoolOptions = getOptionsByCountry(
    EXCHANGE_SCHOOL_OPTIONS_BY_COUNTRY_ID,
    exchangeCountry?.id,
  );

  const interestCityResults = getSearchResults(
    interestCityOptions,
    interestCity,
    selectedInterestCity,
  );
  const exchangeSchoolResults = getSearchResults(
    exchangeSchoolOptions,
    exchangeSchool,
    selectedExchangeSchool,
  );

  const handleInterestCountrySelect = (value: OnboardLocationOption) => {
    const shouldResetCity = interestCountry?.id !== value.id;

    setInterestCountry(value);

    if (shouldResetCity) {
      setInterestCity('');
      setSelectedInterestCity(null);
    }
  };

  const handleInterestCityChange = (value: string) => {
    setInterestCity(value);

    if (selectedInterestCity && selectedInterestCity.name !== value) {
      setSelectedInterestCity(null);
    }
  };

  const handleInterestCitySelect = (value: OnboardLocationOption) => {
    setInterestCity(value.name);
    setSelectedInterestCity(value);
  };

  const handleExchangeCountrySelect = (value: OnboardLocationOption) => {
    const shouldResetSchool = exchangeCountry?.id !== value.id;

    setExchangeCountry(value);

    if (shouldResetSchool) {
      setExchangeSchool('');
      setSelectedExchangeSchool(null);
    }
  };

  const handleExchangeSchoolChange = (value: string) => {
    setExchangeSchool(value);

    if (selectedExchangeSchool && selectedExchangeSchool.name !== value) {
      setSelectedExchangeSchool(null);
    }
  };

  const handleExchangeSchoolSelect = (value: OnboardLocationOption) => {
    setExchangeSchool(value.name);
    setSelectedExchangeSchool(value);
  };

  const handleStartMonthChange = (value: string) => {
    setExchangeMonths((prevMonths) => ({
      ...prevMonths,
      startMonth: value,
    }));
  };

  const handleEndMonthChange = (value: string) => {
    setExchangeMonths((prevMonths) => ({
      ...prevMonths,
      endMonth: value,
    }));
  };

  const handleActivityTagIdsChange = (value: number[]) => {
    setActivityTagIds(value);
  };

  const handleInterestTagIdsChange = (value: number[]) => {
    setInterestTagIds(value);
  };

  const handleCompanionTagIdsChange = (value: number[]) => {
    setCompanionTagIds(value);
  };

  const canGoNext = (step: OnboardStep) => {
    if (step === 'interest-location') {
      return Boolean(interestCountry && selectedInterestCity);
    }

    if (step === 'exchange-info') {
      return Boolean(
        exchangeCountry &&
        selectedExchangeSchool &&
        exchangeMonths.startMonth.trim() &&
        exchangeMonths.endMonth.trim(),
      );
    }

    if (
      step === 'activity-tags' ||
      step === 'interest-tags' ||
      step === 'companion-tags'
    ) {
      return Boolean(
        activityTagIds.length > 0 ||
        interestTagIds.length > 0 ||
        companionTagIds.length > 0,
      );
    }

    return false;
  };

  return {
    countryOptions,
    interestCountry,
    interestCity,
    selectedInterestCity,
    interestCityResults,
    exchangeCountry,
    exchangeSchool,
    selectedExchangeSchool,
    exchangeSchoolResults,
    startMonth: exchangeMonths.startMonth,
    endMonth: exchangeMonths.endMonth,
    activityTagIds,
    interestTagIds,
    companionTagIds,
    handleInterestCountrySelect,
    handleInterestCityChange,
    handleInterestCitySelect,
    handleExchangeCountrySelect,
    handleExchangeSchoolChange,
    handleExchangeSchoolSelect,
    handleStartMonthChange,
    handleEndMonthChange,
    handleActivityTagIdsChange,
    handleInterestTagIdsChange,
    handleCompanionTagIdsChange,
    canGoNext,
  };
};
