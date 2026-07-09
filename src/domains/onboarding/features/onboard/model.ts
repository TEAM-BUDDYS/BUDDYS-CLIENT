export type OnboardProgressStep = 1 | 2 | 3 | 4 | 5;

export type OnboardStep =
  | 'interest-location'
  | 'exchange-info'
  | 'activity-type'
  | 'interest-tags'
  | 'companion-style'
  | 'profile'
  | 'complete';

export interface OnboardLocationOption {
  id: number;
  name: string;
}
