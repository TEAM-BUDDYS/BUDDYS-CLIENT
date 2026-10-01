export type VerificationEntry = 'login' | 'profile';

export const getVerificationEntry = (
  from: string | string[] | undefined,
): VerificationEntry => (from === 'login' ? 'login' : 'profile');
