import type { components, operations } from '@/types/schema';

export type KakaoLoginParams = operations['kakaoLogin']['parameters']['query'];
export type KakaoLoginResponse =
  components['schemas']['BaseResponseLoginResponse'];

export type ReissueResponse =
  components['schemas']['BaseResponseLoginResponse'];
