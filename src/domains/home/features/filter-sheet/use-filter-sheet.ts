import { useState } from 'react';

import {
  hasInvalidFilterDate,
  hasInvalidFilterDateOrder,
} from '@/domains/home/model/filter-date';
import type { Country } from '@/shared/api';
import { useToast } from '@/shared/components/ui';
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
  const { showToast } = useToast();
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
    if (hasInvalidFilterDate(filterValue.startDate, filterValue.endDate)) {
      showToast('날짜를 정확히 입력해 주세요.', {
        bottomOffsetClassName: 'bottom-24',
        variant: 'gray',
      });
      return;
    }

    if (hasInvalidFilterDateOrder(filterValue.startDate, filterValue.endDate)) {
      showToast('종료일은 시작일과 같거나 이후로 입력해 주세요.', {
        bottomOffsetClassName: 'bottom-24',
        variant: 'gray',
      });
      return;
    }

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
