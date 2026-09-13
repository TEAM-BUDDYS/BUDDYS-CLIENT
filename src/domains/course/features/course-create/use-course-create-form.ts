'use client';

import { useState } from 'react';

import type { Country } from '@/shared/api';

import type {
  CourseCreateCityOption,
  CourseCreateLocationValue,
} from './model';

export const useCourseCreateForm = () => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedCities, setSelectedCities] = useState<
    CourseCreateCityOption[]
  >([]);

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

  const getLocationValue = (): CourseCreateLocationValue => ({
    countries: selectedCountries,
    cities: selectedCities,
  });

  return {
    selectedCountries,
    selectedCities,
    handleCountrySelect,
    handleCountryRemove,
    handleCitySelect,
    handleCityRemove,
    getLocationValue,
  };
};
