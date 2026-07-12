export interface AuthSession {
  accessToken: string;
  onboardingCompleted: boolean;
}

export type AuthStatusTypes =
  | 'initializing'
  | 'authenticated'
  | 'unauthenticated';
