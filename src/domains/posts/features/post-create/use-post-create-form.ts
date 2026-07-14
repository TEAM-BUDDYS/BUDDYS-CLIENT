'use client';

import { useState } from 'react';

import type { PostFormPayload } from '@/domains/posts/model/post-form';
import { type City, getCityDisplayName } from '@/shared/api';
import type { DateRangeTypes } from '@/shared/components/ui';

import { MAX_IMAGE_COUNT } from './constants';
import type {
  LocationOption,
  PostCreateDetailFormState,
  PostCreateGenderConditionType,
  PostCreateStep,
} from './model';

const INITIAL_DETAIL_FORM: PostCreateDetailFormState = {
  title: '',
  content: '',
  ageConditions: [],
  genderConditions: [],
  companionType: '',
  recruitmentCountType: '',
  activityTagIds: [],
  interestTagIds: [],
  companionStyleTagIds: [],
};

const formatDateForPayload = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getGenderForPayload = (
  genderConditions: PostCreateGenderConditionType[],
) => {
  return genderConditions[0];
};

const isRequiredDetailComplete = (
  detail: PostCreateDetailFormState,
): detail is PostCreateDetailFormState & {
  genderConditions: [
    PostCreateGenderConditionType,
    ...PostCreateGenderConditionType[],
  ];
  companionType: Exclude<PostCreateDetailFormState['companionType'], ''>;
  recruitmentCountType: Exclude<
    PostCreateDetailFormState['recruitmentCountType'],
    ''
  >;
} => {
  return Boolean(
    detail.title.trim() &&
    detail.content.trim() &&
    detail.ageConditions.length > 0 &&
    detail.genderConditions.length > 0 &&
    detail.companionType &&
    detail.recruitmentCountType &&
    detail.activityTagIds.length > 0,
  );
};

export const usePostCreateForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<LocationOption | null>(
    null,
  );
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeTypes>({
    startDate: null,
    endDate: null,
  });
  const [detail, setDetail] =
    useState<PostCreateDetailFormState>(INITIAL_DETAIL_FORM);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const updateDetail = (nextDetail: Partial<PostCreateDetailFormState>) => {
    setDetail((prevDetail) => ({ ...prevDetail, ...nextDetail }));
  };

  const handleCountrySelect = (value: LocationOption) => {
    const shouldResetCity = selectedCountry?.id !== value.id;

    setSelectedCountry(value);

    if (shouldResetCity) {
      setCity('');
      setSelectedCity(null);
    }
  };

  const handleCityChange = (value: string) => {
    setCity(value);

    if (selectedCity && value !== getCityDisplayName(selectedCity)) {
      setSelectedCity(null);
    }
  };

  const handleCitySelect = (value: City) => {
    setCity(getCityDisplayName(value));
    setSelectedCity(value);
  };

  const addImages = (files: File[]) => {
    setImageFiles((prevFiles) =>
      [...prevFiles, ...files].slice(0, MAX_IMAGE_COUNT),
    );
  };

  const getCompleteFormValues = () => {
    if (
      !selectedCountry ||
      !selectedCity ||
      !dateRange.startDate ||
      !dateRange.endDate ||
      !isRequiredDetailComplete(detail)
    ) {
      return null;
    }

    return {
      selectedCountry,
      selectedCity,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      detail,
    };
  };

  const canGoNext = (currentStep: PostCreateStep) => {
    if (currentStep === 1) {
      return Boolean(selectedCountry);
    }

    if (currentStep === 2) {
      return Boolean(selectedCity);
    }

    if (currentStep === 3) {
      return Boolean(dateRange.startDate && dateRange.endDate);
    }

    return Boolean(getCompleteFormValues());
  };

  const getPostFormPayload = (): PostFormPayload | null => {
    const completeFormValues = getCompleteFormValues();

    if (!completeFormValues) {
      return null;
    }

    const { detail, endDate, selectedCity, selectedCountry, startDate } =
      completeFormValues;
    const cityId = selectedCity.id;

    if (cityId == null) {
      return null;
    }

    const tagIds = [
      ...detail.activityTagIds,
      ...detail.interestTagIds,
      ...detail.companionStyleTagIds,
    ];

    return {
      countryId: selectedCountry.id,
      cityId,
      title: detail.title.trim(),
      content: detail.content.trim(),
      startDate: formatDateForPayload(startDate),
      endDate: formatDateForPayload(endDate),
      ageConditions: detail.ageConditions,
      gender: getGenderForPayload(detail.genderConditions),
      companionType: detail.companionType,
      recruitmentCountType: detail.recruitmentCountType,
      tagIds,
      // TODO: 이미지 업로드 API 연동 후 업로드 결과 URL로 변경
      imageUrls: [],
    };
  };

  return {
    selectedCountry,
    city,
    selectedCity,
    dateRange,
    detail,
    imageCount: imageFiles.length,
    handleCountrySelect,
    setDateRange,
    updateDetail,
    handleCityChange,
    handleCitySelect,
    addImages,
    canGoNext,
    getPostFormPayload,
  };
};
