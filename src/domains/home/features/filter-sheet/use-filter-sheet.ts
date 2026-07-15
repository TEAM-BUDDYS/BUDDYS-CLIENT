import { useState } from 'react';

import type { Country } from '@/shared/api';
import { formatDateInput } from '@/shared/utils/format-date-input';

export interface FilterSheetValue {
  country: Country | null;
  startDate: string;
  endDate: string;
  ageTagIds: number[];
  genderTagIds: number[];
  buddyTypeTagIds: number[];
  verificationTagIds: number[];
}

interface UseFilterSheetParams {
  initialValue?: FilterSheetValue;
  onClose: () => void;
  onApply?: (value: FilterSheetValue) => void;
}

export const initialFilterValue: FilterSheetValue = {
  country: null,
  startDate: '',
  endDate: '',
  ageTagIds: [],
  genderTagIds: [],
  buddyTypeTagIds: [],
  verificationTagIds: [],
};

export const useFilterSheet = ({
  initialValue = initialFilterValue,
  onClose,
  onApply,
}: UseFilterSheetParams) => {
  const [filterValue, setFilterValue] =
    useState<FilterSheetValue>(initialValue);

  const updateFilterValue = <Key extends keyof FilterSheetValue>(
    key: Key,
    value: FilterSheetValue[Key],
  ) => {
    setFilterValue((prevFilterValue) => ({
      ...prevFilterValue,
      [key]: value,
    }));
  };

  const updateDateFilterValue = (
    key: 'startDate' | 'endDate',
    value: string,
  ) => {
    setFilterValue((prevFilterValue) => ({
      ...prevFilterValue,
      [key]: formatDateInput(value, prevFilterValue[key]),
    }));
  };

  const handleResetClick = () => {
    setFilterValue(initialFilterValue);
  };

  const handleApplyClick = () => {
    onApply?.(filterValue);
    onClose();
  };

  return {
    filterValue,
    updateFilterValue,
    updateDateFilterValue,
    handleResetClick,
    handleApplyClick,
  };
};
