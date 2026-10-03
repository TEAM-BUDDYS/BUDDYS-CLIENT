import { useMemo, useState } from 'react';

import {
  type FilterSheetValue,
  initialFilterValue,
} from '@/domains/partner/features/filter-sheet/use-filter-sheet';
import { formatFilterDateForParams } from '@/domains/partner/model/filter-date';
import {
  partnerFilterItems,
  type PartnerFilterKey,
} from '@/domains/partner/model/partner-filter';

const getAppliedFilterKeys = (filterValue: FilterSheetValue) => {
  const appliedFilterKeys: PartnerFilterKey[] = [];

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

const getAppliedFilterSummary = (
  filterValue: FilterSheetValue,
  appliedFilterKeys: PartnerFilterKey[],
) => {
  const [firstFilterKey] = appliedFilterKeys;

  if (!firstFilterKey) {
    return null;
  }

  const firstFilterLabel =
    firstFilterKey === 'country'
      ? filterValue.country?.name
      : partnerFilterItems.find((item) => item.key === firstFilterKey)?.label;

  if (!firstFilterLabel) {
    return null;
  }

  const remainingFilterCount = appliedFilterKeys.length - 1;

  return remainingFilterCount > 0
    ? `${firstFilterLabel} 외 ${remainingFilterCount}`
    : firstFilterLabel;
};

export const usePartnerFilterValue = () => {
  const [filterValue, setFilterValue] =
    useState<FilterSheetValue>(initialFilterValue);
  const appliedFilterKeys = useMemo(
    () => getAppliedFilterKeys(filterValue),
    [filterValue],
  );
  const appliedFilterSummary = useMemo(
    () => getAppliedFilterSummary(filterValue, appliedFilterKeys),
    [appliedFilterKeys, filterValue],
  );

  const handleFilterApply = (filterValue: FilterSheetValue) => {
    setFilterValue(filterValue);
  };

  return {
    appliedFilterKeys,
    appliedFilterSummary,
    filterValue,
    handleFilterApply,
  };
};
