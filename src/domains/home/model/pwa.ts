import pwaAndroid11 from '@/domains/home/assets/pwa/android-info/pwa-android-1-1.webp';
import pwaAndroid12 from '@/domains/home/assets/pwa/android-info/pwa-android-1-2.webp';
import pwaAndroid2 from '@/domains/home/assets/pwa/android-info/pwa-android-2.webp';
import pwaIos11 from '@/domains/home/assets/pwa/ios-info/pwa-ios-1-1.webp';
import pwaIos12 from '@/domains/home/assets/pwa/ios-info/pwa-ios-1-2.webp';
import pwaIos2 from '@/domains/home/assets/pwa/ios-info/pwa-ios-2.webp';
import pwaIos3 from '@/domains/home/assets/pwa/ios-info/pwa-ios-3.webp';

export const PWA_IOS_INFO_LIST = [
  {
    step: 1,
    description: '브라우저 하단 공유 버튼 클릭',
    images: [
      {
        src: pwaIos11,
        width: 270,
        height: 54,
      },
      {
        src: pwaIos12,
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
        src: pwaIos2,
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
        src: pwaIos3,
        width: 100,
        height: 94,
      },
    ],
  },
] as const;

export const PWA_ANDROID_INFO_LIST = [
  {
    step: 1,
    description: '브라우저 상단 공유 버튼 클릭',
    images: [
      {
        src: pwaAndroid11,
        width: 270,
        height: 54,
      },
      {
        src: pwaAndroid12,
        width: 270,
        height: 72,
      },
    ],
  },
  {
    step: 2,
    description: '설치 선택',
    images: [
      {
        src: pwaAndroid2,
        width: 273,
        height: 190,
      },
    ],
  },
] as const;
