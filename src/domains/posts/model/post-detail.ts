import type { GenderType } from '@/types/gender';

import type {
  AgeConditionType,
  CompanionType,
  RecruitmentCountType,
} from './post-form';
import type { PostRecruitmentStatusTypes } from './post-recruitment-status';

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
  koreanName?: string;
}

interface PostDetailAuthor {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
  country: string;
  ageRange: string;
  gender: GenderType;
}

interface PostDetailConditions {
  ageConditions: AgeConditionType[];
  genderConditions: GenderType[];
  travelType: CompanionType;
  activityTags: PostDetailTag[];
  interestTags: PostDetailTag[];
  travelStyleTags: PostDetailTag[];
}

export interface PostDetail {
  postId: number;
  author: PostDetailAuthor;
  isMine: boolean;
  recruitmentStatus: PostRecruitmentStatusTypes;
  title: string;
  imageUrls: string[];
  country: PostDetailCountry;
  city: PostDetailCity;
  startDate: string;
  endDate: string;
  recruitmentCountType: RecruitmentCountType;
  content: string;
  conditions: PostDetailConditions;
  viewCount: number;
  commentCount: number;
  createdAt: string;
}
