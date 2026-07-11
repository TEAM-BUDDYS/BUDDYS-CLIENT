export type OnboardProgressStep = 1 | 2 | 3 | 4 | 5;

export type OnboardStep =
  | 'interest-location'
  | 'exchange-info'
  | 'activity-tags'
  | 'interest-tags'
  | 'companion-tags'
  | 'profile'
  | 'complete';

export interface OnboardLocationOption {
  id: number;
  name: string;
  koreanName?: string;
}
