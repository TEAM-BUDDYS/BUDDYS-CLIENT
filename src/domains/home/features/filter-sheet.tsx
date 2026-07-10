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

export const FilterSheet = ({ onClose, onApply }: FilterSheetProps) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAgeTagIds, setSelectedAgeTagIds] = useState<number[]>([]);
  const [selectedGenderTagIds, setSelectedGenderTagIds] = useState<number[]>(
    [],
  );
  const [selectedBuddyTypeTagIds, setSelectedBuddyTypeTagIds] = useState<
    number[]
  >([]);
  const [selectedVerificationTagIds, setSelectedVerificationTagIds] = useState<
    number[]
  >([]);

  const handleResetClick = () => {
    setSelectedCountry('');
    setStartDate('');
    setEndDate('');
    setSelectedAgeTagIds([]);
    setSelectedGenderTagIds([]);
    setSelectedBuddyTypeTagIds([]);
    setSelectedVerificationTagIds([]);
  };

  const handleApplyClick = () => {
    onApply?.({
      country: selectedCountry,
      startDate,
      endDate,
      ageTagIds: selectedAgeTagIds,
      genderTagIds: selectedGenderTagIds,
      buddyTypeTagIds: selectedBuddyTypeTagIds,
      verificationTagIds: selectedVerificationTagIds,
    });
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
            value={selectedCountry}
            placeholder="선택해주세요."
            onChange={setSelectedCountry}
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
              value={startDate}
              className="text-body-m-15 h-13 text-gray-500"
              onChange={(event) => setStartDate(event.target.value)}
            />
            <span className="text-title-b-20 text-gray-500">~</span>
            <TextField
              aria-label="종료일"
              placeholder="종료일"
              value={endDate}
              className="text-body-m-15 h-13 text-gray-500"
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            나이
          </FormLabel>
          <ChipGroup
            tags={ageFilterTags}
            selectedTagIds={selectedAgeTagIds}
            maxSelectionCount={ageFilterTags.length}
            hasToggleButton={false}
            chipClassName="h-10 w-20"
            wrap={false}
            onChange={setSelectedAgeTagIds}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            성별
          </FormLabel>
          <ChipGroup
            tags={genderFilterTags}
            selectedTagIds={selectedGenderTagIds}
            maxSelectionCount={genderFilterTags.length}
            hasToggleButton={false}
            onChange={setSelectedGenderTagIds}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            동행 유형
          </FormLabel>
          <ChipGroup
            tags={buddyTypeFilterTags}
            selectedTagIds={selectedBuddyTypeTagIds}
            maxSelectionCount={buddyTypeFilterTags.length}
            hasToggleButton={false}
            onChange={setSelectedBuddyTypeTagIds}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormLabel as="p" className="text-body-sb-16">
            인증 상태
          </FormLabel>
          <ChipGroup
            tags={verificationFilterTags}
            selectedTagIds={selectedVerificationTagIds}
            maxSelectionCount={verificationFilterTags.length}
            hasToggleButton={false}
            onChange={setSelectedVerificationTagIds}
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
