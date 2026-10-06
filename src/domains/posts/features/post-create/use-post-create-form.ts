'use client';

import { useEffect, useRef, useState } from 'react';

import type { CreatePostRequest } from '@/domains/posts/api/type';
import type { PostDetail } from '@/domains/posts/model/post-detail';
import { type City, getCityDisplayName } from '@/shared/api';
import type { DateRangeTypes } from '@/shared/components/ui';
import {
  formatDateToIsoDate,
  parseDate,
} from '@/shared/utils/format-date-range';

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

const getInitialDetailForm = (
  initialPost?: PostDetail,
): PostCreateDetailFormState => {
  if (!initialPost) {
    return INITIAL_DETAIL_FORM;
  }

  return {
    title: initialPost.title,
    content: initialPost.content,
    ageConditions: initialPost.conditions.ageConditions,
    genderConditions: initialPost.conditions.genderConditions,
    companionType: initialPost.conditions.travelType,
    recruitmentCountType: initialPost.recruitmentCountType,
    activityTagIds: initialPost.conditions.activityTags.map(
      ({ tagId }) => tagId,
    ),
    interestTagIds: initialPost.conditions.interestTags.map(
      ({ tagId }) => tagId,
    ),
    companionStyleTagIds: initialPost.conditions.travelStyleTags.map(
      ({ tagId }) => tagId,
    ),
  };
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

export const usePostCreateForm = (initialPost?: PostDetail) => {
  const initialCity: City | null = initialPost
    ? {
        id: initialPost.city.cityId,
        name: initialPost.city.name,
        koreanName: initialPost.city.koreanName,
      }
    : null;
  const [selectedCountry, setSelectedCountry] = useState<LocationOption | null>(
    initialPost
      ? {
          id: initialPost.country.countryId,
          name: initialPost.country.name,
        }
      : null,
  );
  const [city, setCity] = useState(() => getCityDisplayName(initialCity));
  const [selectedCity, setSelectedCity] = useState<City | null>(initialCity);
  const [dateRange, setDateRange] = useState<DateRangeTypes>({
    startDate: initialPost ? parseDate(initialPost.startDate) : null,
    endDate: initialPost ? parseDate(initialPost.endDate) : null,
  });
  const [detail, setDetail] = useState<PostCreateDetailFormState>(() =>
    getInitialDetailForm(initialPost),
  );
  const [images, setImages] = useState<PostCreateImage[]>(() =>
    initialPost
      ? initialPost.imageUrls.map((imageUrl) => ({
          type: 'existing' as const,
          imageUrl,
          previewUrl: imageUrl,
        }))
      : [],
  );
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

      return { type: 'new' as const, file, previewUrl };
    });

    if (nextImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...nextImages]);
    }
  };

  const removeImage = (previewUrl: string) => {
    const removedImage = images.find(
      (image) => image.previewUrl === previewUrl,
    );

    if (removedImage?.type === 'new') {
      URL.revokeObjectURL(previewUrl);
      previewUrlsRef.current.delete(previewUrl);
    }

    setImages((prevImages) =>
      prevImages.filter((image) => image.previewUrl !== previewUrl),
    );
  };

  const getCompleteFormValues = () => {
    if (
      !selectedCountry ||
      !selectedCity ||
      !dateRange.startDate ||
      !isRequiredDetailComplete(detail)
    ) {
      return null;
    }

    return {
      selectedCountry,
      selectedCity,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate ?? dateRange.startDate,
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
      return Boolean(dateRange.startDate);
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
      startDate: formatDateToIsoDate(startDate),
      endDate: formatDateToIsoDate(endDate),
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
