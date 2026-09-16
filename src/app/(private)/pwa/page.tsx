import { PwaInfo } from '@/domains/home/components/pwa/pwa-info';
import { PWA_INFO_LIST } from '@/domains/home/model/pwa';
import { PwaInfoBalloonIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';

export default function page() {
  return (
    <div className="flex h-dvh flex-col">
      <Header hasBackButton />
      <main className="flex flex-1 flex-col justify-center px-4 pb-4">
        <div>
          <PwaInfoBalloonIcon className="h-12 w-[177px]" />
          <p className="text-title-b-20 pt-4 pb-7 text-gray-800">
            홈 화면에 buddys 앱을 추가하세요!
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {PWA_INFO_LIST.map(({ step, description, images }) => (
            <PwaInfo
              key={step}
              step={step}
              description={description}
              images={images}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
