import type {
  AgeConditionType,
  CompanionType,
  GenderType,
  RecruitmentCountType,
} from './post-form';
import type { PostRecruitmentStatusTypes } from './post-recruitment-status';

export type PostAuthorGenderTypes = Exclude<GenderType, 'ANY'>;

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

interface PostDetailAuthor {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
  country: string;
  age: number;
  ageRange: string;
  gender: PostAuthorGenderTypes;
}

interface PostDetailConditions {
  ageConditions: AgeConditionType[];
  genderCondition: GenderType;
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
