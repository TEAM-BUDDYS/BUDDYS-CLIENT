export interface AuthSession {
  userId: number;
  accessToken: string;
  onboardingCompleted: boolean;
}

export type AuthStatusTypes =
  | 'initializing'
  | 'authenticated'
  | 'unauthenticated';
