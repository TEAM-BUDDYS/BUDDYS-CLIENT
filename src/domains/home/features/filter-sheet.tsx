'use client';

import { useState } from 'react';

import { XIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';
import {
  Button,
  ChipGroup,
  Dropdown,
  FormLabel,
  TextField,
} from '@/shared/components/ui';

const countryOptions = ['일본', '중국', '미국', '프랑스', '영국'];
const ageFilterTags = [
  { id: 1, name: '20대 초반' },
  { id: 2, name: '20대 중반' },
  { id: 3, name: '20대 후반' },
  { id: 4, name: '30대 이상' },
];
const genderFilterTags = [
  { id: 1, name: '남자' },
  { id: 2, name: '여자' },
];
const buddyTypeFilterTags = [
  { id: 1, name: '여행 전체 동행' },
  { id: 2, name: '여행 부분 동행' },
  { id: 3, name: '숙박 공유' },
  { id: 4, name: '투어 동행' },
  { id: 5, name: '식사 동행' },
  { id: 6, name: '생활 동행' },
  { id: 7, name: '공동 구매' },
];
const verificationFilterTags = [
  { id: 1, name: '본인 인증' },
  { id: 2, name: '대학 인증' },
  { id: 3, name: '파견교 인증' },
];

export interface FilterSheetValue {
  country: string;
  startDate: string;
  endDate: string;
  ageTagIds: number[];
  genderTagIds: number[];
  buddyTypeTagIds: number[];
  verificationTagIds: number[];
}

interface FilterSheetProps {
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

export const FilterSheet = ({ onClose, onApply }: FilterSheetProps) => {
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

  const handleResetClick = () => {
    setFilterValue(initialFilterValue);
  };

  const handleApplyClick = () => {
    onApply?.(filterValue);
    onClose();
  };

  return (
    <>
      <Header
        content="필터"
        right={
          <>
            <button
              type="button"
              aria-label="필터 닫기"
              className="flex size-11 items-center justify-center"
              onClick={onClose}
            >
              <XIcon className="size-6" />
            </button>
          </>
        }
      />
      <main className="flex flex-col gap-6 px-4 pb-13">
        <div className="flex flex-col gap-3 py-4">
          <FormLabel as="p" className="text-body-sb-16">
            국가
          </FormLabel>
          <Dropdown
            options={countryOptions}
            value={filterValue.country}
            placeholder="선택해주세요."
            onChange={(value) => updateFilterValue('country', value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            날짜
          </FormLabel>
          <div className="flex flex-1 items-center gap-5">
            <TextField
              aria-label="시작일"
              placeholder="시작일"
              value={filterValue.startDate}
              className="text-body-m-15 h-13 text-gray-500"
              onChange={(event) =>
                updateFilterValue('startDate', event.target.value)
              }
            />
            <span className="text-title-b-20 text-gray-500">~</span>
            <TextField
              aria-label="종료일"
              placeholder="종료일"
              value={filterValue.endDate}
              className="text-body-m-15 h-13 text-gray-500"
              onChange={(event) =>
                updateFilterValue('endDate', event.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            나이
          </FormLabel>
          <ChipGroup
            tags={ageFilterTags}
            selectedTagIds={filterValue.ageTagIds}
            maxSelectionCount={ageFilterTags.length}
            hasToggleButton={false}
            chipClassName="h-10 w-20"
            wrap={false}
            onChange={(tagIds) => updateFilterValue('ageTagIds', tagIds)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            성별
          </FormLabel>
          <ChipGroup
            tags={genderFilterTags}
            selectedTagIds={filterValue.genderTagIds}
            maxSelectionCount={genderFilterTags.length}
            hasToggleButton={false}
            onChange={(tagIds) => updateFilterValue('genderTagIds', tagIds)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            동행 유형
          </FormLabel>
          <ChipGroup
            tags={buddyTypeFilterTags}
            selectedTagIds={filterValue.buddyTypeTagIds}
            maxSelectionCount={buddyTypeFilterTags.length}
            hasToggleButton={false}
            onChange={(tagIds) => updateFilterValue('buddyTypeTagIds', tagIds)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            인증 상태
          </FormLabel>
          <ChipGroup
            tags={verificationFilterTags}
            selectedTagIds={filterValue.verificationTagIds}
            maxSelectionCount={verificationFilterTags.length}
            hasToggleButton={false}
            onChange={(tagIds) =>
              updateFilterValue('verificationTagIds', tagIds)
            }
          />
        </div>
      </main>
      <div className="flex gap-3 px-4 pb-5">
        <Button
          variant="secondary"
          className="h-13 max-w-21 flex-none rounded-xl"
          onClick={handleResetClick}
        >
          초기화
        </Button>
        <Button
          variant="primary"
          className="h-13 rounded-xl"
          onClick={handleApplyClick}
        >
          적용하기
        </Button>
      </div>
    </>
  );
};
