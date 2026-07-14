'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { type City, getCityDisplayName } from '@/shared/api';
import { formatDateInput } from '@/shared/utils/format-date-input';
import type { GenderType } from '@/types/gender';

import { ONBOARDING_QUERY_OPTIONS } from '../../api/query';
import { useDebouncedValue } from '../../hooks/use-debounced-value';
import type { OnboardLocationOption, OnboardStep } from '../../model/onboard';
import type { OnboardingFormPayload } from '../../model/onboarding-form';
import { isValidDate } from '../../utils/is-valid-date';
import { isValidYearMonth } from '../../utils/is-valid-year-month';

const getOptionDisplayName = (option: OnboardLocationOption | null) => {
  return option?.koreanName ?? option?.name ?? '';
};

export const useOnboardForm = () => {
  const [interestCountry, setInterestCountry] =
    useState<OnboardLocationOption | null>(null);
  const [interestCity, setInterestCity] = useState('');
  const [selectedInterestCity, setSelectedInterestCity] = useState<City | null>(
    null,
  );
  const [exchangeCountry, setExchangeCountry] =
    useState<OnboardLocationOption | null>(null);
  const [exchangeSchool, setExchangeSchool] = useState('');
  const [selectedExchangeSchool, setSelectedExchangeSchool] =
    useState<OnboardLocationOption | null>(null);
  const [exchangeMonths, setExchangeMonths] = useState({
    startMonth: '',
    endMonth: '',
  });
  const [activityTagIds, setActivityTagIds] = useState<number[]>([]);
  const [interestTagIds, setInterestTagIds] = useState<number[]>([]);
  const [companionTagIds, setCompanionTagIds] = useState<number[]>([]);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<GenderType | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const debouncedExchangeSchool = useDebouncedValue(exchangeSchool, 300);
  const trimmedExchangeSchool = exchangeSchool.trim();
  const shouldSearchExchangeSchool =
    Boolean(exchangeCountry) &&
    Boolean(debouncedExchangeSchool.trim()) &&
    getOptionDisplayName(selectedExchangeSchool) !== trimmedExchangeSchool;
  const isExchangeSchoolQuerySynced =
    debouncedExchangeSchool.trim() === trimmedExchangeSchool;

  const { data: universitySearchResponse } = useQuery({
    ...ONBOARDING_QUERY_OPTIONS.UNIVERSITY_SEARCH(
      exchangeCountry?.id ?? 0,
      debouncedExchangeSchool.trim(),
    ),
    enabled: shouldSearchExchangeSchool,
  });

  const exchangeSchoolResults: OnboardLocationOption[] =
    shouldSearchExchangeSchool && isExchangeSchoolQuerySynced
      ? (universitySearchResponse?.data?.universities ?? []).flatMap(
          (university) =>
            university.id !== undefined && university.name !== undefined
              ? [{ id: university.id, name: university.name }]
              : [],
        )
      : [];

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

    if (
      selectedInterestCity &&
      getCityDisplayName(selectedInterestCity, value) !== value
    ) {
      setSelectedInterestCity(null);
    }
  };

  const handleInterestCitySelect = (value: City) => {
    setInterestCity(getCityDisplayName(value, interestCity));
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
    setExchangeSchool(getOptionDisplayName(value));
    setSelectedExchangeSchool(value);
  };

  const handleStartMonthChange = (value: string) => {
    setExchangeMonths((prevMonths) => ({
      ...prevMonths,
      startMonth: formatDateInput(value, prevMonths.startMonth, {
        variant: 'yearMonth',
      }),
    }));
  };

  const handleEndMonthChange = (value: string) => {
    setExchangeMonths((prevMonths) => ({
      ...prevMonths,
      endMonth: formatDateInput(value, prevMonths.endMonth, {
        variant: 'yearMonth',
      }),
    }));
  };

  const resetExchangeInfo = () => {
    setExchangeCountry(null);
    setExchangeSchool('');
    setSelectedExchangeSchool(null);
    setExchangeMonths({
      startMonth: '',
      endMonth: '',
    });
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

  const handleNicknameChange = (value: string) => {
    setNickname(value.slice(0, 8));
  };

  const handleGenderChange = (value: GenderType) => {
    setGender(value);
  };

  const handleBirthDateChange = (value: string) => {
    setBirthDate((prevBirthDate) =>
      formatDateInput(value, prevBirthDate, {
        variant: 'date',
      }),
    );
  };

  const handleBioChange = (value: string) => {
    setBio(value.slice(0, 30));
  };

  const handleProfileImageChange = (file: File | null) => {
    setProfileImageFile(file);
  };

  const canGoNext = (step: OnboardStep) => {
    if (step === 'interest-location') {
      return Boolean(interestCountry && selectedInterestCity);
    }

    if (step === 'exchange-info') {
      return Boolean(
        exchangeCountry &&
        selectedExchangeSchool &&
        isValidYearMonth(exchangeMonths.startMonth) &&
        isValidYearMonth(exchangeMonths.endMonth) &&
        exchangeMonths.startMonth <= exchangeMonths.endMonth,
      );
    }

    if (step === 'activity-tags') {
      return activityTagIds.length > 0;
    }

    if (step === 'interest-tags') {
      return interestTagIds.length > 0;
    }

    if (step === 'companion-tags') {
      return companionTagIds.length > 0;
    }

    if (step === 'profile') {
      return Boolean(nickname.trim() && gender && isValidDate(birthDate));
    }

    return false;
  };

  const getOnboardingFormPayload = (
    profileImageUrl: string | null,
  ): OnboardingFormPayload | null => {
    if (
      !interestCountry ||
      !selectedInterestCity ||
      activityTagIds.length === 0 ||
      interestTagIds.length === 0 ||
      companionTagIds.length === 0 ||
      !nickname.trim() ||
      !gender ||
      !birthDate.trim()
    ) {
      return null;
    }

    const interestCityId = selectedInterestCity.id;

    if (interestCityId == null) {
      return null;
    }

    return {
      interestCountryId: interestCountry.id,
      interestCityId,
      exchangeCountryId: exchangeCountry?.id ?? null,
      exchangeUniversity: selectedExchangeSchool?.name ?? null,
      exchangeStartDate: exchangeMonths.startMonth.trim() || null,
      exchangeEndDate: exchangeMonths.endMonth.trim() || null,
      activityTagIds,
      interestTagIds,
      travelStyleTagIds: companionTagIds,
      nickname: nickname.trim(),
      gender,
      birthDate: birthDate.trim(),
      bio: bio.trim(),
      profileImageUrl,
    };
  };

  return {
    interestCountry,
    interestCity,
    selectedInterestCity,
    exchangeCountry,
    exchangeSchool,
    selectedExchangeSchool,
    exchangeSchoolResults,
    startMonth: exchangeMonths.startMonth,
    endMonth: exchangeMonths.endMonth,
    activityTagIds,
    interestTagIds,
    companionTagIds,
    nickname,
    gender,
    birthDate,
    bio,
    profileImageFile,
    handleInterestCountrySelect,
    handleInterestCityChange,
    handleInterestCitySelect,
    handleExchangeCountrySelect,
    handleExchangeSchoolChange,
    handleExchangeSchoolSelect,
    handleStartMonthChange,
    handleEndMonthChange,
    resetExchangeInfo,
    handleActivityTagIdsChange,
    handleInterestTagIdsChange,
    handleCompanionTagIdsChange,
    handleNicknameChange,
    handleGenderChange,
    handleBirthDateChange,
    handleBioChange,
    handleProfileImageChange,
    getOnboardingFormPayload,
    canGoNext,
  };
};
