import { useState } from 'react';

import { formatDateInput } from '@/domains/home/utils/format-date-input';

export interface FilterSheetValue {
  country: string;
  startDate: string;
  endDate: string;
  ageTagIds: number[];
  genderTagIds: number[];
  buddyTypeTagIds: number[];
  verificationTagIds: number[];
}

interface UseFilterSheetParams {
  onClose: () => void;
  onApply?: (value: FilterSheetValue) => void;
}

const initialFilterValue: FilterSheetValue = {
  country: '',
  startDate: '',
  endDate: '',
  ageTagIds: [],
  genderTagIds: [],
  buddyTypeTagIds: [],
  verificationTagIds: [],
};

export const useFilterSheet = ({ onClose, onApply }: UseFilterSheetParams) => {
  const [filterValue, setFilterValue] =
    useState<FilterSheetValue>(initialFilterValue);

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
