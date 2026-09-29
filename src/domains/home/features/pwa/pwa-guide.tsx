'use client';

import Image from 'next/image';

import BuddysQR from '@/domains/home/assets/pwa/buddys-qr.png';
import { PwaInfo } from '@/domains/home/components/pwa/pwa-info';
import { usePwaPlatform } from '@/domains/home/hooks/use-pwa-platform';
import { cn } from '@/lib/cn';
import { PwaInfoBalloonIcon } from '@/shared/components/icons';

import { PWA_ANDROID_INFO_LIST, PWA_IOS_INFO_LIST } from '../../model/pwa';

export const PwaGuide = () => {
  const platform = usePwaPlatform();
  const isDesktop = platform === 'desktop';
  const infoList =
    platform === 'android' ? PWA_ANDROID_INFO_LIST : PWA_IOS_INFO_LIST;

  if (platform === null) {
    return <p role="status">설치 안내를 불러오고 있어요.</p>;
  }

  if (platform === 'unknown') {
    return (
      <p role="status">
        기기를 확인하지 못했어요. 설치 안내는 iOS 또는 Android 기기에서 확인해
        주세요.
      </p>
    );
  }

  return (
    <>
      <div>
        <PwaInfoBalloonIcon
          className={cn('h-12 w-[177px] text-gray-800', isDesktop && 'mt-4')}
          aria-label="앱스토어 다운로드 없이"
        />
        <h1
          className={cn(
            'text-title-b-20 pt-4 text-gray-800',
            !isDesktop && 'pb-7',
          )}
        >
          {isDesktop ? (
            <>
              모바일로 buddys 앱을 추가해서
              <br />
              편리하게 사용해보세요!
            </>
          ) : (
            '홈 화면에 buddys 앱을 추가하세요!'
          )}
        </h1>
      </div>
      {isDesktop ? (
        <div className="flex flex-1 items-center justify-center">
          <Image src={BuddysQR} alt="버디즈 QR" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {infoList.map(({ step, description, images }) => (
            <PwaInfo
              key={step}
              step={step}
              description={description}
              images={images}
            />
          ))}
        </div>
      )}
    </>
  );
};
