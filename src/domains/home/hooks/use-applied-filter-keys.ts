import { useState } from 'react';

import type { FilterSheetValue } from '@/domains/home/features/filter-sheet/use-filter-sheet';
import type { BuddyFilterKey } from '@/domains/home/model/buddy-filter';

const getAppliedFilterKeys = (filterValue: FilterSheetValue) => {
  const appliedFilterKeys: BuddyFilterKey[] = [];

  if (filterValue.country) {
    appliedFilterKeys.push('country');
  }

  if (filterValue.startDate || filterValue.endDate) {
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

export const useAppliedFilterKeys = () => {
  const [appliedFilterKeys, setAppliedFilterKeys] = useState<BuddyFilterKey[]>(
    [],
  );

  const handleFilterApply = (filterValue: FilterSheetValue) => {
    setAppliedFilterKeys(getAppliedFilterKeys(filterValue));
  };

  return {
    appliedFilterKeys,
    handleFilterApply,
  };
};
