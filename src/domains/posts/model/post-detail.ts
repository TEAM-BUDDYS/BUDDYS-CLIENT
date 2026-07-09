import type { PostRecruitmentStatusTypes } from './post-recruitment-status';

export type PostAuthorGenderTypes = 'FEMALE' | 'MALE';

export type PostGenderConditionTypes = 'ANY' | 'FEMALE' | 'MALE';

export type PostRecruitmentCountTypes = 'ONE' | 'TWO' | 'THREE_OR_MORE';

export type PostAgeConditionTypes =
  | 'TEENS'
  | 'EARLY_20S'
  | 'MID_20S'
  | 'LATE_20S'
  | 'THIRTIES'
  | 'FORTIES_OR_MORE';

export type PostTravelTypes = 'FULL_TRIP' | 'PARTIAL_TRIP';

export interface PostDetailTag {
  tagId: number;
  name: string;
}

interface PostDetailCountry {
  countryId: number;
  name: string;
}

interface PostDetailCity {
  cityId: number;
  name: string;
}

export interface PostDetail {
  postId: number;
  author: {
    userId: number;
    nickname: string;
    profileImageUrl?: string | null;
    country: string;
    age: number;
    ageRange: string;
    gender: PostAuthorGenderTypes;
  };
  isMine: boolean;
  recruitmentStatus: PostRecruitmentStatusTypes;
  title: string;
  imageUrls: string[];
  country: PostDetailCountry;
  city: PostDetailCity;
  startDate: string;
  endDate: string;
  recruitmentCountType: PostRecruitmentCountTypes;
  content: string;
  conditions: {
    ageConditions: PostAgeConditionTypes[];
    genderCondition: PostGenderConditionTypes;
    travelType: PostTravelTypes;
    activityTags: PostDetailTag[];
    interestTags: PostDetailTag[];
    travelStyleTags: PostDetailTag[];
  };
  viewCount: number;
  commentCount: number;
  createdAt: string;
}
