'use client';

import { type UIEvent, useState } from 'react';

import { LinkIcon } from '@/shared/components/icons';
import {
  Button,
  OptionItem,
  OptionList,
  Searchbar,
  useToast,
} from '@/shared/components/ui';

import { COURSE_CREATE_MAX_COMPANION_COUNT } from '../constants';
import type { CourseCreateCompanion } from '../model';
import { CourseCompanionInviteTooltip } from './course-companion-invite-tooltip';
import { CourseCreateSelectedCompanionList } from './course-create-selected-companion-list';
import { useCourseCompanionSearch } from './use-course-companion-search';

const COMPANION_SEARCH_RESULT_LIST_ID = 'course-companion-search-result-list';
const COURSE_INVITE_URL = 'buddys.co.kr';

interface CourseCreateCompanionStepProps {
  selectedCompanions: CourseCreateCompanion[];
  onCompanionSelect: (companion: CourseCreateCompanion) => void;
  onCompanionRemove: (userId: number) => void;
}

export const CourseCreateCompanionStep = ({
  selectedCompanions,
  onCompanionSelect,
  onCompanionRemove,
}: CourseCreateCompanionStepProps) => {
  const { showToast } = useToast();
  const [keyword, setKeyword] = useState('');
  const companionSearch = useCourseCompanionSearch({ keyword });
  const isResultOpen = companionSearch.hasKeyword;

  const handleCompanionSelect = (companion: CourseCreateCompanion) => {
    const isSelected = selectedCompanions.some(
      ({ userId }) => userId === companion.userId,
    );

    if (isSelected) {
      onCompanionRemove(companion.userId);
      return;
    }

    if (selectedCompanions.length >= COURSE_CREATE_MAX_COMPANION_COUNT) {
      showToast(
        `동행은 최대 ${COURSE_CREATE_MAX_COMPANION_COUNT}명까지 추가할 수 있어요`,
        { variant: 'gray' },
      );
      return;
    }

    onCompanionSelect(companion);
    setKeyword('');
  };

  const handleResultScroll = (event: UIEvent<HTMLUListElement>) => {
    const resultList = event.currentTarget;
    const remainingScroll =
      resultList.scrollHeight - resultList.scrollTop - resultList.clientHeight;

    if (remainingScroll <= 24) {
      companionSearch.loadMore();
    }
  };

  const handleInviteLinkCopy = () => {
    if (!navigator.clipboard) {
      return;
    }

    void navigator.clipboard
      .writeText(COURSE_INVITE_URL)
      .catch(() => undefined);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full">
        <Searchbar
          aria-autocomplete="list"
          aria-busy={companionSearch.isSearching}
          aria-controls={
            isResultOpen ? COMPANION_SEARCH_RESULT_LIST_ID : undefined
          }
          aria-expanded={isResultOpen}
          aria-haspopup="listbox"
          aria-label="동행 사용자 검색"
          placeholder="검색어를 입력해주세요"
          role="combobox"
          size="medium"
          value={keyword}
          onChange={setKeyword}
        />

        {isResultOpen && (
          <OptionList
            id={COMPANION_SEARCH_RESULT_LIST_ID}
            onScroll={handleResultScroll}
          >
            {companionSearch.companions.map((companion) => {
              const isSelected = selectedCompanions.some(
                ({ userId }) => userId === companion.userId,
              );

              return (
                <OptionItem
                  isSelected={isSelected}
                  key={companion.userId}
                  label={companion.nickname}
                  onSelect={() => handleCompanionSelect(companion)}
                />
              );
            })}

            {companionSearch.isSearching &&
              companionSearch.companions.length === 0 && (
                <li
                  className="text-caption-r-12 px-4 py-3 text-center text-gray-500"
                  role="status"
                >
                  사용자를 검색하고 있어요.
                </li>
              )}

            {companionSearch.isEmpty && (
              <li className="text-caption-r-12 px-4 py-3 text-center text-gray-500">
                검색 결과가 없어요.
              </li>
            )}

            {companionSearch.isError && (
              <li className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="text-caption-r-12 text-error" role="alert">
                  사용자를 불러오지 못했어요.
                </span>
                <button
                  className="text-caption-m-12 text-mint-400 shrink-0"
                  type="button"
                  onClick={companionSearch.retry}
                >
                  다시 시도
                </button>
              </li>
            )}
          </OptionList>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <CourseCreateSelectedCompanionList
          companions={selectedCompanions}
          onRemove={onCompanionRemove}
        />

        <CourseCompanionInviteTooltip />

        <Button
          className="text-body-m-15 border-gray-100 enabled:active:border-gray-100 enabled:active:bg-gray-50 enabled:active:text-gray-800"
          icon={<LinkIcon />}
          iconSize="lg"
          variant="secondary"
          onClick={handleInviteLinkCopy}
        >
          초대 링크 복사하기
        </Button>
      </div>
    </div>
  );
};
