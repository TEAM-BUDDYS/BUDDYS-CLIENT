import type {
  AgeConditionType,
  CompanionType,
  GenderType,
  RecruitmentCountType,
} from '@/domains/posts/model/post-form';

export type PostCreateGenderConditionType = Exclude<GenderType, 'ANY'>;

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
