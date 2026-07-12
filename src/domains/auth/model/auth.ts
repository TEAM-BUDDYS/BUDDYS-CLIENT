export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
}

export interface LoginResponse {
  accessToken: string;
  onboardingCompleted: boolean;
}

export type AuthStatusTypes =
  | 'initializing'
  | 'authenticated'
  | 'unauthenticated';
