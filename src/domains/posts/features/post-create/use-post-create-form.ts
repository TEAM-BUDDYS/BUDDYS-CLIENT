'use client';

import { useState } from 'react';

import type { PostFormPayload } from '@/domains/posts/model/post-form';
import type { DateRangeTypes } from '@/shared/components/ui';

import { CITY_OPTIONS, MAX_IMAGE_COUNT } from './constants';
import type {
  LocationOption,
  PostCreateDetailFormState,
  PostCreateStep,
} from './model';

const INITIAL_DETAIL_FORM: PostCreateDetailFormState = {
  title: '',
  content: '',
  ageConditions: [],
  gender: '',
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

const isRequiredDetailComplete = (
  detail: PostCreateDetailFormState,
): detail is PostCreateDetailFormState & {
  gender: Exclude<PostCreateDetailFormState['gender'], ''>;
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
    detail.gender &&
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
  const [selectedCity, setSelectedCity] = useState<LocationOption | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeTypes>({
    startDate: null,
    endDate: null,
  });
  const [detail, setDetail] =
    useState<PostCreateDetailFormState>(INITIAL_DETAIL_FORM);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // TODO: 도시 검색 API 연동 후 서버 응답값으로 변경
  const cityResults =
    city.length > 0 && selectedCity?.name !== city
      ? CITY_OPTIONS.filter((cityOption) => cityOption.name.includes(city))
      : [];

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

    if (selectedCity && value !== selectedCity.name) {
      setSelectedCity(null);
    }
  };

  const handleCitySelect = (value: LocationOption) => {
    setCity(value.name);
    setSelectedCity(value);
  };

  const addImages = (files: File[]) => {
    setImageFiles((prevFiles) =>
      [...prevFiles, ...files].slice(0, MAX_IMAGE_COUNT),
    );
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

    return Boolean(
      selectedCountry &&
      selectedCity &&
      dateRange.startDate &&
      dateRange.endDate &&
      isRequiredDetailComplete(detail),
    );
  };

  const getPostFormPayload = (): PostFormPayload | null => {
    if (
      !selectedCountry ||
      !selectedCity ||
      !dateRange.startDate ||
      !dateRange.endDate ||
      !isRequiredDetailComplete(detail)
    ) {
      return null;
    }

    const tagIds = [
      ...detail.activityTagIds,
      ...detail.interestTagIds,
      ...detail.companionStyleTagIds,
    ];

    return {
      countryId: selectedCountry.id,
      cityId: selectedCity.id,
      title: detail.title.trim(),
      content: detail.content.trim(),
      startDate: formatDateForPayload(dateRange.startDate),
      endDate: formatDateForPayload(dateRange.endDate),
      ageConditions: detail.ageConditions,
      gender: detail.gender,
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
    cityResults,
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
