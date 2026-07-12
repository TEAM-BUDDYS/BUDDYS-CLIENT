import type {
  AgeConditionType,
  CompanionType,
  RecruitmentCountType,
} from '@/domains/posts/model/post-form';
import type { GenderType } from '@/types/gender';

export type PostCreateGenderConditionType = GenderType;

export type PostCreateStep = 1 | 2 | 3 | 4;
export type PostCreateQuestionStep = Exclude<PostCreateStep, 4>;

export interface LocationOption {
  id: number;
  name: string;
}

export interface PostCreateOption<TValue extends string = string> {
  label: string;
  value: TValue;
}

export interface PostCreateDetailFormState {
  title: string;
  content: string;
  ageConditions: AgeConditionType[];
  genderConditions: PostCreateGenderConditionType[];
  companionType: CompanionType | '';
  recruitmentCountType: RecruitmentCountType | '';
  activityTagIds: number[];
  interestTagIds: number[];
  companionStyleTagIds: number[];
}
