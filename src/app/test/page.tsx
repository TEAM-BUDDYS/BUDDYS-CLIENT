import { CardProfile } from '@/domains/profile/components/card-profile/card-profile';

export default function TestPage() {
  return (
    <main className="flex flex-col items-start gap-6 p-4">
      <h1 className="text-title-sb-18">CardProfile 테스트</h1>
      <CardProfile
        title="함께 러닝하실 분 구해요"
        content="매주 화, 목 저녁 7시에 한강에서 같이 뛰실 분 구합니다.이미지가 없을 때 레이아웃이 어떻게 나오는지 확인하는 카드입니다.가 없을 때 레이아웃이 어떻게 나오"
        startDate="2026-07-08"
        endDate="2026-07-31"
        image="https://picsum.photos/200"
      />
      <CardProfile
        title="이미지 없는 카드 테스트입니다 아주 긴 제목도 잘리는지 확인할거임"
        content="이미지가 없을 때 레이아웃이 어떻게 나오는지 확인하는 카드입니다.가 없을 때 레이아웃이 어떻게 나오는지 확인하는 카드입니다."
        startDate="2026-08-01"
        endDate="2026-08-15"
      />
    </main>
  );
}
