import pwaStep11 from '@/domains/home/assets/pwa/pwa-step-1-1.webp';
import pwaStep12 from '@/domains/home/assets/pwa/pwa-step-1-2.webp';
import pwaStep2 from '@/domains/home/assets/pwa/pwa-step-2.webp';
import pwaStep3 from '@/domains/home/assets/pwa/pwa-step-3.webp';

export const PWA_INFO_LIST = [
  {
    step: 1,
    description: '브라우저 하단 공유 버튼 탭',
    images: [
      {
        src: pwaStep11,
        width: 270,
        height: 54,
      },
      {
        src: pwaStep12,
        width: 270,
        height: 54,
      },
    ],
  },
  {
    step: 2,
    description: '홈 화면에 추가 선택',
    images: [
      {
        src: pwaStep2,
        width: 270,
        height: 73,
      },
    ],
  },
  {
    step: 3,
    description: '추가된 앱 실행',
    images: [
      {
        src: pwaStep3,
        width: 100,
        height: 94,
      },
    ],
  },
] as const;
