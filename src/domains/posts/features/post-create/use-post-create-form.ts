'use client';

import { useEffect, useRef, useState } from 'react';

import type { CreatePostRequest } from '@/domains/posts/api/type';
import { type City, getCityDisplayName } from '@/shared/api';
import type { DateRangeTypes } from '@/shared/components/ui';

import { MAX_IMAGE_COUNT } from './constants';
import type {
  LocationOption,
  PostCreateDetailFormState,
  PostCreateGenderConditionType,
  PostCreateImage,
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
  const [images, setImages] = useState<PostCreateImage[]>([]);
  const previewUrlsRef = useRef(new Set<string>());

  useEffect(() => {
    const previewUrls = previewUrlsRef.current;

    return () => {
      previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
      previewUrls.clear();
    };
  }, []);

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

    if (selectedCity && value !== getCityDisplayName(selectedCity, value)) {
      setSelectedCity(null);
    }
  };

  const handleCitySelect = (value: City) => {
    setCity(getCityDisplayName(value, city));
    setSelectedCity(value);
  };

  const addImages = (files: File[]) => {
    const remainingImageCount = Math.max(0, MAX_IMAGE_COUNT - images.length);
    const nextImages = files.slice(0, remainingImageCount).map((file) => {
      const previewUrl = URL.createObjectURL(file);

      previewUrlsRef.current.add(previewUrl);

      return { file, previewUrl };
    });

    if (nextImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...nextImages]);
    }
  };

  const removeImage = (previewUrl: string) => {
    URL.revokeObjectURL(previewUrl);
    previewUrlsRef.current.delete(previewUrl);
    setImages((prevImages) =>
      prevImages.filter((image) => image.previewUrl !== previewUrl),
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

  const getPostFormPayload = (): CreatePostRequest | null => {
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
      genderConditions: detail.genderConditions,
      companionType: detail.companionType,
      recruitmentCountType: detail.recruitmentCountType,
      tagIds,
    };
  };

  return {
    selectedCountry,
    city,
    selectedCity,
    dateRange,
    detail,
    images,
    handleCountrySelect,
    setDateRange,
    updateDetail,
    handleCityChange,
    handleCitySelect,
    addImages,
    removeImage,
    canGoNext,
    getPostFormPayload,
  };
};
