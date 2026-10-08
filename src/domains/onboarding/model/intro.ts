import introImg1 from '@/domains/onboarding/assets/images/to-onboarding-1.webp';
import introImg2 from '@/domains/onboarding/assets/images/to-onboarding-2.webp';
import introImg3 from '@/domains/onboarding/assets/images/to-onboarding-3.webp';

export const INTRO_SLIDES = [
  {
    titleLines: ['간단한 질문으로', '유학 생활이 더욱 편해져요'],
    image: introImg1,
    alt: '사용자와 같은 나라로 떠나는 동행을 추천해주는 예시 이미지',
  },
  {
    titleLines: ['솔직하게 답할수록', '정확하게 추천해드려요'],
    image: introImg2,
    alt: '사용자와 취향이 90% 일치하는 동행을 추천해주는 예시 이미지',
  },
  {
    titleLines: ['나와 딱 맞는 동행과 코스', '지금 확인해볼까요?'],
    image: introImg3,
    alt: '사용자의 관심 국가에서 기록된 코스를 추천해주는 예시 이미지',
  },
] as const;
