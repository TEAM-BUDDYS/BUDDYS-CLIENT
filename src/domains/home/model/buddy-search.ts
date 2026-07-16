import type { FilterSheetValue } from '@/domains/home/features/filter-sheet/use-filter-sheet';
import type { GetPostsParams, PostSummary } from '@/domains/posts/api/type';

export const BUDDY_SEARCH_SIZE = 3;

type PostSearchParams = NonNullable<GetPostsParams>;
type AgeCondition = NonNullable<PostSearchParams['ageConditions']>[number];
type GenderCondition = NonNullable<
  PostSearchParams['genderConditions']
>[number];
type CompanionType = NonNullable<PostSearchParams['companionTypes']>[number];

export const AGE_CONDITION_BY_TAG_ID = {
  1: 'EARLY_20S',
  2: 'MID_20S',
  3: 'LATE_20S',
  4: 'OVER_30S',
} as const satisfies Record<number, AgeCondition>;

export const GENDER_CONDITION_BY_TAG_ID = {
  1: 'MALE',
  2: 'FEMALE',
} as const satisfies Record<number, GenderCondition>;

export const COMPANION_TYPE_BY_TAG_ID = {
  1: 'FULL_TRIP',
  2: 'PARTIAL_TRIP',
  3: 'ACCOMMODATION_SHARE',
  4: 'TOUR',
  5: 'MEAL',
  6: 'DAILY_LIFE',
  7: 'GROUP_PURCHASE',
} as const satisfies Record<number, CompanionType>;

export type DisplayablePostSummary = PostSummary & {
  postId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  recruitmentStatus: 'RECRUITING' | 'COMPLETED';
  country: {
    name: string;
  };
};

export const hasPostCardFields = (
  post: PostSummary,
): post is DisplayablePostSummary => {
  return Boolean(
    post.postId &&
    post.title &&
    post.content &&
    post.startDate &&
    post.endDate &&
    post.recruitmentStatus &&
    post.country?.name,
  );
};

export const getMappedValues = <Value extends string>(
  tagIds: number[],
  valueMap: Record<number, Value>,
) => {
  return tagIds
    .map((tagId) => valueMap[tagId])
    .filter((value): value is Value => value !== undefined);
};

const FILTER_DATE_PATTERN = /^\d{2}\.\d{2}\.\d{2}$/;

export const formatFilterDateForParams = (date: string) => {
  if (!FILTER_DATE_PATTERN.test(date)) {
    return undefined;
  }

  const [year, month, day] = date.split('.');
  const fullYear = Number(`20${year}`);
  const monthNumber = Number(month);
  const dayNumber = Number(day);
  const dateValue = new Date(fullYear, monthNumber - 1, dayNumber);

  const isValidDate =
    dateValue.getFullYear() === fullYear &&
    dateValue.getMonth() === monthNumber - 1 &&
    dateValue.getDate() === dayNumber;

  if (!isValidDate) {
    return undefined;
  }

  return `${fullYear}-${month}-${day}`;
};

export const getBuddySearchParams = (
  filterValue: FilterSheetValue,
  size: number,
  keyword?: string,
): GetPostsParams => {
  const trimmedKeyword = keyword?.trim();

  return {
    size,
    keyword: trimmedKeyword || undefined,
    countryId: filterValue.country?.id,
    startDate: formatFilterDateForParams(filterValue.startDate),
    endDate: formatFilterDateForParams(filterValue.endDate),
    ageConditions: getMappedValues(
      filterValue.ageTagIds,
      AGE_CONDITION_BY_TAG_ID,
    ),
    genderConditions: getMappedValues(
      filterValue.genderTagIds,
      GENDER_CONDITION_BY_TAG_ID,
    ),
    companionTypes: getMappedValues(
      filterValue.buddyTypeTagIds,
      COMPANION_TYPE_BY_TAG_ID,
    ),
  };
};
