import type { components, operations } from '@/types/schema';

export type CheckNicknameParams =
  operations['checkNicknameAvailability']['parameters']['query'];

export type CheckNicknameResponse = Omit<
  components['schemas']['BaseResponse'],
  'data'
> & {
  data: {
    available: boolean;
  };
};
