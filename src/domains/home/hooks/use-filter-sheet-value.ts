import { useMemo, useState } from 'react';

import {
  type FilterSheetValue,
  initialFilterValue,
} from '@/domains/home/features/filter-sheet/use-filter-sheet';
import type { BuddyFilterKey } from '@/domains/home/model/buddy-filter';
import { formatFilterDateForParams } from '@/domains/home/model/buddy-search';

const getAppliedFilterKeys = (filterValue: FilterSheetValue) => {
  const appliedFilterKeys: BuddyFilterKey[] = [];

  if (filterValue.country) {
    appliedFilterKeys.push('country');
  }

  if (
    formatFilterDateForParams(filterValue.startDate) ||
    formatFilterDateForParams(filterValue.endDate)
  ) {
    appliedFilterKeys.push('date');
  }

  if (filterValue.ageTagIds.length > 0) {
    appliedFilterKeys.push('age');
  }

  if (filterValue.genderTagIds.length > 0) {
    appliedFilterKeys.push('gender');
  }

  if (filterValue.buddyTypeTagIds.length > 0) {
    appliedFilterKeys.push('buddyType');
  }

  if (filterValue.verificationTagIds.length > 0) {
    appliedFilterKeys.push('verification');
  }

  return appliedFilterKeys;
};

export const useFilterSheetValue = () => {
  const [filterValue, setFilterValue] =
    useState<FilterSheetValue>(initialFilterValue);
  const appliedFilterKeys = useMemo(
    () => getAppliedFilterKeys(filterValue),
    [filterValue],
  );

  const handleFilterApply = (filterValue: FilterSheetValue) => {
    setFilterValue(filterValue);
  };

  return {
    filterValue,
    appliedFilterKeys,
    handleFilterApply,
  };
};
